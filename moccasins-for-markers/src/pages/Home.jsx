import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import EditorialPiece from '../components/product/EditorialPiece';
import ImpactStory from '../components/home/ImpactStory';
import DonationExperience from '../components/donate/DonationExperience';
import { PRODUCTS, asset } from '../data/products';
import './Home.css';

export default function Home() {
  const reduce = useReducedMotion();
  const pieces = PRODUCTS.slice(0, 6);

  return (
    <>
      <Seo
        title="Moccasins for Markers | Every stitch honours a name"
        description="Handmade ornamental moccasins created with care and purpose. Every purchase helps fund permanent headstones for unmarked graves of former residential school survivors."
        path="/"
      />

      {/* 01 — Cinematic opening */}
      <section className="cine-hero">
        <div className="cine-left">
          <motion.div
            className="cine-left-inner"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <img className="cine-logo" src={asset('logo.png')} alt="" width="48" height="48" />
            <h1>
              Moccasins
              <br />
              for Markers
            </h1>
            <p className="cine-tag">Handcrafted remembrance with a lasting purpose.</p>
            <p className="cine-copy">
              Ornamental pairs made by hand — so permanent headstones can honour unmarked graves of former residential
              school survivors.
            </p>
            <Link to="/mission" className="cine-discover">
              Discover the Story <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="cine-right"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.15 }}
        >
          <img src={asset('hero-craft.jpg')} alt="Handmade ornamental moccasins in golden light" />
          <p className="cine-caption">
            Made by hand.
            <br />
            Created with purpose.
          </p>
        </motion.div>
      </section>

      {/* 02 — Giant statement */}
      <section className="giant-statement">
        <div className="container-narrow">
          <Reveal>
            <p className="label">Why it exists</p>
            <h2>
              These are more than handcrafted moccasins — they are a path from leather to limestone.
            </h2>
            <p>
              We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
              former residential school survivors. Every stitch honours a name.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — Photo story frames */}
      <section className="story-frames">
        <div className="frame frame-01">
          <Reveal className="frame-media">
            <img src={asset('moccasin-emerald-heart.jpg')} alt="Emerald Heart ornamental moccasins" />
          </Reveal>
          <Reveal delay={0.1} className="frame-copy">
            <p className="label">01 / The Craft</p>
            <h3>Made slowly, by hand.</h3>
            <p>
              Each ornamental pair is cut, stitched, and beaded with care — intimate enough to hold, meaningful enough
              to keep.
            </p>
          </Reveal>
        </div>

        <div className="frame frame-02">
          <Reveal className="frame-copy frame-copy-overlap">
            <p className="label">02 / The Purpose</p>
            <h3>Beauty that funds dignity.</h3>
            <p>
              Sales and gifts are directed toward permanent markers — lasting stone where unmarked graves still wait to
              be remembered.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="frame-media frame-media-wide">
            <img src={asset('impact-marker.jpg')} alt="A permanent headstone in a quiet field" />
          </Reveal>
        </div>

        <div className="frame frame-03">
          <Reveal className="frame-media frame-media-bleed">
            <img src={asset('craft-table.jpg')} alt="Leather, beads, and thread on a workbench" />
          </Reveal>
          <p className="frame-caption">Materials at the table — stitch by stitch.</p>
        </div>
      </section>

      {/* 04 — Editorial collection */}
      <section className="collection-band" id="collection">
        <div className="container">
          <Reveal className="collection-head">
            <p className="label">Handcrafted Collection</p>
            <h2>
              Choose a piece
              <br />
              with purpose.
            </h2>
          </Reveal>

          <div className="ed-collection">
            <EditorialPiece product={pieces[0]} layout="tall" index={0} />
            <EditorialPiece product={pieces[1]} layout="offset" index={1} />
            <EditorialPiece product={pieces[2]} layout="wide" index={2} />
            <div className="ed-pair-row">
              <EditorialPiece product={pieces[3]} layout="pair" index={3} />
              <EditorialPiece product={pieces[4]} layout="pair" index={4} />
            </div>
            <EditorialPiece product={pieces[5]} layout="feature" index={5} />
          </div>

          <div className="collection-foot">
            <Button to="/shop" variant="primary" arrow>
              View the full collection
            </Button>
            <p>Proceeds support permanent headstones for unmarked graves of former residential school survivors.</p>
          </div>
        </div>
      </section>

      {/* 05 — Full screen visual break */}
      <section className="visual-break">
        <img src={asset('moccasin-night-star.jpg')} alt="" />
        <div className="visual-break-veil" />
        <Reveal className="visual-break-copy">
          <p>
            Made slowly.
            <br />
            Remembered forever.
          </p>
        </Reveal>
      </section>

      {/* 06 — Signature sticky journey */}
      <ImpactStory />

      {/* 07 — Purpose dark */}
      <section className="purpose-dark">
        <div className="purpose-dark-grid">
          <Reveal className="purpose-dark-copy">
            <p className="label">The Purpose</p>
            <h2>A handmade object can become part of something permanent.</h2>
            <p>
              Your purchase or gift helps place permanent headstones for unmarked graves of former residential school
              survivors — people who may have no one left to remember them.
            </p>
            <p className="purpose-note">
              We do not invent statistics. We keep the promise simple and accountable.
            </p>
            <Button to="/impact" variant="light" arrow>
              Learn how it works
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="purpose-dark-photo">
            <img src={asset('hero.jpg')} alt="Ornamental moccasins in soft light" loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* 08 — Craft gallery */}
      <section className="craft-gallery">
        <div className="container">
          <Reveal className="craft-gallery-head">
            <p className="label">The making</p>
            <h2>
              Made by hand,
              <br />
              one pair at a time.
            </h2>
          </Reveal>
          <div className="craft-mosaic">
            <figure className="mosaic-a">
              <img src={asset('craft-table.jpg')} alt="Craft materials on a workbench" loading="lazy" />
              <figcaption>Materials</figcaption>
            </figure>
            <figure className="mosaic-b">
              <img src={asset('moccasin-turquoise-bloom.jpg')} alt="Turquoise Bloom beadwork detail" loading="lazy" />
              <figcaption>Details</figcaption>
            </figure>
            <figure className="mosaic-c">
              <img src={asset('moccasin-coral-path.jpg')} alt="Coral Path finished pair" loading="lazy" />
              <figcaption>Finishing</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 09 — Donation campaign */}
      <DonationExperience />

      {/* 11 — Closing statement */}
      <section className="closing">
        <div className="closing-media" aria-hidden="true">
          <img src={asset('moccasin-sage-leaf.jpg')} alt="" />
          <div className="closing-veil" />
        </div>
        <div className="container closing-inner">
          <Reveal>
            <p className="label">Moccasins for Markers</p>
            <h2>Carry the story forward.</h2>
            <div className="closing-ctas">
              <Button to="/shop" variant="light" arrow>
                Shop the Collection
              </Button>
              <Button to="/donate" variant="secondary" className="closing-secondary">
                Support the Mission
              </Button>
            </div>
            <a className="closing-mail" href="mailto:hello@moccasinsformarkers.ca">
              hello@moccasinsformarkers.ca
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
