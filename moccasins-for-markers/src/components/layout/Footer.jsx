import { Link } from 'react-router-dom';
import { asset } from '../../data/products';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={asset('logo.png')} alt="" width="56" height="56" />
          <div>
            <strong>Moccasins for Markers</strong>
            <p>Handmade honour. Permanent stone.</p>
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <Link to="/shop">Shop</Link>
            <Link to="/mission">Our Story</Link>
            <Link to="/impact">Impact</Link>
            <Link to="/journal">Journal</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link to="/donate">Donate</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div>
            <h4>Purpose</h4>
            <p>Every stitch honours a name. Proceeds support permanent headstones for unmarked graves of former residential school survivors.</p>
          </div>
        </div>
      </div>
      <div className="container footer-meta">
        <p>&copy; {new Date().getFullYear()} Moccasins for Markers</p>
        <p>#unmarkedgraves · #moccasinsformarkers</p>
      </div>
    </footer>
  );
}
