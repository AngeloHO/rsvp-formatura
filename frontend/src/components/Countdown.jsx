import { useState, useEffect } from 'react'

function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const targetDate = new Date("September 5, 2026 18:00:00").getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const diff = targetDate - now

            if (diff < 0) {
                clearInterval(interval)
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((diff / (1000 * 60)) % 60)
            const seconds = Math.floor((diff / 1000) % 60)

            setTimeLeft({ days, hours, minutes, seconds })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="card p-5 text-center card-elegant card-countdown">
            <h3 className="countdown-title mb-4">Contagem Regressiva</h3>
            <div className="countdown-grid">
                <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.days}</span>
                    <span className="countdown-label">Dias</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.hours}</span>
                    <span className="countdown-label">Horas</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.minutes}</span>
                    <span className="countdown-label">Minutos</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-number">{timeLeft.seconds}</span>
                    <span className="countdown-label">Segundos</span>
                </div>
            </div>
        </div>
    )
}

export default Countdown