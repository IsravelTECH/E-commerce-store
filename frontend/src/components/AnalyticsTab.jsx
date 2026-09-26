import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<div className='py-16 flex flex-col items-center justify-center space-y-3 text-slate-500'>
				<Loader2 className='w-8 h-8 text-blue-600 animate-spin' />
				<p className='text-sm font-medium'>Aggregating live business metrics...</p>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			{/* Top 4 KPI Metrics */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
				<AnalyticsCard
					title='Total Revenue'
					value={`$${analyticsData.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
					icon={DollarSign}
					iconBg='bg-emerald-50 text-emerald-600'
					badge='+ Live'
				/>
				<AnalyticsCard
					title='Total Orders'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					iconBg='bg-blue-50 text-blue-600'
					badge='Sales'
				/>
				<AnalyticsCard
					title='Total Customers'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					iconBg='bg-indigo-50 text-indigo-600'
					badge='Registered'
				/>
				<AnalyticsCard
					title='Active Products'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					iconBg='bg-amber-50 text-amber-600'
					badge='Catalog'
				/>
			</div>

			{/* Chart Container */}
			<motion.div
				className='bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card'
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
			>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2'>
					<div>
						<h3 className='text-lg font-bold text-slate-900'>Daily Revenue & Orders Trend</h3>
						<p className='text-xs sm:text-sm text-slate-500'>
							Real-time performance tracking over recent order history.
						</p>
					</div>

					<div className='flex items-center gap-4 text-xs font-semibold text-slate-600'>
						<span className='flex items-center gap-1.5'>
							<span className='w-3 h-3 rounded-full bg-blue-600 inline-block' /> Sales Count
						</span>
						<span className='flex items-center gap-1.5'>
							<span className='w-3 h-3 rounded-full bg-emerald-500 inline-block' /> Revenue ($)
						</span>
					</div>
				</div>

				<div className='w-full h-80 sm:h-96'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart data={dailySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
							<CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' vertical={false} />
							<XAxis 
								dataKey='date' 
								stroke='#94a3b8' 
								fontSize={12} 
								tickLine={false}
								dy={10}
							/>
							<YAxis 
								yAxisId='left' 
								stroke='#94a3b8' 
								fontSize={12} 
								tickLine={false}
								axisLine={false}
							/>
							<YAxis 
								yAxisId='right' 
								orientation='right' 
								stroke='#94a3b8' 
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(v) => `$${v}`}
							/>
							<Tooltip 
								contentStyle={{
									backgroundColor: '#ffffff',
									border: '1px solid #e2e8f0',
									borderRadius: '12px',
									boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
									fontSize: '13px',
									color: '#0f172a',
									fontWeight: 600,
								}}
							/>
							<Line
								yAxisId='left'
								type='monotone'
								dataKey='sales'
								stroke='#2563eb'
								strokeWidth={3}
								dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#ffffff' }}
								activeDot={{ r: 6 }}
								name='Sales'
							/>
							<Line
								yAxisId='right'
								type='monotone'
								dataKey='revenue'
								stroke='#10b981'
								strokeWidth={3}
								dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
								activeDot={{ r: 6 }}
								name='Revenue ($)'
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</motion.div>
		</div>
	);
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, iconBg, badge }) => (
	<motion.div
		className='bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-200'
		initial={{ opacity: 0, y: 15 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
	>
		<div className='flex items-center justify-between mb-4'>
			<div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
				<Icon className='w-6 h-6' />
			</div>
			{badge && (
				<span className='px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600'>
					{badge}
				</span>
			)}
		</div>

		<div>
			<span className='text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1'>
				{title}
			</span>
			<h4 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
				{value}
			</h4>
		</div>
	</motion.div>
);

