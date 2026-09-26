import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader2, Image as ImageIcon, Check, X, DollarSign } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!newProduct.image) {
			toast.error("Please select an image for your product", { id: "image-required" });
			return;
		}

		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
			toast.success("Product created successfully!");
		} catch (err) {
			console.error("Error creating a product:", err);
			toast.error(err?.response?.data?.message || "Failed to create product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

	const removeImage = () => {
		setNewProduct({ ...newProduct, image: "" });
	};

	return (
		<motion.div
			className='bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<div className='border-b border-slate-100 pb-6 mb-8'>
				<h2 className='text-2xl font-extrabold text-slate-900 tracking-tight'>
					Create New Product
				</h2>
				<p className='text-sm text-slate-500 mt-1'>
					Fill out the specifications and upload high-resolution imagery for your new catalog item.
				</p>
			</div>

			<form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
				
				{/* Left Form Inputs */}
				<div className='lg:col-span-7 space-y-5'>
					<div>
						<label htmlFor='name' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>
							Product Name <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
							className='block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
							placeholder='e.g., Premium Vintage Denim Jacket'
							required
						/>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label htmlFor='category' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>
								Category <span className='text-red-500'>*</span>
							</label>
							<select
								id='category'
								name='category'
								value={newProduct.category}
								onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
								className='block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium capitalize'
								required
							>
								<option value=''>Select Category</option>
								{categories.map((category) => (
									<option key={category} value={category} className='capitalize'>
										{category}
									</option>
								))}
							</select>
						</div>

						<div>
							<label htmlFor='price' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>
								Price (USD) <span className='text-red-500'>*</span>
							</label>
							<div className='relative rounded-xl'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
									<DollarSign className='h-4 w-4 text-slate-400' />
								</div>
								<input
									type='number'
									id='price'
									name='price'
									value={newProduct.price}
									onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
									step='0.01'
									min='0'
									className='block w-full px-4 py-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium'
									placeholder='0.00'
									required
								/>
							</div>
						</div>
					</div>

					<div>
						<label htmlFor='description' className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>
							Description <span className='text-red-500'>*</span>
						</label>
						<textarea
							id='description'
							name='description'
							value={newProduct.description}
							onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
							rows='4'
							className='block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium leading-relaxed'
							placeholder='Provide detailed material, sizing, and styling information...'
							required
						/>
					</div>
				</div>

				{/* Right Image Upload & Preview */}
				<div className='lg:col-span-5 flex flex-col justify-between'>
					<div>
						<label className='block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5'>
							Product Image <span className='text-red-500'>*</span>
						</label>

						{newProduct.image ? (
							<div className='relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square group shadow-sm'>
								<img
									src={newProduct.image}
									alt='Product preview'
									className='w-full h-full object-cover'
								/>
								<button
									type='button'
									onClick={removeImage}
									className='absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-md'
									title='Remove image'
								>
									<X className='w-4 h-4' />
								</button>
								<div className='absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm'>
									Ready for Cloudinary Upload
								</div>
							</div>
						) : (
							<label
								htmlFor='image'
								className='flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 rounded-2xl aspect-square cursor-pointer transition-colors p-6 text-center group'
							>
								<div className='w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors'>
									<Upload className='w-6 h-6' />
								</div>
								<span className='text-sm font-bold text-slate-900 mb-1'>
									Click to Upload Image
								</span>
								<span className='text-xs text-slate-500'>
									PNG, JPG, WEBP up to 10MB
								</span>
								<input
									type='file'
									id='image'
									className='sr-only'
									accept='image/*'
									onChange={handleImageChange}
								/>
							</label>
						)}
					</div>

					<div className='pt-6'>
						<button
							type='submit'
							disabled={loading}
							className='w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
						>
							{loading ? (
								<>
									<Loader2 className='w-4 h-4 animate-spin' />
									<span>Publishing to Catalog...</span>
								</>
							) : (
								<>
									<PlusCircle className='w-4 h-4' />
									<span>Publish Product</span>
								</>
							)}
						</button>
					</div>
				</div>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;

