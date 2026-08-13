import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { PRODUCTS, asset, formatMoney } from '../data/products';
import { useCart } from '../context/CartContext';
import './Home.css';

export default function Home() {
  const reduce = useReducedMotion();
  const featured = PRODUCTS.slice(0, 3);
  const { showToast } = useCart();
  const navigate = useNavigate();
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
    <>
      <Seo
        title="Moccasins for Markers"
        description="Handmade ornamental moccasins funding permanent headstones for unmarked graves of former residential school survivors."
        path="/"
      />

      {/* Quiet opening */}
      <section className="ql-hero">
        <motion.div
          className="ql-hero-copy"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="label">Moccasins for Markers</p>
          <h1>
            Every stitch
            <br />
            honours a name.
          </h1>
          <p className="ql-lede">
            Handmade ornamental moccasins — so permanent headstones can honour unmarked graves of former residential
            school survivors.
          </p>
          <div className="ql-hero-actions">
            <Button to="/shop" variant="primary" arrow>
              Shop the collection
            </Button>
            <a href="#remembrance" className="ql-text-link">
              Support a marker
            </a>
          </div>
        </motion.div>
        <motion.div
          className="ql-hero-visual"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.15 }}
        >
          <img src={asset('hero-craft.jpg')} alt="Handmade ornamental moccasins" />
        </motion.div>
      </section>

      {/* Breath */}
      <section className="ql-breath">
        <Reveal>
          <p>
            We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
            former residential school survivors.
          </p>
        </Reveal>
      </section>

      {/* Three pieces only */}
      <section className="ql-pieces">
        <div className="container">
          <Reveal className="ql-pieces-head">
            <p className="label">The collection</p>
            <h2>Made by hand.</h2>
          </Reveal>
          <div className="ql-piece-grid">
            {featured.map((p) => (
              <article key={p.id}>
                <Link to={`/shop/${p.slug}`}>
                  <img src={asset(p.image)} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>{formatMoney(p.price)}</p>
                </Link>
              </article>
            ))}
          </div>
          <Link to="/shop" className="ql-text-link ql-more">
            View all pieces →
          </Link>
        </div>
      </section>

      {/* SIGNATURE — real headstone + donate */}
      <section id="remembrance" className="ql-remembrance">
        <div className="ql-stone">
          <img
            src={asset('impact-marker-blank.jpg')}
            alt="A real granite headstone in a quiet field at sunset"
          />
          <p className="ql-stone-caption">Permanent stone. Lasting dignity.</p>
        </div>

        <div className="ql-donate">
          <p className="label">Remembrance</p>
          <h2>
            Help place a
            <br />
            lasting marker.
          </h2>
          <p className="ql-donate-copy">
            Your gift supports permanent headstones for unmarked graves of former residential school survivors — for
            those who may have no one left to remember them.
          </p>

          <form onSubmit={onDonate}>
            <p className="ql-choose">Choose an amount</p>
            <div className="ql-amounts" role="group" aria-label="Donation amounts">
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
          </form>
        </div>
      </section>

      {/* Closing hush */}
      <section className="ql-close">
        <Reveal>
          <h2>Carry the story forward.</h2>
          <div className="ql-close-links">
            <Link to="/shop">Shop</Link>
            <Link to="/mission">Our story</Link>
            <a href="mailto:hello@moccasinsformarkers.ca">hello@moccasinsformarkers.ca</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
