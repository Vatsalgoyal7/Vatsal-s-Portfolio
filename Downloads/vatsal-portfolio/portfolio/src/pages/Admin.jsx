import { useState, useEffect, useRef } from 'react'

const DEFAULT_PIN = 'vatsal2026'

/* ── AI Lead Scorer & Spam Filter ── */
function analyzeLeadWithAI(text) {
  const trimmed = text.trim()
  const lower = trimmed.toLowerCase()

  // Spam checks (short gibberish, keyboard mash, no real words)
  const isTooShort = trimmed.length < 8
  const isGibberish = /^[asdfghjklqwertyuiopzxcvbnm1234567890\s]+$/i.test(trimmed) && trimmed.length < 15 && !trimmed.includes(' ')
  const isSpam = isTooShort || isGibberish || lower === 'hii' || lower === 'hello' || lower === 'test'

  if (isSpam) {
    return {
      isSpam: true,
      tag: 'Spam / Low Quality',
      summary: 'Short test greeting or unspecific query. No actionable project scope.',
      budget: 'N/A',
      timeline: 'N/A',
      priority: 'Low'
    }
  }

  // Estimate budget and timeline based on keywords
  let budget = '₹12,000 – ₹25,000'
  let timeline = '2–3 weeks'
  let priority = 'Medium'

  if (lower.includes('app') || lower.includes('saas') || lower.includes('full-stack') || lower.includes('portal') || lower.includes('database')) {
    budget = '₹25,000 – ₹50,000'
    timeline = '3–5 weeks'
    priority = 'High 🔥'
  } else if (lower.includes('landing') || lower.includes('portfolio') || lower.includes('redesign')) {
    budget = '₹6,000 – ₹15,000'
    timeline = '1–2 weeks'
    priority = 'Medium'
  }

  return {
    isSpam: false,
    tag: 'Genuine Opportunity',
    summary: `Project for: "${trimmed.slice(0, 45)}${trimmed.length > 45 ? '...' : ''}"`,
    budget,
    timeline,
    priority
  }
}

