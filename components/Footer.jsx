import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="logo" style={{fontSize:'20px'}}>
              <div className="logo-mark">N</div>Nex<em>Tech</em>&nbsp;OC
            </Link>
            <p className="footer-brand" style={{color:'#5A6A84',fontSize:'13px',lineHeight:'1.72',margin:'14px 0 16px'}}>
              Orange County&apos;s trusted technology partner for IT, networking, cybersecurity, security cameras, electrical and web. Locally owned since 2012.
            </p>
            <div className="social-row">
              <a href="#" className="social-link">Li</a>
              <a href="#" className="social-link">Fb</a>
              <a href="#" className="social-link b">G+</a>
              <a href="#" className="social-link b">Tw</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/#services">Managed IT</Link></li>
              <li><Link href="/#services">Networking</Link></li>
              <li><Link href="/#services">Cybersecurity</Link></li>
              <li><Link href="/#services">Security Cameras</Link></li>
              <li><Link href="/#services">Electrical</Link></li>
              <li><Link href="/#services">Web Design</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#about">Our Team</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Cities Served</h4>
            <ul>
              <li><a href="#" className="blue-hover">Irvine</a></li>
              <li><a href="#" className="blue-hover">Anaheim</a></li>
              <li><a href="#" className="blue-hover">Santa Ana</a></li>
              <li><a href="#" className="blue-hover">Newport Beach</a></li>
              <li><a href="#" className="blue-hover">Tustin</a></li>
              <li><a href="#" className="blue-hover">Garden Grove</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 NexTech OC LLC · All rights reserved · CA Electrical License #000000</div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
