import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, ShieldCheck, Lock, CreditCard, Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
	"pk_test_51RZsHRE65I6UmEu1gzLA4ceeeFz5i8XM5sL3PgIwJC35Jg4C4mHa9wSe3548CutR4g2VztEidkhqm7KJvv9FVynZ00sFe5OLBC"
);

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const [isLoading, setIsLoading] = useState(false);

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		if (cart.length === 0) {
			toast.error("Your cart is empty");
			return;
		}

		setIsLoading(true);
		try {
			const stripe = await stripePromise;
			const res = await axios.post("/payments/create-checkout-session", {
				products: cart,
				couponCode: coupon ? coupon.code : null,
			});

			const session = res.data;
			const result = await stripe.redirectToCheckout({
				sessionId: session.id,
			});

			if (result.error) {
				console.error("Error:", result.error);
				toast.error(result.error.message || "Payment checkout failed");
			}
		} catch (error) {
			console.error("Checkout error:", error);
			toast.error(error?.response?.data?.message || "Failed to initialize checkout");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.div
			className='bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-card space-y-5'
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<div className='flex items-center justify-between border-b border-slate-100 pb-4'>
				<h3 className='text-lg font-bold text-slate-900'>Order Summary</h3>
				<span className='text-xs font-semibold text-slate-500'>
					{cart.length} {cart.length === 1 ? 'item' : 'items'}
				</span>
			</div>

			<div className='space-y-3 text-sm'>
				<div className='flex items-center justify-between text-slate-600'>
					<span>Subtotal</span>
					<span className='font-semibold text-slate-900'>${formattedSubtotal}</span>
				</div>

				{savings > 0 && (
					<div className='flex items-center justify-between text-emerald-600 font-medium'>
						<span>Discounts & Savings</span>
						<span>-${formattedSavings}</span>
					</div>
				)}

				{coupon && isCouponApplied && (
					<div className='flex items-center justify-between text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-xl text-xs'>
						<span className='flex items-center gap-1 font-bold'>
							Coupon ({coupon.code})
						</span>
						<span className='font-bold'>-{coupon.discountPercentage}% OFF</span>
					</div>
				)}

				<div className='flex items-center justify-between text-slate-600'>
					<span>Shipping</span>
					<span className='font-semibold text-emerald-600'>
						{subtotal >= 200 ? "Free Express" : "$0.00 (Standard Free)"}
					</span>
				</div>

				<div className='border-t border-slate-200 pt-4 flex items-center justify-between'>
					<div>
						<span className='text-base font-extrabold text-slate-900 block'>Estimated Total</span>
						<span className='text-xs text-slate-400'>Taxes calculated at checkout</span>
					</div>
					<span className='text-2xl font-black text-blue-600'>
						${formattedTotal}
					</span>
				</div>
			</div>

			<div className='pt-2 space-y-3'>
				<button
					type='button'
					onClick={handlePayment}
					disabled={isLoading}
					className='w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
				>
					{isLoading ? (
						<>
							<Loader2 className='w-4 h-4 animate-spin' />
							<span>Processing Checkout...</span>
						</>
					) : (
						<>
							<Lock className='w-4 h-4' />
							<span>Proceed to Checkout</span>
						</>
					)}
				</button>

				<div className='flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1'>
					<ShieldCheck className='w-4 h-4 text-emerald-600' />
					<span>Guaranteed Safe & Secure Checkout via Stripe</span>
				</div>

				<div className='text-center pt-2'>
					<Link
						to='/'
						className='inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors'
					>
						<span>Or Continue Shopping</span>
						<MoveRight className='w-3.5 h-3.5' />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;

