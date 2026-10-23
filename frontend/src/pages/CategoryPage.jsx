import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
	ChevronRight, 
	ShoppingBag, 
	PackageOpen, 
	ArrowLeft, 
	Sparkles, 
	Flame, 
	ShieldCheck,
	SlidersHorizontal,
	Check
} from "lucide-react";
import ProductCard from "../components/ProductCard";

// 7 Curated Signature Styles with High-Definition Imagery for Each Category
const categoryLookbooks = {
	jeans: [
		{ _id: "jeans-style-1", name: "Raw Indigo Slim Jeans", price: 49.99, image: "/images/categories/jeans/jeans-1.jpg", category: "jeans", description: "Authentic raw denim woven with premium stretch cotton for everyday durability." },
		{ _id: "jeans-style-2", name: "Classic Washed Straight Denim", price: 44.99, image: "/images/categories/jeans/jeans-2.jpg", category: "jeans", description: "Vintage stone-washed regular fit with reinforced stitching and soft handfeel." },
		{ _id: "jeans-style-3", name: "Artisan Selvedge Flatlay Denim", price: 59.99, image: "/images/categories/jeans/jeans-3.jpg", category: "jeans", description: "Heavyweight Japanese selvedge denim crafted for true denim purists." },
		{ _id: "jeans-style-4", name: "Urban Street Tapered Jeans", price: 48.00, image: "/images/categories/jeans/jeans-4.jpg", category: "jeans", description: "Modern tapered leg cut designed to stack effortlessly over high-top sneakers." },
		{ _id: "jeans-style-5", name: "Distressed Modern Ripped Denim", price: 54.99, image: "/images/categories/jeans/jeans-5.jpg", category: "jeans", description: "Hand-distressed abrasions with reinforced interior backing for subtle edge." },
		{ _id: "jeans-style-6", name: "Textured Dark Stretch Jeans", price: 42.50, image: "/images/categories/jeans/jeans-6.jpg", category: "jeans", description: "Deep midnight black wash with flex technology for all-day comfort." },
		{ _id: "jeans-style-7", name: "High-Rise Heritage Blue Jeans", price: 52.00, image: "/images/categories/jeans/jeans-7.jpg", category: "jeans", description: "Timeless 90s heritage cut featuring structured high-rise waistband." },
	],
	"t-shirts": [
		{ _id: "tshirts-style-1", name: "Minimalist Heavyweight White Tee", price: 24.99, image: "/images/categories/t-shirts/t-shirts-1.jpg", category: "t-shirts", description: "240 GSM combed cotton crewneck tailored with dense ribbing and clean drape." },
		{ _id: "tshirts-style-2", name: "Graphic Urban Print Streetwear", price: 29.99, image: "/images/categories/t-shirts/t-shirts-2.jpg", category: "t-shirts", description: "Bold screen-printed back graphic on pre-shrunk vintage-washed jersey." },
		{ _id: "tshirts-style-3", name: "Aesthetic Washed Neutral T-Shirt", price: 27.50, image: "/images/categories/t-shirts/t-shirts-3.jpg", category: "t-shirts", description: "Garment-dyed muted earth tone with distressed collar accents." },
		{ _id: "tshirts-style-4", name: "Oversized Drop-Shoulder Tee", price: 26.00, image: "/images/categories/t-shirts/t-shirts-4.jpg", category: "t-shirts", description: "Relaxed boxy silhouette with dropped shoulder seams and wide sleeves." },
		{ _id: "tshirts-style-5", name: "Pastel Organic Cotton T-Shirt", price: 22.99, image: "/images/categories/t-shirts/t-shirts-5.jpg", category: "t-shirts", description: "Sustainably harvested 100% organic soft cotton in soothing pastel tone." },
		{ _id: "tshirts-style-6", name: "Streetwear Fit Typography Tee", price: 31.00, image: "/images/categories/t-shirts/t-shirts-6.jpg", category: "t-shirts", description: "Subtle chest embroidery and relaxed athletic hem for street styling." },
		{ _id: "tshirts-style-7", name: "Retro Athletic Striped Crewneck", price: 25.00, image: "/images/categories/t-shirts/t-shirts-7.jpg", category: "t-shirts", description: "Classic horizontal stripe design with contrast ribbed crew collar." },
	],
	shoes: [
		{ _id: "shoes-style-1", name: "Velocity Red Sport Trainers", price: 89.99, image: "/images/categories/shoes/shoes-1.jpg", category: "shoes", description: "Shock-absorbing cushion foam sole and breathable mesh upper for performance." },
		{ _id: "shoes-style-2", name: "Classic Minimalist White Lows", price: 74.99, image: "/images/categories/shoes/shoes-2.jpg", category: "shoes", description: "Crisp white leather low-top sneaker with reinforced gum rubber outsole." },
		{ _id: "shoes-style-3", name: "Urban Street Platform Sneakers", price: 82.00, image: "/images/categories/shoes/shoes-3.jpg", category: "shoes", description: "Chunky sculpted midsole combined with premium nubuck leather overlays." },
		{ _id: "shoes-style-4", name: "Old-Skool Skate Canvas Shoes", price: 65.00, image: "/images/categories/shoes/shoes-4.jpg", category: "shoes", description: "Durable reinforced canvas with vulcanized waffle sole and padded collar." },
		{ _id: "shoes-style-5", name: "Chunky Colorblock Runner Sneakers", price: 94.99, image: "/images/categories/shoes/shoes-5.jpg", category: "shoes", description: "Futuristic multi-panel design with responsive air-pocket heel support." },
		{ _id: "shoes-style-6", name: "Retro High-Top Basketball Kicks", price: 99.00, image: "/images/categories/shoes/shoes-6.jpg", category: "shoes", description: "Padded ankle collar and vintage two-tone leather court silhouette." },
		{ _id: "shoes-style-7", name: "Lightweight Marathon Breathable Kicks", price: 79.99, image: "/images/categories/shoes/shoes-7.jpg", category: "shoes", description: "Ultra-featherweight running shoe engineered with carbon plate bounce." },
	],
	glasses: [
		{ _id: "glasses-style-1", name: "Luxury Black Acetate Sunglasses", price: 39.99, image: "/images/categories/glasses/glasses-1.jpg", category: "glasses", description: "Hand-polished Italian acetate with 100% UV400 anti-scratch polarized lenses." },
		{ _id: "glasses-style-2", name: "Classic Polarized Wayfarer Shades", price: 44.99, image: "/images/categories/glasses/glasses-2.jpg", category: "glasses", description: "Iconic square silhouette with dark green polarized lenses and metal rivets." },
		{ _id: "glasses-style-3", name: "Modern Clear Frame Blue-Light Glasses", price: 32.50, image: "/images/categories/glasses/glasses-3.jpg", category: "glasses", description: "Transparent crystal acetate with blue-light filter lenses for screen work." },
		{ _id: "glasses-style-4", name: "Gold-Trim Summer Aviator Shades", price: 49.00, image: "/images/categories/glasses/glasses-4.jpg", category: "glasses", description: "Lightweight gold wireframe with teardrop lenses and silicone nose pads." },
		{ _id: "glasses-style-5", name: "Retro Round Tortoise Acetate Frames", price: 38.00, image: "/images/categories/glasses/glasses-5.jpg", category: "glasses", description: "Vintage circular eyewear with warm amber tortoiseshell pattern." },
		{ _id: "glasses-style-6", name: "Minimalist Matte Black Sport Glasses", price: 36.99, image: "/images/categories/glasses/glasses-6.jpg", category: "glasses", description: "Wrap-around aerodynamic styling with anti-slip rubber temple grips." },
		{ _id: "glasses-style-7", name: "Gradient Designer Oval Sunglasses", price: 45.00, image: "/images/categories/glasses/glasses-7.jpg", category: "glasses", description: "Subtle gradient tint with narrow oval silhouette and reinforced hinges." },
	],
	jackets: [
		{ _id: "jackets-style-1", name: "Classic Faux Leather Biker Jacket", price: 119.99, image: "/images/categories/jackets/jackets-1.jpg", category: "jackets", description: "Asymmetrical zip moto jacket with silver hardware and quilted shoulder panels." },
		{ _id: "jackets-style-2", name: "Thermal Insulated Winter Parka", price: 139.99, image: "/images/categories/jackets/jackets-2.jpg", category: "jackets", description: "Down-filled stormproof coat with fleece-lined pockets and storm flap." },
		{ _id: "jackets-style-3", name: "Sherpa-Lined Vintage Denim Jacket", price: 98.00, image: "/images/categories/jackets/jackets-3.jpg", category: "jackets", description: "Plush sherpa fleece interior with heavy-wash denim outer shell." },
		{ _id: "jackets-style-4", name: "Streetwear Oversized Bomber Jacket", price: 89.99, image: "/images/categories/jackets/jackets-4.jpg", category: "jackets", description: "Satin nylon shell with bright orange lining, utility arm pocket, and rib knit." },
		{ _id: "jackets-style-5", name: "Outdoor Waterproof Utility Windbreaker", price: 85.00, image: "/images/categories/jackets/jackets-5.jpg", category: "jackets", description: "Taped seams, packable hood, and breathable underarm ventilation zips." },
		{ _id: "jackets-style-6", name: "Modern Minimalist Wool Trench Coat", price: 149.00, image: "/images/categories/jackets/jackets-6.jpg", category: "jackets", description: "Double-breasted longline wool blend overcoat with tailored lapels." },
		{ _id: "jackets-style-7", name: "Suede Tan Zip-Up Casual Jacket", price: 109.00, image: "/images/categories/jackets/jackets-7.jpg", category: "jackets", description: "Supple faux suede exterior with brass hardware and tailored regular fit." },
	],
	suits: [
		{ _id: "suits-style-1", name: "Modern Tailored Midnight Blue Suit", price: 189.99, image: "/images/categories/suits/suits-1.jpg", category: "suits", description: "Slim notch lapel two-button blazer with matching flat-front trousers." },
		{ _id: "suits-style-2", name: "Formal Executive Charcoal 2-Piece", price: 219.99, image: "/images/categories/suits/suits-2.jpg", category: "suits", description: "Pure wool blend with micro-check texture, structured chest canvas." },
		{ _id: "suits-style-3", name: "Luxury Black-Tie Evening Tuxedo", price: 249.00, image: "/images/categories/suits/suits-3.jpg", category: "suits", description: "Satin shawl lapel and matching satin trouser side stripes for gala events." },
		{ _id: "suits-style-4", name: "Double-Breasted Gentleman Plaid Suit", price: 199.99, image: "/images/categories/suits/suits-4.jpg", category: "suits", description: "Six-button peak lapel blazer in British glen plaid pattern." },
		{ _id: "suits-style-5", name: "Contemporary Slim Heather Gray Suit", price: 179.50, image: "/images/categories/suits/suits-5.jpg", category: "suits", description: "Versatile medium gray wool fabric suitable for office and evening dinners." },
		{ _id: "suits-style-6", name: "Classic Wedding Dark Wool Tuxedo", price: 229.00, image: "/images/categories/suits/suits-6.jpg", category: "suits", description: "Tailored black wool with peak silk lapels and covered button closures." },
		{ _id: "suits-style-7", name: "Royal Linen Summer Lightweight Blazer", price: 159.00, image: "/images/categories/suits/suits-7.jpg", category: "suits", description: "Unstructured breathable linen suit jacket crafted for warm weather weddings." },
	],
	bags: [
		{ _id: "bags-style-1", name: "Handcrafted Commuter Leather Backpack", price: 79.99, image: "/images/categories/bags/bags-1.jpg", category: "bags", description: "Padded 15.6-inch laptop compartment with water-resistant full-grain leather." },
		{ _id: "bags-style-2", name: "Designer Crossbody Saddle Bag", price: 64.99, image: "/images/categories/bags/bags-2.jpg", category: "bags", description: "Gold buckle accent, magnetic snap closure, and adjustable leather strap." },
		{ _id: "bags-style-3", name: "Minimalist Artisan Canvas Tote", price: 49.00, image: "/images/categories/bags/bags-3.jpg", category: "bags", description: "Heavyweight 16oz cotton canvas with reinforced dual shoulder straps." },
		{ _id: "bags-style-4", name: "Urban Travel Duffel Weekend Bag", price: 89.00, image: "/images/categories/bags/bags-4.jpg", category: "bags", description: "Spacious 45L carry-on luggage with dedicated ventilated shoe compartment." },
		{ _id: "bags-style-5", name: "Structured Executive Laptop Satchel", price: 95.00, image: "/images/categories/bags/bags-5.jpg", category: "bags", description: "Dual top handles, detachable shoulder strap, and organized document slots." },
		{ _id: "bags-style-6", name: "Water-Resistant Compact Sling Bag", price: 39.99, image: "/images/categories/bags/bags-6.jpg", category: "bags", description: "Ripstop nylon chest pack with quick-access RFID-blocking front pocket." },
		{ _id: "bags-style-7", name: "Vintage Tan Leather Messenger Bag", price: 84.50, image: "/images/categories/bags/bags-7.jpg", category: "bags", description: "Antique brass buckles with distressed pull-up leather and laptop sleeve." },
	],
};

