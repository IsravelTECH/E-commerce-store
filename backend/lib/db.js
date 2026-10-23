import mongoose from "mongoose";
import dns from "dns";

export const connectDB = async () => {
	try {
		try {
			dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
		} catch (_) {}

		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connecting to MONGODB", error.message);
		process.exit(1);
	}
};
