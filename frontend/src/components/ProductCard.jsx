import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Check, Star, ShoppingBag } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (!user) {
			toast.error("Please login to add products to your cart", { id: "login-required" });
			return;
		}

		setIsAdding(true);
		addToCart(product);
		
		setTimeout(() => {
			setIsAdding(false);
		}, 600);
	};

	return (
		<div className='group flex w-full relative flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300'>
			{/* Product Image Container with 4:5 Aspect Ratio */}
			<div className='relative w-full aspect-[4/5] overflow-hidden bg-slate-100'>
				<img 
					className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out' 
					src={product.image} 
					alt={product.name}
					loading='lazy' 
				/>
				
				{/* Category Badge */}
				{product.category && (
					<span className='absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm border border-slate-100/80'>
						{product.category}
					</span>
				)}

				{product.isFeatured && (
					<span className='absolute top-2.5 right-2.5 bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1'>
						<Star className='w-2.5 h-2.5 fill-white' /> Top
					</span>
				)}
			</div>

			{/* Card Body */}
			<div className='p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5'>
				<div>
					<h3 className='text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors' title={product.name}>
						{product.name}
					</h3>
					{product.description && (
						<p className='hidden sm:block text-[11px] text-slate-400 mt-1 line-clamp-1 font-normal'>
							{product.description}
						</p>
					)}
				</div>

				{/* Price and Add Action Row */}
				<div className='pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 mt-auto'>
					<div className='flex flex-col'>
						<span className='text-[9px] uppercase font-bold text-slate-400 leading-tight'>Price</span>
						<span className='text-sm sm:text-base font-black text-slate-900'>
							${Number(product.price).toFixed(2)}
						</span>
					</div>

					{/* Responsive Add Button */}
					<button
						type='button'
						onClick={handleAddToCart}
						disabled={isAdding}
						className={`inline-flex items-center justify-center rounded-xl font-bold transition-all shrink-0 active:scale-90 ${
							isAdding 
								? "bg-emerald-600 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs" 
								: "bg-blue-600 hover:bg-blue-700 text-white p-2 sm:px-3 sm:py-2 text-xs shadow-xs"
						}`}
						aria-label={`Add ${product.name} to cart`}
					>
						{isAdding ? (
							<>
								<Check className='w-3.5 h-3.5 sm:mr-1' />
								<span className='hidden sm:inline text-xs'>Added</span>
							</>
						) : (
							<>
								<Plus className='w-4 h-4 sm:mr-1' />
								<span className='hidden sm:inline text-xs'>Add</span>
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
