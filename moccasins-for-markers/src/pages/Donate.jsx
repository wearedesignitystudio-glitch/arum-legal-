import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import './Home.css';

export default function Donate() {
  const { showToast } = useCart();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(85);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const selected = custom ? Number(custom) : amount;

  const onDonate = (e) => {
    e.preventDefault();
    if (!selected || selected < 1 || !name.trim() || !email.trim()) {
      showToast('Please complete amount, name, and email.');
      return;
    }
    showToast(`Thank you, ${name.trim()}.`);
    navigate('/order-success', {
      state: { type: 'donation', amount: selected, frequency: 'one-time', name: name.trim() },
    });
  };

  return (
    <div className="page">
      <Seo title="Give" description="Support permanent headstones for unmarked graves." path="/donate" />
      <section className="page-hero container">
        <Reveal>
          <p className="label">Support</p>
          <h1>Preserve a memory.</h1>
          <p>Direct gifts fund permanent headstones for unmarked graves of former residential school survivors.</p>
        </Reveal>
      </section>
      <div className="dusk-zone">
        <section className="dd-give" style={{ borderTop: 'none' }}>
          <div className="container dd-give-grid">
            <Reveal>
              <p className="label">Give</p>
              <h2>
                You don’t need to purchase a pair
                <br />
                to help preserve a memory.
              </h2>
            </Reveal>
            <form className="dd-give-form" onSubmit={onDonate}>
              <div className="dd-amounts">
                {[25, 50, 85, 150].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={!custom && amount === v ? 'is-on' : ''}
                    onClick={() => {
                      setAmount(v);
                      setCustom('');
                    }}
                  >
                    ${v}
                  </button>
                ))}
              </div>
              <label className="field">
                <span>Custom CAD</span>
                <input type="number" min="1" value={custom} onChange={(e) => setCustom(e.target.value)} />
              </label>
              <label className="field">
                <span>Name</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <Button type="submit" variant="primary" arrow>
                Support the mission
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
