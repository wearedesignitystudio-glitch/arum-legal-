import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../ui/Button';
import { asset } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './RemembranceSplit.css';

const AMOUNTS = [25, 50, 85, 150];

export default function RemembranceSplit({ id = 'remembrance' }) {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const { showToast } = useCart();
  const [amount, setAmount] = useState(85);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const selected = custom ? Number(custom) : amount;

  const onDonate = (e) => {
    e.preventDefault();
    if (!selected || selected < 1) {
      showToast('Please choose an amount.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      showToast('Please add your name and email.');
      return;
    }
    showToast(`Thank you, ${name.trim()}.`);
    navigate('/order-success', {
      state: { type: 'donation', amount: selected, frequency: 'one-time', name: name.trim() },
    });
  };

  return (
    <section id={id} className="rs">
      <div className="rs-stone">
        <motion.img
          src={asset('impact-marker-blank.jpg')}
          alt="A blank granite headstone standing in a quiet field at sunset"
          initial={reduce ? false : { scale: 1.06 }}
          whileInView={reduce ? undefined : { scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        className="rs-donate"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rs-donate-inner">
          <p className="label">Remembrance</p>
          <h2>
            Help place a
            <br />
            lasting marker.
          </h2>
          <p className="rs-line">Permanent stone. Lasting dignity.</p>
          <p className="rs-copy">
            Your gift supports permanent headstones for unmarked graves of former residential school survivors —
            for those who may have no one left to remember them.
          </p>

          <form onSubmit={onDonate} className="rs-form">
            <p className="rs-choose">Choose an amount</p>
            <div className="rs-amounts" role="group" aria-label="Donation amounts">
              {AMOUNTS.map((v) => (
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
              <span>Custom amount (CAD)</span>
              <input
                type="number"
                min="1"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="Or enter your own"
              />
            </label>
            <label className="field">
              <span>Full name</span>
              <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>

            <Button type="submit" variant="primary" className="btn-block" arrow>
              Support a marker
            </Button>
            <p className="rs-thanks">Received with quiet gratitude.</p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
