import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "https://e-commerce-store-anqa.onrender.com/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
