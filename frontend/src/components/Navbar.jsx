import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
	ShoppingCart, 
	UserPlus, 
	LogIn, 
	LogOut, 
	Search, 
	Menu, 
	X, 
	ShoppingBag, 
	ChevronDown,
	LayoutDashboard,
	Sparkles,
	SlidersHorizontal,
	Flame,
	ShieldCheck
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const categories = [
	{ name: "Jeans", href: "/category/jeans", icon: "👖", count: "7+ styles" },
	{ name: "T-Shirts", href: "/category/t-shirts", icon: "👕", count: "7+ styles" },
	{ name: "Shoes", href: "/category/shoes", icon: "👟", count: "7+ styles" },
	{ name: "Glasses", href: "/category/glasses", icon: "🕶️", count: "7+ styles" },
	{ name: "Jackets", href: "/category/jackets", icon: "🧥", count: "7+ styles" },
	{ name: "Suits", href: "/category/suits", icon: "👔", count: "7+ styles" },
	{ name: "Bags", href: "/category/bags", icon: "🎒", count: "7+ styles" },
];

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const dropdownRef = useRef(null);
	const searchInputRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	// Detect scroll for dynamic frosted glass elevation
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 15);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Keyboard shortcut Ctrl+K or Cmd+K to focus search
	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				searchInputRef.current?.focus();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Close menus on route change
	useEffect(() => {
		setMobileMenuOpen(false);
		setCategoriesDropdownOpen(false);
	}, [location.pathname]);

	// Handle outside click for Categories dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setCategoriesDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const totalCartItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

	const handleSearch = (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		const match = categories.find(c => c.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));
		if (match) {
			navigate(match.href);
		} else {
			navigate(`/category/${searchQuery.trim().toLowerCase()}`);
		}
		setSearchQuery("");
		setMobileMenuOpen(false);
	};

	const handleCategoryClick = (href) => {
		setCategoriesDropdownOpen(false);
		setMobileMenuOpen(false);
		navigate(href);
	};

	return (
		<header 
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				scrolled 
					? "bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-200/80" 
					: "bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
			}`}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6'>
					
					{/* Brand Logo with micro-hover effect */}
					<Link 
						to='/' 
						className='flex items-center space-x-2.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl p-1'
					>
						<motion.div 
							whileHover={{ scale: 1.05, rotate: 2 }}
							whileTap={{ scale: 0.95 }}
							className='w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25'
						>
							<ShoppingBag className='w-5 h-5 sm:w-6 sm:h-6' />
						</motion.div>
						<span className='text-xl sm:text-2xl font-black tracking-tight text-slate-900'>
							Buy<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'>Buddy</span>
						</span>
					</Link>

					{/* Desktop Search Bar with Ctrl+K Hint */}
					<form 
						onSubmit={handleSearch}
						className='hidden md:flex flex-1 max-w-md lg:max-w-lg relative items-center group'
					>
						<Search className='absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none' />
						<input
							ref={searchInputRef}
							type='text'
							placeholder='Search jeans, shoes, jackets, bags...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-10 pr-16 py-2.5 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 border border-slate-200/80 focus:border-blue-500 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100/70 shadow-inner'
						/>
						<span className='absolute right-3 hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md pointer-events-none'>
							Ctrl K
						</span>
					</form>

					{/* Desktop Navigation Links */}
					<nav className='hidden md:flex items-center space-x-1 lg:space-x-2'>
						{/* Home Link */}
						<Link
							to='/'
							className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
								location.pathname === "/" 
									? "text-blue-600 bg-blue-50/80 shadow-xs" 
									: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
							}`}
						>
							Home
						</Link>

						{/* Categories Dropdown with Rich Popover */}
						<div className='relative' ref={dropdownRef}>
							<button
								type='button'
								onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
								className={`flex items-center space-x-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
									categoriesDropdownOpen || location.pathname.startsWith('/category')
										? "text-blue-600 bg-blue-50/80 shadow-xs"
										: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
								}`}
								aria-expanded={categoriesDropdownOpen}
								aria-haspopup='true'
							>
								<span>Categories</span>
								<ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${categoriesDropdownOpen ? "rotate-180 text-blue-600" : ""}`} />
							</button>

							<AnimatePresence>
								{categoriesDropdownOpen && (
									<motion.div 
										initial={{ opacity: 0, y: 8, scale: 0.96 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 8, scale: 0.96 }}
										transition={{ duration: 0.18, ease: "easeOut" }}
										className='absolute top-full left-0 sm:left-auto sm:right-0 mt-2.5 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/90 py-2.5 z-50 overflow-hidden'
									>
										<div className='px-4 py-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1.5'>
											<span>7 Exclusive Categories</span>
											<Sparkles className='w-3 h-3 text-amber-500' />
										</div>
										<div className='max-h-80 overflow-y-auto px-1 space-y-0.5'>
											{categories.map((c) => (
												<button
													key={c.name}
													type='button'
													onClick={() => handleCategoryClick(c.href)}
													className='w-full text-left flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-colors font-medium group'
												>
													<span className='flex items-center gap-2.5'>
														<span className='text-base group-hover:scale-110 transition-transform'>{c.icon}</span>
														<span>{c.name}</span>
													</span>
													<span className='text-[11px] text-slate-400 font-normal group-hover:text-blue-500'>
														{c.count}
													</span>
												</button>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Admin Dashboard */}
						{isAdmin && (
							<Link
								to='/secret-dashboard'
								className='flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 transition-colors shadow-xs'
							>
								<LayoutDashboard className='w-4 h-4' />
								<span>Admin</span>
							</Link>
						)}

						{/* Cart with Bouncy Counter */}
						{user && (
							<Link
								to='/cart'
								className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
									location.pathname === "/cart"
										? "text-blue-600 bg-blue-50/80 shadow-xs"
										: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
								}`}
							>
								<div className='relative'>
									<ShoppingCart className='w-5 h-5' />
									<AnimatePresence>
										{cart.length > 0 && (
											<motion.span 
												key={totalCartItems}
												initial={{ scale: 0.5, opacity: 0 }}
												animate={{ scale: [1, 1.35, 1], opacity: 1 }}
												transition={{ duration: 0.3 }}
												className='absolute -top-2 -right-2.5 min-w-[19px] h-[19px] px-1 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-md'
											>
												{totalCartItems}
											</motion.span>
										)}
									</AnimatePresence>
								</div>
								<span className='ml-1'>Cart</span>
							</Link>
						)}

						{/* User State */}
						{user ? (
							<div className='flex items-center space-x-2 pl-3 border-l border-slate-200/80'>
								<div className='hidden lg:flex flex-col text-right'>
									<span className='text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]'>
										{user.name}
									</span>
									<span className='text-[10px] text-slate-400 capitalize'>{user.role || "Shopper"}</span>
								</div>
								<button
									onClick={logout}
									title='Log Out'
									className='flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors active:scale-95'
								>
									<LogOut className='w-4 h-4' />
									<span className='hidden lg:inline'>Logout</span>
								</button>
							</div>
						) : (
							<div className='flex items-center space-x-2 pl-3 border-l border-slate-200/80'>
								<Link
									to='/login'
									className='flex items-center space-x-1 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors active:scale-95'
								>
									<LogIn className='w-4 h-4 mr-1' />
									<span>Login</span>
								</Link>
								<Link
									to='/signup'
									className='flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 active:scale-95 transition-all'
								>
									<UserPlus className='w-4 h-4 mr-1' />
									<span>Sign Up</span>
								</Link>
							</div>
						)}
					</nav>

					{/* Mobile Right Controls */}
					<div className='flex items-center space-x-1.5 md:hidden'>
						{user && (
							<Link
								to='/cart'
								className='relative p-2.5 text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-100 transition-colors'
								aria-label='Shopping Cart'
							>
								<ShoppingCart className='w-5 h-5' />
								{cart.length > 0 && (
									<motion.span 
										key={totalCartItems}
										initial={{ scale: 0.5 }}
										animate={{ scale: 1 }}
										className='absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm'
									>
										{totalCartItems}
									</motion.span>
								)}
							</Link>
						)}

						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='p-2.5 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors'
							aria-label='Toggle navigation menu'
						>
							{mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
						</motion.button>
					</div>
				</div>
			</div>

			{/* Responsive Mobile Drawer with Spring Animation */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div 
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className='md:hidden bg-white/98 backdrop-blur-2xl border-t border-slate-200 shadow-2xl px-5 pt-4 pb-7 space-y-4 overflow-hidden'
					>
						{/* Mobile Search */}
						<form onSubmit={handleSearch} className='relative'>
							<Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
							<input
								type='text'
								placeholder='Search products, categories...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
							/>
						</form>

						{/* Mobile Navigation Links */}
						<div className='flex flex-col space-y-1'>
							<Link
								to='/'
								className={`flex items-center px-3.5 py-2.5 rounded-xl text-base font-semibold ${
									location.pathname === "/" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
								}`}
							>
								Home
							</Link>

							{user && (
								<Link
									to='/cart'
									className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-semibold ${
										location.pathname === "/cart" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
									}`}
								>
									<span className='flex items-center'>
										<ShoppingCart className='w-5 h-5 mr-3 text-slate-500' />
										Shopping Cart
									</span>
									{cart.length > 0 && (
										<span className='bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
											{totalCartItems}
										</span>
									)}
								</Link>
							)}

							{isAdmin && (
								<Link
									to='/secret-dashboard'
									className='flex items-center px-3.5 py-2.5 rounded-xl text-base font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100'
								>
									<LayoutDashboard className='w-5 h-5 mr-3 text-indigo-600' />
									Admin Dashboard
								</Link>
							)}
						</div>

						{/* Category Quick Pills */}
						<div className='pt-2 border-t border-slate-100'>
							<div className='text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2.5 flex items-center justify-between'>
								<span>All 7 Categories</span>
								<Flame className='w-3.5 h-3.5 text-amber-500' />
							</div>
							<div className='grid grid-cols-2 gap-2'>
								{categories.map((c) => (
									<button
										key={c.name}
										type='button'
										onClick={() => handleCategoryClick(c.href)}
										className='flex items-center gap-2 p-2.5 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-100 transition-colors text-left'
									>
										<span>{c.icon}</span>
										<span className='truncate'>{c.name}</span>
									</button>
								))}
							</div>
						</div>

						{/* Mobile User & Auth Actions */}
						<div className='pt-3 border-t border-slate-100'>
							{user ? (
								<div className='space-y-2.5'>
									<div className='flex items-center space-x-3 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-100'>
										<div className='w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm'>
											{user.name?.charAt(0).toUpperCase()}
										</div>
										<div className='overflow-hidden'>
											<div className='text-sm font-bold text-slate-800 truncate'>{user.name}</div>
											<div className='text-xs text-slate-500 truncate'>{user.email}</div>
										</div>
									</div>
									<button
										onClick={logout}
										className='w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors'
									>
										<LogOut className='w-4 h-4' />
										<span>Log Out</span>
									</button>
								</div>
							) : (
								<div className='grid grid-cols-2 gap-3'>
									<Link
										to='/login'
										className='flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors'
									>
										<LogIn className='w-4 h-4 mr-1.5' />
										Log In
									</Link>
									<Link
										to='/signup'
										className='flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-colors'
									>
										<UserPlus className='w-4 h-4 mr-1.5' />
										Sign Up
									</Link>
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Navbar;
