import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CategoryItem = ({ category }) => {
	return (
		<div className='relative overflow-hidden h-72 sm:h-80 w-full rounded-2xl group bg-slate-100 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300'>
			<Link to={"/category" + category.href} className='block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl'>
				<div className='w-full h-full relative cursor-pointer overflow-hidden'>
					{/* Background Image */}
					<img
						src={category.imageUrl}
						alt={category.name}
						className='w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105'
						loading='lazy'
					/>
					
					{/* Gradient Overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent transition-opacity duration-300' />
					
					{/* Bottom Content */}
					<div className='absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 flex items-end justify-between'>
						<div>
							<span className='inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-blue-300 mb-1.5'>
								Collection
							</span>
							<h3 className='text-white text-xl sm:text-2xl font-bold tracking-tight mb-0.5 group-hover:text-blue-200 transition-colors'>
								{category.name}
							</h3>
							<p className='text-slate-300 text-xs font-normal'>
								Explore {category.name}
							</p>
						</div>

						<div className='w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 shrink-0'>
							<ArrowRight className='w-4 h-4' />
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;

