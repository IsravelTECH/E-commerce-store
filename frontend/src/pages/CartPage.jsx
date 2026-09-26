import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

	return (
		<div className='min-h-screen bg-slate-50 text-slate-900 pb-16'>
			{/* Cart Header */}
			<div className='bg-white border-b border-slate-200/80 shadow-subtle'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
						<div>
							<h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
								Shopping Cart
							</h1>
							<p className='text-sm text-slate-500 mt-0.5'>
								Review your selected items and complete your checkout securely.
							</p>
						</div>

						{cart.length > 0 && (
							<div className='text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full self-start sm:self-auto'>
								{totalItems} {totalItems === 1 ? "item" : "items"} in cart
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10'>
				{cart.length === 0 ? (
					<EmptyCartUI />
				) : (
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
						{/* Cart Items List */}
						<motion.div
							className='lg:col-span-7 xl:col-span-8 space-y-4'
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
						>
							<div className='space-y-3.5'>
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>

							{/* Recommendations */}
							<PeopleAlsoBought />
						</motion.div>

						{/* Sticky Sidebar: Order Summary & Coupon */}
						<motion.div
							className='lg:col-span-5 xl:col-span-4 space-y-4 lg:sticky lg:top-24'
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.15 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-16 text-center max-w-lg mx-auto my-6'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.4 }}
	>
		<div className='w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5 shadow-sm'>
			<ShoppingBag className='h-10 w-10 stroke-[1.5]' />
		</div>
		<h2 className='text-2xl font-extrabold text-slate-900 mb-2'>Your cart is empty</h2>
		<p className='text-sm text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto'>
			Looks like you haven&apos;t added any items to your shopping cart yet. Discover something extraordinary today!
		</p>
		<Link
			className='inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all'
			to='/'
		>
			<span>Start Shopping</span>
			<ArrowRight className='w-4 h-4 ml-2' />
		</Link>
	</motion.div>
);

