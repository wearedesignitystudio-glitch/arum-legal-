import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const NAV = [
  { to: '/mission', label: 'Story' },
  { to: '/shop', label: 'Pieces' },
  { to: '/impact', label: 'Purpose' },
  { to: '/donate', label: 'Give' },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? 'is-solid' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            MFM
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <button type="button" className="nav-cart" onClick={openCart} aria-label={`Cart, ${count} items`}>
              Bag{count > 0 ? ` ${count}` : ''}
            </button>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close' : 'Menu'}
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
          >
            <nav>
              {NAV.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={reduce ? false : { y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link to={l.to} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
