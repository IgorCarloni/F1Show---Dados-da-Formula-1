export function Loading() {
  return (
    <div className="state-box">
      <div className="spinner" />
      <p>Carregando dados...</p>
    </div>
  )
}

export function ErrorMsg({ message }) {
  return (
    <div className="state-box error">
      <span>⚠️</span>
      <p>{message}</p>
    </div>
  )
}
