import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const POSTS = [
  { id:1, cat:'cybersecurity', tag:'Cybersecurity', tagCls:'red', title:'5 Cybersecurity Threats Every Orange County Small Business Faces in 2026', excerpt:'Ransomware, phishing, BEC attacks, unpatched systems and insider threats are costing OC businesses millions every year. Our security team breaks down the top five threats and how to stop them.', author:'Michelle Kim, CISM', date:'May 12, 2026', readTime:'8 min read', featured:true, icon:'🔐' },
  { id:2, cat:'networking', tag:'Networking', tagCls:'blue', title:'Wi-Fi 6 Upgrade: Is It Worth It for Your OC Business?', excerpt:'Wi-Fi 6 promises 4x the throughput and better performance in crowded environments. We break down whether the upgrade makes sense for your team size and budget.', author:'Jake Torres', date:'May 6, 2026', readTime:'6 min read', icon:'🌐' },
  { id:3, cat:'managed-it', tag:'Managed IT', tagCls:'red', title:'In-House IT vs Managed IT: The Real Cost Comparison in 2026', excerpt:'Hiring one IT person costs $70k+ in OC. We break down the true all-in cost of in-house IT vs. managed services for businesses of every size.', author:'Alex Rivera, CCNA', date:'Apr 29, 2026', readTime:'7 min read', icon:'🖥' },
  { id:4, cat:'cybersecurity', tag:'Cybersecurity', tagCls:'red', title:'Ransomware: What To Do in the First 24 Hours', excerpt:'Your server just encrypted. Every minute matters. Here is the exact incident response playbook our team follows — and what you should do right now.', author:'Michelle Kim, CISM', date:'Apr 21, 2026', readTime:'9 min read', icon:'🛡' },
  { id:5, cat:'cloud', tag:'Cloud', tagCls:'blue', title:'Microsoft 365 vs Google Workspace: Our Honest Take for OC Businesses', excerpt:'After deploying both platforms for hundreds of OC clients, here is our unfiltered comparison across security, cost, and usability for small business teams.', author:'Sam Patel', date:'Apr 14, 2026', readTime:'10 min read', icon:'☁' },
  { id:6, cat:'cameras', tag:'Security Cameras', tagCls:'green', title:'4K vs 8K Security Cameras: Which Resolution Does Your Business Actually Need?', excerpt:'Higher resolution sounds better, but storage costs, bandwidth, and real-world use cases matter more. Here is how to choose the right camera system for your OC property.', author:'Chris Nguyen', date:'Apr 7, 2026', readTime:'5 min read', icon:'📷' },
  { id:7, cat:'tips', tag:'Business IT', tagCls:'gold', title:'The 10-Minute IT Security Audit Every OC Business Owner Should Do Today', excerpt:'You do not need to be a security expert. This quick self-assessment takes 10 minutes and will reveal the most common vulnerabilities we find in OC businesses every week.', author:'Alex Rivera, CCNA', date:'Mar 31, 2026', readTime:'4 min read', icon:'✅' },
  { id:8, cat:'networking', tag:'Networking', tagCls:'blue', title:'SD-WAN Explained: Why OC Multi-Location Businesses Are Switching Fast', excerpt:'SD-WAN reduces WAN costs by up to 60% while improving performance. We explain what it is, how it works, and when it makes sense for your business.', author:'Jake Torres', date:'Mar 24, 2026', readTime:'7 min read', icon:'🔗' },
];

