import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowPill(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="wrap">
          <span>📍 Orange County, CA — Irvine · Anaheim · Newport Beach · Santa Ana · Tustin</span>
          <div>
            <span className="top-emergency">🚨 24/7 EMERGENCY</span>
            <a href="tel:+17149000000">📞 (714) 900-0000</a>
            <a href="mailto:hello@nextechoc.com">✉ hello@nextechoc.com</a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">N</div>
            Nex<em>Tech</em>&nbsp;OC
          </Link>
          <ul className="nav-links">
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#process">Process</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/#contact" className="nav-cta">Free Quote →</Link></li>
          </ul>
          <button className="hbg" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE FULL MENU */}
      <div className={`mmenu${menuOpen ? ' open' : ''}`}>
        <button className="closem" onClick={closeMenu} aria-label="Close">✕</button>
        <Link href="/#services" onClick={closeMenu}>Services</Link>
        <Link href="/#process" onClick={closeMenu}>Process</Link>
        <Link href="/#about" onClick={closeMenu}>About</Link>
        <Link href="/#pricing" onClick={closeMenu}>Pricing</Link>
        <Link href="/blog" onClick={closeMenu}>Blog</Link>
        <Link href="/#contact" onClick={closeMenu} className="mmenu-cta">⚡ Get Free Quote</Link>
      </div>

      {/* MOBILE STICKY PILL */}
      <div className={`mobile-pill${showPill ? ' show' : ''}`} onClick={() => setMenuOpen(true)}>
        <div className="mobile-pill-dot"></div>
        <span>☰ MENU</span>
      </div>
    </>
  );
}
