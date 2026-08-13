import { Link } from 'react-router-dom';
import { asset } from '../../data/products';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wordmark" aria-hidden="true">
        Moccasins
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={asset('logo.png')} alt="" width="56" height="56" />
          <div>
            <strong>Moccasins for Markers</strong>
            <p>
              We sew and sell handmade ornamental tiny moccasins to buy permanent headstones for unmarked graves of
              former residential school survivors.
            </p>
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <Link to="/mission">Mission</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/impact">Our Impact</Link>
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
            <h4>Contact</h4>
            <a href="mailto:hello@moccasinsformarkers.ca">hello@moccasinsformarkers.ca</a>
            <p>Every stitch honours a name.</p>
          </div>
        </div>
      </div>
      <div className="container footer-meta">
        <p>&copy; {new Date().getFullYear()} Moccasins for Markers</p>
        <p>Handmade honour. Permanent stone.</p>
      </div>
    </footer>
  );
}
