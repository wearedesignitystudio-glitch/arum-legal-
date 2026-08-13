import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { asset } from '../../data/products';
import './Navbar.css';

const NAV = [
  { to: '/mission', label: 'Story' },
  { to: '/shop', label: 'Collection' },
  { to: '/impact', label: 'Purpose' },
  { to: '/donate', label: 'Support' },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const solid = scrolled || !isHome || menuOpen;

  return (
    <>
      <header className={`nav ${solid ? 'is-solid' : 'is-open'} ${isHome ? 'on-home' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand" aria-label="Moccasins for Markers home">
            <img src={asset('logo.png')} alt="" width="36" height="36" />
            <span>Moccasins for Markers</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button type="button" className="nav-cart" onClick={openCart} aria-label={`Open cart, ${count} items`}>
              Cart{count > 0 ? ` (${count})` : ''}
            </button>
            <Link to="/donate" className="nav-cta">
              Support the Mission
            </Link>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav aria-label="Mobile">
              {NAV.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={reduce ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                >
                  <Link to={link.to} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/donate" className="mobile-cta" onClick={() => setMenuOpen(false)}>
                Support the Mission
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
