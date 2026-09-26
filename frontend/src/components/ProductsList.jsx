import { motion } from "framer-motion";
import { Trash2, Star, Package, Sparkles } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	if (!products || products.length === 0) {
		return (
			<div className='bg-white rounded-3xl border border-slate-200 shadow-card p-12 text-center max-w-md mx-auto'>
				<div className='w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4'>
					<Package className='w-8 h-8' />
				</div>
				<h3 className='text-lg font-bold text-slate-900 mb-1'>No Products in Catalog</h3>
				<p className='text-xs text-slate-500'>
					Use the &quot;Create Product&quot; tab to add your first store items.
				</p>
			</div>
		);
	}

	return (
		<motion.div
			className='space-y-4 max-w-5xl mx-auto'
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<div className='flex items-center justify-between px-2 mb-2'>
				<div>
					<h3 className='text-lg font-bold text-slate-900'>Live Catalog ({products.length})</h3>
					<p className='text-xs text-slate-500'>Manage visibility and product status</p>
				</div>
			</div>

			{/* Desktop Table View */}
			<div className='hidden md:block bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden'>
				<table className='min-w-full divide-y divide-slate-100'>
					<thead className='bg-slate-50/80'>
						<tr>
							<th scope='col' className='px-6 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
								Product
							</th>
							<th scope='col' className='px-6 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
								Category
							</th>
							<th scope='col' className='px-6 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider'>
								Price
							</th>
							<th scope='col' className='px-6 py-3.5 text-center text-xs font-bold text-slate-500 uppercase tracking-wider'>
								Featured
							</th>
							<th scope='col' className='px-6 py-3.5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='bg-white divide-y divide-slate-100'>
						{products.map((product) => (
							<tr key={product._id} className='hover:bg-slate-50/60 transition-colors'>
								<td className='px-6 py-4'>
									<div className='flex items-center space-x-3.5'>
										<div className='w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100'>
											<img
												className='w-full h-full object-cover object-center'
												src={product.image}
												alt={product.name}
											/>
										</div>
										<div className='min-w-0'>
											<div className='text-sm font-bold text-slate-900 truncate max-w-xs' title={product.name}>
												{product.name}
											</div>
											<div className='text-xs text-slate-400 truncate max-w-xs'>
												{product.description || "No description provided"}
											</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 capitalize'>
										{product.category}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='text-sm font-extrabold text-slate-900'>
										${Number(product.price).toFixed(2)}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-center'>
									<button
										type='button'
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-2 rounded-xl border transition-all duration-200 ${
											product.isFeatured
												? "bg-amber-50 text-amber-600 border-amber-200 shadow-subtle"
												: "bg-slate-50 text-slate-400 border-slate-200 hover:text-amber-500 hover:border-amber-200"
										}`}
										title={product.isFeatured ? "Featured item (Click to disable)" : "Not featured (Click to feature)"}
										aria-label='Toggle featured status'
									>
										<Star className={`h-4 w-4 ${product.isFeatured ? "fill-amber-500 text-amber-500" : ""}`} />
									</button>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-right'>
									<button
										type='button'
										onClick={() => deleteProduct(product._id)}
										className='p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors'
										title='Delete product'
										aria-label={`Delete ${product.name}`}
									>
										<Trash2 className='h-4 w-4' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Card List View */}
			<div className='md:hidden space-y-3'>
				{products.map((product) => (
					<div
						key={product._id}
						className='bg-white rounded-2xl border border-slate-200 p-4 shadow-card flex items-center justify-between gap-3'
					>
						<div className='flex items-center space-x-3 min-w-0'>
							<div className='w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100'>
								<img
									className='w-full h-full object-cover object-center'
									src={product.image}
									alt={product.name}
								/>
							</div>
							<div className='min-w-0'>
								<div className='text-sm font-bold text-slate-900 truncate max-w-[140px] sm:max-w-xs' title={product.name}>
									{product.name}
								</div>
								<div className='flex items-center space-x-2 mt-0.5'>
									<span className='text-xs font-bold text-blue-600'>${Number(product.price).toFixed(2)}</span>
									<span className='text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded'>
										{product.category}
									</span>
								</div>
							</div>
						</div>

						<div className='flex items-center space-x-1 shrink-0'>
							<button
								type='button'
								onClick={() => toggleFeaturedProduct(product._id)}
								className={`p-2 rounded-xl border transition-colors ${
									product.isFeatured
										? "bg-amber-50 text-amber-600 border-amber-200"
										: "bg-slate-50 text-slate-400 border-slate-200"
								}`}
								title='Toggle Featured'
							>
								<Star className={`h-4 w-4 ${product.isFeatured ? "fill-amber-500 text-amber-500" : ""}`} />
							</button>

							<button
								type='button'
								onClick={() => deleteProduct(product._id)}
								className='p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors'
								title='Delete Product'
							>
								<Trash2 className='h-4 w-4' />
							</button>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default ProductsList;

