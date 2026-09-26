import { Link } from "react-router-dom";
import { ShieldCheck, Truck, RotateCcw, CreditCard, ShoppingBag, Heart } from "lucide-react";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-white border-t border-slate-200 mt-auto text-slate-600'>
			{/* Value Highlights */}
			<div className='border-b border-slate-100 bg-slate-50/50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left'>
						<div className='flex items-center space-x-3 justify-center sm:justify-start'>
							<div className='w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm'>
								<Truck className='w-5 h-5' />
							</div>
							<div>
								<h4 className='font-semibold text-sm text-slate-900'>Free Express Shipping</h4>
								<p className='text-xs text-slate-500'>On orders over $200</p>
							</div>
						</div>

						<div className='flex items-center space-x-3 justify-center sm:justify-start'>
							<div className='w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm'>
								<ShieldCheck className='w-5 h-5' />
							</div>
							<div>
								<h4 className='font-semibold text-sm text-slate-900'>100% Secure Checkout</h4>
								<p className='text-xs text-slate-500'>Powered by Stripe 256-bit encryption</p>
							</div>
						</div>

						<div className='flex items-center space-x-3 justify-center sm:justify-start'>
							<div className='w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm'>
								<RotateCcw className='w-5 h-5' />
							</div>
							<div>
								<h4 className='font-semibold text-sm text-slate-900'>30-Day Easy Returns</h4>
								<p className='text-xs text-slate-500'>Hassle-free money back guarantee</p>
							</div>
						</div>

						<div className='flex items-center space-x-3 justify-center sm:justify-start'>
							<div className='w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-sm'>
								<CreditCard className='w-5 h-5' />
							</div>
							<div>
								<h4 className='font-semibold text-sm text-slate-900'>Instant Discount Rewards</h4>
								<p className='text-xs text-slate-500'>Earn 10% gift vouchers on checkout</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Brand info */}
					<div className='md:col-span-2 space-y-4'>
						<Link to='/' className='flex items-center space-x-2.5'>
							<div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20'>
								<ShoppingBag className='w-5 h-5' />
							</div>
							<span className='text-xl font-extrabold tracking-tight text-slate-900'>
								Buy<span className='text-blue-600'>Buddy</span>
							</span>
						</Link>
						<p className='text-sm text-slate-500 max-w-sm leading-relaxed'>
							Your premier modern destination for curated fashion, premium accessories, and sustainable apparel. High quality items, lightning fast fulfillment, and world-class customer service.
						</p>
					</div>

					{/* Quick Categories */}
					<div>
						<h5 className='text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4'>Categories</h5>
						<ul className='space-y-2.5 text-sm'>
							<li>
								<Link to='/category/jeans' className='text-slate-500 hover:text-blue-600 transition-colors'>
									Premium Jeans
								</Link>
							</li>
							<li>
								<Link to='/category/t-shirts' className='text-slate-500 hover:text-blue-600 transition-colors'>
									T-Shirts & Tops
								</Link>
							</li>
							<li>
								<Link to='/category/jackets' className='text-slate-500 hover:text-blue-600 transition-colors'>
									Jackets & Outerwear
								</Link>
							</li>
							<li>
								<Link to='/category/shoes' className='text-slate-500 hover:text-blue-600 transition-colors'>
									Footwear & Shoes
								</Link>
							</li>
							<li>
								<Link to='/category/bags' className='text-slate-500 hover:text-blue-600 transition-colors'>
									Bags & Accessories
								</Link>
							</li>
						</ul>
					</div>

					{/* Account & Support */}
					<div>
						<h5 className='text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4'>Account & Help</h5>
						<ul className='space-y-2.5 text-sm'>
							<li>
								<Link to='/cart' className='text-slate-500 hover:text-blue-600 transition-colors'>
									View Shopping Cart
								</Link>
							</li>
							<li>
								<Link to='/login' className='text-slate-500 hover:text-blue-600 transition-colors'>
									Account Sign In
								</Link>
							</li>
							<li>
								<Link to='/signup' className='text-slate-500 hover:text-blue-600 transition-colors'>
									Create New Account
								</Link>
							</li>
							<li>
								<Link to='/' className='text-slate-500 hover:text-blue-600 transition-colors'>
									Home & Featured Products
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4'>
					<p>© {currentYear} BuyBuddy, Inc. All rights reserved.</p>
					<p className='flex items-center gap-1'>
						Designed with <Heart className='w-3.5 h-3.5 text-red-500 fill-red-500' /> for modern e-commerce.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
