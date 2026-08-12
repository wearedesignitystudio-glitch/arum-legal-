import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { asset, formatMoney } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './PromoBanners.css';

/** Quiet remembrance panel — replaces the old full-bleed purpose banner */
export function PurposeBanner() {
  return (
    <section className="remembrance-panel">
      <div className="container remembrance-grid">
        <div className="remembrance-copy">
          <p className="kicker">A quiet truth</p>
          <blockquote>
            <p>
              Some names were never carved in stone.
              <span> Your purchase helps place a marker for those who may have no one left to remember them.</span>
            </p>
          </blockquote>
          <p className="remembrance-note">
            Handmade ornamental moccasins fund permanent headstones for unmarked graves of former residential school
            survivors — dignity returned, one stitch and one stone at a time.
          </p>
          <div className="remembrance-actions">
            <Button to="/mission" variant="primary">
              Read our story
            </Button>
            <Button to="/donate" variant="secondary">
              Give toward a marker
            </Button>
          </div>
        </div>

        <figure className="remembrance-figure">
          <img src={asset('craft-table.jpg')} alt="Leather, beads, and thread on a workbench" />
          <figcaption>
            <strong>Sew · Sell · Mark</strong>
            <span>Craft at the table. Remembrance in stone.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function BundleBanners({ bundles }) {
  const { addBundle } = useCart();

  return (
    <section className="bundle-section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="kicker">Bundle offers</p>
            <h2>Give more. Honour more.</h2>
          </div>
        </div>
        <div className="bundle-grid">
          {bundles.map((bundle) => (
            <article key={bundle.id} className="bundle-card">
              <div className="bundle-card-media">
                <img src={asset(bundle.image)} alt="" />
                <span className="bundle-save">Save {formatMoney(bundle.compareAt - bundle.price)}</span>
              </div>
              <div className="bundle-card-body">
                <p className="kicker">{bundle.tagline}</p>
                <h3>{bundle.name}</h3>
                <p>{bundle.description}</p>
                <div className="bundle-price">
                  <strong>{formatMoney(bundle.price)}</strong>
                  <span>{formatMoney(bundle.compareAt)}</span>
                </div>
                <div className="bundle-actions">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => addBundle(bundle.id, bundle.name)}
                  >
                    Add bundle
                  </Button>
                  <Link to="/shop" className="bundle-link">
                    Or shop singles →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
