import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { asset } from '../data/products';
import './StoryPages.css';

export default function Mission() {
  return (
    <div className="page">
      <Seo
        title="Our Story"
        description="Why we make handmade ornamental moccasins to fund permanent headstones for unmarked graves of former residential school survivors."
        path="/mission"
      />

      <section className="page-hero container">
        <Reveal>
          <p className="kicker">Our Story</p>
          <h1>Why we make them.</h1>
          <p>
            Moccasins for Markers began with a simple belief: craft can become remembrance — and beauty can fund
            dignity.
          </p>
        </Reveal>
      </section>

      <section className="section story-fullbleed">
        <img src={asset('hero-craft.jpg')} alt="Ornamental moccasins in soft morning light" />
      </section>

      <section className="section">
        <div className="container-narrow">
          <Reveal>
            <p className="kicker">Mission</p>
            <h2>Sew. Sell. Mark.</h2>
            <p className="lead">
              We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
              former residential school survivors.
            </p>
            <p className="muted">
              Each pair is made slowly by hand. Each sale becomes stone — a lasting marker where silence once stood.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section story-band">
        <div className="container split">
          <Reveal>
            <div className="editorial-image">
              <img src={asset('craft-table.jpg')} alt="Craft materials for handmade moccasins" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kicker">The work</p>
            <h2>Handmade with care.</h2>
            <p className="muted">
              Ornamental moccasins are cut, stitched, and beaded one pair at a time. The process is intimate by design —
              small enough to hold, meaningful enough to keep.
            </p>
            <Button to="/shop" variant="secondary">
              Shop the collection
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container timeline">
          <Reveal>
            <p className="kicker">The path</p>
            <h2>Craft → Purchase → Impact → Remembrance</h2>
          </Reveal>
          <div className="timeline-grid">
            {[
              ['Craft', 'Leather, beads, and thread become a handmade pair.'],
              ['Purchase', 'You choose a piece that carries beauty and purpose.'],
              ['Impact', 'Proceeds support permanent headstones.'],
              ['Remembrance', 'A name that was unmarked receives lasting stone.'],
            ].map(([title, copy], i) => (
              <Reveal key={title} delay={i * 0.08} className="timeline-item">
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-narrow center">
          <Reveal>
            <h2>Every stitch honours a name.</h2>
            <p className="muted">Walk with us — through craft, through giving, through remembrance.</p>
            <div className="cta-row">
              <Button to="/impact" variant="primary">
                Explore impact
              </Button>
              <Button to="/donate" variant="secondary">
                Donate
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
