import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">Moccasins for Markers</p>
        <nav>
          <Link to="/mission">Story</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/donate">Give</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <a href="mailto:hello@moccasinsformarkers.ca">hello@moccasinsformarkers.ca</a>
        <p className="footer-copy">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
