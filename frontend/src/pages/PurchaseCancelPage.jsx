import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 text-center relative z-10'
			>
				{/* Warning / Cancel Icon */}
				<div className='w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-100'>
					<XCircle className='w-10 h-10 stroke-[2]' />
				</div>

				<h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2'>
					Payment Cancelled
				</h1>

				<p className='text-sm text-slate-500 mb-6 leading-relaxed'>
					Your checkout was cancelled. No charges were made to your card, and your items remain saved in your shopping cart.
				</p>

				<div className='bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 text-xs text-slate-500'>
					Need help completing your order? Contact our support team or try a different payment method.
				</div>

				<div className='space-y-3'>
					<Link
						to='/cart'
						className='w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all'
					>
						<ShoppingCart className='w-4 h-4 mr-2' />
						<span>Return to Cart</span>
					</Link>

					<Link
						to='/'
						className='w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-sm border border-slate-200 hover:bg-slate-50 transition-colors'
					>
						<ArrowLeft className='w-4 h-4 mr-2' />
						<span>Browse Products</span>
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;

