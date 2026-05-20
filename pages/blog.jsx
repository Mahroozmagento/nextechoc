import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const POSTS = [
  { id:1, cat:'cybersecurity', catLabel:'Cybersecurity', catCls:'red', icon:'🔐', title:'5 Cybersecurity Threats Every Orange County Small Business Faces in 2026 — And How to Stop Them', excerpt:"Ransomware, phishing, BEC attacks, unpatched systems and insider threats are costing OC businesses millions every year. Our security team breaks down the top five threats we're seeing right now — and the specific steps you can take this week to protect your business, even on a tight budget.", author:'Michelle Kim, CISM', authorInitials:'MK', date:'May 12, 2026', readTime:'8 min read', featured:true, searchKey:'5 cybersecurity threats every orange county small business faces in 2026' },
  { id:2, cat:'networking', catLabel:'Networking', catCls:'blue', icon:'📡', title:'Is Wi-Fi 6 Worth the Upgrade for Your OC Business? A Real-World Cost Breakdown', excerpt:'We compare Wi-Fi 5 vs Wi-Fi 6 performance in actual Orange County office deployments — speeds, coverage, device capacity and return on investment for businesses under 100 employees.', date:'May 6, 2026', readTime:'6 min read', searchKey:'wi-fi 6 upgrade worth it orange county business guide' },
  { id:3, cat:'managed-it', catLabel:'Managed IT', catCls:'red', icon:'🖥', title:'In-House IT vs Managed IT Services: The True Cost Comparison for 2026', excerpt:'A full-time IT hire costs $75K–$95K/year before benefits — plus coverage gaps on nights and weekends. We break down the real numbers comparing both options for OC businesses of different sizes.', date:'Apr 29, 2026', readTime:'7 min read', searchKey:'in-house IT vs managed IT services cost comparison 2026' },
  { id:4, cat:'cybersecurity', catLabel:'Cybersecurity', catCls:'red', icon:'🛡', title:'Ransomware Hit Your Business? Here Are the Exact Steps to Take in the First 24 Hours', excerpt:'Step-by-step incident response guide from our security team — isolation procedures, evidence preservation, backup restoration, and who to call first to minimize damage and downtime.', date:'Apr 21, 2026', readTime:'9 min read', searchKey:'ransomware recovery steps what to do if attacked' },
  { id:5, cat:'cloud', catLabel:'Cloud', catCls:'blue', icon:'☁', title:'Microsoft 365 vs Google Workspace in 2026: Which Is Right for Your OC Business?', excerpt:"Pricing, collaboration tools, security features, and migration complexity — we've deployed both platforms for hundreds of OC companies. Here's our honest, unsponsored comparison.", date:'Apr 14, 2026', readTime:'10 min read', searchKey:'microsoft 365 vs google workspace 2026 comparison' },
  { id:6, cat:'cameras', catLabel:'Security Cameras', catCls:'red', icon:'📷', title:'Commercial Security Camera Buyer\'s Guide 2026: IP vs Analog, 4K vs 8K, Cloud vs Local', excerpt:'Everything you need to know before buying a camera system for your OC business — explained in plain English by our installation team with real pricing from 200+ projects.', date:'Apr 7, 2026', readTime:'5 min read', searchKey:'security camera system buyer guide commercial 2026' },
  { id:7, cat:'web', catLabel:'Web & SEO', catCls:'blue', icon:'📈', title:'7 Local SEO Tactics That Actually Move the Needle for Orange County Businesses in 2026', excerpt:'Google Business Profile, review velocity, schema markup, local citations — our web team shares the exact playbook we use to rank our clients on page one for competitive OC searches.', date:'Mar 31, 2026', readTime:'4 min read', searchKey:'local SEO tips orange county business google ranking 2026' },
  { id:8, cat:'tips', catLabel:'IT Tips', catCls:'red', icon:'✅', title:'The 2026 IT Audit Checklist Every Small Business Should Run Before Summer', excerpt:'20-point checklist covering network security, backup integrity, software licensing, password hygiene and hardware lifecycle management. Printable PDF included.', date:'Mar 24, 2026', readTime:'5 min read', searchKey:'IT audit checklist every small business 2026' },
  { id:9, cat:'networking', catLabel:'Networking', catCls:'blue', icon:'🔗', title:'SD-WAN vs MPLS: Which Wins for Multi-Location OC Businesses in 2026?', excerpt:'MPLS is expensive and rigid. SD-WAN is flexible and cheap. But the real answer for your business depends on latency requirements, application mix and IT staff capacity — our network team explains.', date:'Mar 17, 2026', readTime:'7 min read', searchKey:'SD-WAN vs MPLS what is right for multi-location business' },
];

