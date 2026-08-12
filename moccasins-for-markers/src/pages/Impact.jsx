import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { asset } from '../data/products';
import './StoryPages.css';

export default function Impact() {
  const steps = [
    ['Purchase', 'A handmade pair is chosen with intention.'],
    ['Craft', 'Ornamental moccasins are made slowly by hand.'],
    ['Proceeds', 'Sales and gifts are directed toward permanent markers.'],
    ['Permanent marker', 'A headstone is placed where one was missing.'],
    ['Remembrance', 'Dignity is restored through lasting stone.'],
  ];

  return (
    <div className="page">
      <Seo
        title="Our Impact"
        description="Where your money goes — from handmade moccasins to permanent headstones for unmarked graves."
        path="/impact"
      />

      <section className="page-hero container">
        <Reveal>
          <p className="kicker">Impact</p>
          <h1>Where does my money go?</h1>
          <p>
            From leather to limestone — a clear path from your purchase or donation to permanent remembrance.
          </p>
        </Reveal>
      </section>

      <section className="section story-fullbleed dark">
        <img src={asset('impact-marker.jpg')} alt="A permanent headstone in soft light" />
        <div className="overlay-copy container">
          <Reveal>
            <h2>From leather to limestone.</h2>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container impact-path">
          {steps.map(([title, copy], i) => (
            <Reveal key={title} delay={i * 0.06} className="impact-path-item">
              <div className="impact-path-index">0{i + 1}</div>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section story-band">
        <div className="container-narrow">
          <Reveal>
            <p className="kicker">Clarity</p>
            <h2>Purpose without spectacle.</h2>
            <p className="muted">
              We do not invent statistics. We keep the promise simple and accountable: proceeds from sales and donations
              support permanent headstones for unmarked graves of former residential school survivors.
            </p>
            <div className="cta-row">
              <Button to="/shop" variant="primary">
                Shop with purpose
              </Button>
              <Button to="/donate" variant="secondary">
                Donate directly
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
