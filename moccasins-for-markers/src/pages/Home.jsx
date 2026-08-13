import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import DonationSelector from '../components/donate/DonationSelector';
import { PRODUCTS, asset } from '../data/products';
import './Home.css';

const JOURNEY = [
  {
    n: '01',
    title: 'Crafted',
    copy: 'A pair of miniature ornamental moccasins is carefully handmade — cut, stitched, and beaded one at a time.',
  },
  {
    n: '02',
    title: 'Chosen',
    copy: 'Someone purchases a pair or contributes directly — beauty held with intention.',
  },
  {
    n: '03',
    title: 'Given',
    copy: 'Funds are directed toward permanent memorial markers for unmarked graves.',
  },
  {
    n: '04',
    title: 'Remembered',
    copy: 'A lasting marker helps preserve dignity where silence once stood.',
  },
];

export default function Home() {
  const reduce = useReducedMotion();
  const featured = PRODUCTS.slice(0, 6);

  return (
    <>
      <Seo
        title="Moccasins for Markers | Every stitch honours a name"
        description="Handmade ornamental moccasins created with care and purpose. Every purchase helps fund permanent headstones for unmarked graves of former residential school survivors."
        path="/"
      />

      {/* 1. Cinematic hero */}
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src={asset('hero-craft.jpg')} alt="" />
          <div className="hero-veil" />
        </div>
        <div className="container hero-content">
          <motion.p
            className="hero-eyebrow"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Craft · Remembrance · Dignity
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8 }}
          >
            Every stitch
            <br />
            honours a <em>name.</em>
          </motion.h1>
          <motion.p
            className="hero-lede"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.75 }}
          >
            Handmade ornamental moccasins created with care and purpose. Every purchase helps fund permanent
            headstones for unmarked graves of former residential school survivors.
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
          >
            <Button to="/shop" variant="light" arrow>
              Shop the Moccasins
            </Button>
            <Button to="/donate" variant="secondary" className="hero-secondary">
              Support a Marker
            </Button>
          </motion.div>
        </div>
        <a href="#why" className="hero-scroll" aria-label="Scroll to purpose">
          <span>Scroll</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </a>
      </section>

      {/* 2. Purpose statement */}
      <section id="why" className="purpose section">
        <div className="container-narrow purpose-inner">
          <Reveal>
            <p className="kicker">Why we exist</p>
            <h2 className="purpose-statement">
              We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
              former residential school survivors.
            </h2>
            <p className="purpose-accent">
              Handcrafted remembrance with lasting purpose — <em>beauty that becomes stone.</em>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Mission split */}
      <section className="section section-ivory mission-split">
        <div className="container split">
          <Reveal>
            <div className="editorial-image">
              <img src={asset('moccasin-emerald-heart.jpg')} alt="Emerald Heart ornamental moccasins" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kicker">Our mission</p>
            <h2>Sew. Sell. Mark.</h2>
            <p>
              Each pair is made slowly by hand — intimate enough to hold, meaningful enough to keep. The work is
              ornamental by design: a keepsake of care, not footwear.
            </p>
            <p className="muted">
              Sales and gifts are directed toward permanent headstones — lasting markers where unmarked graves of
              former residential school survivors still wait for dignity in stone.
            </p>
            <div className="cta-row">
              <Button to="/mission" variant="primary" arrow>
                Our Story
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Journey */}
      <section className="section journey">
        <div className="container">
          <Reveal className="section-intro">
            <p className="kicker">The path</p>
            <h2>The journey of a pair</h2>
            <p className="muted">From the workbench to lasting remembrance — a clear path, kept honest.</p>
          </Reveal>
          <div className="journey-track">
            {JOURNEY.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06} className="journey-step">
                <span className="journey-num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Collection */}
      <section className="section section-ivory collection">
        <div className="container">
          <Reveal className="section-intro collection-intro">
            <div>
              <p className="kicker">The Collection</p>
              <h2>A small curated gathering</h2>
              <p className="muted">
                Each piece is handmade in limited numbers — craftsmanship connected to remembrance.
              </p>
            </div>
            <Button to="/shop" variant="secondary" arrow>
              View all
            </Button>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductGrid products={featured} />
          </Reveal>
          <p className="collection-footnote">
            Proceeds from every purchase support permanent headstones for unmarked graves of former residential school
            survivors.
          </p>
        </div>
      </section>

      {/* 6. Memorial quote */}
      <section className="quote-break">
        <div className="container-narrow">
          <Reveal>
            <p className="quote-mark" aria-hidden="true">
              “
            </p>
            <blockquote>
              <p>Every stitch honours a name.</p>
            </blockquote>
            <p className="quote-attrib">Handmade honour. Permanent stone.</p>
          </Reveal>
        </div>
      </section>

      {/* 7. Impact */}
      <section className="section section-dark impact-band">
        <div className="container impact-grid">
          <Reveal>
            <div className="impact-photo">
              <img src={asset('impact-marker.jpg')} alt="A permanent headstone in a quiet field at sunset" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="impact-copy">
            <p className="kicker">The Impact</p>
            <h2>From handmade craft to lasting remembrance.</h2>
            <p>
              Your purchase or gift helps place permanent markers for those who were taken and never properly named —
              people who may have no one left to remember them.
            </p>
            <p className="muted">
              We do not invent statistics. We keep the promise simple and accountable: proceeds support permanent
              headstones for unmarked graves of former residential school survivors.
            </p>
            <div className="cta-row">
              <Button to="/impact" variant="light" arrow>
                See how it works
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Craftsmanship */}
      <section className="section craft-band">
        <div className="container">
          <Reveal className="section-intro">
            <p className="kicker">Craftsmanship</p>
            <h2>Made by hand. Given with purpose.</h2>
          </Reveal>
          <div className="craft-collage">
            <Reveal className="craft-cell craft-a">
              <img src={asset('craft-table.jpg')} alt="Leather, beads, and thread on a workbench" />
              <span>Materials at the table</span>
            </Reveal>
            <Reveal delay={0.06} className="craft-cell craft-b">
              <img src={asset('moccasin-bear-medicine.jpg')} alt="Bear Medicine ornamental moccasins" />
              <span>Finished pair</span>
            </Reveal>
            <Reveal delay={0.1} className="craft-cell craft-c">
              <img src={asset('moccasin-turquoise-bloom.jpg')} alt="Turquoise Bloom ornamental moccasins" />
              <span>Beadwork detail</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. Story teaser */}
      <section className="section section-parchment story-teaser">
        <div className="container split reverse">
          <Reveal>
            <div className="editorial-image">
              <img src={asset('hero.jpg')} alt="Ornamental moccasins in soft light" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kicker">Our Story</p>
            <h2>Why the moccasins.</h2>
            <p>
              Moccasins for Markers began with a simple belief: craft can become remembrance — and beauty can fund
              dignity.
            </p>
            <p className="muted">
              Ornamental tiny moccasins are chosen as keepsakes of care. Each sale becomes a step toward permanent
              stone for unmarked graves of former residential school survivors.
            </p>
            <div className="cta-row">
              <Button to="/mission" variant="primary" arrow>
                Read our story
              </Button>
              <Button to="/journal" variant="secondary">
                Journal
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Donation */}
      <section className="section section-dark donate-band">
        <div className="container donate-grid">
          <Reveal className="donate-copy">
            <p className="kicker">Support the mission</p>
            <h2>Help place a lasting marker.</h2>
            <p>
              If you prefer to give directly, your contribution supports the same purpose — permanent headstones for
              unmarked graves of former residential school survivors.
            </p>
            <p className="muted">One-time or monthly. Every gift is received with gratitude.</p>
          </Reveal>
          <Reveal delay={0.1} className="donate-panel">
            <DonationSelector compact />
          </Reveal>
        </div>
      </section>

      {/* 11. Contact */}
      <section className="section contact-band">
        <div className="container contact-inner">
          <Reveal>
            <p className="kicker">Walk with us</p>
            <h2>Questions, partnerships, and remembrance.</h2>
            <p className="muted">
              For order questions, memorial partnerships, or general inquiries — we welcome your message.
            </p>
            <a className="contact-email" href="mailto:hello@moccasinsformarkers.ca">
              hello@moccasinsformarkers.ca
            </a>
            <div className="cta-row">
              <Button to="/contact" variant="primary" arrow>
                Contact
              </Button>
              <Button to="/faq" variant="secondary">
                FAQ
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
