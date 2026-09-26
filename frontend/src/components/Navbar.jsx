import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
	ShoppingCart, 
	UserPlus, 
	LogIn, 
	LogOut, 
	Shield, 
	Search, 
	Menu, 
	X, 
	ShoppingBag, 
	User, 
	ChevronDown,
	LayoutDashboard,
	Sparkles
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const categories = [
	{ name: "Jeans", href: "/category/jeans" },
	{ name: "T-Shirts", href: "/category/t-shirts" },
	{ name: "Shoes", href: "/category/shoes" },
	{ name: "Glasses", href: "/category/glasses" },
	{ name: "Jackets", href: "/category/jackets" },
	{ name: "Suits", href: "/category/suits" },
	{ name: "Bags", href: "/category/bags" },
];

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// Close mobile menu on route change
	useEffect(() => {
		setMobileMenuOpen(false);
		setCategoriesDropdownOpen(false);
	}, [location.pathname]);

	const totalCartItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

	const handleSearch = (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		const match = categories.find(c => c.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));
		if (match) {
			navigate(match.href);
		} else {
			// default to category search or category list
			navigate(`/category/${searchQuery.trim().toLowerCase()}`);
		}
		setSearchQuery("");
		setMobileMenuOpen(false);
	};

	return (
		<header className='fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-40 border-b border-slate-200/80 shadow-subtle transition-all duration-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16 md:h-20 gap-3 sm:gap-6'>
					
					{/* Logo */}
					<Link 
						to='/' 
						className='flex items-center space-x-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1'
					>
						<div className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20'>
							<ShoppingBag className='w-5 h-5' />
						</div>
						<span className='text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900'>
							Buy<span className='text-blue-600'>Buddy</span>
						</span>
					</Link>

					{/* Desktop Search */}
					<form 
						onSubmit={handleSearch}
						className='hidden md:flex flex-1 max-w-md lg:max-w-lg relative items-center'
					>
						<Search className='absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none' />
						<input
							type='text'
							placeholder='Search jeans, t-shirts, shoes, jackets...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 border border-transparent focus:border-blue-500 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100'
						/>
					</form>

					{/* Desktop Navigation Links */}
					<nav className='hidden md:flex items-center space-x-1 lg:space-x-3'>
						<Link
							to='/'
							className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
								location.pathname === "/" 
									? "text-blue-600 bg-blue-50/60" 
									: "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
							}`}
						>
							Home
						</Link>

						{/* Categories Dropdown */}
						<div className='relative'>
							<button
								onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
								onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
								className='flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 transition-colors'
							>
								<span>Categories</span>
								<ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${categoriesDropdownOpen ? "rotate-180" : ""}`} />
							</button>

							{categoriesDropdownOpen && (
								<div className='absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-dropdown border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150'>
									{categories.map((c) => (
										<Link
											key={c.name}
											to={c.href}
											className='block px-4 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors font-medium'
											onClick={() => setCategoriesDropdownOpen(false)}
										>
											{c.name}
										</Link>
									))}
								</div>
							)}
						</div>

						{/* Admin Dashboard */}
						{isAdmin && (
							<Link
								to='/secret-dashboard'
								className='flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 transition-colors shadow-subtle'
							>
								<LayoutDashboard className='w-4 h-4' />
								<span>Admin</span>
							</Link>
						)}

						{/* Cart */}
						{user && (
							<Link
								to='/cart'
								className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
									location.pathname === "/cart"
										? "text-blue-600 bg-blue-50/60"
										: "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
								}`}
							>
								<div className='relative'>
									<ShoppingCart className='w-5 h-5' />
									{cart.length > 0 && (
										<span className='absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 bg-blue-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm'>
											{totalCartItems}
										</span>
									)}
								</div>
								<span className='ml-1'>Cart</span>
							</Link>
						)}

						{/* User State */}
						{user ? (
							<div className='flex items-center space-x-2 pl-2 border-l border-slate-200'>
								<div className='hidden lg:flex flex-col text-right'>
									<span className='text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]'>
										{user.name}
									</span>
									<span className='text-[10px] text-slate-400 capitalize'>{user.role || "Member"}</span>
								</div>
								<button
									onClick={logout}
									title='Log Out'
									className='flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors'
								>
									<LogOut className='w-4 h-4' />
									<span className='hidden lg:inline'>Logout</span>
								</button>
							</div>
						) : (
							<div className='flex items-center space-x-2 pl-2 border-l border-slate-200'>
								<Link
									to='/login'
									className='flex items-center space-x-1 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-colors'
								>
									<LogIn className='w-4 h-4 mr-1' />
									<span>Login</span>
								</Link>
								<Link
									to='/signup'
									className='flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/25 transition-all'
								>
									<UserPlus className='w-4 h-4 mr-1' />
									<span>Sign Up</span>
								</Link>
							</div>
						)}
					</nav>

					{/* Mobile Right Controls */}
					<div className='flex items-center space-x-2 md:hidden'>
						{user && (
							<Link
								to='/cart'
								className='relative p-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors'
								aria-label='Shopping Cart'
							>
								<ShoppingCart className='w-6 h-6' />
								{cart.length > 0 && (
									<span className='absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-blue-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm'>
										{totalCartItems}
									</span>
								)}
							</Link>
						)}

						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors'
							aria-label='Toggle navigation menu'
						>
							{mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Slide-down Drawer */}
			{mobileMenuOpen && (
				<div className='md:hidden bg-white border-t border-slate-200 shadow-lg px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150'>
					{/* Mobile Search */}
					<form onSubmit={handleSearch} className='relative'>
						<Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
						<input
							type='text'
							placeholder='Search products, categories...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
						/>
					</form>

					{/* Mobile Navigation Links */}
					<div className='flex flex-col space-y-1'>
						<Link
							to='/'
							className={`flex items-center px-3 py-2.5 rounded-lg text-base font-semibold ${
								location.pathname === "/" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
							}`}
						>
							Home
						</Link>

						{user && (
							<Link
								to='/cart'
								className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold ${
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
								className='flex items-center px-3 py-2.5 rounded-lg text-base font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100'
							>
								<LayoutDashboard className='w-5 h-5 mr-3 text-indigo-600' />
								Admin Dashboard
							</Link>
						)}
					</div>

					{/* Category Quick Pills */}
					<div className='pt-2 border-t border-slate-100'>
						<div className='text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2'>
							Popular Categories
						</div>
						<div className='flex flex-wrap gap-1.5'>
							{categories.map((c) => (
								<Link
									key={c.name}
									to={c.href}
									className='px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'
								>
									{c.name}
								</Link>
							))}
						</div>
					</div>

					{/* Mobile User & Auth Actions */}
					<div className='pt-3 border-t border-slate-100'>
						{user ? (
							<div className='space-y-2'>
								<div className='flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg'>
									<div className='flex items-center space-x-2'>
										<div className='w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm'>
											{user.name?.charAt(0).toUpperCase()}
										</div>
										<div>
											<div className='text-sm font-bold text-slate-800'>{user.name}</div>
											<div className='text-xs text-slate-500 truncate max-w-[180px]'>{user.email}</div>
										</div>
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
									className='flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/25 transition-colors'
								>
									<UserPlus className='w-4 h-4 mr-1.5' />
									Sign Up
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
