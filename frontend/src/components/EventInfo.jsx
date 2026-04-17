function EventInfo() {
    const infoCards = [
        {
            id: 1,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                </svg>
            ),
            label: 'Data',
            value: '05 de Setembro de 2026'
        },
        {
            id: 2,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
            ),
            label: 'Local',
            value: 'Salão da comunidade Bananeira',
            detail: 'Serranópolis do Iguaçu'
        },
        {
            id: 3,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                </svg>
            ),
            label: 'Horário',
            value: '18:00h'
        },
        {
            id: 4,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fork-knife" viewBox="0 0 16 16">
                    <path d="M13 .5c0-.276-.226-.506-.498-.465-1.703.257-2.94 2.012-3 8.462a.5.5 0 0 0 .498.5c.56.01 1 .13 1 1.003v5.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5zM4.25 0a.25.25 0 0 1 .25.25v6h.5V.25a.25.25 0 0 1 .5 0v6h.5V.25a.25.25 0 0 1 .5 0V6c0 .347.153.636.39.779a.5.5 0 0 1 .243.436v9.285a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V7.215a.5.5 0 0 1 .243-.436c.237-.143.39-.432.39-.779V.25A.25.25 0 0 1 4.25 0"/>
                </svg>
            ),
            label: 'Jantar',
            value: 'Levar pratos e talheres'
        }
    ]

    return (
        <div className="row g-4 mt-4">
            {infoCards.map(card => (
                <div key={card.id} className="col-md-3">
                    <div className="card text-center w-100 h-100 card-info-fixa card-elegant">
                        <div className="card-icon mb-3">
                            {card.icon}
                        </div>
                        <h5 className="card-label">{card.label}</h5>
                        <p className="card-value">{card.value}</p>
                        {card.detail && <p className="card-detail">{card.detail}</p>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventInfo