import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { client } from '../../lib/sanity'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`)
  return {
    paths: slugs.map(s => ({ params: { slug: s.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title, slug, publishedAt, excerpt, category, body,
      seoTitle, seoDescription,
      "mainImage": mainImage{asset->}
    }
  `, { slug: params.slug })

  const recentPosts = await client.fetch(`
    *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0..3] {
      title, slug, publishedAt, category
    }
  `, { slug: params.slug })

  const relatedPosts = await client.fetch(`
    *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0..2] {
      title, slug, category, excerpt
    }
  `, { slug: params.slug })

  const headings = post?.body?.filter(
    b => b._type === 'block' && b.style === 'h2'
  ).map((b, i) => ({
    text: b.children?.map(c => c.text).join('') || '',
    id: `h-${i}`,
  })) || []

  return { props: { post, recentPosts, relatedPosts, headings } }
}

const ptComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    kwGold: ({ children }) => <span className="kw-gold">{children}</span>,
    kwRed: ({ children }) => <span className="kw-red">{children}</span>,
    kwBlue: ({ children }) => <span className="kw-blue">{children}</span>,
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export default function BlogPost({ post, recentPosts, relatedPosts, headings }) {
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) setProgress((window.scrollY / total) * 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(post?.title || '')

  if (!post) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        Post not found
      </div>
    )
  }

  return (
    <>
    <Header />
      {/* READING PROGRESS BAR */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="wrap">

        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/blog">Blog</Link>
          <span>›</span>
          <span>{post.title}</span>
        </div>

        <div className="article-layout">

          {/* ── MAIN ARTICLE ── */}
          <article>

            {/* ARTICLE HEADER */}
            <div className="article-header">
              <span className="art-cat">{post.category || 'General'}</span>
              <h1 className="art-title">{post.title}</h1>
              {post.excerpt && (
                <p className="art-excerpt">{post.excerpt}</p>
              )}
              <div className="art-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="art-av">NT</div>
                  <div>
                    <div className="art-author-name">NexTech OC Team</div>
                    <div className="art-author-role">IT Specialists · NexTech OC</div>
                  </div>
                </div>
                <span className="art-date">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : ''}
                </span>
                <span className="art-date">&#8987; 5 min read</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '6px 14px', borderRadius: '6px', fontSize: '12px',
                      fontWeight: 600, textDecoration: 'none',
                      background: 'rgba(10,102,194,.1)', color: '#0A66C2',
                      border: '1px solid rgba(10,102,194,.25)',
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                    }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '6px 14px', borderRadius: '6px', fontSize: '12px',
                      fontWeight: 600, textDecoration: 'none',
                      background: 'rgba(29,161,242,.1)', color: '#1DA1F2',
                      border: '1px solid rgba(29,161,242,.25)',
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                    }}
                  >
                    Twitter
                  </a>
                  <button
                    onClick={handleCopy}
                    style={{
                      padding: '6px 14px', borderRadius: '6px', fontSize: '12px',
                      fontWeight: 600, background: 'rgba(217,48,48,.08)',
                      color: '#B82020', border: '1px solid rgba(217,48,48,.2)',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>

            {/* HERO IMAGE PLACEHOLDER */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '36px', background: '#E8EFF9', height: '320px' }}>
  {post.mainImage?.asset?.url ? (
    <img src={post.mainImage.asset.url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ) : (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed rgba(46,143,255,.25)', gap: '8px' }}>
      <div style={{ fontSize: '34px', opacity: 0.35 }}>📷</div>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#1A6AC8', fontWeight: 700 }}>BLOG IMAGE</div>
    </div>
  )}
</div>

            {/* ARTICLE BODY */}
            <div className="article-body">
              {post.body ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p style={{ color: '#4A5A72' }}>No content yet.</p>
              )}
            </div>

            {/* TAGS */}
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #DDE5F0' }}>
              <div className="tags-cloud">
                <span className="tag-item gold">Ransomware</span>
                <span className="tag-item gold">MFA</span>
                <span className="tag-item red">BEC Fraud</span>
                <span className="tag-item red">Phishing</span>
                <span className="tag-item blue">Microsoft 365</span>
                <span className="tag-item blue">SentinelOne</span>
                <span className="tag-item gold">Zero Trust</span>
                <span className="tag-item red">Patch Mgmt</span>
              </div>
            </div>

            {/* AUTHOR BIO */}
            <div
              style={{
                marginTop: '40px', background: '#F2F6FC',
                border: '1px solid #DDE5F0', borderRadius: '14px',
                padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'linear-gradient(135deg,#B82020,#F04040)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}
              >
                NT
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '16px', color: '#0D1B2A', marginBottom: '4px' }}>
                  NexTech OC Team
                </div>
                <div style={{ fontSize: '11px', color: '#4A5A72', fontFamily: 'monospace', marginBottom: '10px' }}>
                  IT SPECIALISTS · ORANGE COUNTY
                </div>
                <p style={{ fontSize: '13.5px', color: '#4A5A72', lineHeight: 1.6 }}>
                  The NexTech OC team specializes in cybersecurity, managed IT, and networking
                  for Orange County businesses. We share practical guides based on real-world
                  experience protecting 500+ local companies.
                </p>
              </div>
            </div>

            {/* RELATED POSTS */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h3
                  style={{
                    fontFamily: "'Barlow Semi Condensed', sans-serif",
                    fontWeight: 700, fontSize: '22px',
                    marginBottom: '20px', color: '#0D1B2A',
                  }}
                >
                  You Might Also Like
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {relatedPosts.map(p => (
                    <div
                      key={p.slug.current}
                      style={{
                        background: '#fff', border: '1px solid #DDE5F0',
                        borderRadius: '12px', overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '120px', background: '#E8EFF9',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontFamily: 'monospace',
                          fontSize: '11px', color: '#4A5A72',
                        }}
                      >
                        BLOG IMAGE
                      </div>
                      <div style={{ padding: '16px' }}>
                        <span
                          style={{
                            fontSize: '10px', fontFamily: 'monospace',
                            fontWeight: 700, color: '#B82020',
                            background: 'rgba(217,48,48,.08)',
                            padding: '2px 8px', borderRadius: '20px',
                            border: '1px solid rgba(217,48,48,.2)',
                          }}
                        >
                          {p.category || 'General'}
                        </span>
                        <Link
                          href={`/blog/${p.slug.current}`}
                          style={{
                            display: 'block', marginTop: '8px',
                            fontWeight: 700, fontSize: '14px',
                            color: '#0D1B2A', textDecoration: 'none',
                            lineHeight: 1.35,
                          }}
                        >
                          {p.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BACK LINK */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #DDE5F0' }}>
              <Link href="/blog" className="btn-ghost-red">
                Back to Blog
              </Link>
            </div>

          </article>

          {/* ── SIDEBAR ── */}
          <aside>

            {/* TABLE OF CONTENTS */}
            {headings.length > 0 && (
              <div className="sidebar-widget" style={{ marginBottom: '24px' }}>
                <div className="sw-title red">Table of Contents</div>
                <ul className="toc-list">
                  {headings.map((h, i) => (
                    <li key={i}>
                      <a href={`#h-${i}`}>
                        <span className="toc-num">0{i + 1}</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="cta-widget" style={{ marginBottom: '24px' }}>
              <h4>Free Security Audit</h4>
              <p>Get a free cybersecurity assessment for your OC business. We identify your top vulnerabilities at zero cost.</p>
              <Link href="/#contact">Book Free Assessment</Link>
              <div style={{ marginTop: '10px', fontSize: '11px', opacity: 0.65, fontFamily: 'monospace' }}>
                or call (714) 900-0000
              </div>
            </div>

            {/* RECENT POSTS */}
            <div className="sidebar-widget" style={{ marginBottom: '24px' }}>
              <div className="sw-title blue">Recent Articles</div>
              {recentPosts.map((p, i) => (
                <div key={p.slug.current} className="recent-post">
                  <div className="rp-num">0{i + 1}</div>
                  <div>
                    <Link href={`/blog/${p.slug.current}`} className="rp-title">
                      {p.title}
                    </Link>
                    <div className="rp-date">
                      {p.publishedAt
                        ? new Date(p.publishedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })
                        : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TAGS */}
            <div className="sidebar-widget" style={{ marginBottom: '24px' }}>
              <div className="sw-title gold">Article Keywords</div>
              <div className="tags-cloud">
                <span className="tag-item gold">Ransomware</span>
                <span className="tag-item gold">MFA</span>
                <span className="tag-item red">BEC Fraud</span>
                <span className="tag-item red">Phishing</span>
                <span className="tag-item blue">SentinelOne</span>
                <span className="tag-item blue">M365</span>
                <span className="tag-item gold">Zero Trust</span>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="sidebar-widget">
              <div className="sw-title blue">Weekly IT Tips</div>
              <div className="newsletter-box">
                <p>One actionable IT tip every Tuesday. No spam, unsubscribe anytime.</p>
                <input type="email" placeholder="your@email.com" />
                <button>Subscribe - Free</button>
              </div>
            </div>

          </aside>

        </div>

      </div>
      <Footer />
    </>
  )
}
