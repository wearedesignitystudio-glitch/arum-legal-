import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import './DonationExperience.css';

const AMOUNTS = [25, 50, 85, 150];

export default function DonationExperience() {
  const [amount, setAmount] = useState(85);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { showToast } = useCart();
  const navigate = useNavigate();

  const selected = custom ? Number(custom) : amount;

  const submit = (e) => {
    e.preventDefault();
    if (!selected || selected < 1) {
      showToast('Please choose an amount.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      showToast('Please add your name and email.');
      return;
    }
    // TODO: Connect live payments when ready.
    showToast(`Thank you, ${name.trim()}. Your gift of $${selected} CAD helps place a marker.`);
    navigate('/order-success', {
      state: {
        type: 'donation',
        amount: selected,
        frequency: 'one-time',
        name: name.trim(),
      },
    });
  };

  return (
    <section className="donate-exp" id="support">
      <div className="container donate-exp-grid">
        <div className="donate-exp-copy">
          <p className="label">Support</p>
          <h2>
            You don’t need to purchase a pair
            <br />
            to help preserve a memory.
          </h2>
          <p>
            Direct contributions support the same purpose — permanent headstones for unmarked graves of former
            residential school survivors.
          </p>
        </div>

        <form className="donate-exp-panel" onSubmit={submit}>
          <p className="donate-choose">Choose an amount</p>
          <div className="donate-amounts" role="group" aria-label="Donation amounts">
            {AMOUNTS.map((value) => (
              <button
                key={value}
                type="button"
                className={!custom && amount === value ? 'is-active' : ''}
                onClick={() => {
                  setAmount(value);
                  setCustom('');
                }}
              >
                ${value}
              </button>
            ))}
          </div>

          <label className="field">
            <span>Custom amount (CAD)</span>
            <input
              type="number"
              min="1"
              step="1"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter amount"
            />
          </label>

          <label className="field">
            <span>Full name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <Button type="submit" variant="primary" className="btn-block" arrow>
            Support the Mission
          </Button>
        </form>
      </div>
    </section>
  );
}
