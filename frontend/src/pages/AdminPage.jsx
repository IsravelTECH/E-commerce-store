import { BarChart3, PlusCircle, Package, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Product Inventory", icon: Package },
	{ id: "analytics", label: "Sales Analytics", icon: BarChart3 },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='min-h-screen bg-slate-50 text-slate-900 pb-20'>
			{/* Admin Header */}
			<div className='bg-white border-b border-slate-200/80 shadow-subtle'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
						<div>
							<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2'>
								<ShieldCheck className='w-3.5 h-3.5' /> Admin Control Center
							</div>
							<h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight'>
								Dashboard & Catalog Management
							</h1>
							<p className='text-sm text-slate-500 mt-1'>
								Manage your product catalog, toggle featured showcases, and inspect live revenue analytics.
							</p>
						</div>
					</div>

					{/* Navigation Tabs */}
					<div className='flex items-center space-x-2 mt-8 overflow-x-auto no-scrollbar border-b border-slate-200'>
						{tabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center space-x-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all duration-200 ${
										isActive
											? "border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-xl"
											: "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-t-xl"
									}`}
								>
									<Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
									<span>{tab.label}</span>
								</button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Tab Content Body */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10'>
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					{activeTab === "create" && <CreateProductForm />}
					{activeTab === "products" && <ProductsList />}
					{activeTab === "analytics" && <AnalyticsTab />}
				</motion.div>
			</div>
		</div>
	);
};

export default AdminPage;

