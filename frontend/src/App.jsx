import {Route, Routes, Navigate} from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect, useState } from 'react';

import LoginForm from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import EmailVerificationPage from './components/EmailVerification'
import ForgotPasswordPage from './components/ForgotPasswordPage'
import ResetPasswordPage from './components/ResetPasswordPage'

import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

import { useAuthStore } from './store/authStore'

// ProtectedRoute ~ redirect Unauthenticated users to the login page
const ProtectedRoute = ({children}) => {
	const { isAuthenticated, user } = useAuthStore();
	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}
	if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
	}
  return children;
}

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
  return <Navigate to='/' replace />;
  }
  return children;
};

const App = () => {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const clearCart = () => {
    setCartList([])
  }

  const addCartItem = product => {
    const findProduct = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (findProduct) {
      setCartList((prevState) =>
				prevState.map((eachCartItem) =>
					eachCartItem.id === findProduct.id
						? { ...eachCartItem, quantity: eachCartItem.quantity + product.quantity }
						: eachCartItem
				)
			);
    } else {
      setCartList((prevState) => [...prevState, product])
    }
    // Display toast notification when an item is added
		toast.success(`${product.title} added to the cart!`)
  }

  const removeCartItem = id => {
    const updateCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    setCartList(updateCartList);
  }

  const incrementCartItemQuantity = id => {
    setCartList((prevState) =>
			prevState.map((eachCartItem) =>
				eachCartItem.id === id
					? { ...eachCartItem, quantity: eachCartItem.quantity + 1 }
					: eachCartItem
			)
		);
  }

  const decrementCartItemQuantity = id => {
    const productQuantity = cartList.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (productQuantity.quantity > 1) {
      setCartList((prevState) =>
				prevState.map((eachCartItem) =>
					eachCartItem.id === id
						? { ...eachCartItem, quantity: eachCartItem.quantity - 1 }
						: eachCartItem
				)
			);
    } else {
      removeCartItem(id)
    }
  }

  const {checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading state while checking authentication
  if (isCheckingAuth) return <div className='flex justify-center items-center min-h-24 min-w-24' >Loading...</div>;
  
  return (
       <CartContext.Provider
        value={{
          cartList,
          addCartItem,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeAllCartItems,
          clearCart,
        }}
      >
        <Routes>
          <Route path="/login" element={<RedirectAuthenticatedUser><LoginForm/></RedirectAuthenticatedUser>} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>} />
          <Route path="/verify-email" element={<EmailVerificationPage/>} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage/></RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage/></RedirectAuthenticatedUser>} />
          {/* shopping route */}
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute> } />
          <Route path="/products" element={ <ProtectedRoute><Products/></ProtectedRoute>  } />
          <Route path="/products/:id" element={ <ProtectedRoute><ProductItemDetails/></ProtectedRoute> }/>
          <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
          <Route path="/not-found" element={<NotFound/>} />
          <Route path='*' element={<Navigate to='not-found'/>} />
        </Routes>
        <Toaster />
      </CartContext.Provider>
  );
};

export default App

