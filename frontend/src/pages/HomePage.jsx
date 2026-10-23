import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import CategoryItem from "../components/CategoryItem";
import HeroVideoBanner from "../components/HeroVideoBanner";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

// Curated 7 Categories with 7 high-definition images each
const categories = [
	{ 
		href: "/jeans", 
		name: "Jeans", 
		imageUrl: "/images/categories/jeans/jeans-1.jpg",
		images: [
			"/images/categories/jeans/jeans-1.jpg",
			"/images/categories/jeans/jeans-2.jpg",
			"/images/categories/jeans/jeans-3.jpg",
			"/images/categories/jeans/jeans-4.jpg",
			"/images/categories/jeans/jeans-5.jpg",
			"/images/categories/jeans/jeans-6.jpg",
			"/images/categories/jeans/jeans-7.jpg",
		]
	},
	{ 
		href: "/t-shirts", 
		name: "T-Shirts", 
		imageUrl: "/images/categories/t-shirts/t-shirts-1.jpg",
		images: [
			"/images/categories/t-shirts/t-shirts-1.jpg",
			"/images/categories/t-shirts/t-shirts-2.jpg",
			"/images/categories/t-shirts/t-shirts-3.jpg",
			"/images/categories/t-shirts/t-shirts-4.jpg",
			"/images/categories/t-shirts/t-shirts-5.jpg",
			"/images/categories/t-shirts/t-shirts-6.jpg",
			"/images/categories/t-shirts/t-shirts-7.jpg",
		]
	},
	{ 
		href: "/shoes", 
		name: "Shoes", 
		imageUrl: "/images/categories/shoes/shoes-1.jpg",
		images: [
			"/images/categories/shoes/shoes-1.jpg",
			"/images/categories/shoes/shoes-2.jpg",
			"/images/categories/shoes/shoes-3.jpg",
			"/images/categories/shoes/shoes-4.jpg",
			"/images/categories/shoes/shoes-5.jpg",
			"/images/categories/shoes/shoes-6.jpg",
			"/images/categories/shoes/shoes-7.jpg",
		]
	},
	{ 
		href: "/glasses", 
		name: "Glasses", 
		imageUrl: "/images/categories/glasses/glasses-1.jpg",
		images: [
			"/images/categories/glasses/glasses-1.jpg",
			"/images/categories/glasses/glasses-2.jpg",
			"/images/categories/glasses/glasses-3.jpg",
			"/images/categories/glasses/glasses-4.jpg",
			"/images/categories/glasses/glasses-5.jpg",
			"/images/categories/glasses/glasses-6.jpg",
			"/images/categories/glasses/glasses-7.jpg",
		]
	},
	{ 
		href: "/jackets", 
		name: "Jackets", 
		imageUrl: "/images/categories/jackets/jackets-1.jpg",
		images: [
			"/images/categories/jackets/jackets-1.jpg",
			"/images/categories/jackets/jackets-2.jpg",
			"/images/categories/jackets/jackets-3.jpg",
			"/images/categories/jackets/jackets-4.jpg",
			"/images/categories/jackets/jackets-5.jpg",
			"/images/categories/jackets/jackets-6.jpg",
			"/images/categories/jackets/jackets-7.jpg",
		]
	},
	{ 
		href: "/suits", 
		name: "Suits", 
		imageUrl: "/images/categories/suits/suits-1.jpg",
		images: [
			"/images/categories/suits/suits-1.jpg",
			"/images/categories/suits/suits-2.jpg",
			"/images/categories/suits/suits-3.jpg",
			"/images/categories/suits/suits-4.jpg",
			"/images/categories/suits/suits-5.jpg",
			"/images/categories/suits/suits-6.jpg",
			"/images/categories/suits/suits-7.jpg",
		]
	},
	{ 
		href: "/bags", 
		name: "Bags", 
		imageUrl: "/images/categories/bags/bags-1.jpg",
		images: [
			"/images/categories/bags/bags-1.jpg",
			"/images/categories/bags/bags-2.jpg",
			"/images/categories/bags/bags-3.jpg",
			"/images/categories/bags/bags-4.jpg",
			"/images/categories/bags/bags-5.jpg",
			"/images/categories/bags/bags-6.jpg",
			"/images/categories/bags/bags-7.jpg",
		]
	},
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, loading } = useProductStore();

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
		<div className='min-h-screen text-slate-900 pb-16'>
			
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4'>
				{/* CINEMATIC VIDEO HERO BANNER (Desktop & Mobile) */}
				<HeroVideoBanner onExploreClick={scrollToCategories} />
			</div>

			{/* CATEGORIES SECTION */}
			<section id='categories-section' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
				<div className='flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4'>
					<div>
						<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2.5'>
							<ShoppingBag className='w-3.5 h-3.5 text-blue-600' />
							<span>Curated Catalog</span>
						</div>
						<h2 className='text-3xl sm:text-4xl font-black text-slate-900 tracking-tight'>
							Explore All Categories
						</h2>
						<p className='text-slate-500 text-sm sm:text-base mt-1.5 max-w-xl font-normal'>
							Each collection features handcrafted styles, multiple preview variants, and authentic tailoring.
						</p>
					</div>

					<div className='hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500'>
						<span>Hover cards to preview styles</span>
					</div>
				</div>

				{/* Responsive Grid with Staggered Visual Layout */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
			</section>

			{/* FEATURED PRODUCTS SECTION */}
			{products && products.length > 0 && (
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12'>
					<div className='border-t border-slate-200/80 pt-10'>
						<FeaturedProducts featuredProducts={products} />
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
