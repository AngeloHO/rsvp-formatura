import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // Impede reload da página
    alert(`Olá, ${nome}!`)
  }
  return (
      <div className="App">
        <h1>Meu Primeiro Componente React</h1>

        <form onSubmit={handleSubmit}>
          {/* Input controlado pelo React */}
          <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
          />
          <button type="submit">Enviar</button>
        </form>

        {/* Mostrar o nome em tempo real */}
        {nome && <p>Você digitou: {nome}</p>}
      </div>
  )
}
export default App
