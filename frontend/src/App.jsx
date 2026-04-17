import {useState} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import WelcomeModal from './components/WelcomeModal'
import Hero from './components/Hero'
import RsvpForm from './components/RsvpForm'
import EventInfo from './components/EventInfo'
import Countdown from './components/Countdown'
import Map from './components/Map'
import Toast from './components/Toast'
import Confirmados from './components/Confirmados.jsx'
import Carousel from "./components/Carousel.jsx";

function HomePage() {
    const navigate = useNavigate()
    const [showRsvpModal, setShowRsvpModal] = useState(false)
    const [toast, setToast] = useState(null)

    const handleOpenRsvp = () => setShowRsvpModal(true)
    const handleCloseRsvp = () => setShowRsvpModal(false)
    const handleSuccess = (mensagem) => setToast({message: mensagem, type: 'success'})
    const handleError = (mensagem) => setToast({message: mensagem, type: 'error'})
    const handleCloseToast = () => setToast(null)
    const handleHeroTitleTripleClick = () => navigate('/confirmados')

    return (
        <>
            <WelcomeModal/>

            <Hero onTitleTripleClick={handleHeroTitleTripleClick}/>

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="section-title mb-3">Confirme sua Presença</h2>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-confirm me-2"
                        onClick={handleOpenRsvp}
                    >
                        Confirmar Presença
                    </button>
                </div>

                <EventInfo/>
                <div className="row mt-5">
                    <div className="col">
                        <Countdown/>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col">
                        <Carousel/>
                    </div>
                </div>

                <Map/>
            </div>

            <RsvpForm
                show={showRsvpModal}
                onClose={handleCloseRsvp}
                onSuccess={handleSuccess}
                onError={handleError}
            />

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

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/confirmados" element={<Confirmados/>}/>
        </Routes>
    )
}

export default App