const CategoryPage = () => {
	const { fetchProductsByCategory, products, loading } = useProductStore();
	const { category } = useParams();
	const [activeLookbookIdx, setActiveLookbookIdx] = useState(0);
	const [selectedFilter, setSelectedFilter] = useState("all");

	useEffect(() => {
		if (category) {
			fetchProductsByCategory(category);
			setActiveLookbookIdx(0);
			setSelectedFilter("all");
		}
	}, [fetchProductsByCategory, category]);

	const formattedCategory = category 
		? category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ") 
		: "";

	const curatedList = useMemo(() => {
		return (category && categoryLookbooks[category.toLowerCase()]) || [];
	}, [category]);

	// Merge backend products with curated list (avoid duplicate names)
	const allProducts = useMemo(() => {
		const combined = [...(products || [])];
		curatedList.forEach(item => {
			if (!combined.some(p => p.name.toLowerCase() === item.name.toLowerCase())) {
				combined.push(item);
			}
		});
		return combined;
	}, [products, curatedList]);

	// Filtered products list
	const displayedProducts = useMemo(() => {
		if (selectedFilter === "all") return allProducts;
		return allProducts.filter(p => p._id === selectedFilter || p.name.toLowerCase().includes(selectedFilter.toLowerCase()));
	}, [allProducts, selectedFilter]);

	return (
		<div className='min-h-screen bg-slate-50 text-slate-900 pb-20'>
			
			{/* Breadcrumbs & Category Title */}
			<div className='bg-white border-b border-slate-200/80 shadow-xs'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
					<nav className='flex items-center space-x-2 text-xs text-slate-400 font-medium mb-1.5'>
						<Link to='/' className='hover:text-blue-600 transition-colors'>
							Home
						</Link>
						<ChevronRight className='w-3 h-3 text-slate-300' />
						<span className='text-slate-400'>Categories</span>
						<ChevronRight className='w-3 h-3 text-slate-300' />
						<span className='text-slate-900 font-bold'>{formattedCategory}</span>
					</nav>

					<div className='flex items-center justify-between'>
						<h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight'>
							{formattedCategory}
						</h1>
						<span className='text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full'>
							{allProducts.length} Items
						</span>
					</div>
				</div>
			</div>

			{/* Responsive Lookbook Showcase Banner */}
			{curatedList.length > 0 && (
				<div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6'>
					<div className='relative w-full h-56 sm:h-72 md:h-88 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950'>
						{/* Background Image of Selected Style */}
						<img 
							src={curatedList[activeLookbookIdx]?.image} 
							alt={curatedList[activeLookbookIdx]?.name}
							className='w-full h-full object-cover object-center transition-all duration-500 ease-out scale-100'
						/>

						{/* Smooth Gradient Vignette */}
						<div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent' />
						<div className='absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent' />

						{/* Content Layer */}
						<div className='absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-20'>
							{/* Top Pill Tag */}
							<div>
								<span className='inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm'>
									<Flame className='w-3 h-3 text-amber-400' />
									Style {activeLookbookIdx + 1} of {curatedList.length}
								</span>
							</div>

							{/* Bottom Info & Thumbnail Switcher */}
							<div className='space-y-2 sm:space-y-3'>
								<div className='max-w-md'>
									<h2 className='text-white text-lg sm:text-2xl font-black tracking-tight drop-shadow-sm line-clamp-1'>
										{curatedList[activeLookbookIdx]?.name}
									</h2>
									<p className='text-slate-300 text-xs hidden sm:block line-clamp-1 font-normal mt-0.5'>
										{curatedList[activeLookbookIdx]?.description}
									</p>
									<div className='text-base sm:text-xl font-black text-white mt-1'>
										${curatedList[activeLookbookIdx]?.price?.toFixed(2)}
									</div>
								</div>

								{/* 7 Thumbnails with zero visible scrollbar */}
								<div className='flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
									{curatedList.map((item, idx) => (
										<button
											key={item._id}
											type='button'
											onClick={() => {
												setActiveLookbookIdx(idx);
												setSelectedFilter(item._id);
											}}
											className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 active:scale-95 ${
												activeLookbookIdx === idx 
													? "border-blue-500 scale-105 shadow-md ring-2 ring-blue-400/40" 
													: "border-white/30 opacity-70 hover:opacity-100"
											}`}
											title={item.name}
										>
											<img 
												src={item.image} 
												alt={item.name} 
												className='w-full h-full object-cover'
											/>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Filter Pills Bar */}
			<div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6'>
				<div className='flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
					<button
						type='button'
						onClick={() => setSelectedFilter("all")}
						className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 active:scale-95 ${
							selectedFilter === "all"
								? "bg-slate-900 text-white shadow-xs"
								: "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
						}`}
					>
						All Styles ({allProducts.length})
					</button>
					{curatedList.map((item, i) => (
						<button
							key={item._id}
							type='button'
							onClick={() => {
								setSelectedFilter(item._id);
								setActiveLookbookIdx(i);
							}}
							className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 ${
								selectedFilter === item._id
									? "bg-blue-600 text-white shadow-xs"
									: "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
							}`}
						>
							Style {i + 1}: {item.name.split(" ")[0]}
						</button>
					))}
				</div>
			</div>

			{/* Products Grid Section */}
			<div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6'>
				<div className='flex items-center justify-between mb-3 px-1'>
					<h3 className='text-sm sm:text-base font-extrabold text-slate-800 tracking-tight'>
						{selectedFilter === "all" ? `All ${formattedCategory} Items` : "Selected Style"}
					</h3>
					<span className='inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100'>
						<ShieldCheck className='w-3 h-3' /> Verified Stock
					</span>
				</div>

				{loading ? (
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5'>
						{[1, 2, 3, 4, 5, 6].map((n) => (
							<div key={n} className='bg-white rounded-2xl border border-slate-200 p-3 animate-pulse space-y-2.5'>
								<div className='bg-slate-200 rounded-xl aspect-[4/5] w-full' />
								<div className='h-3.5 bg-slate-200 rounded w-3/4' />
								<div className='h-3 bg-slate-100 rounded w-1/2' />
							</div>
						))}
					</div>
				) : displayedProducts.length === 0 ? (
					<div className='bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-sm mx-auto my-6'>
						<PackageOpen className='w-10 h-10 text-slate-400 mx-auto mb-2' />
						<h4 className='text-sm font-bold text-slate-800'>No products matching this filter</h4>
						<button
							onClick={() => setSelectedFilter("all")}
							className='mt-3 text-xs font-bold text-blue-600 hover:underline'
						>
							View all styles
						</button>
					</div>
				) : (
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5'>
						{displayedProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryPage;
