import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Demo.css'

const videos = [
  {
    id: 'B5DL4_vX4bU',
    title: 'Demo RSistems – Prezentare generală',
  },
  {
    id: 'tVvzuVqapo4',
    title: 'Demo RSistems – Funcționalități POS',
  },
  {
    id: 'JYOpx6Lrk7c',
    title: 'Demo RSistems – Rapoarte și dashboard',
  },
]

function Demo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="demo-page">
      <div className="demo-header">
        <Link to="/" className="demo-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Înapoi la pagina principală
        </Link>
        <div className="demo-header-text">
          <img src="/img/Logo.svg" alt="RSistems" className="demo-logo" />
          <h1 className="demo-title">Demonstrații RSistems</h1>
          <p className="demo-subtitle">Descoperă cum funcționează sistemul nostru de management pentru restaurante</p>
        </div>
      </div>

      <div className="demo-videos">
        {videos.map((video, index) => (
          <div key={video.id} className="demo-video-card">
            <div className="demo-video-number">{index + 1}</div>
            <h2 className="demo-video-title">{video.title}</h2>
            <div className="demo-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>

      <div className="demo-cta">
        <h2>Ești convins? Hai să vorbim!</h2>
        <p>Programează o demonstrație personalizată cu echipa noastră.</p>
        <a
          href="https://wa.me/40517508772?text=Bună! Vreau să programez o demonstrație gratuită a sistemului RSistems."
          className="demo-cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Programează demo gratuit
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.868.52 3.614 1.42 5.105L2 22l5.54-1.389A9.435 9.435 0 0 0 11.5 21.999C16.739 22 21 17.738 21 12.5 21 7.262 16.739 3 11.5 3zM11.5 20c-1.658 0-3.2-.468-4.51-1.276l-.323-.195-3.287.824.852-3.197-.212-.334A8.46 8.46 0 0 1 3 11.5C3 6.813 6.813 3 11.5 3S20 6.813 20 11.5 16.187 20 11.5 20z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Demo
