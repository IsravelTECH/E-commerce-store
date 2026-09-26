import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, ShoppingBag, ShieldCheck, Sparkles, Check } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className='min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50'>
			<div className='w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12'>
				
				{/* Left Visual Area (Desktop) */}
				<div className='hidden lg:flex lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-10 text-white flex-col justify-between relative overflow-hidden'>
					<div className='absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none' />
					<div className='absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none' />

					<div>
						<Link to='/' className='inline-flex items-center space-x-2.5 text-white mb-10'>
							<div className='w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-sm'>
								<ShoppingBag className='w-5 h-5 text-white' />
							</div>
							<span className='text-xl font-black tracking-tight'>BuyBuddy</span>
						</Link>

						<h2 className='text-2xl font-extrabold tracking-tight mb-3 leading-snug'>
							Welcome back to better shopping.
						</h2>
						<p className='text-sm text-blue-100 font-normal leading-relaxed mb-8'>
							Access your saved cart, view exclusive promo vouchers, and checkout in seconds.
						</p>

						<div className='space-y-3.5 text-xs text-blue-50'>
							<div className='flex items-center space-x-2.5'>
								<div className='w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
									<Check className='w-3 h-3' />
								</div>
								<span>Verified Stripe Payment Protection</span>
							</div>
							<div className='flex items-center space-x-2.5'>
								<div className='w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
									<Check className='w-3 h-3' />
								</div>
								<span>10% Instant Gift Coupons on \$200+ Orders</span>
							</div>
							<div className='flex items-center space-x-2.5'>
								<div className='w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
									<Check className='w-3 h-3' />
								</div>
								<span>Express 24-Hour Dispatch</span>
							</div>
						</div>
					</div>

					<div className='pt-8 border-t border-white/15 text-[11px] text-blue-200'>
						Trusted by thousands of premium fashion shoppers.
					</div>
				</div>

				{/* Right Form Area */}
				<div className='lg:col-span-7 p-6 sm:p-10 sm:px-12 flex flex-col justify-center'>
					<div className='text-center sm:text-left mb-8'>
						<h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
							Sign In to BuyBuddy
						</h2>
						<p className='text-sm text-slate-500 mt-1.5'>
							Enter your credentials to continue to your account.
						</p>
					</div>

					<form onSubmit={handleSubmit} className='space-y-5'>
						<div>
							<label htmlFor='email' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>
								Email Address
							</label>
							<div className='relative rounded-xl'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
									<Mail className='h-4 w-4 text-slate-400' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full px-3.5 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
									placeholder='name@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>
								Password
							</label>
							<div className='relative rounded-xl'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
									<Lock className='h-4 w-4 text-slate-400' />
								</div>
								<input
									id='password'
									type={showPassword ? "text" : "password"}
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='block w-full px-3.5 py-3 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
									placeholder='••••••••'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none'
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
								</button>
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
						>
							{loading ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Signing In...
								</>
							) : (
								<>
									<LogIn className='mr-2 h-4 w-4' />
									Sign In
								</>
							)}
						</button>
					</form>

					<div className='mt-8 pt-6 border-t border-slate-100 text-center sm:text-left'>
						<p className='text-sm text-slate-500'>
							Don&apos;t have an account yet?{" "}
							<Link to='/signup' className='font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1'>
								Create an account <ArrowRight className='w-3.5 h-3.5' />
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

