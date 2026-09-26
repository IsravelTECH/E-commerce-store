import { ShoppingBag } from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-700 space-y-4'>
			<div className='relative flex items-center justify-center'>
				<div className='w-16 h-16 border-4 border-blue-100 rounded-full' />
				<div className='w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin rounded-full absolute left-0 top-0' />
				<div className='w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center absolute'>
					<ShoppingBag className='w-3.5 h-3.5' />
				</div>
			</div>
			<div className='text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse'>
				Loading BuyBuddy...
			</div>
		</div>
	);
};

export default LoadingSpinner;

