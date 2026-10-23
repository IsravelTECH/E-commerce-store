import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
	ArrowRight, 
	Sparkles, 
	Flame, 
	ShieldCheck, 
	Truck, 
	Clock 
} from "lucide-react";

const HeroVideoBanner = ({ onExploreClick }) => {
	const videoRef = useRef(null);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// Ensure seamless looping autoplay on mount
		const playPromise = video.play();
		if (playPromise !== undefined) {
			playPromise.catch(() => {
				// Autoplay error handling
			});
		}
	}, []);

	return (
		<div className='relative w-full overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800/80 my-4 sm:my-8'>
			{/* Container Aspect Ratio: 16:9 on Desktop, taller on Mobile for visual impact */}
			<div className='relative w-full h-[480px] sm:h-[540px] lg:h-[620px] overflow-hidden'>
				
				{/* Background Video Element */}
				<video
					ref={videoRef}
					autoPlay
					loop
					muted
					playsInline
					onLoadedData={() => setIsVideoLoaded(true)}
					poster='/images/categories/suits/suits-1.jpg'
					className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
						isVideoLoaded ? "opacity-100 scale-100" : "opacity-80 scale-105"
					}`}
				>
					<source src='/videos/fashion-hero.webm' type='video/webm' />
					<source src='https://media.w3.org/2010/05/sintel/trailer.mp4' type='video/mp4' />
				</video>

				{/* Multi-layer Gradient Scrim Overlay for ultra-legible typography */}
				<div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/30' />
				<div className='absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent' />
				
				{/* Ambient Glow Orbs */}
				<div className='absolute top-1/4 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none' />
				<div className='absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none' />

				{/* Content Grid */}
				<div className='relative z-20 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between py-8 sm:py-12'>
					
					{/* Top Header Pill */}
					<motion.div 
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='flex items-center justify-between'
					>
						<div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold tracking-wide text-blue-200 shadow-lg'>
							<Flame className='w-4 h-4 text-amber-400 animate-pulse' />
							<span>SPRING / SUMMER 2026 DROP</span>
							<span className='hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-400' />
							<span className='hidden sm:inline-block text-slate-300'>Live Now</span>
						</div>
					</motion.div>

					{/* Center / Hero Copy */}
					<div className='max-w-2xl space-y-4 sm:space-y-6 my-auto'>
						<motion.h1 
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.1 }}
							className='text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-md'
						>
							Redefine Your Everyday{" "}
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300'>
								Signature Style.
							</span>
						</motion.h1>

						<motion.p 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							className='text-sm sm:text-base lg:text-lg text-slate-300/90 leading-relaxed max-w-xl font-normal'
						>
							Experience runway-grade craftsmanship across denim, outerwear, suits, and daily essentials. Discover our 7 exclusive curated categories with guaranteed authentic quality.
						</motion.p>

						{/* CTAs */}
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.3 }}
							className='flex flex-wrap items-center gap-3 sm:gap-4 pt-2'
						>
							<button
								onClick={onExploreClick}
								className='inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-95 transition-all'
							>
								<span>Explore All Categories</span>
								<ArrowRight className='w-4 h-4 ml-2' />
							</button>

							<Link
								to='/category/jackets'
								className='inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm sm:text-base active:scale-95 transition-all'
							>
								<Sparkles className='w-4 h-4 mr-2 text-blue-300' />
								<span>Trending Jackets</span>
							</Link>
						</motion.div>
					</div>

					{/* Bottom Feature Badges */}
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className='pt-4 sm:pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300'
					>
						<div className='flex items-center gap-2.5'>
							<div className='w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0'>
								<Truck className='w-4 h-4' />
							</div>
							<div>
								<p className='font-bold text-white'>Express Delivery</p>
								<p className='text-[11px] text-slate-400 hidden sm:block'>On all regional orders</p>
							</div>
						</div>

						<div className='flex items-center gap-2.5'>
							<div className='w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0'>
								<ShieldCheck className='w-4 h-4' />
							</div>
							<div>
								<p className='font-bold text-white'>100% Guaranteed</p>
								<p className='text-[11px] text-slate-400 hidden sm:block'>Verified authentic apparel</p>
							</div>
						</div>

						<div className='hidden sm:flex items-center gap-2.5 col-span-2 sm:col-span-1'>
							<div className='w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0'>
								<Clock className='w-4 h-4' />
							</div>
							<div>
								<p className='font-bold text-white'>30-Day Returns</p>
								<p className='text-[11px] text-slate-400'>Hassle-free exchanges</p>
							</div>
						</div>
					</motion.div>

				</div>
			</div>
		</div>
	);
};

export default HeroVideoBanner;
