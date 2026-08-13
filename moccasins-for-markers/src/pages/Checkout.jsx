import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { asset, formatMoney } from '../data/products';
import './Checkout.css';

export default function Checkout() {
  const { cart, subtotal, clearCart, showToast } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    province: '',
    postal: '',
  });

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!cart.length) {
      showToast('Your cart is empty.');
      return;
    }
    const total = subtotal;
    clearCart();
    navigate('/order-success', {
      state: {
        type: 'order',
        total,
        name: form.name,
      },
    });
  };

  return (
    <div className="page">
      <Seo title="Checkout" description="Complete your Moccasins for Markers order." path="/checkout" />
      <section className="page-hero container">
        <p className="kicker">Checkout</p>
        <h1>Checkout</h1>
        <p>Complete your order with care. Every purchase helps fund permanent headstones.</p>
      </section>

      <section className="container checkout-grid">
        <form className="checkout-form" onSubmit={submit}>
          <fieldset>
            <legend>Contact</legend>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} />
            </label>
            <label className="field">
              <span>Full name</span>
              <input name="name" required autoComplete="name" value={form.name} onChange={onChange} />
            </label>
          </fieldset>

          <fieldset>
            <legend>Shipping</legend>
            <label className="field">
              <span>Address</span>
              <textarea name="address" required rows={3} autoComplete="street-address" value={form.address} onChange={onChange} />
            </label>
            <div className="field-row">
              <label className="field">
                <span>City</span>
                <input name="city" required autoComplete="address-level2" value={form.city} onChange={onChange} />
              </label>
              <label className="field">
                <span>Province</span>
                <input name="province" required autoComplete="address-level1" value={form.province} onChange={onChange} />
              </label>
            </div>
            <label className="field">
              <span>Postal code</span>
              <input name="postal" required autoComplete="postal-code" value={form.postal} onChange={onChange} />
            </label>
          </fieldset>

          <fieldset>
            {/* TODO: Connect Stripe / PayPal / Shopify Payments for live checkout. */}
            <legend>Payment</legend>
            <p className="payment-note">
              You will receive order confirmation details by email. Shipping focuses on Canada.
            </p>
          </fieldset>

          <Button type="submit" variant="primary" className="btn-block" disabled={!cart.length}>
            Place order
          </Button>
        </form>

        <aside className="checkout-summary">
          <h2>Order summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(({ id, qty, product }) => (
              <div className="summary-line" key={id}>
                <img src={asset(product.image)} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    Qty {qty} · {formatMoney(product.price * qty)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
          <p className="purpose">Every purchase helps fund permanent headstones.</p>
        </aside>
      </section>
    </div>
  );
}