const CATS = [
  {id:'all',label:'All Topics',cls:'all'},
  {id:'cybersecurity',label:'🔐 Cybersecurity',cls:'default'},
  {id:'networking',label:'🌐 Networking',cls:'default blue'},
  {id:'managed-it',label:'🖥 Managed IT',cls:'default'},
  {id:'cloud',label:'☁ Cloud & Microsoft 365',cls:'default blue'},
  {id:'cameras',label:'📷 Security Cameras',cls:'default'},
  {id:'web',label:'💻 Web & SEO',cls:'default blue'},
  {id:'tips',label:'💡 Business IT Tips',cls:'default'},
];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));

    const stb = document.getElementById('scrollTopBtn');
    const handleScroll = () => { if (stb) stb.classList.toggle('show', window.scrollY > 400); };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => { obs.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const featured = POSTS.find(p => p.featured);
  const filtered = POSTS.filter(p => {
    if (p.featured) return false;
    const matchCat = activeCat === 'all' || p.cat === activeCat;
    const matchSearch = !search || p.searchKey.includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredVisible = activeCat === 'all' || featured?.cat === activeCat;

  return (
    <>
      <Head>
        <title>Blog | NexTech OC — IT Tips, Cybersecurity & Tech News Orange County</title>
        <meta name="description" content="Expert IT tips, cybersecurity guides, networking advice and tech news for Orange County businesses from the NexTech OC team." />
      </Head>

      <Header />

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="wrap ph-inner">
          <span className="ph-tag">// nextech oc knowledge base</span>
          <h1 className="ph-title">Tech Insights for<br /><span className="hl-r">Orange County</span> <span className="hl-b">Businesses</span></h1>
          <p className="ph-desc">IT tips, cybersecurity guides, networking how-tos and local tech news — written by our engineers for OC business owners.</p>
          <div className="ph-meta">
            <span className="ph-stat">📝 48 Articles Published</span>
            <span className="ph-stat">👥 12,400 Monthly Readers</span>
            <span className="ph-stat">🔄 New posts every Tuesday</span>
          </div>
        </div>
      </div>
      <hr className="red-line" />

      {/* SEARCH + FILTERS */}
      <div className="search-section">
        <div className="wrap">
          <div className="search-wrap">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search articles... (e.g. cybersecurity, Wi-Fi, ransomware)" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="search-btn">Search Articles</button>
          </div>
          <div className="cat-filters">
            {CATS.map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`cat-btn ${activeCat === c.id ? 'active' + (c.cls.includes('blue') ? ' blue' : '') : c.cls}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG LAYOUT */}
      <div className="wrap">
        <div className="blog-layout">

          {/* MAIN */}
          <main>
            {/* FEATURED */}
            {featuredVisible && featured && (
              <div className="featured-post rv">
                <div className="fp-img">
                  <div className="img-ph" style={{height:'280px'}}>
                    <div className="ic">🔐</div>
                    <div className="tl">FEATURED POST IMAGE</div>
                    <div className="sz">820 × 280 px · Cybersecurity themed</div>
                  </div>
                  <div className="fp-badge">⭐ FEATURED</div>
                </div>
                <div className="fp-body">
                  <span className="fp-cat red">Cybersecurity</span>
                  <Link href="/blog/featured" className="fp-title">{featured.title}</Link>
                  <p className="fp-excerpt">{featured.excerpt}</p>
                  <div className="fp-meta">
                    <div className="fp-author"><div className="fp-av">{featured.authorInitials}</div>{featured.author}</div>
                    <span className="fp-date">{featured.date}</span>
                    <span className="fp-read">{featured.readTime}</span>
                    <Link href="/blog/featured" className="btn-red" style={{marginLeft:'auto'}}>Read Article →</Link>
                  </div>
                </div>
              </div>
            )}

            {/* BLOG GRID */}
            <div className="blog-grid" id="blogGrid">
              {filtered.map(post => (
                <div key={post.id} className="blog-card rv">
                  <div className="blog-card-img">
                    <div className="img-ph" style={{height:'180px'}}>
                      <div className="ic">{post.icon}</div>
                      <div className="tl">BLOG IMAGE</div>
                      <div className="sz">580 × 180 px</div>
                    </div>
                    <span className={`bc-cat ${post.catCls}`}>{post.catLabel}</span>
                  </div>
                  <div className="bc-body">
                    <Link href="/blog/featured" className="bc-title">{post.title}</Link>
                    <p className="bc-excerpt">{post.excerpt}</p>
                    <div className="bc-meta">
                      <span className="bc-date">{post.date}</span>
                      <Link href="/blog/featured" className="bc-read">Read →</Link>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && !featuredVisible && (
                <div className="no-results" style={{display:'block'}}>
                  <div className="no-results-icon">🔍</div>
                  <h3>No articles found</h3>
                  <p>Try a different search term or browse all topics above.</p>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            <div className="pagination rv">
              <a href="#" className="page-btn page-prev">← Prev</a>
              <a href="#" className="page-btn active">1</a>
              <a href="#" className="page-btn">2</a>
              <a href="#" className="page-btn">3</a>
              <span style={{color:'var(--ltmuted)',fontSize:'14px'}}>...</span>
              <a href="#" className="page-btn">6</a>
              <a href="#" className="page-btn page-next">Next →</a>
            </div>
          </main>

          {/* SIDEBAR */}
          <aside className="sidebar">

            {/* Search */}
            <div className="sidebar-widget rv">
              <div className="sw-title red">🔍 Quick Search</div>
              <div style={{position:'relative'}}>
                <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{width:'100%',padding:'10px 13px',border:'1.5px solid var(--ltbdr)',borderRadius:'8px',fontSize:'13.5px',fontFamily:"'Barlow',sans-serif",outline:'none',background:'var(--lt2)',color:'var(--lttext)',transition:'all .2s'}} />
              </div>
            </div>

            {/* Stats */}
            <div className="sidebar-widget rv">
              <div className="sw-title blue">📊 By the Numbers</div>
              <div className="stat-row-s">
                <div className="stat-s"><div className="stat-sv">48</div><div className="stat-sl">ARTICLES</div></div>
                <div className="stat-s"><div className="stat-sv blue">12K</div><div className="stat-sl">READERS/MO</div></div>
                <div className="stat-s"><div className="stat-sv gold">4.9★</div><div className="stat-sl">RATING</div></div>
                <div className="stat-s"><div className="stat-sv">6</div><div className="stat-sl">CATEGORIES</div></div>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="sidebar-widget rv">
              <div className="sw-title red">🕐 Recent Posts</div>
              {[{n:'01',title:'5 Cybersecurity Threats Every OC Business Faces in 2026',date:'May 12, 2026'},{n:'02',title:'Wi-Fi 6 Upgrade: Is It Worth It for Your OC Business?',date:'May 6, 2026'},{n:'03',title:'In-House IT vs Managed IT: The Real Cost in 2026',date:'Apr 29, 2026'},{n:'04',title:'Ransomware: What To Do in the First 24 Hours',date:'Apr 21, 2026'},{n:'05',title:'Microsoft 365 vs Google Workspace: Our Honest Take',date:'Apr 14, 2026'}].map((p,i)=>(
                <div key={i} className="recent-post">
                  <div className="rp-num">{p.n}</div>
                  <div><Link href="/blog/featured" className="rp-title">{p.title}</Link><div className="rp-date">{p.date}</div></div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="sidebar-widget rv">
              <div className="sw-title gold">🏷 Popular Topics</div>
              <div className="tags-cloud">
                <span className="tag-item gold">🔐 Cybersecurity</span>
                <span className="tag-item blue">🌐 Wi-Fi</span>
                <span className="tag-item red">🖥 Managed IT</span>
                <span className="tag-item blue">☁ Microsoft 365</span>
                <span className="tag-item gold">🛡 Ransomware</span>
                <span className="tag-item red">📷 IP Cameras</span>
                <span className="tag-item blue">🔗 SD-WAN</span>
                <span className="tag-item gold">🔑 Zero Trust</span>
                <span className="tag-item red">💻 SEO</span>
                <span className="tag-item blue">⚡ UPS Power</span>
                <span className="tag-item gold">🔒 MFA</span>
                <span className="tag-item red">☁ Cloud Backup</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="sidebar-widget rv">
              <div className="sw-title blue">📬 Weekly IT Tips</div>
              <div className="newsletter-box">
                <p>Get one actionable IT security tip every Tuesday. No spam. Unsubscribe anytime.</p>
                <input type="email" placeholder="your@email.com" />
                <button onClick={e => { e.target.textContent='✅ Subscribed!'; e.target.style.background='#16A34A'; }}>Subscribe — It&apos;s Free</button>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-widget rv">
              <h4>Need IT Help Now?</h4>
              <p>Free 30-min assessment for OC businesses. No obligation, no hard sell.</p>
              <Link href="/#contact">⚡ Book Free Assessment</Link>
              <div style={{marginTop:'10px',fontSize:'11px',opacity:.7,fontFamily:"'IBM Plex Mono',monospace"}}>or call (714) 900-0000</div>
            </div>

          </aside>
        </div>
      </div>

      <Footer />
      <button className="scroll-top-btn" id="scrollTopBtn" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}
