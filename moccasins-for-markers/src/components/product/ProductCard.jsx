import { useState } from 'react';
import { Link } from 'react-router-dom';
import { asset, formatMoney } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);

  const onAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/shop/${product.slug}`} className="product-card-media">
        <img
          src={asset(product.image)}
          alt={product.name}
          className={hover && product.hoverImage ? 'is-dim' : ''}
        />
        {product.hoverImage && (
          <img
            src={asset(product.hoverImage)}
            alt=""
            className={`hover-img ${hover ? 'is-visible' : ''}`}
            aria-hidden="true"
          />
        )}
        <div className="product-badges">
          <span>Handmade</span>
          <span>Limited</span>
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-card-top">
          <h3>
            <Link to={`/shop/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="money">{formatMoney(product.price)}</p>
        </div>
        <p className="product-card-desc">{product.tagline}</p>
        <div className="product-card-actions">
          <Link to={`/shop/${product.slug}`} className="quick-view">
            Quick view
          </Link>
          <button type="button" className="add-btn" onClick={onAdd}>
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
