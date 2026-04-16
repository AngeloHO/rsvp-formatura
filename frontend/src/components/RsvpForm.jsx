// RsvpForm.jsx
// Formulário completo de confirmação de presença

import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Acompanhante from './Acompanhante'
import { salvarConvidado } from '../services/api'

function RsvpForm({ show, onClose, onSuccess, onError }) {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        presencaConfirmada: 'S',
        sexo: '',
        temAcompanhantes: false
    })

    const [acompanhantes, setAcompanhantes] = useState([])
    const [enviando, setEnviando] = useState(false)

    const handleChange = (campo, valor) => {
        setFormData(prev => ({
            ...prev,
            [campo]: valor
        }))
    }

    const handleAdicionarAcompanhante = () => {
        const novoAcompanhante = {
            id: Date.now(),
            nome: '',
            sobrenome: '',
            sexo: 'M',
            idade: ''
        }
        setAcompanhantes(prev => [...prev, novoAcompanhante])
    }

    const handleRemoverAcompanhante = (id) => {
        setAcompanhantes(prev => prev.filter(acomp => acomp.id !== id))
    }

    const handleAcompanhanteChange = (id, novosDados) => {
        setAcompanhantes(prev => prev.map(acomp =>
            acomp.id === id ? novosDados : acomp
        ))
    }

    const resetForm = () => {
        setFormData({
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            presencaConfirmada: 'S',
            sexo: '',
            temAcompanhantes: false
        })
        setAcompanhantes([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.nome || !formData.sobrenome) {
            onError('Por favor, preencha nome e sobrenome')
            return
        }

        setEnviando(true)

        try {
            // Processa os acompanhantes convertendo idade corretamente
            const acompanhantesProcessados = acompanhantes.map(acomp => ({
                nome: acomp.nome,
                sobrenome: acomp.sobrenome,
                sexo: acomp.sexo,
                idade: acomp.idade && acomp.idade !== '' ? parseInt(acomp.idade) : null
            }))

            const dados = {
                ...formData,
                acompanhantes: formData.temAcompanhantes ? acompanhantesProcessados : []
            }

            await salvarConvidado(dados)

            const mensagem = formData.presencaConfirmada === 'S'
                ? 'Presença confirmada com sucesso! Nos vemos lá!'
                : 'Resposta registrada. Sentiremos sua falta!'

            onSuccess(mensagem)
            resetForm()
            onClose()

        } catch (error) {
            console.error('Erro ao salvar:', error)

            // Verifica se o erro tem resposta do servidor
            if (error.response && error.response.data) {
                const mensagem = error.response.data.message || 'Erro ao salvar confirmação.'
                onError(mensagem)  
            } else {
                // Erro de rede ou conexão
                onError('Erro de conexão. Verifique sua internet.')
            }
        } finally {
            setEnviando(false)
        }
    }

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <div>
                    <h5 className="modal-title fw-bold">Confirmação de Presença</h5>
                    <p className="text-muted mb-0 small">
                        Preencha os dados abaixo para confirmar
                    </p>
                </div>
            </Modal.Header>

            <Modal.Body className="p-4">
                <form onSubmit={handleSubmit} id="formConvidado">

                    {/* SEÇÃO: Confirma Presença? */}
                    <div className="mb-4 text-center">
                        <label className="form-label d-block fw-semibold mb-3">
                            Poderá comparecer?
                        </label>
                        <div className="btn-group w-100" role="group">
                            <input
                                type="radio"
                                className="btn-check"
                                name="presenca"
                                id="presencaSim"
                                checked={formData.presencaConfirmada === 'S'}
                                onChange={() => handleChange('presencaConfirmada', 'S')}
                            />
                            <label className="btn btn-outline-success py-3" htmlFor="presencaSim">
                                Sim, confirmo presença
                            </label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="presenca"
                                id="presencaNao"
                                checked={formData.presencaConfirmada === 'N'}
                                onChange={() => handleChange('presencaConfirmada', 'N')}
                            />
                            <label className="btn btn-outline-secondary py-3" htmlFor="presencaNao">
                                Não poderei comparecer
                            </label>
                        </div>
                    </div>

                    {/* SEÇÃO: Dados Pessoais */}
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                placeholder="Digite seu nome"
                                value={formData.nome}
                                onChange={(e) => handleChange('nome', e.target.value)}
                                maxLength={100}
                                pattern="[\p{L}\s'-]+"
                                title="Nome deve conter apenas letras, espaços, hífens e apóstrofos"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sobrenome"
                                placeholder="Digite seu sobrenome"
                                value={formData.sobrenome}
                                onChange={(e) => handleChange('sobrenome', e.target.value)}
                                maxLength={100}
                                pattern="[\p{L}\s'-]+"
                                title="Sobrenome deve conter apenas letras, espaços, hífens e apóstrofos"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                maxLength={255}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telefone" className="form-label">Telefone / WhatsApp</label>
                            <input
                                type="text"
                                className="form-control"
                                id="telefone"
                                placeholder="(00) 00000-0000"
                                value={formData.telefone}
                                onChange={(e) => handleChange('telefone', e.target.value)}
                                maxLength={20}
                                pattern="[0-9()\s-]*"
                                title="Telefone deve conter apenas números, parênteses, espaços e hífens"
                            />
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="sexo" className="form-label">Gênero</label>
                            <select
                                className="form-select"
                                id="sexo"
                                value={formData.sexo}
                                onChange={(e) => handleChange('sexo', e.target.value)}
                            >
                                <option value="" disabled>Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="O">Outro</option>
                            </select>
                        </div>

                        {/* SEÇÃO: Tem Acompanhantes? */}
                        <div className="col-md-12 mt-4">
                            <label className="form-label fw-semibold">
                                Você virá com acompanhantes?
                            </label>
                            <div className="btn-group w-100" role="group">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="temAcomp"
                                    id="acompSim"
                                    checked={formData.temAcompanhantes}
                                    onChange={() => handleChange('temAcompanhantes', true)}
                                />
                                <label className="btn btn-outline-primary" htmlFor="acompSim">
                                    Sim
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="temAcomp"
                                    id="acompNao"
                                    checked={!formData.temAcompanhantes}
                                    onChange={() => {
                                        handleChange('temAcompanhantes', false)
                                        setAcompanhantes([])
                                    }}
                                />
                                <label className="btn btn-outline-primary" htmlFor="acompNao">
                                    Não
                                </label>
                            </div>
                        </div>

                        {/* SEÇÃO: Lista de Acompanhantes */}
                        {formData.temAcompanhantes && (
                            <div className="col-md-12 mt-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="mb-0">Acompanhantes</h6>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={handleAdicionarAcompanhante}
                                    >
                                        + Adicionar Acompanhante
                                    </button>
                                </div>

                                <div id="listaAcompanhantes">
                                    {acompanhantes.length === 0 ? (
                                        <p className="text-muted text-center py-3">
                                            Nenhum acompanhante adicionado. Clique no botão acima.
                                        </p>
                                    ) : (
                                        acompanhantes.map((acomp, index) => (
                                            <Acompanhante
                                                key={acomp.id}
                                                numero={index + 1}
                                                dados={acomp}
                                                onChange={handleAcompanhanteChange}
                                                onRemove={handleRemoverAcompanhante}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button
                    variant="secondary"
                    onClick={onClose}
                    disabled={enviando}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={enviando}
                    className="px-4"
                >
                    {enviando ? 'Salvando...' : 'Salvar Confirmação'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RsvpForm