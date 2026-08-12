import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { PRODUCTS, BUNDLES, asset } from '../data/products';
import { FAQ_ITEMS } from '../data/content';
import { PurposeBanner, BundleBanners } from '../components/ui/PromoBanners';
import './Home.css';

const CATEGORIES = [
  { title: 'Featured', copy: 'Signature pairs chosen for their craft and meaning.', to: '/shop' },
  { title: 'New', copy: 'Recently finished designs, made in limited numbers.', to: '/shop' },
  { title: 'Remembrance', copy: 'Pieces that honour names through handmade form.', to: '/mission' },
  { title: 'Donate', copy: 'Support a permanent marker directly.', to: '/donate' },
];

const STEPS = [
  ['Browse', 'Explore handmade ornamental pairs in the collection.'],
  ['Choose', 'Select a design that speaks to you.'],
  ['Support', 'Your purchase funds permanent headstones.'],
  ['Remember', 'Dignity is restored through lasting stone.'],
];

export default function Home() {
  const reduce = useReducedMotion();
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      <Seo
        title="Moccasins for Markers | Every stitch honours a name"
        description="Handmade ornamental moccasins created with care and purpose. Every purchase helps fund permanent headstones for unmarked graves of former residential school survivors."
        path="/"
      />

      <section className="dna-hero">
        <div className="container dna-hero-grid">
          <div className="dna-hero-copy">
            <motion.p
              className="kicker"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Handmade honour · Permanent stone
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              Every stitch
              <br />
              honours a <em>name.</em>
            </motion.h1>
            <motion.p
              className="dna-hero-lede"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Handmade ornamental moccasins created with care and purpose. Every purchase helps fund permanent
              headstones for unmarked graves of former residential school survivors.
            </motion.p>
            <motion.div
              className="dna-hero-ctas"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
            >
              <Button to="/shop" variant="primary">
                Shop the Collection
              </Button>
              <Button to="/mission" variant="secondary">
                Our Story
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="dna-hero-visual"
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <img src={asset('moccasin-emerald-heart.jpg')} alt="Emerald Heart ornamental moccasins" />
          </motion.div>
        </div>
      </section>

      <section className="dna-trust">
        <div className="container dna-trust-inner">
          <p>
            <strong>Crafted with care. Directed to remembrance.</strong>
            <span> Sew · Sell · Mark — every pair funds permanent headstones.</span>
          </p>
        </div>
      </section>

      <PurposeBanner />

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
          <Reveal delay={0.08}>
            <ProductGrid products={featured} />
          </Reveal>
        </div>
      </section>

      <BundleBanners bundles={BUNDLES} />

      <section className="section dna-features">
        <div className="container dna-features-grid">
          {[
            ['Handcrafted', 'Cut, stitched, and beaded one pair at a time.'],
            ['Meaningful', 'Each design carries care into remembrance.'],
            ['Transparent', 'Sales support permanent headstones.'],
            ['Limited', 'Small-batch ornamental pieces, never mass-made.'],
          ].map(([title, copy], i) => (
            <Reveal key={title} delay={i * 0.05} className="dna-feature">
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="kicker">Explore</p>
              <h2>Find your path</h2>
            </div>
          </Reveal>
          <div className="dna-cats">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.05}>
                <Link to={cat.to} className="dna-cat">
                  <h3>{cat.title}</h3>
                  <p>{cat.copy}</p>
                  <span>Explore</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bridge-impact">
        <div className="container bridge-impact-inner">
          <Reveal className="bridge-impact-media">
            <img src={asset('hero-craft.jpg')} alt="Handmade ornamental moccasins on stone at sunset" />
            <img src={asset('impact-marker.jpg')} alt="A permanent headstone in a quiet field" />
          </Reveal>
          <Reveal delay={0.1} className="bridge-impact-copy">
            <p className="kicker">The bridge</p>
            <h2>Beauty made by hand. Remembrance set in stone.</h2>
            <p className="muted">
              Each ornamental pair begins at the workbench and ends in lasting honour — proceeds directed to permanent
              markers where unmarked graves still wait for a name.
            </p>
            <div className="bridge-impact-meta">
              <div>
                <strong>$85 CAD</strong>
                <span>Per handmade pair</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Sales support markers</span>
              </div>
            </div>
            <Button to="/impact" variant="primary">
              See how it works
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal className="section-head center-head">
            <div>
              <p className="kicker">How it works</p>
              <h2>Beauty → Purpose → Remembrance</h2>
            </div>
          </Reveal>
          <div className="dna-steps">
            {STEPS.map(([title, copy], i) => (
              <Reveal key={title} delay={i * 0.05} className="dna-step">
                <span>{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dna-faq">
        <div className="container dna-faq-grid">
          <Reveal>
            <p className="kicker">Questions</p>
            <h2>Frequently asked</h2>
            <p className="muted">Clear answers about the craft, the cause, and how to support the work.</p>
            <Button to="/faq" variant="secondary">
              View all FAQ
            </Button>
          </Reveal>
          <div>
            {FAQ_ITEMS.slice(0, 4).map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04} className="dna-faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dna-final">
        <div className="container dna-final-inner">
          <Reveal>
            <h2>Walk with us.</h2>
            <p>Shop a handmade pair — or donate directly to help place a permanent marker.</p>
            <div className="dna-hero-ctas">
              <Button to="/shop" variant="primary">
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
