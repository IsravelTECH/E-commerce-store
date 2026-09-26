import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingBag, PackageOpen, ArrowLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products, isLoading } = useProductStore();
	const { category } = useParams();

	useEffect(() => {
		if (category) {
			fetchProductsByCategory(category);
		}
	}, [fetchProductsByCategory, category]);

	const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ") : "";

	return (
		<div className='min-h-screen bg-slate-50 text-slate-900 pb-16'>
			{/* Category Header */}
			<div className='bg-white border-b border-slate-200/80 shadow-subtle'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
					{/* Breadcrumbs */}
					<nav className='flex items-center space-x-2 text-xs text-slate-500 font-medium mb-4'>
						<Link to='/' className='hover:text-blue-600 transition-colors'>
							Home
						</Link>
						<ChevronRight className='w-3.5 h-3.5 text-slate-400' />
						<span className='text-slate-400'>Category</span>
						<ChevronRight className='w-3.5 h-3.5 text-slate-400' />
						<span className='text-slate-900 font-semibold'>{formattedCategory}</span>
					</nav>

					<div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
						<div>
							<h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight'>
								{formattedCategory}
							</h1>
							<p className='text-sm sm:text-base text-slate-500 mt-1'>
								Discover our hand-curated selection of {formattedCategory.toLowerCase()}.
							</p>
						</div>

						{products && (
							<div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-auto'>
								<ShoppingBag className='w-3.5 h-3.5 text-blue-600' />
								<span>{products.length} {products.length === 1 ? 'Product' : 'Products'} Available</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Products Grid */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12'>
				{isLoading ? (
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
							<div key={n} className='bg-white rounded-2xl border border-slate-200 p-4 animate-pulse space-y-3'>
								<div className='bg-slate-200 rounded-xl aspect-square w-full' />
								<div className='h-4 bg-slate-200 rounded w-3/4' />
								<div className='h-3 bg-slate-100 rounded w-1/2' />
								<div className='h-8 bg-slate-200 rounded-xl w-full pt-2' />
							</div>
						))}
					</div>
				) : products?.length === 0 ? (
					<motion.div
						className='bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-16 text-center max-w-lg mx-auto my-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
					>
						<div className='w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4'>
							<PackageOpen className='w-8 h-8' />
						</div>
						<h3 className='text-xl font-bold text-slate-900 mb-2'>No Products Found</h3>
						<p className='text-sm text-slate-500 mb-6 leading-relaxed'>
							We couldn&apos;t find any items in the &quot;{formattedCategory}&quot; category right now. Check back soon or explore other categories.
						</p>
						<Link
							to='/'
							className='inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20'
						>
							<ArrowLeft className='w-4 h-4 mr-2' />
							Browse All Categories
						</Link>
					</motion.div>
				) : (
					<motion.div
						className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4 }}
					>
						{products?.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default CategoryPage;

