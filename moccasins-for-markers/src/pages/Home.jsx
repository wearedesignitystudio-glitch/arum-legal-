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
  const pieces = PRODUCTS.slice(0, 6);
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
    <>
      <Seo
        title="Moccasins for Markers"
        description="Handmade ornamental moccasins funding permanent headstones for unmarked graves of former residential school survivors."
        path="/"
      />

      {/* DAY — Title page */}
      <section className="dd-title">
        <motion.div
          className="dd-title-copy"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <p className="label">A handmade offering</p>
          <h1>
            Moccasins
            <em> for </em>
            Markers
          </h1>
          <p className="dd-subtitle">Handcrafted remembrance with lasting purpose.</p>
          <Link to="#day-story" className="dd-link">
            Begin ↓
          </Link>
        </motion.div>
        <motion.div
          className="dd-title-photo"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
        >
          <img src={asset('moccasin-emerald-heart.jpg')} alt="Emerald Heart ornamental moccasins" />
        </motion.div>
      </section>

      {/* DAY — Quiet statement */}
      <section id="day-story" className="dd-quiet">
        <Reveal>
          <p className="label">Why</p>
          <h2>
            We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
            former residential school survivors.
          </h2>
        </Reveal>
      </section>

      {/* DAY — Two truths */}
      <section className="dd-truths">
        <Reveal className="dd-truth">
          <img src={asset('craft-table.jpg')} alt="Leather and beads on a workbench" />
          <div>
            <p className="label">Daylight · Craft</p>
            <h3>Made by hand, one pair at a time.</h3>
            <p>Ornamental keepsakes — intimate enough to hold, meaningful enough to keep.</p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="dd-truth dd-truth-offset">
          <img src={asset('hero-craft.jpg')} alt="Moccasins in golden light" />
          <div>
            <p className="label">Daylight · Beauty</p>
            <h3>Every stitch honours a name.</h3>
            <p>Each piece is chosen with intention — beauty that carries purpose.</p>
          </div>
        </Reveal>
      </section>

      {/* DAY — Catalogue */}
      <section className="dd-catalogue">
        <div className="container">
          <Reveal className="dd-cat-head">
            <p className="label">Collection</p>
            <h2>Choose a piece with purpose.</h2>
          </Reveal>
          <div className="dd-cat-grid">
            {pieces.map((p, i) => (
              <article key={p.id} className={`dd-item dd-span-${i === 2 ? 'wide' : 'std'}`}>
                <Link to={`/shop/${p.slug}`}>
                  <img src={asset(p.image)} alt={p.name} loading={i > 1 ? 'lazy' : 'eager'} />
                  <div className="dd-item-meta">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <h3>{p.name}</h3>
                    <p>{formatMoney(p.price)}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="dd-cat-foot">
            <Button to="/shop" variant="primary" arrow>
              View all pieces
            </Button>
          </div>
        </div>
      </section>

      {/* THRESHOLD — dusk gate */}
      <section id="dusk-gate" className="dd-threshold">
        <img src={asset('impact-marker.jpg')} alt="A headstone in a quiet field at sunset" />
        <div className="dd-threshold-veil" />
        <Reveal className="dd-threshold-copy">
          <p className="label">Threshold</p>
          <h2>
            From leather
            <br />
            to limestone.
          </h2>
        </Reveal>
      </section>

      {/* DUSK zone */}
      <div className="dusk-zone">
        <section className="dd-dusk-purpose">
          <div className="container dd-dusk-grid">
            <Reveal>
              <p className="label">Purpose</p>
              <h2>A handmade object can become part of something permanent.</h2>
              <p>
                Your purchase or gift helps place permanent headstones for unmarked graves of former residential school
                survivors — people who may have no one left to remember them.
              </p>
              <p className="dd-note">We do not invent statistics. We keep the promise clear.</p>
              <Button to="/impact" variant="light" arrow>
                How it works
              </Button>
            </Reveal>
            <Reveal delay={0.1} className="dd-dusk-steps">
              {[
                ['Crafted', 'Handmade ornamental pairs.'],
                ['Chosen', 'Purchased or given with care.'],
                ['Given', 'Funds directed to markers.'],
                ['Remembered', 'Dignity restored in stone.'],
              ].map(([t, c], i) => (
                <div key={t}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{t}</h3>
                  <p>{c}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="dd-give">
          <div className="container dd-give-grid">
            <Reveal>
              <p className="label">Support</p>
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

        <section className="dd-close">
          <Reveal>
            <p className="label">Moccasins for Markers</p>
            <h2>Carry the story forward.</h2>
            <div className="dd-close-links">
              <Link to="/shop">Collection</Link>
              <Link to="/donate">Give</Link>
              <a href="mailto:hello@moccasinsformarkers.ca">hello@moccasinsformarkers.ca</a>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
