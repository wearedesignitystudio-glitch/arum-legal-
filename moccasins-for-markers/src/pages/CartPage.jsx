import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { asset, formatMoney } from '../data/products';
import './CartPage.css';

export default function CartPage() {
  const { cart, subtotal, updateQty, removeFromCart } = useCart();

  return (
    <div className="page">
      <Seo title="Cart" description="Review your Moccasins for Markers cart." path="/cart" />
      <section className="page-hero container">
        <p className="kicker">Cart</p>
        <h1>Your cart</h1>
      </section>

      <section className="container cart-page">
        {cart.length === 0 ? (
          <div className="cart-page-empty">
            <p>Your cart is empty.</p>
            <Button to="/shop" variant="primary">
              Shop the collection
            </Button>
          </div>
        ) : (
          <div className="cart-page-grid">
            <div>
              {cart.map(({ id, qty, product }) => (
                <div className="cart-page-line" key={id}>
                  <Link to={`/shop/${product.slug}`}>
                    <img src={asset(product.image)} alt={product.name} />
                  </Link>
                  <div>
                    <h2>
                      <Link to={`/shop/${product.slug}`}>{product.name}</Link>
                    </h2>
                    <p>{formatMoney(product.price)}</p>
                    <div className="qty">
                      <button type="button" onClick={() => updateQty(id, qty - 1)} aria-label="Decrease">
                        −
                      </button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => updateQty(id, qty + 1)} aria-label="Increase">
                        +
                      </button>
                    </div>
                    <button type="button" className="remove" onClick={() => removeFromCart(id)}>
                      Remove
                    </button>
                  </div>
                  <strong>{formatMoney(product.price * qty)}</strong>
                </div>
              ))}
            </div>
            <aside className="cart-summary">
              <h2>Order summary</h2>
              <div className="row">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <p>Every purchase contributes to remembrance.</p>
              <Button to="/checkout" variant="primary" className="btn-block">
                Checkout
              </Button>
              <Button to="/shop" variant="secondary" className="btn-block">
                Continue shopping
              </Button>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
