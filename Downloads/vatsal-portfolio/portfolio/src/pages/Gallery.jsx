import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const GALLERY = [
  {
    category: '🏆 Hackathon Wins & Recognition',
    items: [
      {
        img: '/images/hackwithup-stage.jpg',
        title: 'HackWithUttarPradesh 2025 — 3rd Position',
        sub: 'Won ₹10,000 cash prize among 21,000+ teams · Chandigarh University',
        type: 'photo',
      },
      {
        img: '/images/hackwithup-certificate.png',
        title: 'HackWithUP Certificate of Achievement',
        sub: 'Official 3rd Position Certificate · Chandigarh University TBI (05.11.2025)',
        type: 'cert',
      },
      {
        img: '/images/hackwithup-college.jpg',
        title: 'Felicitation at IMSEC Ghaziabad',
        sub: 'Honored by College Director Sir & Department HODs',
        type: 'photo',
      },
    ],
  },
  {
    category: '⚡ RIFT Hackathon',
    items: [
      {
        img: '/images/rift-team.jpg',
        title: "RIFT '26 · PW Institute of Innovation",
        sub: 'Semi-Finalist · Rank 6 in Healthcare Track · 8,000+ Registrations',
        type: 'photo',
      },
    ],
  },
  {
    category: '🚀 IIT Delhi · Startup Incubation',
    items: [
      {
        img: '/images/iit-delhi-incubator.jpg',
        title: 'IIT Delhi eDC INCon 2026 Incubator Summit',
        sub: 'Pitched TrueChain (Blockchain Food Provenance) · LHC, IIT Delhi',
        type: 'photo',
      },
    ],
  },
  {
    category: '🏅 Leadership, Club Head & Events',
    items: [
      {
        img: '/images/vatsal-certificate.jpg',
        title: 'Sports Main Coordinator & Club Head',
        sub: 'Receiving Certificate of Merit from IMSEC Director for Chakravyuh 2K26',
        type: 'photo',
      },
      {
        img: '/images/gfg-vp-seminar.jpg',
        title: 'With Chandan Jha (VP, GeeksforGeeks)',
        sub: 'Organized & hosted campus tech seminar at IMSEC Ghaziabad · 2026',
        type: 'photo',
      },
      {
        img: '/images/gfg-letter.png',
        title: 'GeeksforGeeks Campus Mantri Appointment Letter',
        sub: 'Official Representative of GeeksforGeeks for IMSEC Ghaziabad · Jan 2026',
        type: 'cert',
      },
    ],
  },
  {
    category: '📜 Professional Certifications',
    items: [
      {
        img: '/images/ibm-certificate.png',
        title: 'IBM PBEL 2.3 — Generative AI Certificate',
        sub: 'Issued by IBMmooc / IBM Developer Skills Network · May 2, 2026',
        type: 'cert',
      },
    ],
  },
]

export default function Gallery() {
  useReveal()
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">Proof of Work &amp; Achievements</span>
        <h1 className="page-title">Gallery &amp; <em>Certificates</em></h1>
        <p className="page-lead" style={{ maxWidth: '640px', marginTop: '10px' }}>
          Real moments from national hackathons, startup pitches, campus leadership, and verified certifications. Click any image to view in full resolution.
        </p>
      </div>

      {GALLERY.map((section, si) => (
        <section key={si} className="gallery-section reveal" style={{ animationDelay: `${si * 0.1}s` }}>
          <h2 className="gallery-section-title">{section.category}</h2>
          <div className="gallery-page-grid">
            {section.items.map((item, ii) => (
              <div
                key={ii}
                className={`gallery-page-item ${item.type === 'cert' ? 'gpi-cert' : 'gpi-photo'}`}
                onClick={() => setSelectedItem(item)}
                title="Click to view full image"
              >
                <div className="gpi-img-wrap">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <span className="gpi-zoom-hint">🔍 Expand</span>
                </div>
                <div className="gpi-info">
                  <h3 className="gpi-title">{item.title}</h3>
                  <p className="gpi-sub">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="lightbox-overlay" onClick={() => setSelectedItem(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedItem(null)} aria-label="Close modal">
              ✕
            </button>
            <div className={`lightbox-img-box ${selectedItem.type === 'cert' ? 'lightbox-cert-bg' : ''}`}>
              <img src={selectedItem.img} alt={selectedItem.title} className="lightbox-img" />
            </div>
            <div className="lightbox-caption">
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.sub}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
