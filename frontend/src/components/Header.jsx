import { Link, useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation()
    const paginaAtual = location.pathname === '/confirmados' ? 'Convidados' : 'Inicio'

    return (
        <header className="main-header">
            <div className="container">
                <div className="main-header-content">
                    <Link to="/" className="brand-link" aria-label="Voltar para pagina inicial">
                        <span className="brand-mark" aria-hidden="true"></span>
                        <span className="brand-text">RSVP Formatura</span>
                    </Link>

                    <div className="header-context" aria-label="Localizacao da pagina">
                        <span className="context-label">Painel</span>
                        <span className="context-divider" aria-hidden="true">/</span>
                        <span className="context-page">{paginaAtual}</span>
                    </div>

                    <nav className="header-nav" aria-label="Navegacao principal">
                        <Link to="/" className="btn btn-sm btn-outline-secondary header-action">
                            Voltar ao inicio
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
