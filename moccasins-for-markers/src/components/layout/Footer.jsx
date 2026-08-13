import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <strong>Moccasins for Markers</strong>
          <p>
            Handmade ornamental moccasins funding permanent headstones for unmarked graves of former residential school
            survivors.
          </p>
        </div>
        <nav aria-label="Footer">
          <Link to="/mission">Story</Link>
          <Link to="/shop">Collection</Link>
          <Link to="/impact">Purpose</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <a href="mailto:hello@moccasinsformarkers.ca">hello@moccasinsformarkers.ca</a>
        <p>&copy; {new Date().getFullYear()} Moccasins for Markers</p>
      </div>
    </footer>
  );
}
