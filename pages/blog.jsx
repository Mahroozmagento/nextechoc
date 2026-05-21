import Link from 'next/link'
import { useState } from 'react'
import { client } from '../lib/sanity'
import Header from '../components/Header'
import Footer from '../components/Footer'


export async function getStaticProps() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt, category
    }
  `)
  return { props: { posts } }
}

export default function Blog({ posts }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { key: 'all', label: 'All Articles' },
    { key: 'cybersecurity', label: '🔐 Cybersecurity' },
    { key: 'networking', label: '🌐 Networking' },
    { key: 'managed-it', label: '🖥 Managed IT' },
    { key: 'cloud', label: '☁ Cloud' },
  ]

  const filtered = posts.filter(post => {
    const matchSearch = !search || post.title?.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'all' || post.category === activeCategory
    return matchSearch && matchCat
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
    <Header />
      {/* HERO */}
      <div className="page-hero">
        <div className="wrap">
          <div className="ph-inner">
            <span className="ph-tag">// Knowledge Base</span>
            <h1 className="ph-title">IT Insights for <span className="hl-r">Orange County</span> Businesses</h1>
            <p className="ph-desc">Expert guides on cybersecurity, networking, managed IT and cloud — written by our OC tech team.</p>
            <div className="ph-meta">
              <span className="ph-stat">📄 {posts.length} Articles</span>
              <span className="ph-stat">🔄 Updated Weekly</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="red-line" />

      {/* SEARCH */}
      <div className="search-section">
        <div className="wrap">
          <div className="search-wrap">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="search-btn">Search</button>
          </div>
          <div className="cat-filters">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`cat-btn ${activeCategory === cat.key ? 'active' : 'default'}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="wrap">
        <div className="blog-layout">
          <main>
            {filtered.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No articles found</h3>
                <p>Try a different search or category.</p>
              </div>
            )}

            {/* FEATURED */}
            {featured && (
  <div className="featured-post">
    <div className="fp-img" style={{ position: 'relative', height: '220px', background: '#E8EFF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="fp-badge">⭐ FEATURED</div>
      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#4A5A72' }}>📷 BLOG IMAGE — 860 × 220 px</span>
    </div>
    <div className="fp-body">
      <span className="fp-cat red">{featured.category || 'General'}</span>
      <Link href={`/blog/${featured.slug.current}`} className="fp-title">
        {featured.title}
      </Link>
      <p className="fp-excerpt">{featured.excerpt}</p>
      <div className="fp-meta">
        <div className="fp-author">
          <div className="fp-av">NT</div>
          <span>NexTech OC Team</span>
        </div>
        <span className="fp-date">
          {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
        </span>
        <span className="fp-read">5 min read</span>
        <Link href={`/blog/${featured.slug.current}`} className="btn-red fp-cta">
          Read Article →
        </Link>
      </div>
    </div>
  </div>
)}

            {/* GRID */}
            {rest.length > 0 && (
              <div className="blog-grid">
                {rest.map(post => (
                  <div key={post._id} className="blog-card">
                    <div className="bc-img" style={{ height: '160px', background: '#E8EFF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#4A5A72' }}>BLOG IMAGE</span>
                    </div>
                    <div className="bc-body">
                      <span className="bc-cat red">{post.category || 'General'}</span>
                      <Link href={`/blog/${post.slug.current}`} className="bc-title">
                        {post.title}
                      </Link>
                      <p className="bc-excerpt">{post.excerpt}</p>
                      <div className="bc-meta">
                        <span className="bc-date">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                        </span>
                        <Link href={`/blog/${post.slug.current}`} className="bc-read">
                          Read Article →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* SIDEBAR */}
          <aside>
            <div className="sidebar-widget">
              <div className="sw-title red">📋 Categories</div>
              {categories.filter(c => c.key !== 'all').map(cat => (
                <div key={cat.key} className="recent-post" style={{ cursor: 'pointer' }} onClick={() => setActiveCategory(cat.key)}>
                  <div className="rp-num">→</div>
                  <div>
                    <span className="rp-title">{cat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-widget">
              <div className="sw-title gold">🏷 Popular Topics</div>
              <div className="tags-cloud">
                <span className="tag-item gold">🔐 Cybersecurity</span>
                <span className="tag-item blue">🌐 Wi-Fi</span>
                <span className="tag-item red">🖥 Managed IT</span>
                <span className="tag-item blue">☁ Microsoft 365</span>
                <span className="tag-item gold">🛡 Ransomware</span>
                <span className="tag-item red">📷 IP Cameras</span>
                <span className="tag-item gold">🔒 MFA</span>
                <span className="tag-item blue">⚡ Cloud Backup</span>
              </div>
            </div>

            <div className="sidebar-widget">
              <div className="sw-title blue">📬 Weekly IT Tips</div>
              <div className="newsletter-box">
                <p>One actionable IT tip every Tuesday. No spam, unsubscribe anytime.</p>
                <input type="email" placeholder="your@email.com" />
                <button>Subscribe — It's Free</button>
              </div>
            </div>

            <div className="cta-widget">
              <h4>Need IT Help Now?</h4>
              <p>Free 30-min assessment for OC businesses. No obligation, no hard sell.</p>
              <Link href="/#contact">⚡ Book Free Assessment</Link>
            </div>
          </aside>
  </div>
      </div>
      <Footer />
    </>
  )
}