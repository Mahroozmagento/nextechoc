import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', service: '', teamSize: '', message: '', consent: false, urgent: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState('');
  const [faqOpen, setFaqOpen] = useState(null);
  const [slide, setSlide] = useState(0);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.rv,.rv-left,.rv-right');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));

    // Counter animation
    const counters = document.querySelectorAll('.counter[data-target]');
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.target);
          let start = 0;
          const duration = 1800;
          const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            e.target.textContent = Math.floor(ease * target);
            if (progress < 1) requestAnimationFrame(step);
            else e.target.textContent = target;
          };
          requestAnimationFrame(step);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));

    // Scroll top button
    const scrollBtn = document.getElementById('scrollTopBtn');
    const handleScroll = () => {
      if (scrollBtn) scrollBtn.classList.toggle('show', window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    // Carousel auto-play
    const timer = setInterval(() => setSlide(s => (s + 1) % 2), 6000);
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(timer); };
  }, []);

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = 'First name required.';
    if (!formData.lastName.trim()) e.lastName = 'Last name required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required.';
    if (!formData.service) e.service = 'Please select a service.';
    if (formData.message.trim().length < 10) e.message = 'Please provide details (min. 10 characters).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setTicketNum(data.ticketNumber);
        setSubmitted(true);
      }
    } catch {
      alert('Something went wrong. Please call us at (714) 900-0000.');
    }
    setSubmitting(false);
  };

  const faqs = [
    { q: 'How fast do you respond to IT emergencies?', a: 'Business Pro clients have a guaranteed 1-hour on-site SLA for critical issues. Remote support response is typically under 15 minutes. For true emergencies, call (714) 900-0000 — we answer 24/7/365.' },
    { q: 'Do you require long-term contracts?', a: 'Never. All our Managed IT plans are month-to-month. We earn your business every single month through results, not lock-in clauses. Cancel with 30 days notice, no penalties.' },
    { q: 'What cities in Orange County do you serve?', a: 'All of Orange County: Irvine, Anaheim, Santa Ana, Newport Beach, Tustin, Garden Grove, Orange, Costa Mesa, Fullerton, Huntington Beach, Mission Viejo, Lake Forest and more. On-site same day for most locations.' },
    { q: 'Can you replace our existing IT company?', a: 'Yes. We handle complete IT transitions including data migration, vendor handoffs, documentation and onboarding — typically with zero downtime. Our team does a full environment audit first.' },
    { q: 'Do you handle electrical and IT under one contract?', a: 'Yes — that\'s our unique value. NexTech OC is the only Orange County company that covers IT, networking, cybersecurity, security cameras, electrical contracting, and web design under one roof.' }
  ];

  return (
    <>
      <Head>
        <title>NexTech OC | IT Support, Networking & Cybersecurity — Orange County</title>
        <meta name="description" content="Orange County's #1 IT support company. Managed IT, networking, cybersecurity, security cameras, electrical, and web design. 1-hour response. No contracts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-overlay"></div>
          <div className="hero-bg-grid"></div>
        </div>
        <svg className="hero-circuit" viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',right:0,top:0,width:'55%',height:'100%',opacity:.06,pointerEvents:'none'}}>
          <g stroke="#D93030" fill="none" strokeWidth="1">
            <path d="M0 100 H200 V200 H400 V300"/><path d="M150 0 V150 H350 V400 H500 V550"/>
            <path d="M300 50 H500 V250 H600"/><path d="M50 300 H250 V500 H450"/>
            <circle cx="200" cy="200" r="4" fill="#D93030"/><circle cx="350" cy="400" r="4" fill="#2E8FFF"/>
            <circle cx="500" cy="250" r="4" fill="#D93030"/><circle cx="250" cy="500" r="4" fill="#00D4FF"/>
          </g>
        </svg>
        <div className="orb o1"></div><div className="orb o2"></div>

        <div className="hero-inner">
          <div>
            <div className="hero-badge"><div className="badge-dot"></div>Orange County&apos;s #1 IT Partner</div>
            <h1>Your Business Runs on<br /><span className="hl-red">Bulletproof Tech.</span><br /><span className="hl-blue">We Keep It That Way.</span></h1>
            <p className="hero-sub">Enterprise-grade <strong>IT support, networking, cybersecurity, cameras, electrical</strong> and web — all local, all fast, zero drama.</p>
            <div className="hero-actions">
              <a href="#contact" className="btn-red">⚡ Free Consultation</a>
              <a href="#services" className="btn-ghost-wh">↓ Explore Services</a>
            </div>
            <div className="hero-stats">
              <div className="hstat"><div className="hstat-num red"><span className="counter" data-target="500">0</span>+</div><div className="hstat-lbl">OC BUSINESSES</div></div>
              <div className="hstat"><div className="hstat-num blue">&lt;1 HR</div><div className="hstat-lbl">RESPONSE TIME</div></div>
              <div className="hstat"><div className="hstat-num cyan">99.9%</div><div className="hstat-lbl">UPTIME SLA</div></div>
              <div className="hstat"><div className="hstat-num red">24/7</div><div className="hstat-lbl">MONITORING</div></div>
            </div>
          </div>
          <div className="hero-visual rv-right">
            <div className="hero-float-card hfc-1"><div className="hfc-lbl">Network Status</div><div className="hfc-val green">● ALL SYSTEMS NOMINAL</div></div>
            <div className="hero-img-wrap">

              <img 
  src="/images/IT_pro_at_monitor2.webp" 
  alt="IT professional at monitors — NexTech OC" 
  style={{width:'100%',height:'420px',objectFit:'cover',borderRadius:'16px'}} 
/>

            </div>
            <div className="hero-float-card hfc-2"><div className="hfc-lbl">Avg Response</div><div className="hfc-val red">⚡ &lt; 1 HOUR</div></div>
          </div>
        </div>
      </section>

      <hr className="red-line" />

      {/* ═══ TRUST STRIP ═══ */}
      <div className="trust">
        <div className="wrap">
          <div className="trust-inner">
            <div className="trust-item"><span className="ti-icon" style={{color:'var(--r400)'}}>🔒</span> SOC 2 Compliant</div>
            <div className="trust-item"><span className="ti-icon" style={{color:'var(--r400)'}}>⚡</span> 1-Hour Emergency</div>
            <div className="trust-item"><span className="ti-icon" style={{color:'var(--b400)'}}>🏆</span> Microsoft Gold Partner</div>
            <div className="trust-item"><span className="ti-icon" style={{color:'var(--b400)'}}>📍</span> Locally Owned OC</div>
            <div className="trust-item"><span className="ti-icon" style={{color:'var(--r400)'}}>🛡</span> Cyber Liability Insured</div>
            <div className="trust-item"><span className="ti-icon" style={{color:'var(--b400)'}}>✅</span> CA Licensed Electrical</div>
          </div>
        </div>
      </div>

      {/* ═══ TICKER ═══ */}
      <div className="tkw">
        <div className="tk">
          {['Managed IT Services','Cybersecurity','Network Installation','Security Cameras','Electrical Services','Web Design','Cloud Solutions','VoIP Systems','24/7 Monitoring','IT Consulting',
            'Managed IT Services','Cybersecurity','Network Installation','Security Cameras','Electrical Services','Web Design','Cloud Solutions','VoIP Systems','24/7 Monitoring','IT Consulting'].map((t,i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ SERVICES ═══ */}
      <section className="sec-lt" id="services">
        <div className="si">
          <div className="sh rv" style={{textAlign:'center',marginBottom:'52px'}}>
            <span className="sh-tag">// what we do</span>
            <h2 className="sh"><span style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(26px,3.8vw,42px)',color:'var(--lttext)'}}>Six Ways We Keep Your Business <span className="hl-r">Running</span></span></h2>
            <p style={{color:'var(--ltmuted)',fontSize:'15.5px',lineHeight:1.75,maxWidth:'580px',margin:'10px auto 0'}}>One team, every tech need. Stop juggling vendors — NexTech OC handles your entire technology stack under one roof.</p>
          </div>
          <div className="svc-grid">
            {[
              {icon:'🖥',title:'Managed IT Services',desc:'24/7 monitoring, unlimited helpdesk, patch management and proactive strategy. Your complete outsourced IT department.',tags:['Helpdesk 24/7','Remote Support','Patch Mgmt'],col:'red'},
              {icon:'🌐',title:'Networking & Infrastructure',desc:'Structured cabling, enterprise Wi-Fi, VLAN segmentation, SD-WAN and multi-site connectivity — built to scale.',tags:['Cat6/Cat6A','Cisco/Ubiquiti','SD-WAN'],col:'blue'},
              {icon:'🔐',title:'Cybersecurity',desc:'Enterprise firewall, EDR/XDR, SIEM, email security, phishing training and HIPAA/PCI-DSS compliance audits.',tags:['Fortinet','EDR/XDR','HIPAA'],col:'red'},
              {icon:'📷',title:'Security Cameras',desc:'4K/8K IP camera systems, NVR/DVR, AI analytics, license plate recognition and remote viewing — OC-wide.',tags:['4K/8K IP Cameras','AI Analytics','LPR'],col:'blue'},
              {icon:'⚡',title:'Electrical Services',desc:'Licensed contractor for low-voltage, server room power, UPS/generators, panel upgrades and smart building.',tags:['Low Voltage','UPS/Generator','CA Licensed'],col:'blue'},
              {icon:'💻',title:'Web Design & Hosting',desc:'Custom sites, SEO, e-commerce and managed hosting with 99.9% uptime SLA — we build it, you grow it.',tags:['Custom Dev','SEO Ready','Managed Host'],col:'red'},
            ].map((s,i) => (
              <div className="svc-card rv" key={i}>
                <div className={`svc-icon ${s.col}`}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href="#contact" className={`svc-link${s.col==='blue'?' svc-link-b':''}`}>Explore service →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="sec-lt2" id="process">
        <div className="si">
          <div className="sh rv" style={{textAlign:'center',marginBottom:'52px'}}>
            <span className="sh-tag">// how it works</span>
            <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(26px,3.8vw,42px)',color:'var(--lttext)',marginBottom:'10px'}}>From First Call to <span className="hl-r">Fully Optimized</span> — 4 Steps</h2>
            <p style={{color:'var(--ltmuted)',fontSize:'15.5px'}}>No surprises, no runaround. A clear, repeatable path every time.</p>
          </div>
          <div className="proc-grid">
            <div className="proc-line"></div>
            {[
              {n:'01',cls:'n1',title:'Discovery Call',desc:'We assess your setup, pain points and goals — no sales pitch, just honest advice from a real engineer.'},
              {n:'02',cls:'n2',title:'Custom Proposal',desc:'Transparent, line-item quote within 24 hours. No hidden fees, no boilerplate, no fine print.'},
              {n:'03',cls:'n3',title:'Rapid Deployment',desc:'Certified engineers execute on your schedule with minimal disruption to your team.'},
              {n:'04',cls:'n4',title:'Optimize & Scale',desc:'24/7 monitoring, quarterly business reviews and proactive upgrades keep you ahead of problems.'},
            ].map((s,i) => (
              <div className="proc-step rv" key={i}>
                <div className={`proc-num ${s.cls}`}>{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section className="sec-dk" id="about">
        <div className="si">
          <div className="why-grid">
            <div className="rv-left">
              <span className="sh-tag" style={{color:'var(--r300)'}}>// why nextech oc</span>
              <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(26px,3.8vw,42px)',color:'#fff',margin:'10px 0 12px'}}>Local Engineers.<br /><span style={{color:'var(--b200)'}}>Real Accountability.</span></h2>
              <p style={{color:'#8A9FC0',fontSize:'15px',lineHeight:1.78,marginBottom:'28px'}}>We&apos;re not a national MSP with an overseas helpdesk. We&apos;re your neighbors — engineers who live in OC, know your name, and show up in person when it matters.</p>
              <ul className="why-list">
                {[
                  {title:'No Contracts, Ever',desc:'Month-to-month plans. We earn your business every single month — no lock-in.'},
                  {title:'Certified On-Site Engineers',desc:'CCNA, CompTIA, Microsoft, low-voltage certified — local, on-call, in person.'},
                  {title:'Flat-Rate Predictable Pricing',desc:'Know exactly what you pay each month. No surprise invoices, no hidden labor.'},
                  {title:'100% US-Based Support',desc:'Every call and ticket is handled by our OC team — never outsourced overseas.'},
                ].map((w,i) => (
                  <li className="why-item" key={i}>
                    <div className="why-check">✓</div>
                    <div className="why-text"><h4>{w.title}</h4><p>{w.desc}</p></div>
                  </li>
                ))}
              </ul>
              <div style={{marginTop:'28px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <a href="#contact" className="btn-red">Book Free Assessment</a>
                <a href="#pricing" className="btn-ghost-blue" style={{background:'transparent',color:'var(--b300)',padding:'11px 22px',borderRadius:'9px',fontWeight:600,fontSize:'14px',textDecoration:'none',border:'2px solid rgba(46,143,255,.5)',display:'inline-flex',alignItems:'center',gap:'8px'}}>View Pricing</a>
              </div>
            </div>
            <div className="rv-right">
              <div className="metric-grid" style={{marginBottom:'16px'}}>
                {[
                  {val:<><span className="counter" data-target="500">0</span>+</>,lbl:'CLIENTS SERVED',cls:'red rb'},
                  {val:'12+',lbl:'YEARS IN OC',cls:'blue bb'},
                  {val:'99.9%',lbl:'UPTIME SLA',cls:'cyan bb'},
                  {val:'28',lbl:'ENGINEERS',cls:'red rb'},
                ].map((m,i) => (
                  <div className={`metric-box ${m.cls.includes('rb')?'rb':'bb'}`} key={i}>
                    <div className={`metric-val ${m.cls.split(' ')[0]}`}>{m.val}</div>
                    <div className="metric-lbl">{m.lbl}</div>
                  </div>
                ))}
              </div>

             <img
  src="/images/team-meeting.webp"
  alt="NexTech OC team meeting"
  style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'12px'}}
/>

            </div>
          </div>
        </div>
      </section>

      <hr className="red-line" />

      {/* ═══ PRICING ═══ */}
      <section className="sec-lt2" id="pricing">
        <div className="si">
          <div className="sh rv" style={{textAlign:'center',marginBottom:'52px'}}>
            <span className="sh-tag">// pricing plans</span>
            <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(26px,3.8vw,42px)',color:'var(--lttext)',marginBottom:'10px'}}>Managed IT Plans — <span className="hl-r">Transparent Pricing</span></h2>
            <p style={{color:'var(--ltmuted)',fontSize:'15px',maxWidth:'580px',margin:'0 auto'}}>All month-to-month, no contracts, per user per month.</p>
          </div>
          <div className="pricing-grid rv">
            {/* Starter */}
            <div className="pc">
              <div className="pc-head">
                <div className="pc-icon">⚡</div>
                <div className="pc-name">Starter</div>
                <div className="pc-price">$49<span>/user/mo</span></div>
              </div>
              <div className="pc-body">
                <ul className="pc-feat">
                  <li>Unlimited remote helpdesk support</li>
                  <li>24/7 network and endpoint monitoring</li>
                  <li>Antivirus & automated patch management</li>
                  <li>Monthly IT health report</li>
                  <li>Software license tracking</li>
                </ul>
              </div>
              <div className="pc-foot"><a href="#contact" className="btn-red" style={{width:'100%',justifyContent:'center'}}>Get Started</a></div>
            </div>
            {/* Business Pro */}
            <div className="pc popular">
              <div className="pc-badge">⭐ MOST POPULAR</div>
              <div className="pc-head">
                <div className="pc-icon">🚀</div>
                <div className="pc-name">Business Pro</div>
                <div className="pc-price">$89<span>/user/mo</span></div>
              </div>
              <div className="pc-body">
                <ul className="pc-feat">
                  <li>Everything in Starter, plus:</li>
                  <li>4 on-site visits/month included</li>
                  <li>Advanced cybersecurity stack (EDR/XDR)</li>
                  <li>Cloud backup — 500 GB storage</li>
                  <li>1-hour on-site response SLA</li>
                  <li>Quarterly business review meeting</li>
                </ul>
              </div>
              <div className="pc-foot"><a href="#contact" className="btn-red" style={{width:'100%',justifyContent:'center'}}>Start Free Trial</a></div>
            </div>
            {/* Enterprise */}
            <div className="pc">
              <div className="pc-head">
                <div className="pc-icon">🏢</div>
                <div className="pc-name">Enterprise</div>
                <div className="pc-price" style={{fontSize:'30px'}}>Custom</div>
              </div>
              <div className="pc-body">
                <ul className="pc-feat">
                  <li>Everything in Business Pro, plus:</li>
                  <li>Dedicated account engineer</li>
                  <li>vCISO advisory</li>
                  <li>Multi-site management console</li>
                  <li>HIPAA / PCI-DSS audit included</li>
                  <li>Custom SLA — your requirements</li>
                </ul>
              </div>
              <div className="pc-foot"><a href="#contact" className="btn-red" style={{width:'100%',justifyContent:'center'}}>Contact Sales</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="sec-dk" id="faq">
        <div className="si">
          <div className="sh rv" style={{textAlign:'center',marginBottom:'48px'}}>
            <span className="sh-tag" style={{color:'var(--r300)'}}>// faq</span>
            <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(26px,3.8vw,42px)',color:'#fff'}}>Frequently Asked <span style={{color:'var(--r300)'}}>Questions</span></h2>
          </div>
          <div className="faq-list">
            {faqs.map((f,i) => (
              <div className="faq-item" key={i}>
                <button className="faq-q" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                  {f.q}
                  <em className="faq-icon" style={{transform:faqOpen===i?'rotate(45deg)':'none'}}>+</em>
                </button>
                <div className={`faq-a${faqOpen===i?' open':''}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="sec-lt" id="contact">
        <div className="si">
          <div className="sh rv" style={{textAlign:'center',marginBottom:'52px'}}>
            <span className="sh-tag">// get in touch</span>
            <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(26px,3.8vw,42px)',color:'var(--lttext)',marginBottom:'10px'}}>Let&apos;s <span className="hl-r">Talk Tech</span></h2>
            <p style={{color:'var(--ltmuted)'}}>Fill out the form and a real OC engineer responds within 1 business hour. Emergencies: call us 24/7.</p>
          </div>

          <div className="contact-grid">
            {/* Left: Info */}
            <div className="rv-left">
              <h3 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'22px',color:'var(--lttext)',marginBottom:'12px'}}>We&apos;re Local. We Answer.</h3>
              <p style={{color:'var(--ltmuted)',fontSize:'14.5px',lineHeight:1.78,marginBottom:'28px'}}>Based in Orange County — our engineers serve Irvine, Anaheim, Santa Ana, Newport Beach, Tustin, Garden Grove and every surrounding city.</p>
              {[
                {icon:'📞',label:'(714) 900-0000',sub:'Mon–Fri 8am–6pm | Emergency 24/7'},
                {icon:'✉',label:'hello@nextechoc.com',sub:'Response within 1 business hour'},
                {icon:'📍',label:'Orange County, California',sub:'All OC cities — on-site same day'},
                {icon:'🕐',label:'Business Hours',sub:'Mon–Fri: 8:00 AM – 6:00 PM PST | Emergency: 24/7/365'},
              ].map((c,i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'14px',padding:'14px 0',borderBottom:'1px solid var(--ltbdr)'}}>
                  <div style={{width:'42px',height:'42px',borderRadius:'10px',background:'rgba(217,48,48,.08)',border:'1px solid rgba(217,48,48,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'17px',flexShrink:0}}>{c.icon}</div>
                  <div>
                    <div style={{fontSize:'14px',color:'var(--lttext)',fontWeight:600}}>{c.label}</div>
                    <div style={{fontSize:'12px',color:'var(--ltmuted)'}}>{c.sub}</div>
                  </div>
                </div>
              ))}

              <img
  src="/images/office.webp"
  alt="NexTech OC office — Orange County"
  style={{width:'100%',height:'220px',objectFit:'cover',borderRadius:'12px',marginTop:'20px'}}
/>

            </div>

            {/* Right: Form */}
            <div className="rv-right">
              <div style={{background:'var(--dk)',borderRadius:'16px',padding:'32px',border:'1px solid rgba(217,48,48,.2)'}}>
                {submitted ? (
                  <div className="fsuc" style={{display:'block'}}>
                    <div className="fsuc-icon">✅</div>
                    <h3>Message Received!</h3>
                    <p>A NexTech OC engineer will contact you within <strong>1 business hour</strong>.<br />For urgent issues, call <strong>(714) 900-0000</strong>.</p>
                    <p style={{marginTop:'12px',fontFamily:'\'IBM Plex Mono\',monospace',fontSize:'11px',color:'var(--cyan)'}}>// TICKET #NXT-{ticketNum} CREATED</p>
                  </div>
                ) : (
                  <>
                    <div style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'20px',color:'#fff',marginBottom:'4px'}}>Get Your Free Quote</div>
                    <div style={{fontFamily:'\'IBM Plex Mono\',monospace',fontSize:'11px',color:'var(--cyan)',marginBottom:'22px'}}>// respond within 1 hour during business hours</div>
                    <div className="frow">
                      <div className="form-g">
                        <label>First Name *</label>
                        <input type="text" placeholder="John" value={formData.firstName} onChange={e=>setFormData({...formData,firstName:e.target.value})} className={errors.firstName?'er':''} />
                        {errors.firstName && <div className="err-msg" style={{display:'block'}}>{errors.firstName}</div>}
                      </div>
                      <div className="form-g">
                        <label>Last Name *</label>
                        <input type="text" placeholder="Smith" value={formData.lastName} onChange={e=>setFormData({...formData,lastName:e.target.value})} className={errors.lastName?'er':''} />
                        {errors.lastName && <div className="err-msg" style={{display:'block'}}>{errors.lastName}</div>}
                      </div>
                    </div>
                    <div className="form-g">
                      <label>Business Email *</label>
                      <input type="email" placeholder="john@company.com" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} className={errors.email?'er':''} />
                      {errors.email && <div className="err-msg" style={{display:'block'}}>{errors.email}</div>}
                    </div>
                    <div className="frow">
                      <div className="form-g">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="(714) 555-0000" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} />
                      </div>
                      <div className="form-g">
                        <label>Company Name</label>
                        <input type="text" placeholder="Acme Corp" value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})} />
                      </div>
                    </div>
                    <div className="form-g">
                      <label>Service Needed *</label>
                      <select value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})} className={errors.service?'er':''}>
                        <option value="">Select a service...</option>
                        <option>Managed IT Services (Starter)</option>
                        <option>Managed IT Services (Business Pro)</option>
                        <option>Managed IT Services (Enterprise)</option>
                        <option>Networking & Infrastructure</option>
                        <option>Cybersecurity Assessment</option>
                        <option>Security Camera Systems</option>
                        <option>Electrical Services</option>
                        <option>Web Design & Hosting</option>
                        <option>Multiple Services / Full Bundle</option>
                        <option>Emergency IT Support — Call Instead</option>
                      </select>
                      {errors.service && <div className="err-msg" style={{display:'block'}}>{errors.service}</div>}
                    </div>
                    <div className="form-g">
                      <label>Tell Us About Your Needs *</label>
                      <textarea placeholder="Describe your current tech setup, pain points, or what you need help with..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} className={errors.message?'er':''}></textarea>
                      {errors.message && <div className="err-msg" style={{display:'block'}}>{errors.message}</div>}
                    </div>
                    <div className="form-check">
                      <input type="checkbox" checked={formData.consent} onChange={e=>setFormData({...formData,consent:e.target.checked})} />
                      <label>I agree to be contacted by NexTech OC about my request. We never spam, never sell your info.</label>
                    </div>
                    <button onClick={handleSubmit} disabled={submitting}
                      style={{width:'100%',background:'linear-gradient(135deg,var(--r500),var(--r400))',color:'#fff',border:'none',borderRadius:'9px',padding:'14px',fontWeight:700,fontSize:'15px',cursor:'pointer',fontFamily:'\'Barlow\',sans-serif',marginTop:'4px'}}>
                      {submitting ? '⏳ Sending your request...' : '⚡ Send Request — We Respond in <1 Hour'}
                    </button>
                    <div className="form-note">🔒 Your info is secure and never shared with third parties.</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <div className="cta-sec">
        <div className="si" style={{position:'relative',zIndex:1}}>
          <h2 style={{fontFamily:'\'Barlow Semi Condensed\',sans-serif',fontWeight:700,fontSize:'clamp(28px,4vw,48px)',color:'#fff',marginBottom:'12px'}}>No Nonsense. No Downtime.<br />No Drama.</h2>
          <p style={{color:'rgba(255,255,255,.8)',fontSize:'16px',maxWidth:'520px',lineHeight:1.7}}>Book a free 30-minute IT assessment for your Orange County business. Zero obligation, zero pressure.</p>
          <div className="cta-acts">
            <a href="#contact" className="btn-ghost-wh" style={{fontSize:'15px',fontWeight:700,borderWidth:'2px'}}>🚀 Book Free Assessment</a>
            <a href="tel:+194934502850000" className="btn-blue">📞 Call (714) 900-0000</a>
          </div>
        </div>
      </div>

      <Footer />

      {/* Scroll Top */}
      <button className="scroll-top-btn" id="scrollTopBtn" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} aria-label="Scroll to top">↑</button>

      {/* AI Chat Widget */}
      <ChatWidget />
    </>
  );
}

// Simple inline Chat Widget
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{who:'bot',text:'👋 Hi! I\'m NexTech OC\'s assistant. Ask me about pricing, services, or what your business specifically needs!'}]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const RESPONSES = {
    'managed it':'Our Managed IT plans:\n• Starter: $49/user/mo\n• Business Pro: $89/user/mo\n• Enterprise: Custom\nAll month-to-month, no contracts!',
    'pricing':'Managed IT: Starter $49/user/mo | Business Pro $89/user/mo | Enterprise custom. Other services are project-based.',
    'security camera':'📷 Yes! We install 4K/8K IP camera systems with AI analytics, license plate recognition and access control. Free site survey available!',
    'emergency':'🚨 Call us NOW: (714) 900-0000 — available 24/7/365.',
    'networking':'We handle Cat6/Cat6A cabling, enterprise Wi-Fi, VLAN, SD-WAN, VPN and server room buildouts.',
    'contract':'Zero contracts. All plans are month-to-month.',
    'default':'Great question! Call us at (714) 900-0000 or fill out the contact form for a free 30-minute consultation. We respond within 1 business hour!'
  };

  const getReply = msg => {
    const m = msg.toLowerCase();
    for (const [k,v] of Object.entries(RESPONSES)) {
      if (k !== 'default' && m.includes(k)) return v;
    }
    return RESPONSES.default;
  };

  const send = () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    setMsgs(prev => [...prev, {who:'usr',text:msg}]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, {who:'bot',text:getReply(msg)}]);
    }, 900 + Math.random()*600);
  };

  return (
    <div className="chat-bubble">
      {open && (
        <div className="chat-window open">
          <div className="chat-header">
            <div className="chat-av">🤖</div>
            <div style={{flex:1}}><div className="chat-name">NexTech AI Assistant</div><div className="chat-status">Online — replies instantly</div></div>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-msgs" id="chatMsgs">
            {msgs.map((m,i) => (
              <div className={`cmsg ${m.who}`} key={i}><div className="mbub">{m.text.replace(/\n/g,' | ')}</div></div>
            ))}
            {typing && <div className="cmsg bot"><div className="mbub"><div className="typing-dots"><span></span><span></span><span></span></div></div></div>}
          </div>
          <div className="chat-qrs">
            {['IT Plans','Pricing','Security cameras','Emergency'].map((q,i) => (
              <button key={i} className="qr-btn" onClick={() => { setInput(q); }}>{q}</button>
            ))}
          </div>
          <div className="chat-input-row">
            <input className="chat-inp" type="text" placeholder="Ask anything..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} />
            <button className="chat-send" onClick={send}>➤</button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen(!open)} aria-label="Open chat">💬</button>
      {!open && <div className="chat-badge">1</div>}
    </div>
  );
}