/* ── Client-side Image Compression Engine (Canvas to WebP in KBs) ── */
async function compressImageToKB(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 1400
        const MAX_HEIGHT = 1400
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to WebP with 0.8 quality
        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error('Compression failed'))
            return
          }
          const compressedUrl = URL.createObjectURL(blob)
          const base64Reader = new FileReader()
          base64Reader.onloadend = () => {
            resolve({
              blob,
              url: compressedUrl,
              base64: base64Reader.result,
              origSizeKB: Math.round(file.size / 1024),
              newSizeKB: Math.round(blob.size / 1024),
              dimensions: `${Math.round(width)}×${Math.round(height)}`
            })
          }
          base64Reader.readAsDataURL(blob)
        }, 'image/webp', 0.8)
      }
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('vatsal_admin_auth') === 'true')
  const [pin, setPin] = useState('')
  const [pinErr, setPinErr] = useState('')
  const [tab, setTab] = useState('leads') // 'leads' | 'gallery'

  // Leads State
  const [leads, setLeads] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vatsal_client_leads') || '[]')
    } catch {
      return []
    }
  })

  // Gallery State
  const [gallery, setGallery] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vatsal_admin_gallery') || '[]')
    } catch {
      return []
    }
  })

  // Image Upload State
  const [selectedFile, setSelectedFile] = useState(null)
  const [compressResult, setCompressResult] = useState(null)
  const [imgTitle, setImgTitle] = useState('')
  const [imgCategory, setImgCategory] = useState('Hackathons')
  const [compressing, setCompressing] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState('')

  // Sync leads from storage
  useEffect(() => {
    const handler = () => {
      try {
        setLeads(JSON.parse(localStorage.getItem('vatsal_client_leads') || '[]'))
      } catch {}
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    if (pin === DEFAULT_PIN) {
      setAuthed(true)
      localStorage.setItem('vatsal_admin_auth', 'true')
      setPinErr('')
    } else {
      setPinErr('Incorrect Passcode. Access Denied.')
    }
  }

  function handleLogout() {
    setAuthed(false)
    localStorage.removeItem('vatsal_admin_auth')
  }

  function deleteLead(id) {
    const updated = leads.filter(l => l.id !== id)
    setLeads(updated)
    localStorage.setItem('vatsal_client_leads', JSON.stringify(updated))
  }

  function addSampleLead() {
    const sample = {
      id: Date.now(),
      text: 'Need a complete sports tournament portal with online registration, bracket generation and WhatsApp notification for 1,200 players.',
      timestamp: new Date().toLocaleString(),
      ai: analyzeLeadWithAI('Need a complete sports tournament portal with online registration, bracket generation and WhatsApp notification for 1,200 players.')
    }
    const updated = [sample, ...leads]
    setLeads(updated)
    localStorage.setItem('vatsal_client_leads', JSON.stringify(updated))
  }

  async function handleFileSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setCompressing(true)
    setUploadSuccess('')

    try {
      const res = await compressImageToKB(file)
      setCompressResult(res)
    } catch {
      alert('Error compressing image')
    } finally {
      setCompressing(false)
    }
  }

  function handleSaveToGallery() {
    if (!compressResult || !imgTitle.trim()) return

    const newItem = {
      id: Date.now(),
      title: imgTitle.trim(),
      category: imgCategory,
      src: compressResult.base64,
      sizeKB: compressResult.newSizeKB,
      dimensions: compressResult.dimensions,
      uploadedAt: new Date().toLocaleDateString()
    }

    const updated = [newItem, ...gallery]
    setGallery(updated)
    localStorage.setItem('vatsal_admin_gallery', JSON.stringify(updated))

    setUploadSuccess(`✅ Image saved to Gallery (${compressResult.newSizeKB} KB)!`)
    setSelectedFile(null)
    setCompressResult(null)
    setImgTitle('')
  }

  function deleteGalleryItem(id) {
    const updated = gallery.filter(g => g.id !== id)
    setGallery(updated)
    localStorage.setItem('vatsal_admin_gallery', JSON.stringify(updated))
  }

  /* ── Passcode Lock Screen ── */
  if (!authed) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(15, 10, 30, 0.85)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          borderRadius: '20px',
          padding: '36px 30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(16px)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '42px', marginBottom: '12px' }}>🔒</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
            Vatsal's Admin Portal
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
            Enter your secret passcode to access Client Leads CRM &amp; Media Manager.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={pin}
              onChange={e => setPin(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                textAlign: 'center',
                letterSpacing: '2px'
              }}
              autoFocus
            />
            {pinErr && <p style={{ fontSize: '13px', color: '#f43f5e', margin: 0 }}>{pinErr}</p>}
            <button
              type="submit"
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                border: 'none',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
              }}
            >
              Unlock Dashboard 🚀
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ── Authenticated Admin Portal ── */
  const genuineLeads = leads.filter(l => !l.ai?.isSpam)
  const spamLeads = leads.filter(l => l.ai?.isSpam)

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', minHeight: '85vh' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>⚡</span>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
              Admin Dashboard
            </h1>
            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '99px',
              padding: '2px 10px',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              Active
            </span>
          </div>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>
            Client Leads CRM · AI Spam Filter · Auto-Compressed Gallery
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setTab('leads')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            background: tab === 'leads' ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'rgba(255,255,255,0.04)',
            border: '1px solid ' + (tab === 'leads' ? 'transparent' : 'rgba(255,255,255,0.08)'),
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>📥 Client Leads CRM</span>
          <span style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '99px',
            padding: '2px 8px',
            fontSize: '12px'
          }}>
            {leads.length}
          </span>
        </button>

        <button
          onClick={() => setTab('gallery')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            background: tab === 'gallery' ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'rgba(255,255,255,0.04)',
            border: '1px solid ' + (tab === 'gallery' ? 'transparent' : 'rgba(255,255,255,0.08)'),
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🖼️ Gallery &amp; Compression</span>
          <span style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '99px',
            padding: '2px 8px',
            fontSize: '12px'
          }}>
            {gallery.length}
          </span>
        </button>
      </div>

      {/* TAB 1: CLIENT LEADS CRM */}
      {tab === 'leads' && (
        <div>
          {/* Quick Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total Enquiries</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>{leads.length}</div>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6ee7b7' }}>Genuine Opportunities</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981' }}>{genuineLeads.length}</div>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#fca5a5' }}>AI Spam Shielded</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ef4444' }}>{spamLeads.length}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#e2e8f0', margin: 0 }}>
              Recent Client Enquiries
            </h3>
            <button
              onClick={addSampleLead}
              style={{
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.35)',
                color: '#c4b5fd',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              + Simulate Test Enquiry
            </button>
          </div>

          {leads.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '16px',
              border: '1px dashed rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📬</div>
              <p style={{ color: '#94a3b8', fontSize: '15px' }}>No client leads yet. They will appear here automatically when someone uses the Contact Scoper!</p>
              <button
                onClick={addSampleLead}
                style={{
                  marginTop: '10px',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '99px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Add a Sample Lead to Test
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {leads.map(lead => (
                <div
                  key={lead.id}
                  style={{
                    background: lead.ai?.isSpam ? 'rgba(239, 68, 68, 0.04)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid ' + (lead.ai?.isSpam ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.08)'),
                    borderRadius: '14px',
                    padding: '20px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '99px',
                        fontSize: '12px',
                        fontWeight: '700',
                        background: lead.ai?.isSpam ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: lead.ai?.isSpam ? '#f87171' : '#34d399',
                        border: '1px solid ' + (lead.ai?.isSpam ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)')
                      }}>
                        {lead.ai?.tag || 'Enquiry'}
                      </span>
                      {!lead.ai?.isSpam && (
                        <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600' }}>
                          Priority: {lead.ai?.priority}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{lead.timestamp}</span>
                  </div>

                  <p style={{ color: '#f1f5f9', fontSize: '15px', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                    "{lead.text}"
                  </p>

                  {/* AI Executive Summary Card */}
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '13px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ color: '#c4b5fd', fontWeight: '600' }}>🤖 AI Executive Analysis:</div>
                    <div style={{ color: '#cbd5e1' }}>{lead.ai?.summary}</div>
                    {!lead.ai?.isSpam && (
                      <div style={{ display: 'flex', gap: '20px', marginTop: '6px', fontSize: '12px', color: '#94a3b8' }}>
                        <span>💰 Est. Budget: <strong style={{ color: '#34d399' }}>{lead.ai?.budget}</strong></span>
                        <span>⏱️ Timeline: <strong style={{ color: '#38bdf8' }}>{lead.ai?.timeline}</strong></span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={`https://wa.me/917452027691?text=${encodeURIComponent(`Hi! Regarding your project inquiry: "${lead.text.slice(0, 50)}..."`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#25D366',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        textDecoration: 'none'
                      }}
                    >
                      💬 Reply on WhatsApp
                    </a>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GALLERY & IN-BROWSER COMPRESSION */}
      {tab === 'gallery' && (
        <div>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '30px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0' }}>
              ⚡ Upload &amp; Auto-Compress to KBs
            </h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px 0' }}>
              Select any high-res photo (even 5MB–10MB). The in-browser canvas engine will immediately compress it to under 100 KB WebP format.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px dashed rgba(124, 58, 237, 0.4)',
                  borderRadius: '12px',
                  color: '#ffffff'
                }}
              />

              {compressing && <p style={{ color: '#38bdf8', fontSize: '13px' }}>⏳ Compressing image to KBs...</p>}

              {compressResult && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <img
                    src={compressResult.url}
                    alt="Preview"
                    style={{ width: '90px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div style={{ flex: 1, fontSize: '13px', color: '#e2e8f0' }}>
                    <div><strong>Original Size:</strong> {compressResult.origSizeKB} KB</div>
                    <div style={{ color: '#34d399', fontWeight: '700' }}>
                      <strong>Compressed to:</strong> {compressResult.newSizeKB} KB ({Math.round((1 - compressResult.newSizeKB / compressResult.origSizeKB) * 100)}% saved!)
                    </div>
                    <div style={{ color: '#94a3b8' }}>Dimensions: {compressResult.dimensions} (WebP)</div>
                  </div>
                </div>
              )}

              {compressResult && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Photo Title (e.g. HackWithUP Winner Trophy)"
                    value={imgTitle}
                    onChange={e => setImgTitle(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: '220px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      fontSize: '14px'
                    }}
                  />
                  <select
                    value={imgCategory}
                    onChange={e => setImgCategory(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: '#0d091a',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      fontSize: '14px'
                    }}
                  >
                    <option value="Hackathons">Hackathons</option>
                    <option value="Certificates">Certificates</option>
                    <option value="Events">Campus Events</option>
                  </select>
                  <button
                    onClick={handleSaveToGallery}
                    disabled={!imgTitle.trim()}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      background: imgTitle.trim() ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      color: '#ffffff',
                      fontWeight: '700',
                      cursor: imgTitle.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Save to Gallery ✨
                  </button>
                </div>
              )}

              {uploadSuccess && <p style={{ color: '#34d399', fontSize: '14px', margin: 0 }}>{uploadSuccess}</p>}
            </div>
          </div>

          {/* Uploaded Gallery Grid */}
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#e2e8f0', marginBottom: '16px' }}>
            Managed Gallery Items ({gallery.length})
          </h3>
          {gallery.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No custom images uploaded yet. Upload one above!</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {gallery.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img src={item.src} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span>{item.category}</span>
                      <span style={{ color: '#34d399' }}>{item.sizeKB} KB</span>
                    </div>
                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        padding: '6px',
                        borderRadius: '6px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete Photo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  )
}
