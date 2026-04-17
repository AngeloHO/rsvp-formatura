import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

function WelcomeModal() {
    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false)

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body className="text-center p-5">
                <div className="welcome-header mb-4">
                    <div className="welcome-line"></div>
                    <h2 className="welcome-title my-4">Você está convidado</h2>
                    <div className="welcome-line"></div>
                </div>

                <p className="welcome-text mb-4">
                    Sua presença é fundamental para a nossa comemoração!
                    Para que a gente consiga organizar tudo da melhor forma, pedimos que <strong>leia os detalhes com atenção e preencha todos os campos com calma</strong>.
                    <br/><br/>
                    Clicando em ver detalhes do evento você confere o local e o horário da festa. Bora celebrar essa conquista juntos!
                </p>

                <div className="welcome-details mb-4">
                    <p className="event-name mb-2">Festa de Angelo e Lucas</p>
                    <p className="event-date">05 de Setembro de 2026 · 18:00h</p>
                </div>

                <Button
                    variant="primary"
                    className="btn-welcome"
                    onClick={handleClose}
                >
                    Ver Detalhes do Evento
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default WelcomeModal