import { Link } from 'react-router-dom';
import { asset, formatMoney } from '../../data/products';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/shop/${product.slug}`} className="product-card-media">
        <img src={asset(product.image)} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <h3>
          <Link to={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="money">{formatMoney(product.price)}</p>
        <Link to={`/shop/${product.slug}`} className="view-piece">
          View →
        </Link>
      </div>
    </article>
  );
}
