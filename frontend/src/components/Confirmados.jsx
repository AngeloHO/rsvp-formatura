import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import ConvidadosTable from './ConvidadosTable.jsx'
import { buscarConvidados } from '../services/api.js'

function Confirmados() {
    const [dados, setDados] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {
        const carregar = async () => {
            try {
                const lista = await buscarConvidados()
                setDados(lista)
            } catch (e) {
                setErro('Não foi possível carregar os confirmados.')
            } finally {
                setCarregando(false)
            }
        }

        carregar()
    }, [])

    return (
        <>
            <Header />
            <section className="confirmados">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <div className="section-ornament mx-auto mb-3"></div>
                        <h2 className="section-title mb-3">Lista de Convidados</h2>
                        <p className="section-subtitle mb-0">
                            Consulte confirmados e acompanhantes com busca e paginação.
                        </p>
                    </div>

                    {carregando && (
                        <div className="card card-elegant text-center p-4">
                            <div className="spinner-border text-secondary mx-auto mb-3" role="status" aria-hidden="true"></div>
                            <p className="mb-0 text-muted">Carregando convidados...</p>
                        </div>
                    )}

                    {erro && (
                        <div className="alert alert-danger" role="alert">
                            {erro}
                        </div>
                    )}

                    {!carregando && !erro && (
                        <div className="card card-elegant p-3 p-md-4">
                            <ConvidadosTable data={dados} />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Confirmados