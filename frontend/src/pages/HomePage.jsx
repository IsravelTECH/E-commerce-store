import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star, ShoppingBag } from "lucide-react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/Jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/Tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/Shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/Glasses.jpg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/Jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/Suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/Bags.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const scrollToCategories = () => {
		const elem = document.getElementById("categories-section");
		if (elem) {
			elem.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className='min-h-screen text-slate-900'>
			
			{/* HERO SECTION */}
			<section className='relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 pt-8 pb-16 lg:pt-14 lg:pb-24'>
				{/* Subtle background glow */}
				<div className='absolute top-0 right-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10' />
				<div className='absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10' />

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
						
						{/* Left Content */}
						<div className='lg:col-span-7 space-y-6 text-center lg:text-left'>
							<div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-subtle mx-auto lg:mx-0'>
								<Sparkles className='w-4 h-4 text-blue-600' />
								<span>DISCOVER BETTER PRODUCTS</span>
							</div>

							<h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]'>
								Everything You Want. <br className='hidden sm:inline' />
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700'>
									All in One Place.
								</span>
							</h1>

							<p className='text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed'>
								Explore handcrafted collections of modern fashion, footwear, and accessories. Experience effortless online shopping with instant voucher rewards and express global delivery.
							</p>

							{/* CTA Buttons */}
							<div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2'>
								<button
									onClick={scrollToCategories}
									className='w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all'
								>
									<span>Shop Now</span>
									<ArrowRight className='w-4 h-4 ml-2' />
								</button>

								<Link
									to='/category/jackets'
									className='w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-700 font-bold text-sm sm:text-base border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:scale-95 shadow-subtle transition-all'
								>
									Explore Categories
								</Link>
							</div>

							{/* Trust Highlights */}
							<div className='pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center sm:text-left'>
								<div>
									<div className='text-xl sm:text-2xl font-black text-slate-900'>10k+</div>
									<div className='text-xs text-slate-500 font-medium'>Happy Shoppers</div>
								</div>
								<div>
									<div className='text-xl sm:text-2xl font-black text-slate-900'>100%</div>
									<div className='text-xs text-slate-500 font-medium'>Quality Assured</div>
								</div>
								<div>
									<div className='text-xl sm:text-2xl font-black text-slate-900'>4.9★</div>
									<div className='text-xs text-slate-500 font-medium'>Customer Rating</div>
								</div>
							</div>
						</div>

						{/* Right Visual Showcase */}
						<div className='lg:col-span-5 relative'>
							<div className='relative mx-auto max-w-md lg:max-w-none'>
								
								{/* Main Card */}
								<div className='relative rounded-3xl overflow-hidden bg-white p-3 border border-slate-200 shadow-card-hover'>
									<div className='relative rounded-2xl overflow-hidden h-80 sm:h-96 bg-slate-100'>
										<img
											src='/Jackets.jpg'
											alt='Hero Fashion'
											className='w-full h-full object-cover object-top'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent' />
										<div className='absolute bottom-4 left-4 right-4 text-white'>
											<span className='bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase'>
												New Season
											</span>
											<h3 className='text-lg font-bold mt-1'>Premium Outerwear & Leather</h3>
											<p className='text-xs text-slate-200'>Starting at $89.00</p>
										</div>
									</div>
								</div>

								{/* Floating Mini Card 1 */}
								<div className='absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-dropdown border border-slate-100 hidden sm:flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500'>
									<div className='w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold'>
										<Zap className='w-5 h-5' />
									</div>
									<div>
										<div className='text-xs font-bold text-slate-900'>Lightning Delivery</div>
										<div className='text-[11px] text-slate-500'>Dispatches in 24 hours</div>
									</div>
								</div>

								{/* Floating Mini Card 2 */}
								<div className='absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-dropdown border border-slate-100 hidden sm:flex items-center gap-3 animate-in fade-in slide-in-from-right duration-500'>
									<div className='w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold'>
										<Star className='w-5 h-5 fill-amber-500 text-amber-500' />
									</div>
									<div>
										<div className='text-xs font-bold text-slate-900'>Verified Reviews</div>
										<div className='text-[11px] text-slate-500'>Top-rated collections</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CATEGORIES SECTION */}
			<section id='categories-section' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
				<div className='text-center max-w-2xl mx-auto mb-10 sm:mb-14'>
					<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2'>
						<ShoppingBag className='w-3.5 h-3.5 text-blue-600' /> Curated Catalog
					</div>
					<h2 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>
						Explore Our Categories
					</h2>
					<p className='text-slate-500 text-sm sm:text-base mt-2'>
						Browse through modern styles, denim, footwear, and timeless fashion accessories.
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
			</section>

			{/* FEATURED PRODUCTS SECTION */}
			{products && products.length > 0 && (
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
					<div className='border-t border-slate-200/80 pt-6'>
						<FeaturedProducts featuredProducts={products} />
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;

