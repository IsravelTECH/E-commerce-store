import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Tag, Check, X, Sparkles } from "lucide-react";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = (e) => {
		e?.preventDefault();
		if (!userInputCode.trim()) return;
		applyCoupon(userInputCode.trim());
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-card space-y-4'
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.1 }}
		>
			<div className='flex items-center space-x-2'>
				<div className='w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center'>
					<Tag className='w-4 h-4' />
				</div>
				<h4 className='text-base font-bold text-slate-900'>Have a Promo or Gift Code?</h4>
			</div>

			<form onSubmit={handleApplyCoupon} className='flex items-center gap-2'>
				<div className='relative flex-1'>
					<input
						type='text'
						id='voucher'
						className='w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 placeholder-slate-400 font-medium text-slate-900 uppercase'
						placeholder='Enter promo code'
						value={userInputCode}
						onChange={(e) => setUserInputCode(e.target.value)}
					/>
				</div>

				<button
					type='submit'
					className='px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold transition-colors shadow-subtle shrink-0'
				>
					Apply
				</button>
			</form>

			{isCouponApplied && coupon && (
				<div className='p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<div className='w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs'>
							<Check className='w-3.5 h-3.5' />
						</div>
						<div>
							<div className='text-xs font-bold text-emerald-900'>
								Coupon &quot;{coupon.code}&quot; Applied!
							</div>
							<div className='text-[11px] text-emerald-700'>
								You save {coupon.discountPercentage}% off your entire order
							</div>
						</div>
					</div>

					<button
						type='button'
						onClick={handleRemoveCoupon}
						className='text-xs font-bold text-red-600 hover:text-red-700 p-1 hover:bg-red-100/50 rounded-lg transition-colors'
					>
						Remove
					</button>
				</div>
			)}

			{coupon && !isCouponApplied && (
				<div className='p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<Sparkles className='w-4 h-4 text-blue-600 shrink-0' />
						<div>
							<span className='text-xs font-bold text-slate-900 block'>
								Available Coupon: <span className='text-blue-600 font-mono'>{coupon.code}</span>
							</span>
							<span className='text-[11px] text-slate-500'>
								Get {coupon.discountPercentage}% discount on your cart
							</span>
						</div>
					</div>

					<button
						type='button'
						onClick={() => applyCoupon(coupon.code)}
						className='text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-subtle'
					>
						Use Code
					</button>
				</div>
			)}
		</motion.div>
	);
};

export default GiftCouponCard;

