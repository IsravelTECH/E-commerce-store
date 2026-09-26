import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, ShoppingBag, Check, ShieldCheck } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
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
							Start shopping smarter with BuyBuddy.
						</h2>
						<p className='text-sm text-blue-100 font-normal leading-relaxed mb-8'>
							Create your free account today and unlock members-only rewards, fast checkout, and personalized recommendations.
						</p>

						<div className='space-y-3.5 text-xs text-blue-50'>
							<div className='flex items-center space-x-2.5'>
								<div className='w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
									<Check className='w-3 h-3' />
								</div>
								<span>Automatic 10% Gift Vouchers for orders &gt; \$200</span>
							</div>
							<div className='flex items-center space-x-2.5'>
								<div className='w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
									<Check className='w-3 h-3' />
								</div>
								<span>Secure Saved Cart across all devices</span>
							</div>
							<div className='flex items-center space-x-2.5'>
								<div className='w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
									<Check className='w-3 h-3' />
								</div>
								<span>30-Day Hassle-Free Returns</span>
							</div>
						</div>
					</div>

					<div className='pt-8 border-t border-white/15 text-[11px] text-blue-200'>
						By signing up, you agree to our Terms and Privacy Policy.
					</div>
				</div>

				{/* Right Form Area */}
				<div className='lg:col-span-7 p-6 sm:p-10 sm:px-12 flex flex-col justify-center'>
					<div className='text-center sm:text-left mb-6'>
						<h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
							Create Your Account
						</h2>
						<p className='text-sm text-slate-500 mt-1.5'>
							Join BuyBuddy today — it takes less than a minute.
						</p>
					</div>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label htmlFor='name' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1'>
								Full Name
							</label>
							<div className='relative rounded-xl'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
									<User className='h-4 w-4 text-slate-400' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full px-3.5 py-2.5 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
									placeholder='John Doe'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1'>
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
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className='block w-full px-3.5 py-2.5 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1'>
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
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className='block w-full px-3.5 py-2.5 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
									placeholder='At least 6 characters'
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

						<div>
							<label htmlFor='confirmPassword' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1'>
								Confirm Password
							</label>
							<div className='relative rounded-xl'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
									<Lock className='h-4 w-4 text-slate-400' />
								</div>
								<input
									id='confirmPassword'
									type={showConfirmPassword ? "text" : "password"}
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className='block w-full px-3.5 py-2.5 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
									placeholder='Repeat your password'
								/>
								<button
									type='button'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className='absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none'
									aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
								>
									{showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
								</button>
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2'
						>
							{loading ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Creating Account...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-4 w-4' />
									Create Account
								</>
							)}
						</button>
					</form>

					<div className='mt-6 pt-5 border-t border-slate-100 text-center sm:text-left'>
						<p className='text-sm text-slate-500'>
							Already have an account?{" "}
							<Link to='/login' className='font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1'>
								Log in here <ArrowRight className='w-3.5 h-3.5' />
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;

