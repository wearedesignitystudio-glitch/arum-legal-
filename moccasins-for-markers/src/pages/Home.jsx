import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import RemembranceSplit from '../components/donate/RemembranceSplit';
import { PRODUCTS, asset, formatMoney } from '../data/products';
import './Home.css';

export default function Home() {
  const reduce = useReducedMotion();
  const featured = PRODUCTS.slice(0, 3);

  return (
    <>
      <Seo
        title="Moccasins for Markers"
        description="Handmade ornamental moccasins funding permanent headstones for unmarked graves of former residential school survivors."
        path="/"
      />

      <section className="ql-hero">
        <motion.div
          className="ql-hero-copy"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="ql-brand">Moccasins for Markers</p>
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
          transition={{ duration: 1.4, delay: 0.1 }}
        >
          <img src={asset('hero-craft.jpg')} alt="Handmade ornamental moccasins" />
        </motion.div>
      </section>

      <section className="ql-breath">
        <Reveal>
          <p>
            We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
            former residential school survivors.
          </p>
        </Reveal>
      </section>

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

      <RemembranceSplit />

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
