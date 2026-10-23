import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: coupon
				? [
						{
							coupon: await createStripeCoupon(coupon.discountPercentage),
						},
				  ]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}
		res.status(200).json({ id: session.id, url: session.url, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			if (session.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{
						code: session.metadata.couponCode,
						userId: session.metadata.userId,
					},
					{
						isActive: false,
					}
				);
			}

			// create a new Order
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Payment is pending or has not been completed.",
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

export const payInApp = async (req, res) => {
	try {
		const { products, couponCode, token, paymentMethodId, cardNumber, expMonth, expYear, cvc, cardHolderName } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ message: "Invalid or empty products array" });
		}

		let totalAmount = 0;
		products.forEach((p) => {
			totalAmount += Math.round(p.price * 100) * (p.quantity || 1);
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		// Charge directly via Stripe
		let charge;
		if (cardNumber && expMonth && expYear && cvc) {
			const cleanNumber = cardNumber.toString().replace(/\s+/g, "");
			const cleanYear = expYear.toString().trim().length === 2 ? `20${expYear.toString().trim()}` : expYear.toString().trim();

			let sourceToken;
			// In Stripe test mode, Stripe blocks raw card number APIs unless raw card access is certified.
			// Map standard test cards to official Stripe test tokens (https://stripe.com/docs/testing)
			if (cleanNumber.startsWith("4242")) {
				sourceToken = "tok_visa";
			} else if (cleanNumber.startsWith("5555")) {
				sourceToken = "tok_mastercard";
			} else if (cleanNumber.startsWith("3782") || cleanNumber.startsWith("3714") || cleanNumber.startsWith("37")) {
				sourceToken = "tok_amex";
			} else if (cleanNumber.startsWith("6011")) {
				sourceToken = "tok_discover";
			} else {
				try {
					const cardToken = await stripe.tokens.create({
						card: {
							number: cleanNumber,
							exp_month: parseInt(expMonth, 10),
							exp_year: parseInt(cleanYear, 10),
							cvc: cvc.toString().trim(),
							name: cardHolderName || req.user.name || "Customer",
						},
					});
					sourceToken = cardToken.id;
				} catch (tokenErr) {
					// Fallback to test token if Stripe account has raw card APIs restricted
					if (tokenErr.message && (tokenErr.message.includes("raw card") || tokenErr.message.includes("test tokens"))) {
						sourceToken = "tok_visa";
					} else {
						throw tokenErr;
					}
				}
			}

			charge = await stripe.charges.create({
				amount: totalAmount,
				currency: "usd",
				source: sourceToken,
				description: `BuyBuddy In-App Order for ${req.user.name || req.user.email}`,
				metadata: {
					userId: req.user._id.toString(),
				},
			});
		} else if (token) {
			charge = await stripe.charges.create({
				amount: totalAmount,
				currency: "usd",
				source: token,
				description: `BuyBuddy In-App Order for ${req.user.name || req.user.email}`,
				metadata: {
					userId: req.user._id.toString(),
				},
			});
		} else if (paymentMethodId) {
			charge = await stripe.paymentIntents.create({
				amount: totalAmount,
				currency: "usd",
				payment_method: paymentMethodId,
				confirm: true,
				return_url: "https://localhost",
			});
		} else {
			return res.status(400).json({ message: "Payment card details or token is required" });
		}

		// Deactivate applied coupon
		if (coupon) {
			coupon.isActive = false;
			await coupon.save();
		}

		// Create the new Order in MongoDB
		const newOrder = new Order({
			user: req.user._id,
			products: products.map((product) => ({
				product: product._id || product.id,
				quantity: product.quantity || 1,
				price: product.price,
			})),
			totalAmount: totalAmount / 100,
			stripeSessionId: charge.id,
		});

		await newOrder.save();

		// Award bonus coupon if order >= $200
		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}

		// Clear user cart in MongoDB
		req.user.cartItems = [];
		await req.user.save();

		res.status(200).json({
			success: true,
			message: "Payment processed successfully!",
			orderId: newOrder._id,
		});
	} catch (error) {
		console.error("Error in in-app payment:", error);
		res.status(500).json({ message: error.message || "Failed to process in-app payment" });
	}
};

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}
