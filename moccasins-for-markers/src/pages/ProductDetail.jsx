import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { asset, formatMoney, getProductBySlug, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const PANELS = [
  ['details', 'Details'],
  ['materials', 'Materials'],
  ['craftsmanship', 'Craftsmanship'],
  ['impact', 'Impact'],
  ['shipping', 'Shipping & Returns'],
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const related = getRelatedProducts(slug);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState('details');
  const [added, setAdded] = useState(false);

  const panelCopy = useMemo(() => {
    if (!product || !active) return '';
    if (active === 'details') return product.longDescription;
    if (active === 'materials') return product.materials;
    if (active === 'craftsmanship') return product.craftsmanship;
    if (active === 'impact') return product.impact;
    return product.shipping;
  }, [active, product]);

  if (!product) {
    return (
      <div className="page container page-hero">
        <h1>Piece not found</h1>
        <Button to="/shop">Return to shop</Button>
      </div>
    );
  }

  const onAdd = () => {
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="page">
      <Seo
        title={product.name}
        description={product.description}
        path={`/shop/${product.slug}`}
      />

      <section className="container product-layout">
        <Reveal>
          <div className="product-gallery">
            <img src={asset(product.image)} alt={product.name} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="product-info">
          <p className="kicker">Ornamental moccasins</p>
          <h1>{product.name}</h1>
          <p className="product-price money">{formatMoney(product.price)}</p>
          <p className="product-availability">Available · Handmade · Limited</p>
          <p className="muted">{product.description}</p>

          <div className="product-buy">
            <div className="qty-box" aria-label="Quantity">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
            <Button type="button" variant="primary" onClick={onAdd}>
              {added ? 'Added ✓' : 'Add to cart'}
            </Button>
            <Button to="/checkout" variant="secondary" onClick={() => addToCart(product.id, qty)}>
              Buy now
            </Button>
          </div>

          <p className="purpose-line">Every purchase helps fund permanent headstones.</p>

          <div className="accordion">
            {PANELS.map(([id, label]) => (
              <div key={id}>
                <button
                  type="button"
                  className={`acc-trigger ${active === id ? 'is-open' : ''}`}
                  onClick={() => setActive(active === id ? '' : id)}
                  aria-expanded={active === id}
                >
                  <span>{label}</span>
                  <em aria-hidden="true">{active === id ? '−' : '+'}</em>
                </button>
                {active === id && (
                  <div className="acc-panel">
                    <p>{panelCopy}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section story-band">
        <div className="container split">
          <Reveal>
            <div className="editorial-image">
              <img src={asset('craft-table.jpg')} alt="" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kicker">The story behind this piece</p>
            <h2>Made slowly, meant to last in memory.</h2>
            <p className="muted">
              {product.name} is part of a collection created to honour lives through craft. Each stitch is intentional.
              Each pair carries the same promise: beauty that contributes to remembrance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight purpose-band">
        <div className="container">
          <Reveal>
            <p className="kicker">Your purchase has purpose</p>
            <h2>From this pair to permanent stone.</h2>
            <div className="purpose-steps">
              <div>
                <span>01</span>
                <h3>Craft</h3>
                <p>Handmade ornamental moccasins, finished with care.</p>
              </div>
              <div>
                <span>02</span>
                <h3>Proceeds</h3>
                <p>Sales are directed toward permanent headstones.</p>
              </div>
              <div>
                <span>03</span>
                <h3>Remembrance</h3>
                <p>Unmarked graves receive lasting markers.</p>
              </div>
            </div>
            <Link to="/impact" className="text-link">
              Learn more about impact →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head-simple">
            <p className="kicker">You may also like</p>
            <h2>Related pieces</h2>
          </Reveal>
          <ProductGrid products={related} />
        </div>
      </section>
    </div>
  );
}
