import { motion } from "framer-motion";

import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { ArrowLeft, Mail, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../mailComponents/Input";
import './index.css';

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};
	return (
		<div  className='forgot-pw-container'>
			<h2 className='forgot-website-logo-mobile-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
        		Forgot Password
      		</h2>
      		<img
      		  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
      		  className="forgot-img"
      		  alt="website login"
      		/>
			<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			>	
			{!isSubmitted ? (
				<form onSubmit={handleSubmit} className="forgot-form-container">
					<h2 className='forgot-website-logo-desktop-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
						Forgot Password
					</h2>
					<p className='text-gray-800 mb-6 text-center'>
						Enter your email address and we'll send you a link to reset your password.
					</p>
					<Input
						icon={Mail}
					    type='email'
					    placeholder='Email Address'
					    value={email}
					    onChange={(e) => setEmail(e.target.value)}
					    required
					/>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='forgot-button py-3 px-4 bg-gradient-to-r from-blue-400 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200'
						type='submit'
					>
					    {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
					</motion.button>
				</form>
			) : (
				<div className='text-center'>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
						className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
					>
						<Mail className='h-8 w-8 text-white' />
					</motion.div>
					<p className='text-gray-800 mb-6 w-17'>
						If an account exists for {email}, you will receive a password reset link shortly.
					</p>
				</div>
			)}
			<div className='px-8 py-4 flex justify-center bg-white'>
				<Link to={"/login"} className='text-sm font-bold text-green-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
			</motion.div>
		</div>
	);
};
export default ForgotPasswordPage;