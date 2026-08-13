import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import { Link } from 'react-router-dom';
import './StoryPages.css';

export default function Donate() {
  return (
    <div className="page">
      <Seo
        title="Give"
        description="Support permanent headstones for unmarked graves of former residential school survivors."
        path="/donate"
      />
      <section className="page-hero container">
        <Reveal>
          <p className="label">Give</p>
          <h1>Help place a lasting marker.</h1>
          <p>
            The donation experience lives beside a real headstone photograph on the home page — quiet, intentional,
            and clear.
          </p>
          <div className="cta-row">
            <Link to={{ pathname: '/', hash: '#remembrance' }} className="text-link">
              Go to remembrance →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
