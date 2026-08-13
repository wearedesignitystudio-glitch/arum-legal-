import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { PRODUCTS, asset, formatMoney } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const LOOK = PRODUCTS.slice(0, 8);

export default function Home() {
  const reduce = useReducedMotion();
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

      {/* FULL-BLEED OPENING — image is the website */}
      <section className="ex-open">
        <motion.img
          src={asset('hero-craft.jpg')}
          alt="Handmade ornamental moccasins"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
        />
        <div className="ex-open-veil" />
        <div className="ex-open-meta">
          <p>Moccasins for Markers</p>
          <p>Exhibition / Remembrance</p>
        </div>
        <a href="#manifesto" className="ex-scroll">
          Enter
        </a>
      </section>

      {/* MANIFESTO VOID */}
      <section id="manifesto" className="ex-manifesto">
        <Reveal>
          <p className="label">01 — Manifesto</p>
          <h1>
            Every stitch
            <br />
            honours a
            <em> name.</em>
          </h1>
          <p className="ex-lede">
            We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
            former residential school survivors.
          </p>
        </Reveal>
      </section>

      {/* CHAPTER PLATES */}
      <section className="ex-plate">
        <div className="ex-plate-img">
          <img src={asset('moccasin-emerald-heart.jpg')} alt="Emerald Heart pair" />
        </div>
        <div className="ex-plate-copy">
          <p className="label">Plate 02</p>
          <h2>Craft as remembrance.</h2>
          <p>
            Ornamental pairs — not footwear — made slowly by hand. Intimate enough to hold. Meaningful enough to keep.
          </p>
        </div>
      </section>

      <section className="ex-plate ex-plate-flip">
        <div className="ex-plate-copy">
          <p className="label">Plate 03</p>
          <h2>From leather to limestone.</h2>
          <p>
            A purchase or gift becomes permanent stone — dignity restored where unmarked graves still wait.
          </p>
          <Link to="/impact" className="ex-text-link">
            The purpose →
          </Link>
        </div>
        <div className="ex-plate-img">
          <img src={asset('impact-marker.jpg')} alt="A headstone at sunset" />
        </div>
      </section>

      {/* HORIZONTAL LOOKBOOK */}
      <section className="ex-lookbook">
        <div className="ex-lookbook-head">
          <p className="label">04 — Collection</p>
          <h2>Pieces with purpose.</h2>
          <p>Scroll sideways. Choose with intention.</p>
        </div>
        <div className="ex-rail" tabIndex={0} aria-label="Product lookbook">
          {LOOK.map((p, i) => (
            <article key={p.id} className="ex-rail-card">
              <Link to={`/shop/${p.slug}`}>
                <img src={asset(p.image)} alt={p.name} loading={i > 1 ? 'lazy' : 'eager'} />
                <div>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.name}</h3>
                  <p>{formatMoney(p.price)}</p>
                </div>
              </Link>
            </article>
          ))}
          <Link to="/shop" className="ex-rail-more">
            All pieces →
          </Link>
        </div>
      </section>

      {/* TYPE ONLY BREAK */}
      <section className="ex-typebreak">
        <Reveal>
          <p>
            Made slowly.
            <br />
            Given purposefully.
            <br />
            Remembered forever.
          </p>
        </Reveal>
      </section>

      {/* JOURNEY STRIP */}
      <section className="ex-journey">
        {[
          ['Crafted', 'moccasin-bear-medicine.jpg', 'Handmade, one pair at a time.'],
          ['Chosen', 'moccasin-turquoise-bloom.jpg', 'A piece selected with care.'],
          ['Given', 'craft-table.jpg', 'Proceeds directed to markers.'],
          ['Remembered', 'impact-marker.jpg', 'Permanent stone. Lasting dignity.'],
        ].map(([title, img, copy], i) => (
          <Reveal key={title} delay={i * 0.05} className="ex-journey-row">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
            <img src={asset(img)} alt="" loading="lazy" />
          </Reveal>
        ))}
      </section>

      {/* PAPER INTERRUPT */}
      <section className="ex-paper">
        <div className="container-narrow">
          <Reveal>
            <p className="label">05 — Why it matters</p>
            <h2>Your purchase is not just helping — it is helping those who don’t have anyone.</h2>
            <p>
              Permanent headstones for unmarked graves of former residential school survivors. We do not invent
              statistics. We keep the promise clear.
            </p>
            <Button to="/mission" variant="primary" arrow>
              Read the story
            </Button>
          </Reveal>
        </div>
      </section>

      {/* MOSAIC */}
      <section className="ex-mosaic">
        <img className="m1" src={asset('craft-table.jpg')} alt="" loading="lazy" />
        <img className="m2" src={asset('moccasin-night-star.jpg')} alt="" loading="lazy" />
        <img className="m3" src={asset('moccasin-coral-path.jpg')} alt="" loading="lazy" />
        <div className="ex-mosaic-caption">
          <p className="label">06 — At the table</p>
          <h2>Made by hand.</h2>
        </div>
      </section>

      {/* GIVE */}
      <section className="ex-give" id="give">
        <div className="ex-give-copy">
          <p className="label">07 — Support</p>
          <h2>
            You don’t need a pair
            <br />
            to preserve a memory.
          </h2>
        </div>
        <form className="ex-give-form" onSubmit={onDonate}>
          <div className="ex-amounts">
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
      </section>

      {/* EMPTY CLOSING */}
      <section className="ex-end">
        <Reveal>
          <p className="label">Moccasins for Markers</p>
          <h2>Carry it forward.</h2>
          <div className="ex-end-links">
            <Link to="/shop">Shop</Link>
            <Link to="/donate">Give</Link>
            <a href="mailto:hello@moccasinsformarkers.ca">Write</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
