function Hero({ onTitleTripleClick }) {
    const tapCount = { value: 0, timer: null }

    const handleTitleClick = (event) => {
        if (event.detail === 3 && onTitleTripleClick) {
            onTitleTripleClick()
        }
    }

    const handleTitleTouch = () => {
        tapCount.value += 1
        clearTimeout(tapCount.timer)
        tapCount.timer = setTimeout(() => { tapCount.value = 0 }, 600)
        if (tapCount.value === 3) {
            tapCount.value = 0
            if (onTitleTripleClick) onTitleTripleClick()
        }
    }

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-ornament mb-4"></div>
                    <h1 className="hero-title mb-4" onClick={handleTitleClick} onTouchEnd={handleTitleTouch}>Celebração de Formatura</h1>
                    <p className="hero-subtitle mb-4">
                        Sua presença tornará este momento ainda mais especial
                    </p>
                    <div className="hero-ornament"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero