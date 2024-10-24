import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../mailComponents/Input";
import './index.css'

const  LoginPage  = () => {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading, error } = useAuthStore();
	
	const handleLogin = async (event) => {
		event.preventDefault();
		await login(email, password); 
	};

  const onChangeUsername = event => {
    setEmail(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  return (
      <div className="login-form-container">
        <h2 className='login-website-logo-mobile-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
				    Welcome Back
			  </h2>
        <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
        />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="form-container" onSubmit={handleLogin}>
              <h2 className='login-website-logo-desktop-img text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
				        Welcome Back
			        </h2>
              <div className="input-container">
              <Input
					      id="email"
					      name="email"
                required={true}
					      icon={Mail}
					      type='text'
					      placeholder='Email address'
					      value={email}
					      onChange={onChangeUsername}
					    />
              </div>
              <div className="input-container">
              <Input
					      id="password"
					      name="password"
                required={true}
					      icon={Lock}
					      type='password'
					      placeholder='Password'
					      value={password}
					      onChange={onChangePassword}
					    />
              </div>
					    {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
              <motion.button
              whileHover={{scale:1.02}}
              whileTap={{scale:0.98}}
              type="submit" 
              className="login-button bg-gradient-to-r from-blue-400 to-emerald-500">
						    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
              </motion.button>
              <div className='mt-2'>
						    <Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
							    Forgot password?
						    </Link>
					    </div>
            </form>
              <div className='text-center'>
                <p className='text-sm text-black mt-3'>
				      	Don't have an account? 
				      	<Link to='/signup' className='text-green-400 font-bold hover:underline ml-1 mb-4'>
				      		Sign up
				      	</Link>
                </p>
              </div>
          </motion.div>
      </div>
  )
}


export default LoginPage
