import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import './DonationSelector.css';

const AMOUNTS = [25, 50, 100, 250];

export default function DonationSelector({ compact = false }) {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { showToast } = useCart();
  const navigate = useNavigate();

  const selected = custom ? Number(custom) : amount;

  const submit = (e) => {
    e.preventDefault();
    if (!selected || selected < 1) {
      showToast('Please choose a donation amount.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      showToast('Please add your name and email.');
      return;
    }
    showToast(`Thank you, ${name.trim()}. Your ${frequency} gift of $${selected} CAD helps place a marker.`);
    navigate('/order-success', {
      state: {
        type: 'donation',
        amount: selected,
        frequency,
        name: name.trim(),
      },
    });
  };

  return (
    <form className={`donate-selector ${compact ? 'is-compact' : ''}`} onSubmit={submit}>
      <div className="freq">
        <button
          type="button"
          className={frequency === 'one-time' ? 'is-active' : ''}
          onClick={() => setFrequency('one-time')}
        >
          One-time
        </button>
        <button
          type="button"
          className={frequency === 'monthly' ? 'is-active' : ''}
          onClick={() => setFrequency('monthly')}
        >
          Monthly
        </button>
      </div>

      <div className="amounts" role="group" aria-label="Donation amounts">
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

      {!compact && (
        <>
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
        </>
      )}

      {compact ? (
        <Button to="/donate" variant="primary" className="btn-block">
          Continue to donate
        </Button>
      ) : (
        <Button type="submit" variant="primary" className="btn-block">
          Donate now
        </Button>
      )}
      <p className="note">Demo donation flow — ready to connect Stripe or PayPal.</p>
    </form>
  );
}
