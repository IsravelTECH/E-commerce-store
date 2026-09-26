import { ArrowRight, CheckCircle2, PackageCheck, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);
	const [orderId, setOrderId] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				const res = await axios.post("/payments/checkout-success", {
					sessionId,
				});
				setOrderId(res.data?.orderId || null);
				clearCart();
			} catch (err) {
				console.error("Error processing checkout success:", err);
				setError("Failed to verify checkout session with our server.");
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL parameter.");
		}
	}, [clearCart]);

	if (isProcessing) {
		return (
			<div className='min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 text-slate-700 space-y-4'>
				<Loader2 className='w-10 h-10 text-blue-600 animate-spin' />
				<h3 className='text-lg font-bold'>Confirming your order with Stripe...</h3>
				<p className='text-sm text-slate-400'>Please wait while we finalize your payment details.</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-[70vh] flex items-center justify-center px-4 bg-slate-50'>
				<div className='max-w-md w-full bg-white rounded-3xl border border-red-200 p-8 text-center shadow-card space-y-4'>
					<div className='w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto'>
						<PackageCheck className='w-8 h-8' />
					</div>
					<h2 className='text-2xl font-bold text-slate-900'>Order Verification Notice</h2>
					<p className='text-sm text-slate-600'>{error}</p>
					<Link
						to='/'
						className='inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors'
					>
						Return to Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 relative overflow-hidden'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.12}
				style={{ zIndex: 99 }}
				numberOfPieces={500}
				recycle={false}
			/>

			<div className='max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-card-hover p-6 sm:p-10 relative z-10 text-center'>
				{/* Success Checkmark */}
				<div className='w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100'>
					<CheckCircle2 className='w-10 h-10 stroke-[2.2]' />
				</div>

				<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2'>
					<Sparkles className='w-3.5 h-3.5' /> Payment Successful
				</div>

				<h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2'>
					Thank You for Your Order!
				</h1>

				<p className='text-sm text-slate-500 mb-6 leading-relaxed'>
					Your payment was successfully processed. A detailed receipt and shipping confirmation have been sent to your email.
				</p>

				{/* Order Info Card */}
				<div className='bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 mb-6 text-left space-y-2.5 text-xs sm:text-sm'>
					{orderId && (
						<div className='flex items-center justify-between'>
							<span className='text-slate-500'>Order Reference</span>
							<span className='font-mono font-bold text-slate-900 truncate max-w-[180px]'>#{orderId.slice(-8).toUpperCase()}</span>
						</div>
					)}
					<div className='flex items-center justify-between'>
						<span className='text-slate-500'>Payment Method</span>
						<span className='font-semibold text-slate-900'>Credit / Debit Card (Stripe)</span>
					</div>
					<div className='flex items-center justify-between'>
						<span className='text-slate-500'>Estimated Delivery</span>
						<span className='font-semibold text-emerald-600'>3-5 Business Days (Express)</span>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='space-y-3'>
					<Link
						to='/'
						className='w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all'
					>
						<span>Continue Shopping</span>
						<ArrowRight className='w-4 h-4 ml-2' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;

