import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Static blog post data — replace content here when you write real articles
const POST = {
  title: '5 Cybersecurity Threats Every Orange County Small Business Faces in 2026 — And How to Stop Them',
  tag: 'Cybersecurity',
  tagCls: 'red',
  date: 'May 12, 2026',
  author: 'Michelle Kim, CISM',
  readTime: '8 min read',
  views: '4,280',
  icon: '🔐',
};

const RELATED = [
  { title: 'Ransomware: What To Do in the First 24 Hours', tag: 'Cybersecurity', date: 'Apr 21, 2026', icon: '🛡' },
  { title: 'The 10-Minute IT Security Audit Every OC Business Owner Should Do Today', tag: 'Business IT', date: 'Mar 31, 2026', icon: '✅' },
  { title: 'Microsoft 365 vs Google Workspace: Our Honest Take', tag: 'Cloud', date: 'Apr 14, 2026', icon: '☁' },
];

export default function BlogSingle() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{POST.title} | NexTech OC Blog</title>
        <meta name="description" content="Ransomware, phishing, BEC attacks, unpatched systems and insider threats are costing OC businesses millions. Learn how to protect your business today." />
      </Head>

      <Header />

      {/* Article Hero */}
      <div style={{background:'linear-gradient(135deg,var(--dk) 0%,#0A1E3C 60%,#000 100%)',padding:'70px 0 50px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(46,143,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(46,143,255,.04) 1px,transparent 1px)',backgroundSize:'55px 55px'}}></div>
        <div className="wrap" style={{position:'relative',zIndex:1}}>
          <div style={{marginBottom:'16px'}}>
            <Link href="/blog" style={{fontFamily:'\'IBM Plex Mono\',monospace',fontSize:'11.5px',color:'var(--cyan)',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'6px'}}>← Back to Blog</Link>
          </div>
          <span className={`bcf-tag ${POST.tagCls}`} style={{marginBottom:'16px',display:'inline-block'}}>{POST.tag}</span>
          <h1 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(26px,4vw,46px)',color:'#fff',lineHeight:1.1,maxWidth:'800px',marginBottom:'20px'}}>{POST.title}</h1>
          <div style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'42px',height:'42px',borderRadius:'50%',background:'linear-gradient(135deg,var(--r500),var(--r300))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff'}}>{POST.author.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
              <div>
                <div style={{color:'#fff',fontWeight:600,fontSize:'14px'}}>{POST.author}</div>
                <div style={{color:'#6A7A9A',fontSize:'11px',fontFamily:'\'IBM Plex Mono\',monospace'}}>{POST.date} · {POST.readTime}</div>
              </div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',gap:'12px',fontFamily:'\'IBM Plex Mono\',monospace',fontSize:'11px',color:'#6A7A9A'}}>
              <span>👁 {POST.views} views</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="red-line" />

      {/* Article Content */}
      <div className="wrap" style={{padding:'48px 28px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'48px',alignItems:'start'}}>

          {/* Article Body */}
          <article>
            {/* Hero image slot */}
            <div className="img-slot lt rv" style={{height:'320px',marginBottom:'36px'}}>
              <div className="img-slot-icon">{POST.icon}</div>
              <div className="img-slot-title">Article Hero Image</div>
              <div className="img-slot-size">820 × 320 px</div>
              <div className="img-slot-hint">Replace with relevant image<br />File: public/images/blog/cybersecurity-2026.jpg</div>
            </div>

            <div style={{lineHeight:1.85,fontSize:'16px',color:'var(--ltmuted)'}}>
              <p style={{fontSize:'17px',color:'var(--lttext)',fontWeight:500,lineHeight:1.7,marginBottom:'28px',borderLeft:'4px solid var(--r400)',paddingLeft:'20px'}}>
                Orange County businesses are under attack — and most don&apos;t know it until it&apos;s too late. Here are the five threats our security team sees most often in 2026, and exactly what you can do about each one.
              </p>

              <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'24px',color:'var(--lttext)',margin:'32px 0 12px'}}>1. Ransomware-as-a-Service (RaaS)</h2>
              <p>Ransomware has become a franchise business. Criminal groups now sell ransomware kits to anyone willing to pay a subscription — meaning even low-skill attackers can encrypt your entire network. The average ransom demand in 2026 is $847,000 for small businesses. Recovery costs including downtime often exceed $2M.</p>
              <p><strong>How to protect yourself:</strong> Maintain offline backups tested weekly. Deploy EDR/XDR endpoint protection (not just antivirus). Segment your network so one infected machine can&apos;t reach everything. Train every employee to recognize suspicious behavior.</p>

              <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'24px',color:'var(--lttext)',margin:'32px 0 12px'}}>2. Business Email Compromise (BEC)</h2>
              <p>BEC attacks cost US businesses over $2.9 billion in 2025. The attack is simple: an attacker impersonates your CEO, CFO, or a vendor and requests a wire transfer or gift card purchase. No malware, no virus — just a convincing email from a spoofed address.</p>
              <p><strong>How to protect yourself:</strong> Require multi-factor authentication (MFA) on all email accounts. Implement DMARC, DKIM, and SPF email authentication records. Establish a verbal confirmation policy for any wire transfer over $1,000.</p>

              <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'24px',color:'var(--lttext)',margin:'32px 0 12px'}}>3. Unpatched Software Vulnerabilities</h2>
              <p>The average OC business has 47 unpatched critical vulnerabilities on their network at any given time. Attackers scan the internet for known vulnerabilities 24/7 using automated tools. If your Windows server is running an unpatched version, it takes minutes to exploit.</p>
              <p><strong>How to protect yourself:</strong> Implement automated patch management for OS and all third-party software. Maintain an asset inventory — you can&apos;t patch what you don&apos;t know about. Subscribe to vulnerability alerts for all software you use.</p>

              <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'24px',color:'var(--lttext)',margin:'32px 0 12px'}}>4. Phishing & Spear Phishing</h2>
              <p>Phishing emails now have a 32% click-through rate in small businesses — up from 18% in 2023. AI-generated spear phishing attacks are personalized using LinkedIn data and public company information, making them nearly indistinguishable from legitimate emails.</p>
              <p><strong>How to protect yourself:</strong> Run monthly simulated phishing tests. Deploy email filtering with AI-powered threat detection. Train employees to hover over links and verify sender domains before clicking.</p>

              <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'24px',color:'var(--lttext)',margin:'32px 0 12px'}}>5. Insider Threats</h2>
              <p>Whether malicious or accidental, insider threats account for 34% of all data breaches. A disgruntled employee copying customer lists, or a well-meaning staffer emailing sensitive files to their personal account — both create serious liability, especially under CCPA.</p>
              <p><strong>How to protect yourself:</strong> Implement least-privilege access control — employees should only access what they need for their role. Deploy user behavior analytics (UBA) to detect unusual data access patterns. Have a clear offboarding checklist that revokes all access on day one of departure.</p>

              <div style={{background:'rgba(217,48,48,.05)',border:'1px solid rgba(217,48,48,.2)',borderLeft:'4px solid var(--r400)',borderRadius:'12px',padding:'24px',margin:'36px 0'}}>
                <h4 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'16px',color:'var(--r400)',marginBottom:'8px'}}>🛡 Free Security Assessment for OC Businesses</h4>
                <p style={{color:'var(--ltmuted)',fontSize:'14px',margin:0}}>NexTech OC offers a free 30-minute cybersecurity assessment for Orange County businesses. Our team reviews your current setup and gives you a prioritized action list — no obligation, no sales pitch.</p>
                <Link href="/#contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'14px',background:'linear-gradient(135deg,var(--r500),var(--r400))',color:'#fff',padding:'10px 20px',borderRadius:'8px',textDecoration:'none',fontWeight:700,fontSize:'14px'}}>⚡ Book Your Free Assessment →</Link>
              </div>
            </div>

            {/* Author box */}
            <div style={{background:'var(--lt2)',border:'1px solid var(--ltbdr)',borderRadius:'12px',padding:'24px',display:'flex',gap:'16px',alignItems:'flex-start',marginTop:'48px'}}>
              <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'linear-gradient(135deg,var(--r500),var(--r300))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',fontWeight:700,color:'#fff',flexShrink:0}}>MK</div>
              <div>
                <div style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'17px',color:'var(--lttext)',marginBottom:'4px'}}>{POST.author}</div>
                <div style={{fontSize:'11px',color:'var(--r400)',fontFamily:'\'IBM Plex Mono\',monospace',marginBottom:'8px'}}>SECURITY ENGINEER · CISM CERTIFIED</div>
                <p style={{fontSize:'13.5px',color:'var(--ltmuted)',lineHeight:1.7,margin:0}}>Michelle leads NexTech OC&apos;s cybersecurity practice with 12 years of experience in enterprise security. She holds CISM and CompTIA Security+ certifications and specializes in compliance for healthcare and financial firms.</p>
              </div>
            </div>

            {/* Related posts */}
            <div style={{marginTop:'48px'}}>
              <h3 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'20px',color:'var(--lttext)',marginBottom:'20px',paddingBottom:'12px',borderBottom:'2px solid var(--r400)'}}>Related Articles</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
                {RELATED.map((r,i) => (
                  <Link key={i} href="/blog" style={{textDecoration:'none'}}>
                    <div style={{background:'#fff',border:'1px solid var(--ltbdr)',borderRadius:'12px',overflow:'hidden',transition:'all .3s'}}>
                      <div style={{height:'100px',background:'linear-gradient(135deg,var(--dk),#0A1E3C)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px'}}>{r.icon}</div>
                      <div style={{padding:'14px'}}>
                        <span className="bcf-tag red" style={{marginBottom:'8px',display:'inline-block'}}>{r.tag}</span>
                        <div style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'13.5px',color:'var(--lttext)',lineHeight:1.3,marginBottom:'6px'}}>{r.title}</div>
                        <div style={{fontSize:'11px',color:'var(--ltmuted)',fontFamily:'\'IBM Plex Mono\',monospace'}}>{r.date}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{position:'sticky',top:'90px'}}>
            {/* Table of Contents */}
            <div className="blog-sidebar rv">
              <div className="bs-title">📋 In This Article</div>
              {['Ransomware-as-a-Service','Business Email Compromise','Unpatched Vulnerabilities','Phishing & Spear Phishing','Insider Threats'].map((h,i) => (
                <div key={i} style={{display:'flex',gap:'10px',padding:'8px 0',borderBottom:'1px solid var(--ltbdr)',fontSize:'13px',color:'var(--ltmuted)',cursor:'pointer',transition:'color .2s'}}>
                  <span style={{color:'var(--r400)',fontFamily:'\'IBM Plex Mono\',monospace',fontSize:'10px',fontWeight:700,flexShrink:0,marginTop:'2px'}}>0{i+1}</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rv" style={{background:'linear-gradient(135deg,var(--r600),var(--r500))',borderRadius:'var(--rl)',padding:'24px',textAlign:'center',marginTop:'20px'}}>
              <div style={{fontSize:'32px',marginBottom:'12px'}}>🛡</div>
              <h4 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'18px',color:'#fff',marginBottom:'8px'}}>Is Your Business Protected?</h4>
              <p style={{color:'rgba(255,255,255,.75)',fontSize:'13px',lineHeight:1.7,marginBottom:'16px'}}>Free 30-minute cybersecurity assessment for OC businesses.</p>
              <Link href="/#contact" style={{display:'block',background:'#fff',color:'var(--r500)',borderRadius:'8px',padding:'10px',fontWeight:700,textDecoration:'none',fontSize:'14px'}}>⚡ Free Assessment</Link>
              <div style={{marginTop:'10px',fontSize:'11px',color:'rgba(255,255,255,.6)',fontFamily:'\'IBM Plex Mono\',monospace'}}>(714) 900-0000</div>
            </div>

            {/* Newsletter */}
            <div className="blog-sidebar rv" style={{marginTop:'20px'}}>
              <div className="bs-title">📬 Weekly IT Tips</div>
              <p style={{fontSize:'13px',color:'var(--ltmuted)',marginBottom:'12px'}}>One actionable security tip every Tuesday.</p>
              <input type="email" placeholder="your@email.com" style={{width:'100%',padding:'10px 12px',border:'1.5px solid var(--ltbdr)',borderRadius:'8px',fontSize:'13.5px',fontFamily:'\'Barlow\',sans-serif',marginBottom:'8px',outline:'none'}} />
              <button style={{width:'100%',background:'linear-gradient(135deg,var(--b500),var(--b400))',color:'#fff',border:'none',borderRadius:'8px',padding:'10px',fontWeight:700,cursor:'pointer',fontSize:'13px'}}>Subscribe Free</button>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <button className="scroll-top-btn" id="scrollTopBtn" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}

// Required for static export
export async function getStaticPaths() {
  return { paths: [{ params: { slug: 'featured' } }], fallback: false };
}

export async function getStaticProps() {
  return { props: {} };
}
