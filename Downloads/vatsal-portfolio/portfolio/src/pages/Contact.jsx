import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  useReveal()

  return (
    <div className="inner-page">
      <div className="page-header reveal">
        <Link to="/" className="back-link">← Back</Link>
        <span className="page-eyebrow">Get in touch</span>
        <h1 className="page-title">Contact <em>Me</em></h1>
      </div>

      <section className="contact-section reveal" style={{ animationDelay: '0.1s' }}>
        <p>Feel free to drop a line, discuss a project, or just say hi.</p>
        <ul className="contact-list">
          <li><strong>Email:</strong> <a href="mailto:vatsalgoyal77@gmail.com">vatsalgoyal77@gmail.com</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/vatsal-goyal-422b512a9/" target="_blank" rel="noopener">Vatsal Goyal</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/Vatsalgoyal7" target="_blank" rel="noopener">Vatsalgoyal7</a></li>
        </ul>
      </section>
    </div>
  )
}
