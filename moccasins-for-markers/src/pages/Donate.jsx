import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import DonationExperience from '../components/donate/DonationExperience';
import { asset } from '../data/products';
import './StoryPages.css';

export default function Donate() {
  return (
    <div className="page">
      <Seo
        title="Support the Mission"
        description="Help place a permanent marker. Donate to support headstones for unmarked graves of former residential school survivors."
        path="/donate"
      />

      <section className="page-hero container">
        <Reveal>
          <p className="label">Support</p>
          <h1>Help place a lasting marker.</h1>
          <p>
            If you prefer to give without purchasing, your contribution still funds permanent headstones with dignity
            and care.
          </p>
        </Reveal>
      </section>

      <section className="donate-visual-band">
        <img src={asset('impact-marker.jpg')} alt="A headstone in a quiet field" />
      </section>

      <DonationExperience />
    </div>
  );
}
