import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { PRODUCTS, asset } from '../data/products';
import { JOURNAL } from '../data/content';
import DonationSelector from '../components/donate/DonationSelector';
import './Home.css';

export default function Home() {
  const reduce = useReducedMotion();
  const featured = PRODUCTS.filter((p) => p.tags.includes('featured')).slice(0, 3);

  return (
    <>
      <Seo
        title="Moccasins for Markers | Every stitch honours a name"
        description="Handmade ornamental moccasins created with care and purpose. Every purchase helps fund permanent headstones for unmarked graves of former residential school survivors."
        path="/"
      />

      <section className="home-hero">
        <div className="home-hero-media" aria-hidden="true">
          <motion.img
            src={asset('hero.jpg')}
            alt=""
            initial={reduce ? false : { scale: 1 }}
            animate={reduce ? undefined : { scale: 1.04 }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          />
          <div className="home-hero-veil" />
        </div>
        <div className="home-hero-content">
          <motion.p
            className="kicker kicker-light"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Handmade honour · Permanent stone
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Every stitch
            <br />
            honours a name.
          </motion.h1>
          <motion.p
            className="home-hero-lede"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.75 }}
          >
            Handmade ornamental moccasins created with care and purpose. Every purchase helps fund permanent
            headstones for unmarked graves of former residential school survivors.
          </motion.p>
          <motion.div
            className="home-hero-ctas"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7 }}
          >
            <Button to="/shop" variant="gold">
              Shop the Collection
            </Button>
            <Button to="/mission" variant="light">
              Discover Our Story
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="section brand-statement">
        <div className="container">
          <Reveal>
            <p className="brand-statement-text">
              Handmade with care.
              <br />
              Created to remember.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="kicker">The Collection</p>
              <h2>Featured pieces</h2>
            </div>
            <Button to="/shop" variant="secondary">
              View all
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <ProductGrid products={featured.length ? featured : PRODUCTS.slice(0, 3)} />
          </Reveal>
        </div>
      </section>

      <section className="section craft-section">
        <div className="container split">
          <Reveal>
            <div className="editorial-image">
              <img src={asset('craft-table.jpg')} alt="Leather, beads, and craft tools on a wooden table" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="kicker">The Craft</p>
            <h2>
              Made by hand.
              <br />
              Held with meaning.
            </h2>
            <p className="muted">
              Each ornamental pair is cut, stitched, and beaded by hand. The work is slow on purpose — a practice of
              care that mirrors the remembrance it supports.
            </p>
            <Button to="/mission" variant="secondary">
              Discover the craft →
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="impact-band">
        <div className="impact-band-media" aria-hidden="true">
          <img src={asset('impact-marker.jpg')} alt="" />
          <div className="impact-band-veil" />
        </div>
        <div className="container">
          <Reveal>
            <p className="kicker kicker-light">Impact</p>
            <h2>From leather to limestone.</h2>
            <p className="impact-band-lede">
              Your purchase helps place permanent markers for those who were taken and never properly named.
            </p>
            <div className="impact-flow">
              {['Moccasin', 'Purchase', 'Contribution', 'Memorial'].map((step, i) => (
                <div key={step} className="impact-flow-step">
                  <span>0{i + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
            <Button to="/impact" variant="light">
              See how it works
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split reverse story-split">
          <Reveal>
            <div className="editorial-image story-image">
              <img src={asset('hero-craft.jpg')} alt="Beaded ornamental moccasins resting on stone in soft light" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kicker">Remembrance</p>
            <h2>
              Some names were never given a stone.
              <br />
              We believe they deserve to be remembered.
            </h2>
            <p className="muted">
              We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
              former residential school survivors.
            </p>
            <Button to="/mission" variant="secondary">
              Read our mission
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-tight donate-home">
        <div className="container donate-home-grid">
          <Reveal>
            <p className="kicker">Donate</p>
            <h2>Support a headstone directly.</h2>
            <p className="muted">
              Prefer to give without purchasing? Your donation still funds permanent markers with dignity and care.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <DonationSelector compact />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="kicker">Journal</p>
              <h2>Stories from the work</h2>
            </div>
            <Button to="/journal" variant="secondary">
              View journal
            </Button>
          </Reveal>
          <div className="journal-grid">
            {JOURNAL.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link to={`/journal`} className="journal-card">
                  <div className="journal-card-media">
                    <img src={asset(post.image)} alt="" />
                  </div>
                  <p className="kicker">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <Reveal>
            <h2>Walk with us.</h2>
            <p>Beauty, craft, and remembrance — one stitch at a time.</p>
            <div className="home-hero-ctas">
              <Button to="/shop" variant="gold">
                Shop the Collection
              </Button>
              <Button to="/donate" variant="secondary">
                Make a Donation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
