import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div style={{ fontSize: '4rem' }}>🏎️</div>
      <h1 style={{ color: '#e10600', fontSize: '3rem', margin: '0.5rem 0' }}>404</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Página não encontrada. Você saiu da pista!</p>
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#e10600', color: '#fff', border: 'none',
          padding: '0.7rem 1.8rem', borderRadius: '8px',
          fontSize: '0.95rem', cursor: 'pointer'
        }}
      >
        Voltar ao início
      </button>
    </div>
  )
}
