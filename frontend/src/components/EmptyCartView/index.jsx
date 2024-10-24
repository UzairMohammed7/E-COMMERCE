import {Link} from 'react-router-dom'
import cartLogo from '../../cartlogo.png';

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src={cartLogo}
      className="cart-empty-img"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading font-mono text-emerald-600">Your Cart Is Empty</h1>

    <Link to="/products">
      <button type="button" className="shop-now-btn bg-gradient-to-r from-blue-500 to-green-500">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
