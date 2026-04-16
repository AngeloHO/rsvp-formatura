// App.jsx
// Componente principal que junta tudo

import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import WelcomeModal from './components/WelcomeModal'
import Hero from './components/Hero'
import RsvpForm from './components/RsvpForm'
import EventInfo from './components/EventInfo'
import Countdown from './components/Countdown'
import Map from './components/Map'
import Toast from './components/Toast'

function App() {
    const [showRsvpModal, setShowRsvpModal] = useState(false)

    const [toast, setToast] = useState(null)

    const handleOpenRsvp = () => setShowRsvpModal(true)
    const handleCloseRsvp = () => setShowRsvpModal(false)

    const handleSuccess = (mensagem) => {
        setToast({ message: mensagem, type: 'success' })
    }


    const handleError = (mensagem) => {
        setToast({ message: mensagem, type: 'error' })
    }


    const handleCloseToast = () => {
        setToast(null)
    }

    return (
        <>
            {/* Modal de boas-vindas */}
            <WelcomeModal />

            {/* Seção hero */}
            <Hero />

            {/* Container principal */}
            <div className="container py-5">
                {/* Seção de confirmação */}
                <div className="text-center mb-5">
                    <div className="section-ornament mx-auto mb-3"></div>
                    <h2 className="section-title mb-3">Confirme sua Presença</h2>
                    <p className="section-subtitle mb-4">
                        Por gentileza, confirme sua participação até 20 de agosto
                    </p>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-confirm"
                        onClick={handleOpenRsvp}
                    >
                        Confirmar Presença
                    </button>
                </div>

                {/* Cards de informação */}
                <EventInfo />

                {/* Contador regressivo */}
                <div className="row mt-5">
                    <div className="col">
                        <Countdown />
                    </div>
                </div>

                {/* Mapa */}
                <Map />
            </div>

            {/* Modal de RSVP */}
            <RsvpForm
                show={showRsvpModal}
                onClose={handleCloseRsvp}
                onSuccess={handleSuccess}
                onError={handleError}
            />

            {/* Notificação Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={handleCloseToast}
                />
            )}
        </>
    )
}

export default App