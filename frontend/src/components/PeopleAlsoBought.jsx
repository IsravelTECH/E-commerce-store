import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(error?.response?.data?.message || "An error occurred while fetching recommendations");
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) {
		return (
			<div className='mt-12 pt-8 border-t border-slate-200'>
				<div className='h-6 bg-slate-200 rounded w-48 mb-6 animate-pulse' />
				<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{[1, 2, 3].map((n) => (
						<div key={n} className='bg-white rounded-2xl border border-slate-200 p-4 h-64 animate-pulse' />
					))}
				</div>
			</div>
		);
	}

	if (!recommendations || recommendations.length === 0) return null;

	return (
		<div className='mt-12 pt-8 border-t border-slate-200'>
			<div className='flex items-center space-x-2 mb-6'>
				<div className='w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center'>
					<Sparkles className='w-4 h-4' />
				</div>
				<h3 className='text-xl sm:text-2xl font-bold text-slate-900'>People Also Bought</h3>
			</div>

			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
				{recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default PeopleAlsoBought;

