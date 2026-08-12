import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import { JOURNAL } from '../data/content';
import { asset } from '../data/products';
import './StoryPages.css';

export default function Journal() {
  const [featured, ...rest] = JOURNAL;

  return (
    <div className="page">
      <Seo
        title="Journal"
        description="Stories of craft, remembrance, and impact from Moccasins for Markers."
        path="/journal"
      />

      <section className="page-hero container">
        <Reveal>
          <p className="kicker">Journal</p>
          <h1>Stories from the work</h1>
          <p>Editorial notes on craft, remembrance, and the path from leather to limestone.</p>
        </Reveal>
      </section>

      {featured && (
        <section className="container section-tight">
          <Reveal>
            <Link to="/journal" className="featured-article">
              <div className="featured-media">
                <img src={asset(featured.image)} alt="" />
              </div>
              <div>
                <p className="kicker">{featured.category}</p>
                <h2>{featured.title}</h2>
                <p className="muted">{featured.excerpt}</p>
                <span className="text-link">Read story →</span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="container section">
        <div className="journal-list">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link to="/journal" className="journal-list-card">
                <div className="journal-list-media">
                  <img src={asset(post.image)} alt="" />
                </div>
                <p className="kicker">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="placeholder-note">
            Full article pages can be added here as your journal grows. Categories ready: Craft, Stories, Remembrance,
            Impact.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
