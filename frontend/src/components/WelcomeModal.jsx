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
                    É com grande satisfação que convido você para celebrar<br/>
                    este momento tão especial em nossas vidas!
                    Para facilitar a organização e garantir que tudo esteja perfeito no grande dia,
                    pedimos que preencha algumas informações para confirmar sua presença.
                    Além disso, você poderá consultar todos os detalhes do evento, como data, local e horário.
                    Sua presença é muito importante para tornar essa conquista ainda mais inesquecível para nós!
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