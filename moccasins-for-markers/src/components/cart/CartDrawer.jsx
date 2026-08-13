import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { asset, formatMoney } from '../../data/products';
import Button from '../ui/Button';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cart, subtotal, isCartOpen, closeCart, updateQty, removeFromCart } = useCart();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            className="cart-backdrop"
            aria-label="Close cart"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cart-drawer-head">
              <h2 id="cart-title">Your cart</h2>
              <button type="button" className="cart-close" onClick={closeCart} aria-label="Close">
                ×
              </button>
            </div>

            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <p>Your cart is empty.</p>
                  <Button to="/shop" variant="primary" onClick={closeCart}>
                    Shop the collection
                  </Button>
                </div>
              ) : (
                cart.map(({ id, qty, product }) => (
                  <div className="cart-line" key={id}>
                    <img src={asset(product.image)} alt="" />
                    <div>
                      <h3>{product.name}</h3>
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
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-foot">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <strong>{formatMoney(subtotal)}</strong>
                </div>
                <p className="cart-note">Every purchase contributes to remembrance.</p>
                <Button to="/checkout" variant="primary" className="btn-block" onClick={closeCart}>
                  Checkout
                </Button>
                <Button to="/cart" variant="secondary" className="btn-block" onClick={closeCart}>
                  View cart
                </Button>
                <button type="button" className="continue" onClick={closeCart}>
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
