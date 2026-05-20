import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BlogSingle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Reading progress bar
    const handleScroll = () => {
      const body = document.body, html = document.documentElement;
      const total = Math.max(body.scrollHeight, html.scrollHeight) - html.clientHeight;
      setProgress((window.scrollY / total) * 100);

      // TOC active state
      const headings = document.querySelectorAll('#articleBody h2[id]');
      let current = '';
      headings.forEach(h => { if (h.getBoundingClientRect().top < 140) current = h.id; });
      setActiveSection(current);

      // Scroll top button
      const btn = document.getElementById('scrollTopBtn');
      if (btn) btn.classList.toggle('show', window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Reveal
    const els = document.querySelectorAll('.rv');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));

    return () => { window.removeEventListener('scroll', handleScroll); obs.disconnect(); };
  }, []);

  const toc = [
    { id: 'threat-1', label: 'Ransomware — The #1 Revenue-Killer' },
    { id: 'threat-2', label: 'Business Email Compromise (BEC)' },
    { id: 'threat-3', label: 'Unpatched Systems — The Open Door' },
    { id: 'threat-4', label: 'Phishing & Social Engineering' },
    { id: 'threat-5', label: 'Insider Threats — The Risk From Within' },
  ];

  return (
    <>
      <Head>
        <title>5 Cybersecurity Threats Every OC Business Faces in 2026 | NexTech OC Blog</title>
        <meta name="description" content="Ransomware, phishing, BEC, unpatched systems and insider threats are costing OC businesses millions. Learn the exact steps to protect your business this week." />
      </Head>

      {/* Reading Progress Bar */}
      <div style={{position:'fixed',top:'72px',left:0,right:0,zIndex:999,height:'3px',background:'rgba(255,255,255,.1)'}}>
        <div style={{height:'100%',background:'linear-gradient(90deg,var(--r400),#F5A820,var(--b300))',width:`${progress}%`,transition:'width .1s linear'}}></div>
      </div>

      <Header />
      <hr className="red-line" />

      {/* Breadcrumb */}
      <div className="wrap">
        <div style={{padding:'14px 0',fontSize:'12.5px',color:'var(--ltmuted)',fontFamily:"'IBM Plex Mono',monospace"}}>
          <Link href="/" style={{color:'var(--b400)',textDecoration:'none'}}>Home</Link>
          <span style={{margin:'0 6px',opacity:.4}}>›</span>
          <Link href="/blog" style={{color:'var(--b400)',textDecoration:'none'}}>Blog</Link>
          <span style={{margin:'0 6px',opacity:.4}}>›</span>
          <Link href="/blog" style={{color:'var(--b400)',textDecoration:'none'}}>Cybersecurity</Link>
          <span style={{margin:'0 6px',opacity:.4}}>›</span>
          5 Cybersecurity Threats Every OC Business Faces in 2026
        </div>
      </div>

      {/* Article Header */}
      <div className="wrap">
        <div style={{padding:'48px 0 32px'}}>
          <span style={{display:'inline-block',fontSize:'11px',fontFamily:"'IBM Plex Mono',monospace",fontWeight:600,padding:'4px 12px',borderRadius:'20px',marginBottom:'14px',letterSpacing:'1px',background:'rgba(217,48,48,.08)',color:'var(--r500)',border:'1px solid rgba(217,48,48,.2)'}}>🔐 Cybersecurity</span>
          <h1 style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'clamp(26px,4vw,44px)',lineHeight:1.1,color:'var(--lttext)',marginBottom:'16px',letterSpacing:'-.2px'}}>
            5 Cybersecurity Threats Every Orange County Small Business Faces in 2026 — And How to Stop Them
          </h1>
          <p style={{fontSize:'17px',color:'var(--ltmuted)',lineHeight:1.75,marginBottom:'22px',fontStyle:'italic',borderLeft:'3px solid var(--r400)',paddingLeft:'16px'}}>
            Ransomware, phishing, BEC attacks, unpatched systems and insider threats are costing OC businesses millions every year. Our security team breaks down the top five threats and the exact steps you can take this week.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'18px',flexWrap:'wrap',padding:'16px 0',borderTop:'1px solid var(--ltbdr)',borderBottom:'1px solid var(--ltbdr)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'linear-gradient(135deg,var(--r500),var(--r300))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0}}>MK</div>
              <div>
                <div style={{fontSize:'14px',fontWeight:700,color:'var(--lttext)'}}>Michelle Kim, CISM</div>
                <div style={{fontSize:'11px',color:'var(--ltmuted)',fontFamily:"'IBM Plex Mono',monospace"}}>Co-Founder & CTO · NexTech OC</div>
              </div>
            </div>
            <span style={{fontSize:'12px',color:'var(--ltmuted)',fontFamily:"'IBM Plex Mono',monospace"}}>📅 May 12, 2026</span>
            <span style={{fontSize:'12px',color:'var(--ltmuted)',fontFamily:"'IBM Plex Mono',monospace"}}>⏱ 8 min read</span>
            <div style={{marginLeft:'auto',display:'flex',gap:'8px',flexWrap:'wrap'}}>
              <button style={{padding:'6px 14px',borderRadius:'6px',fontSize:'12px',fontWeight:600,background:'rgba(10,102,194,.1)',color:'#0A66C2',border:'1px solid rgba(10,102,194,.25)',cursor:'pointer'}}>LinkedIn</button>
              <button style={{padding:'6px 14px',borderRadius:'6px',fontSize:'12px',fontWeight:600,background:'rgba(29,161,242,.1)',color:'#1DA1F2',border:'1px solid rgba(29,161,242,.25)',cursor:'pointer'}}>Twitter/X</button>
              <button onClick={() => { navigator.clipboard?.writeText(location.href); }} style={{padding:'6px 14px',borderRadius:'6px',fontSize:'12px',fontWeight:600,background:'rgba(217,48,48,.08)',color:'var(--r500)',border:'1px solid rgba(217,48,48,.2)',cursor:'pointer'}}>Copy Link</button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Layout */}
      <div className="wrap" style={{paddingBottom:'70px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'48px'}}>

          {/* ARTICLE MAIN */}
          <article>
            {/* Hero Image */}
            <div style={{borderRadius:'14px',overflow:'hidden',marginBottom:'0',boxShadow:'0 8px 32px rgba(0,0,0,.1)'}}>
              <div className="img-slot lt" style={{height:'360px'}}>
                <div className="img-slot-icon">🔐</div>
                <div className="img-slot-title">HERO IMAGE — 820 × 360 px</div>
                <div className="img-slot-size">Cybersecurity / threat concept · dark lighting</div>
                <div className="img-slot-hint">File: public/images/blog/cybersecurity-2026.jpg</div>
              </div>
            </div>

            {/* Keyword Legend */}
            <div style={{background:'var(--lt2)',border:'1px solid var(--ltbdr)',borderRadius:'12px',padding:'18px 22px',margin:'28px 0',display:'flex',gap:'20px',flexWrap:'wrap',alignItems:'center'}}>
              <span style={{fontSize:'11px',fontFamily:"'IBM Plex Mono',monospace",color:'var(--ltmuted)',fontWeight:600,marginRight:'4px',letterSpacing:'1px'}}>KEYWORD GUIDE</span>
              <div style={{display:'flex',alignItems:'center',gap:'7px',fontSize:'12.5px'}}><div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#F5A820'}}></div><strong style={{color:'#C8840A'}}>Gold bold</strong> = Critical terms & actions</div>
              <div style={{display:'flex',alignItems:'center',gap:'7px',fontSize:'12.5px'}}><div style={{width:'10px',height:'10px',borderRadius:'50%',background:'var(--r400)'}}></div><span style={{color:'#C0392B'}}>Red</span> = Risk & warning terms</div>
              <div style={{display:'flex',alignItems:'center',gap:'7px',fontSize:'12.5px'}}><div style={{width:'10px',height:'10px',borderRadius:'50%',background:'var(--b300)'}}></div><code style={{fontSize:'12px',color:'var(--b400)'}}>Blue mono</code> = Tech tools & software</div>
            </div>

            {/* Article Body */}
            <div className="article-body" id="articleBody" style={{fontSize:'16.5px',lineHeight:1.82,color:'#1A2B42'}}>

              <p>If you run a business in Orange County — from a dental practice in Irvine to a logistics firm in Anaheim — you are a target. <span style={{color:'#C0392B',fontWeight:500}}>Cybercriminals no longer focus exclusively on Fortune 500 companies.</span> In fact, <span style={{color:'#C8840A',fontWeight:700}}>67% of cyberattacks now target small and mid-size businesses</span>, according to the Verizon 2025 Data Breach Investigations Report.</p>

              <p>In our work protecting <span style={{color:'#C8840A',fontWeight:700}}>500+ Orange County businesses</span>, our security team sees the same five attack vectors over and over. Here&apos;s an honest breakdown of each one — and the specific controls you can put in place this week.</p>

              {/* Stats */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px',margin:'28px 0'}}>
                {[{val:'$200K',lbl:'Average cost of a ransomware attack on a small business',cls:'red'},{val:'67%',lbl:'Of cyberattacks target SMBs — not just large corporations',cls:'gold'},{val:'286 Days',lbl:'Average time before a breach is detected without proper monitoring',cls:'blue'}].map((s,i)=>(
                  <div key={i} style={{background:s.cls==='red'?'rgba(217,48,48,.04)':s.cls==='gold'?'rgba(245,168,32,.1)':'rgba(46,143,255,.04)',border:`1px solid ${s.cls==='red'?'rgba(217,48,48,.25)':s.cls==='gold'?'rgba(245,168,32,.35)':'rgba(46,143,255,.25)'}`,borderRadius:'12px',padding:'18px',textAlign:'center'}}>
                    <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'28px',lineHeight:1,marginBottom:'5px',color:s.cls==='red'?'var(--r400)':s.cls==='gold'?'#C8840A':'var(--b400)'}}>{s.val}</div>
                    <div style={{fontSize:'12px',color:'var(--ltmuted)',lineHeight:1.4}}>{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Threat 1 */}
              <h2 id="threat-1" style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'clamp(22px,2.8vw,30px)',color:'var(--lttext)',margin:'44px 0 16px',paddingTop:'8px',borderTop:'1px solid var(--ltbdr)',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'32px',height:'32px',background:'linear-gradient(135deg,var(--r500),var(--r400))',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0}}>1</span>
                <span style={{color:'#C8840A',fontWeight:700}}>Ransomware</span> — The #1 Revenue-Killer
              </h2>
              <p><span style={{color:'#C8840A',fontWeight:700}}>Ransomware</span> is malicious software that <span style={{color:'#C0392B',fontWeight:500}}>encrypts your entire file system</span> and demands payment — typically in cryptocurrency — for the decryption key. In 2025, the average ransom demand for SMBs hit <span style={{color:'#C0392B',fontWeight:500}}>$350,000</span>, but the total cost including downtime, recovery, and reputational damage is often 3–5x higher.</p>
              <div style={{borderRadius:'12px',padding:'20px 24px',margin:'28px 0',borderLeft:'4px solid var(--r400)',background:'rgba(217,48,48,.06)'}}>
                <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'16px',marginBottom:'8px',color:'var(--r400)'}}>⚠️ Real OC Case</div>
                <p style={{fontSize:'14.5px',lineHeight:1.7,margin:0,color:'var(--r600)'}}>In 2024, a 40-person accounting firm in Newport Beach was hit with ransomware on a Tuesday morning. By noon, every workstation and server was encrypted. They were offline for <span style={{color:'#C0392B',fontWeight:500}}>11 business days</span> and paid $180,000 to recover. Total cost: <span style={{color:'#C0392B',fontWeight:500}}>over $400,000</span>.</p>
              </div>
              <h3 style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'20px',color:'var(--lttext)',margin:'30px 0 12px'}}>→ How Ransomware Gets In</h3>
              <ul style={{listStyle:'none',margin:'0 0 22px',padding:0}}>
                {['Phishing emails — a malicious attachment or link triggers the infection','Exposed RDP ports — Remote Desktop Protocol left open to the internet is scanned by bots 24/7','Unpatched software — known CVEs (vulnerabilities) exploited before you apply updates','Compromised credentials — purchased from the dark web after a previous breach'].map((item,i)=>(
                  <li key={i} style={{padding:'8px 0 8px 26px',position:'relative',borderBottom:'1px solid var(--ltbdr)',fontSize:'15.5px'}}>
                    <span style={{position:'absolute',left:0,color:'var(--r400)',fontSize:'10px',top:'12px'}}>▶</span>{item}
                  </li>
                ))}
              </ul>
              <h3 style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'20px',color:'var(--lttext)',margin:'30px 0 12px'}}>→ How to Stop It</h3>
              <ol style={{listStyle:'none',margin:'0 0 22px',padding:0,counterReset:'item'}}>
                {['Deploy EDR (Endpoint Detection and Response) on every device — we use SentinelOne or CrowdStrike, which use behavioral AI to stop ransomware before it executes','Implement the 3-2-1 backup rule: 3 copies of data, on 2 different media types, with 1 offsite — and test your backups monthly','Close all RDP ports and use a proper VPN for remote access instead','Enable MFA (Multi-Factor Authentication) on every account — especially Microsoft 365 and Google Workspace'].map((item,i)=>(
                  <li key={i} style={{padding:'8px 0 8px 32px',position:'relative',borderBottom:'1px solid var(--ltbdr)',fontSize:'15.5px'}}>
                    <span style={{position:'absolute',left:0,width:'20px',height:'20px',background:'var(--r400)',color:'#fff',borderRadius:'50%',fontSize:'11px',fontWeight:700,display:'inline-flex',alignItems:'center',justifyContent:'center',top:'10px',fontFamily:"'IBM Plex Mono',monospace"}}>{i+1}</span>{item}
                  </li>
                ))}
              </ol>

              {/* Threat 2 */}
              <h2 id="threat-2" style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'clamp(22px,2.8vw,30px)',color:'var(--lttext)',margin:'44px 0 16px',paddingTop:'8px',borderTop:'1px solid var(--ltbdr)',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'32px',height:'32px',background:'linear-gradient(135deg,var(--r500),var(--r400))',borderRadius:'8px',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0}}>2</span>
                <span style={{color:'#C8840A',fontWeight:700}}>Business Email Compromise (BEC)</span> — The Silent Thief
              </h2>
              <p><span style={{color:'#C8840A',fontWeight:700}}>Business Email Compromise</span> is one of the most financially devastating attacks, yet it involves <span style={{color:'#C0392B',fontWeight:500}}>no malware whatsoever</span>. The FBI IC3 reported <span style={{color:'#C0392B',fontWeight:500}}>$2.9 billion</span> in BEC losses in 2023 alone.</p>
              <div style={{borderRadius:'12px',padding:'20px 24px',margin:'28px 0',borderLeft:'4px solid #F5A820',background:'rgba(245,168,32,.1)'}}>
                <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'16px',marginBottom:'8px',color:'#C8840A'}}>💡 How to Spot BEC</div>
                <p style={{fontSize:'14.5px',lineHeight:1.7,margin:0,color:'#7A4E00'}}>Warning signs: urgent requests for wire transfers, &quot;new&quot; bank account details from a known vendor, emails asking you to keep something confidential. <span style={{color:'#C8840A',fontWeight:700}}>Always verify payment changes by phone — never by email.</span></p>
              </div>

              {/* Threat 3 */}
              <h2 id="threat-3" style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'clamp(22px,2.8vw,30px)',color:'var(--lttext)',margin:'44px 0 16px',paddingTop:'8px',borderTop:'1px solid var(--ltbdr)',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'32px',height:'32px',background:'linear-gradient(135deg,var(--r500),var(--r400))',borderRadius:'8px',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0}}>3</span>
                <span style={{color:'#C8840A',fontWeight:700}}>Unpatched Systems</span> — The Open Door
              </h2>
              <p><span style={{color:'#C0392B',fontWeight:500}}>60% of breach victims</span> say the attack exploited a known vulnerability for which a patch was already available. <span style={{color:'#C8840A',fontWeight:700}}>Automated patch management</span> removes the human element from this equation entirely.</p>
              <table style={{width:'100%',borderCollapse:'collapse',margin:'24px 0',fontSize:'14px',boxShadow:'0 2px 12px rgba(0,0,0,.05)',borderRadius:'10px',overflow:'hidden'}}>
                <thead style={{background:'linear-gradient(135deg,var(--r600),var(--r500))'}}>
                  <tr>{['Software Type','Patch Frequency','Priority Level'].map((h,i)=><th key={i} style={{color:'#fff',fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,padding:'13px 16px',textAlign:'left',fontSize:'13px',letterSpacing:'.5px'}}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[['Operating System (Windows/macOS)','Monthly (Patch Tuesday)','Critical','gold'],['Web Browsers','Weekly auto-update','High','red'],['Microsoft 365 / Office','Monthly','High','red'],['Firewall Firmware','Quarterly minimum','Critical','gold'],['Network Switches / APs','Semi-annually','Moderate','blue'],['WordPress / Website Plugins','As released','High','red']].map((row,i)=>(
                    <tr key={i} style={{background:i%2===0?'#fff':'var(--lt2)',borderBottom:'1px solid var(--ltbdr)'}}>
                      <td style={{padding:'12px 16px',color:'var(--lttext)',fontWeight:600,verticalAlign:'top'}}>{row[0]}</td>
                      <td style={{padding:'12px 16px',color:'var(--ltmuted)',verticalAlign:'top'}}>{row[1]}</td>
                      <td style={{padding:'12px 16px',color:row[3]==='gold'?'#C8840A':row[3]==='red'?'var(--r400)':'var(--b400)',fontWeight:700,verticalAlign:'top'}}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Threat 4 */}
              <h2 id="threat-4" style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'clamp(22px,2.8vw,30px)',color:'var(--lttext)',margin:'44px 0 16px',paddingTop:'8px',borderTop:'1px solid var(--ltbdr)',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'32px',height:'32px',background:'linear-gradient(135deg,var(--r500),var(--r400))',borderRadius:'8px',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0}}>4</span>
                <span style={{color:'#C8840A',fontWeight:700}}>Phishing & Social Engineering</span> — The Human Exploit
              </h2>
              <p><span style={{color:'#C8840A',fontWeight:700}}>Phishing</span> remains the #1 initial access vector — responsible for <span style={{color:'#C0392B',fontWeight:500}}>over 90% of data breaches</span>. <span style={{color:'#C8840A',fontWeight:700}}>AI-generated phishing</span> is now producing grammatically perfect, contextually accurate attacks at scale.</p>

              {/* Threat 5 */}
              <h2 id="threat-5" style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'clamp(22px,2.8vw,30px)',color:'var(--lttext)',margin:'44px 0 16px',paddingTop:'8px',borderTop:'1px solid var(--ltbdr)',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'32px',height:'32px',background:'linear-gradient(135deg,var(--r500),var(--r400))',borderRadius:'8px',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0}}>5</span>
                <span style={{color:'#C8840A',fontWeight:700}}>Insider Threats</span> — The Risk From Within
              </h2>
              <p>Whether malicious or accidental, insider threats account for <span style={{color:'#C0392B',fontWeight:500}}>34% of all data breaches</span>. A disgruntled employee copying customer lists, or a well-meaning staffer emailing sensitive files to their personal account — both create serious liability under CCPA.</p>

              {/* Mid-article CTA */}
              <div style={{background:'rgba(217,48,48,.05)',border:'1px solid rgba(217,48,48,.2)',borderLeft:'4px solid var(--r400)',borderRadius:'12px',padding:'24px',margin:'36px 0'}}>
                <h4 style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'16px',color:'var(--r400)',marginBottom:'8px'}}>🛡 Free Security Assessment for OC Businesses</h4>
                <p style={{color:'var(--ltmuted)',fontSize:'14px',margin:'0 0 14px',lineHeight:1.7}}>NexTech OC offers a free 30-minute cybersecurity assessment for Orange County businesses. Our team reviews your current setup and gives you a prioritized action list — no obligation, no sales pitch.</p>
                <Link href="/#contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'linear-gradient(135deg,var(--r500),var(--r400))',color:'#fff',padding:'10px 20px',borderRadius:'8px',textDecoration:'none',fontWeight:700,fontSize:'14px'}}>⚡ Book Your Free Assessment →</Link>
              </div>

              {/* Tags */}
              <div style={{display:'flex',flexWrap:'wrap',gap:'7px',margin:'28px 0'}}>
                {[{label:'Ransomware',cls:'gold'},{label:'MFA',cls:'gold'},{label:'EDR/XDR',cls:'gold'},{label:'BEC Fraud',cls:'red'},{label:'Phishing',cls:'red'},{label:'Patch Mgmt',cls:'red'},{label:'SentinelOne',cls:'blue'},{label:'CrowdStrike',cls:'blue'},{label:'M365',cls:'blue'},{label:'SIEM',cls:'blue'}].map((t,i)=>(
                  <span key={i} style={{padding:'5px 13px',borderRadius:'20px',fontSize:'12px',fontWeight:600,fontFamily:"'Barlow',sans-serif",background:t.cls==='gold'?'rgba(245,168,32,.1)':t.cls==='red'?'rgba(217,48,48,.07)':'rgba(46,143,255,.07)',color:t.cls==='gold'?'#C8840A':t.cls==='red'?'var(--r500)':'var(--b400)',border:`1px solid ${t.cls==='gold'?'rgba(245,168,32,.35)':t.cls==='red'?'rgba(217,48,48,.2)':'rgba(46,143,255,.2)'}`}}>{t.label}</span>
                ))}
              </div>

              {/* Author Box */}
              <div style={{background:'var(--lt2)',border:'1px solid var(--ltbdr)',borderRadius:'14px',padding:'26px',margin:'36px 0',display:'flex',gap:'20px',alignItems:'flex-start'}}>
                <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'linear-gradient(135deg,var(--r500),var(--r300))',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'24px',color:'#fff',flexShrink:0}}>MK</div>
                <div>
                  <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'18px',color:'var(--lttext)',marginBottom:'3px'}}>Michelle Kim, CISM</div>
                  <div style={{fontSize:'12px',fontFamily:"'IBM Plex Mono',monospace",color:'var(--r400)',marginBottom:'10px'}}>SECURITY ENGINEER · CISM CERTIFIED</div>
                  <p style={{fontSize:'14px',color:'var(--ltmuted)',lineHeight:1.7,margin:0}}>Michelle leads NexTech OC&apos;s cybersecurity practice with 12 years of experience in enterprise security. She holds CISM and CompTIA Security+ certifications and specializes in compliance for healthcare and financial firms.</p>
                </div>
              </div>

              {/* Related Posts */}
              <h3 style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'20px',color:'var(--lttext)',margin:'36px 0 20px',paddingBottom:'12px',borderBottom:'2px solid var(--r400)'}}>You Might Also Like</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
                {[{title:'Ransomware: What To Do in the First 24 Hours',tag:'Cybersecurity',icon:'🛡'},{title:'The 10-Minute IT Security Audit Every OC Business Should Do',tag:'Business IT',icon:'✅'},{title:'Microsoft 365 vs Google Workspace: Our Honest Take',tag:'Cloud',icon:'☁'}].map((r,i)=>(
                  <Link key={i} href="/blog" style={{textDecoration:'none'}}>
                    <div style={{background:'#fff',border:'1px solid var(--ltbdr)',borderRadius:'12px',overflow:'hidden'}}>
                      <div style={{height:'90px',background:'linear-gradient(135deg,var(--dk),#0A1E3C)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'34px'}}>{r.icon}</div>
                      <div style={{padding:'14px'}}>
                        <span style={{display:'inline-block',fontSize:'10px',fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,padding:'3px 9px',borderRadius:'20px',marginBottom:'8px',background:'rgba(217,48,48,.08)',color:'var(--r500)',border:'1px solid rgba(217,48,48,.2)'}}>{r.tag}</span>
                        <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'13.5px',color:'var(--lttext)',lineHeight:1.3}}>{r.title}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </article>

          {/* SIDEBAR */}
          <aside style={{position:'sticky',top:'90px',alignSelf:'start'}}>

            {/* TOC */}
            <div style={{background:'#fff',border:'1px solid var(--ltbdr)',borderRadius:'var(--rl)',padding:'20px',marginBottom:'20px'}}>
              <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'13px',color:'var(--lttext)',marginBottom:'14px',paddingBottom:'10px',borderBottom:'2px solid var(--r400)',textTransform:'uppercase',letterSpacing:'1px'}}>📋 Table of Contents</div>
              <ol id="tocList" style={{listStyle:'none',padding:0,margin:0}}>
                {toc.map((item,i)=>(
                  <li key={i} style={{marginBottom:'4px'}}>
                    <a href={`#${item.id}`} style={{display:'flex',gap:'10px',padding:'7px 8px',borderRadius:'6px',textDecoration:'none',fontSize:'13px',color:activeSection===item.id?'var(--r400)':'var(--ltmuted)',background:activeSection===item.id?'rgba(217,48,48,.06)':'transparent',fontWeight:activeSection===item.id?700:400,transition:'all .2s'}}>
                      <span style={{color:'var(--r400)',fontFamily:"'IBM Plex Mono',monospace",fontSize:'10px',fontWeight:700,flexShrink:0,marginTop:'2px'}}>0{i+1}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA Widget */}
            <div style={{background:'linear-gradient(135deg,var(--r600),var(--r500))',borderRadius:'var(--rl)',padding:'22px',textAlign:'center',marginBottom:'20px'}}>
              <h4 style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'17px',color:'#fff',marginBottom:'8px'}}>🛡 Free Security Audit</h4>
              <p style={{color:'rgba(255,255,255,.8)',fontSize:'13px',lineHeight:1.65,marginBottom:'14px'}}>Get a free cybersecurity assessment for your OC business. We identify your top vulnerabilities at zero cost.</p>
              <Link href="/#contact" style={{display:'block',background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.3)',color:'#fff',borderRadius:'8px',padding:'10px',textDecoration:'none',fontWeight:700,fontSize:'13.5px',transition:'all .2s'}}>Book Free Assessment</Link>
              <div style={{marginTop:'10px',fontSize:'11px',opacity:.65,fontFamily:"'IBM Plex Mono',monospace",color:'#fff'}}>or call (714) 900-0000</div>
            </div>

            {/* Tags */}
            <div style={{background:'#fff',border:'1px solid var(--ltbdr)',borderRadius:'var(--rl)',padding:'20px',marginBottom:'20px'}}>
              <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'13px',marginBottom:'14px',paddingBottom:'10px',borderBottom:'2px solid #F5A820',textTransform:'uppercase',letterSpacing:'1px',color:'var(--lttext)'}}>🏷 Article Keywords</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                {['Ransomware','MFA','EDR/XDR','BEC Fraud','Phishing','Patch Mgmt','SentinelOne','CrowdStrike','M365','SIEM'].map((t,i)=>(
                  <span key={i} style={{padding:'4px 10px',borderRadius:'20px',fontSize:'11.5px',fontFamily:"'IBM Plex Mono',monospace",background:'var(--lt2)',border:'1px solid var(--ltbdr)',color:'var(--ltmuted)',cursor:'pointer'}}>{t}</span>
                ))}
              </div>
            </div>

            {/* Recent Articles */}
            <div style={{background:'#fff',border:'1px solid var(--ltbdr)',borderRadius:'var(--rl)',padding:'20px',marginBottom:'20px'}}>
              <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'13px',marginBottom:'14px',paddingBottom:'10px',borderBottom:'2px solid var(--b300)',textTransform:'uppercase',letterSpacing:'1px',color:'var(--lttext)'}}>🕐 Recent Articles</div>
              {[{n:'01',title:'Wi-Fi 6 Upgrade: Is It Worth It for Your OC Business?',date:'May 6, 2026'},{n:'02',title:'In-House IT vs Managed IT: The Real Cost in 2026',date:'Apr 29, 2026'},{n:'03',title:'Microsoft 365 vs Google Workspace: Honest Comparison',date:'Apr 14, 2026'},{n:'04',title:'SD-WAN vs MPLS for Multi-Site OC Businesses',date:'Mar 17, 2026'}].map((p,i)=>(
                <div key={i} style={{display:'flex',gap:'12px',padding:'10px 0',borderBottom:'1px solid var(--ltbdr)'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'6px',background:'var(--r400)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700,fontFamily:"'IBM Plex Mono',monospace",flexShrink:0}}>{p.n}</div>
                  <div>
                    <Link href="/blog" style={{display:'block',fontSize:'12.5px',fontWeight:600,color:'var(--lttext)',textDecoration:'none',lineHeight:1.4,marginBottom:'3px'}}>{p.title}</Link>
                    <div style={{fontSize:'10.5px',color:'var(--ltmuted)',fontFamily:"'IBM Plex Mono',monospace"}}>{p.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{background:'#fff',border:'1px solid var(--ltbdr)',borderRadius:'var(--rl)',padding:'20px'}}>
              <div style={{fontFamily:"'Barlow Semi Condensed',sans-serif",fontWeight:700,fontSize:'13px',marginBottom:'14px',paddingBottom:'10px',borderBottom:'2px solid var(--b300)',textTransform:'uppercase',letterSpacing:'1px',color:'var(--lttext)'}}>📬 Weekly IT Tips</div>
              <p style={{fontSize:'12.5px',color:'var(--ltmuted)',marginBottom:'12px',lineHeight:1.55}}>One actionable IT tip every Tuesday. No spam, unsubscribe anytime.</p>
              <input type="email" placeholder="your@email.com" style={{width:'100%',background:'var(--lt2)',border:'1.5px solid var(--ltbdr)',borderRadius:'8px',padding:'10px 12px',fontSize:'13px',color:'var(--lttext)',outline:'none',marginBottom:'9px',fontFamily:"'Barlow',sans-serif"}} />
              <button style={{width:'100%',padding:'10px',border:'none',borderRadius:'8px',background:'linear-gradient(135deg,var(--r500),var(--r400))',color:'#fff',fontWeight:700,fontSize:'13.5px',cursor:'pointer',fontFamily:"'Barlow',sans-serif"}}>Subscribe — Free</button>
            </div>

          </aside>
        </div>
      </div>

      <Footer />
      <button className="scroll-top-btn" id="scrollTopBtn" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [{ params: { slug: 'featured' } }], fallback: false };
}
export async function getStaticProps() {
  return { props: {} };
}
