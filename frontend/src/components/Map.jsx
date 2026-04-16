// Map.jsx
// Mapa do Google Maps

function Map() {
    return (
        <div className="row mt-5">
            <div className="col">
                <div className="card p-4 card-elegant">
                    <h3 className="text-center mb-4">Localização</h3>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1442.7072495729158!2d-54.00377271404394!3d-25.429926699479378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f690e2487489a5%3A0x70bc3cc4ff090654!2sBairro%20Bananeira!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização do Evento"
                    />
                </div>
            </div>
        </div>
    )
}

export default Map