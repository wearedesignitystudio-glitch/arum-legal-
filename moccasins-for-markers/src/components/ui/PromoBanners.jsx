import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { asset, formatMoney } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './PromoBanners.css';

export function PurposeBanner() {
  return (
    <section className="purpose-banner">
      <div className="purpose-banner-media" aria-hidden="true">
        <img src={asset('impact-marker.jpg')} alt="" />
        <div className="purpose-banner-veil" />
      </div>
      <div className="container purpose-banner-content">
        <p className="kicker kicker-pill">Why it matters</p>
        <h2>
          Your purchase is not just helping.
          <br />
          It is helping those who don’t have anyone.
        </h2>
        <p>
          When you buy a pair, you help place permanent headstones for unmarked graves of former residential school
          survivors — people who may have no family left to remember them. Dignity, restored in stone.
        </p>
        <div className="purpose-banner-actions">
          <Button to="/shop" variant="primary">
            Shop with purpose
          </Button>
          <Button to="/donate" variant="light">
            Donate directly
          </Button>
        </div>
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
