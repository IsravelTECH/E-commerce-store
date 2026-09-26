import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const [addedId, setAddedId] = useState(null);

	const { addToCart } = useCartStore();
	const { user } = useUserStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, featuredProducts.length - itemsPerPage));
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= (featuredProducts?.length || 0) - itemsPerPage;

	const handleAddToCart = (product) => {
		if (!user) {
			toast.error("Please login to add products to your cart", { id: "login-required" });
			return;
		}
		setAddedId(product._id);
		addToCart(product);
		setTimeout(() => setAddedId(null), 600);
	};

	if (!featuredProducts || featuredProducts.length === 0) return null;

	return (
		<section className='py-12 sm:py-16'>
			<div className='flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4'>
				<div>
					<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2'>
						<Sparkles className='w-3.5 h-3.5' /> Handpicked Deals
					</div>
					<h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight'>
						Featured Products
					</h2>
					<p className='text-sm sm:text-base text-slate-500 mt-1'>
						Top-rated items and exclusive trending picks from our collection.
					</p>
				</div>

				{/* Arrow Controls */}
				<div className='flex items-center space-x-2 shrink-0 self-end sm:self-auto'>
					<button
						type='button'
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
							isStartDisabled
								? "border-slate-200 text-slate-300 bg-slate-100 cursor-not-allowed"
								: "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 active:scale-95 shadow-subtle"
						}`}
						aria-label='Previous slide'
					>
						<ChevronLeft className='w-5 h-5' />
					</button>

					<button
						type='button'
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
							isEndDisabled
								? "border-slate-200 text-slate-300 bg-slate-100 cursor-not-allowed"
								: "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 active:scale-95 shadow-subtle"
						}`}
						aria-label='Next slide'
					>
						<ChevronRight className='w-5 h-5' />
					</button>
				</div>
			</div>

			{/* Slider */}
			<div className='relative overflow-hidden -mx-2 px-2 py-2'>
				<div
					className='flex transition-transform duration-500 ease-out'
					style={{
						transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
					}}
				>
					{featuredProducts.map((product) => (
						<div
							key={product._id}
							className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2.5'
						>
							<div className='group bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden'>
								<div className='relative pt-[85%] overflow-hidden bg-slate-100'>
									<img
										src={product.image}
										alt={product.name}
										className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
										loading='lazy'
									/>
									{product.category && (
										<span className='absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-slate-100'>
											{product.category}
										</span>
									)}
								</div>

								<div className='p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3'>
									<div>
										<h3 className='text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1' title={product.name}>
											{product.name}
										</h3>
										<p className='text-xs text-slate-500 mt-1 line-clamp-2'>
											{product.description || "Premium quality crafted product."}
										</p>
									</div>

									<div className='pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto'>
										<div>
											<span className='text-[10px] uppercase font-bold text-slate-400 block'>Price</span>
											<span className='text-lg font-extrabold text-slate-900'>
												${Number(product.price).toFixed(2)}
											</span>
										</div>

										<button
											type='button'
											onClick={() => handleAddToCart(product)}
											className='inline-flex items-center justify-center rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all'
										>
											{addedId === product._id ? (
												<>
													<Check className='w-4 h-4 mr-1' />
													<span>Added</span>
												</>
											) : (
												<>
													<ShoppingCart className='w-4 h-4 mr-1.5' />
													<span>Add</span>
												</>
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedProducts;

