import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='bg-white rounded-2xl border border-slate-200 shadow-card p-4 sm:p-5 transition-all duration-200 hover:border-slate-300'>
			<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
				
				{/* Thumbnail & Info */}
				<div className='flex items-center space-x-4 flex-1 min-w-0'>
					<div className='w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100'>
						<img
							className='w-full h-full object-cover object-center'
							src={item.image}
							alt={item.name}
							loading='lazy'
						/>
					</div>

					<div className='flex-1 min-w-0 space-y-1'>
						<h4 className='text-base font-bold text-slate-900 truncate' title={item.name}>
							{item.name}
						</h4>
						{item.category && (
							<span className='inline-block text-[11px] font-bold uppercase tracking-wider text-slate-400'>
								{item.category}
							</span>
						)}
						<p className='text-sm font-extrabold text-blue-600'>
							${Number(item.price).toFixed(2)}
						</p>
					</div>
				</div>

				{/* Quantity Controls, Total & Delete */}
				<div className='flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100'>
					
					{/* Quantity Stepper */}
					<div className='flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200'>
						<button
							type='button'
							className='w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-center shadow-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
							disabled={item.quantity <= 1}
							aria-label='Decrease quantity'
						>
							<Minus className='w-3.5 h-3.5' />
						</button>

						<span className='w-9 text-center text-sm font-bold text-slate-900'>
							{item.quantity}
						</span>

						<button
							type='button'
							className='w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-center shadow-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
							aria-label='Increase quantity'
						>
							<Plus className='w-3.5 h-3.5' />
						</button>
					</div>

					{/* Item Subtotal */}
					<div className='text-right min-w-[70px]'>
						<span className='text-[10px] uppercase font-bold text-slate-400 block sm:hidden'>Line Total</span>
						<span className='text-base font-extrabold text-slate-900'>
							${(item.price * item.quantity).toFixed(2)}
						</span>
					</div>

					{/* Delete Button */}
					<button
						type='button'
						onClick={() => removeFromCart(item._id)}
						className='w-9 h-9 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors'
						title='Remove item'
						aria-label={`Remove ${item.name} from cart`}
					>
						<Trash2 className='w-4 h-4' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;

