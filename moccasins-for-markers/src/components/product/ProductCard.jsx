import { Link } from 'react-router-dom';
import { asset, formatMoney } from '../../data/products';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/shop/${product.slug}`} className="product-card-media">
        <img src={asset(product.image)} alt={product.name} />
        {product.hoverImage && (
          <img src={asset(product.hoverImage)} alt="" className="hover-img" aria-hidden="true" />
        )}
      </Link>
      <div className="product-card-body">
        <h3>
          <Link to={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="money">{formatMoney(product.price)} CAD</p>
        <Link to={`/shop/${product.slug}`} className="view-piece">
          View Piece <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