const CATS = ['all','cybersecurity','networking','managed-it','cloud','cameras','web','tips'];
const CAT_LABELS = { all:'All Topics', cybersecurity:'🔐 Cybersecurity', networking:'🌐 Networking', 'managed-it':'🖥 Managed IT', cloud:'☁ Cloud', cameras:'📷 Cameras', web:'💻 Web & SEO', tips:'💡 IT Tips' };

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = POSTS.filter(p => {
    const matchCat = activeCat === 'all' || p.cat === activeCat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <>
      <Head>
        <title>Blog | NexTech OC — IT Tips, Cybersecurity & Tech News Orange County</title>
        <meta name="description" content="Expert IT tips, cybersecurity guides, networking advice and tech news for Orange County businesses from the NexTech OC team." />
      </Head>

      <Header />

      {/* PAGE HERO */}
      <div className="blog-hero">
        <div className="wrap" style={{position:'relative',zIndex:1}}>
          <span className="sh-tag" style={{color:'var(--cyan)'}}>// nextech oc knowledge base</span>
          <h1 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(32px,5vw,56px)',color:'#fff',lineHeight:1.1,margin:'12px 0 16px'}}>
            Tech Insights for<br /><span style={{color:'var(--r300)'}}>Orange County</span> <span style={{color:'var(--b200)'}}>Businesses</span>
          </h1>
          <p style={{color:'#8A9FC0',fontSize:'16px',lineHeight:1.75,maxWidth:'580px',marginBottom:'24px'}}>IT tips, cybersecurity guides, networking how-tos and local tech news — written by our engineers for OC business owners.</p>
          <div style={{display:'flex',gap:'20px',flexWrap:'wrap'}}>
            {['📝 48 Articles Published','👥 12,400 Monthly Readers','🔄 New posts every Tuesday'].map((s,i) => (
              <span key={i} style={{fontFamily:'\'IBM Plex Mono\',monospace',fontSize:'11.5px',color:'var(--cyan)',background:'rgba(0,212,255,.08)',border:'1px solid rgba(0,212,255,.2)',padding:'4px 12px',borderRadius:'20px'}}>{s}</span>
            ))}
          </div>
        </div>
      </div>
      <hr className="red-line" />

      {/* SEARCH + FILTERS */}
      <div style={{background:'var(--lt2)',borderBottom:'1px solid var(--ltbdr)',padding:'24px 0'}}>
        <div className="wrap">
          <div style={{display:'flex',gap:'12px',marginBottom:'16px',flexWrap:'wrap'}}>
            <div style={{position:'relative',flex:1,minWidth:'240px'}}>
              <span style={{position:'absolute',left:'13px',top:'50%',transform:'translateY(-50%)',fontSize:'14px'}}>🔍</span>
              <input type="text" placeholder="Search articles..." value={search} onChange={e=>setSearch(e.target.value)}
                style={{width:'100%',padding:'10px 14px 10px 40px',border:'1.5px solid var(--ltbdr)',borderRadius:'8px',fontSize:'14px',fontFamily:'\'Barlow\',sans-serif',outline:'none'}} />
            </div>
          </div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {CATS.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                style={{padding:'6px 16px',borderRadius:'20px',fontSize:'12.5px',fontWeight:600,cursor:'pointer',border:'1.5px solid',
                  background: activeCat===c ? 'var(--r400)' : 'transparent',
                  color: activeCat===c ? '#fff' : 'var(--ltmuted)',
                  borderColor: activeCat===c ? 'var(--r400)' : 'var(--ltbdr)',
                  fontFamily:'\'Barlow\',sans-serif',transition:'all .2s'}}>
                {CAT_LABELS[c]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG CONTENT */}
      <div className="wrap" style={{padding:'48px 28px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'36px',alignItems:'start'}}>

          {/* MAIN */}
          <main>
            {/* Featured */}
            {featured && (
              <div className="rv" style={{background:'#fff',border:'1px solid var(--ltbdr)',borderRadius:'var(--rl)',overflow:'hidden',marginBottom:'28px',boxShadow:'0 2px 14px rgba(0,0,0,.05)'}}>
                <div style={{height:'260px',background:'linear-gradient(135deg,var(--dk),#0A1E3C)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'80px',position:'relative'}}>
                  {featured.icon}
                  <div style={{position:'absolute',top:'16px',left:'16px',background:'linear-gradient(90deg,var(--r500),var(--r400))',color:'#fff',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:700,fontFamily:'\'IBM Plex Mono\',monospace'}}>⭐ FEATURED</div>
                </div>
                <div style={{padding:'28px'}}>
                  <span className={`bcf-tag ${featured.tagCls}`}>{featured.tag}</span>
                  <Link href="/blog/featured" style={{display:'block',fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'22px',color:'var(--lttext)',marginBottom:'12px',textDecoration:'none',lineHeight:1.25}}>{featured.title}</Link>
                  <p style={{color:'var(--ltmuted)',fontSize:'14px',lineHeight:1.75,marginBottom:'16px'}}>{featured.excerpt}</p>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',fontFamily:'\'IBM Plex Mono\',monospace',fontSize:'11px',color:'var(--ltmuted)',paddingTop:'16px',borderTop:'1px solid var(--ltbdr)'}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'linear-gradient(135deg,var(--r500),var(--r300))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700,color:'#fff',flexShrink:0}}>{featured.author.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                    <span>{featured.author}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.readTime}</span>
                    <Link href="/blog/featured" className="read-more" style={{marginLeft:'auto'}}>Read full article →</Link>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="blog-grid">
              {rest.map(post => (
                <div key={post.id} className="blog-card-full rv">
                  <div className="bcf-img" style={{background:'linear-gradient(135deg,var(--dk),#0A1E3C)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'60px'}}>
                    {post.icon}
                  </div>
                  <div className="bcf-body">
                    <span className={`bcf-tag ${post.tagCls}`}>{post.tag}</span>
                    <Link href="/blog/featured" style={{display:'block',textDecoration:'none'}}><div className="bcf-title">{post.title}</div></Link>
                    <p className="bcf-exc">{post.excerpt}</p>
                    <div className="bcf-meta">
                      <div className="bcf-av">{post.author.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                      <span>{post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime}</span>
                      <Link href="/blog/featured" className="read-more" style={{marginLeft:'auto'}}>Read →</Link>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{textAlign:'center',padding:'60px 20px',color:'var(--ltmuted)',gridColumn:'1/-1'}}>
                  <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div>
                  <p>No articles found for your search. Try different keywords or browse all topics.</p>
                </div>
              )}
            </div>
          </main>

          {/* SIDEBAR */}
          <aside>
            {/* Stats */}
            <div className="blog-sidebar rv">
              <div className="bs-title">📊 By the Numbers</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'8px'}}>
                {[{v:'48',l:'ARTICLES',c:'var(--r400)'},{v:'12K',l:'READERS/MO',c:'var(--b400)'},{v:'4.9★',l:'RATING',c:'var(--gold)'},{v:'6',l:'CATEGORIES',c:'var(--r400)'}].map((s,i)=>(
                  <div key={i} style={{background:'var(--lt2)',border:'1px solid var(--ltbdr)',borderRadius:'8px',padding:'12px',textAlign:'center'}}>
                    <div style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'20px',color:s.c}}>{s.v}</div>
                    <div style={{fontSize:'9.5px',color:'var(--ltmuted)',fontFamily:'\'IBM Plex Mono\',monospace',marginTop:'2px'}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent */}
            <div className="blog-sidebar rv">
              <div className="bs-title">🕐 Recent Posts</div>
              {POSTS.slice(0,5).map((p,i) => (
                <div key={i} className="recent-post">
                  <div style={{width:'28px',height:'28px',borderRadius:'6px',background:'var(--r400)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700,fontFamily:'\'IBM Plex Mono\',monospace',flexShrink:0}}>0{i+1}</div>
                  <div>
                    <Link href="/blog/featured" className="rp-title" style={{textDecoration:'none'}}>{p.title.slice(0,55)}...</Link>
                    <div className="rp-date">{p.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="blog-sidebar rv">
              <div className="bs-title">🏷 Popular Topics</div>
              <div className="tag-cloud">
                {['🔐 Cybersecurity','🌐 Wi-Fi','🖥 Managed IT','☁ Microsoft 365','🛡 Ransomware','📷 IP Cameras','🔗 SD-WAN','🔑 Zero Trust','💻 SEO','⚡ UPS Power','🔒 MFA','☁ Cloud Backup'].map((t,i) => (
                  <span key={i} className="tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="blog-sidebar rv">
              <div className="bs-title">📬 Weekly IT Tips</div>
              <p style={{fontSize:'13px',color:'var(--ltmuted)',marginBottom:'12px'}}>One actionable IT security tip every Tuesday. No spam.</p>
              <input type="email" placeholder="your@email.com" style={{width:'100%',padding:'10px 12px',border:'1.5px solid var(--ltbdr)',borderRadius:'8px',fontSize:'13.5px',fontFamily:'\'Barlow\',sans-serif',marginBottom:'8px',outline:'none'}} />
              <button style={{width:'100%',background:'linear-gradient(135deg,var(--b500),var(--b400))',color:'#fff',border:'none',borderRadius:'8px',padding:'10px',fontWeight:700,cursor:'pointer',fontSize:'13px'}}>Subscribe — It&apos;s Free</button>
            </div>

            {/* CTA */}
            <div className="rv" style={{background:'linear-gradient(135deg,var(--r600),var(--r500))',borderRadius:'var(--rl)',padding:'24px',textAlign:'center'}}>
              <h4 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'18px',color:'#fff',marginBottom:'8px'}}>Need IT Help Now?</h4>
              <p style={{color:'rgba(255,255,255,.75)',fontSize:'13px',lineHeight:1.7,marginBottom:'16px'}}>Free 30-min assessment for OC businesses. No obligation, no hard sell.</p>
              <Link href="/#contact" style={{display:'block',background:'#fff',color:'var(--r500)',borderRadius:'8px',padding:'10px',fontWeight:700,textDecoration:'none',fontSize:'14px'}}>⚡ Book Free Assessment</Link>
              <div style={{marginTop:'10px',fontSize:'11px',color:'rgba(255,255,255,.6)',fontFamily:'\'IBM Plex Mono\',monospace'}}>or call (714) 900-0000</div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      <button className="scroll-top-btn" id="scrollTopBtn" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}
