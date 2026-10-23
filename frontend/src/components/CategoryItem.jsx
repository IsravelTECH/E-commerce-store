import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Layers } from "lucide-react";

const CategoryItem = ({ category }) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const images = category.images && category.images.length > 0 
		? category.images 
		: [category.imageUrl];

	return (
		<div 
			className='relative overflow-hidden h-80 sm:h-96 w-full rounded-2xl group bg-slate-900 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300'
			onMouseEnter={() => {
				// Rotate to next image on hover preview
				if (images.length > 1) {
					setActiveImageIndex(prev => (prev + 1) % images.length);
				}
			}}
		>
			<Link 
				to={"/category" + category.href} 
				className='block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl'
			>
				<div className='w-full h-full relative cursor-pointer overflow-hidden'>
					
					{/* Background Images with Crossfade */}
					{images.map((imgUrl, idx) => (
						<img
							key={idx}
							src={imgUrl}
							alt={`${category.name} style ${idx + 1}`}
							className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
								idx === activeImageIndex 
									? "opacity-100 scale-100 group-hover:scale-105" 
									: "opacity-0 scale-95 pointer-events-none"
							}`}
							loading='lazy'
						/>
					))}
					
					{/* Gradient Overlays */}
					<div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/20 transition-opacity duration-300' />
					
					{/* Top Badges */}
					<div className='absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none'>
						<span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white shadow-sm'>
							<Layers className='w-3.5 h-3.5 text-blue-400' />
							<span>{images.length} Styles</span>
						</span>

						{/* Miniature image dots preview */}
						{images.length > 1 && (
							<div className='flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10'>
								{images.slice(0, 7).map((_, dotIdx) => (
									<button
										key={dotIdx}
										type='button'
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											setActiveImageIndex(dotIdx);
										}}
										className={`h-1.5 rounded-full transition-all duration-300 ${
											dotIdx === activeImageIndex 
												? "w-4 bg-blue-400" 
												: "w-1.5 bg-white/40 hover:bg-white/80"
										}`}
										aria-label={`Show ${category.name} image ${dotIdx + 1}`}
									/>
								))}
							</div>
						)}
					</div>

					{/* Bottom Content Area */}
					<div className='absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 flex items-end justify-between'>
						<div>
							<span className='inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-blue-300 mb-1.5'>
								Premium Collection
							</span>
							<h3 className='text-white text-2xl font-extrabold tracking-tight mb-1 group-hover:text-blue-200 transition-colors'>
								{category.name}
							</h3>
							<p className='text-slate-300 text-xs font-normal line-clamp-1'>
								Browse authentic {category.name.toLowerCase()} & accessories
							</p>
						</div>

						<div className='w-10 h-10 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 shrink-0'>
							<ArrowRight className='w-4 h-4' />
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;
