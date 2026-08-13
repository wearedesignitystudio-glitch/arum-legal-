import { Link } from 'react-router-dom';
import { asset, formatMoney } from '../../data/products';
import './EditorialPiece.css';

const LAYOUTS = ['tall', 'offset', 'wide', 'pair', 'pair', 'feature'];

export default function EditorialPiece({ product, layout = 'tall', index = 0 }) {
  const kind = layout || LAYOUTS[index % LAYOUTS.length];

  return (
    <article className={`ed-piece ed-${kind}`}>
      <Link to={`/shop/${product.slug}`} className="ed-media">
        <img src={asset(product.image)} alt={product.name} loading={index > 1 ? 'lazy' : 'eager'} />
      </Link>
      <div className="ed-meta">
        <h3>
          <Link to={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="money">{formatMoney(product.price)} CAD</p>
        <Link to={`/shop/${product.slug}`} className="ed-link">
          View Piece <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
