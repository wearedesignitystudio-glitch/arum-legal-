import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import DonationSelector from '../components/donate/DonationSelector';
import { asset } from '../data/products';
import './StoryPages.css';

export default function Donate() {
  return (
    <div className="page">
      <Seo
        title="Donate"
        description="Help place a permanent marker. Donate to support headstones for unmarked graves of former residential school survivors."
        path="/donate"
      />

      <section className="page-hero container">
        <Reveal>
          <p className="kicker">Donate</p>
          <h1>Help place a permanent marker.</h1>
          <p>
            If you prefer to give without purchasing, your donation still funds permanent headstones with dignity and
            care.
          </p>
        </Reveal>
      </section>

      <section className="container donate-page">
        <Reveal>
          <div className="editorial-image donate-visual">
            <img src={asset('impact-marker.jpg')} alt="A headstone in a quiet field" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <DonationSelector />
          <div className="donate-explain">
            <h2>What your gift supports</h2>
            <p>
              Donations contribute to permanent headstones for unmarked graves of former residential school survivors.
              One-time and monthly options are available.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
