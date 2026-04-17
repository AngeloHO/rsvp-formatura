function Hero({ onTitleTripleClick }) {
    const handleTitleClick = (event) => {
        if (event.detail === 3 && onTitleTripleClick) {
            onTitleTripleClick()
        }
    }

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-ornament mb-4"></div>
                    <h1 className="hero-title mb-4" onClick={handleTitleClick}>Celebração de Formatura</h1>
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