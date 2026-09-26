import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart, Check, Star } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = () => {
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
		<div className='group flex w-full relative flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300'>
			{/* Product Image Container */}
			<div className='relative w-full pt-[90%] overflow-hidden bg-slate-100'>
				<img 
					className='absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out' 
					src={product.image} 
					alt={product.name}
					loading='lazy' 
				/>
				
				{/* Category Badge */}
				{product.category && (
					<span className='absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-slate-100'>
						{product.category}
					</span>
				)}

				{product.isFeatured && (
					<span className='absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1'>
						<Star className='w-3 h-3 fill-white' /> Featured
					</span>
				)}
			</div>

			{/* Card Body */}
			<div className='p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3'>
				<div>
					<h3 className='text-sm sm:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors' title={product.name}>
						{product.name}
					</h3>
					{product.description && (
						<p className='text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed'>
							{product.description}
						</p>
					)}
				</div>

				<div className='pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto'>
					<div className='flex flex-col'>
						<span className='text-[10px] uppercase font-bold text-slate-400'>Price</span>
						<span className='text-lg sm:text-xl font-extrabold text-slate-900'>
							${Number(product.price).toFixed(2)}
						</span>
					</div>

					<button
						type='button'
						onClick={handleAddToCart}
						disabled={isAdding}
						className='inline-flex items-center justify-center rounded-xl bg-blue-600 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shrink-0'
						aria-label={`Add ${product.name} to cart`}
					>
						{isAdding ? (
							<>
								<Check className='w-4 h-4 mr-1 text-white' />
								<span>Added</span>
							</>
						) : (
							<>
								<ShoppingCart className='w-4 h-4 mr-1.5' />
								<span>Add to Cart</span>
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

