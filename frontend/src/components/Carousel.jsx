import foto1 from '../assets/1.jpeg'
import foto2 from '../assets/2.jpeg'
import foto3 from '../assets/3.jpeg'
import foto4 from '../assets/4.jpeg'
import foto5 from '../assets/5.jpg'
import foto6 from '../assets/6.jpeg'
import foto7 from '../assets/7.jpeg'
import foto8 from '../assets/8.jpeg'
import foto9 from '../assets/9.jpeg'
import foto10 from '../assets/10.jpeg'

function Carousel() {
    const fotos = [
        { src: foto1, alt: 'Fotos Angelo e Lucas' },
        { src: foto2, alt: 'Fotos Angelo e Lucas' },
        { src: foto3, alt: 'Fotos Angelo e Lucas' },
        { src: foto4, alt: 'Fotos Angelo e Lucas' },
        { src: foto5, alt: 'Fotos Angelo e Lucas' },
        { src: foto6, alt: 'Fotos Angelo e Lucas' },
        { src: foto7, alt: 'Fotos Angelo e Lucas' },
        { src: foto8, alt: 'Fotos Angelo e Lucas' },
        { src: foto9, alt: 'Fotos Angelo e Lucas' },
        { src: foto10, alt: 'Fotos Angelo e Lucas' },
    ]

    return (
        <section className="gallery-section mt-5">
            <div className="text-center mb-4">
                <div className="section-ornament mx-auto mb-3"></div>
                <h3 className="section-title">Momentos Especiais</h3>
                <p className="section-subtitle mb-0">Alguns registros para entrar no clima da celebração.</p>
            </div>

            <div
                id="carouselFotos"
                className="carousel slide carousel-fade card card-elegant overflow-hidden"
                data-bs-ride="carousel"
                data-bs-interval="3200"
                data-bs-pause="hover"
            >
                <div className="carousel-indicators">
                    {fotos.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselFotos"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : undefined}
                            aria-label={`Ir para foto ${index + 1}`}
                        ></button>
                    ))}
                </div>

                <div className="carousel-inner">
                    {fotos.map((foto, index) => (
                        <div key={foto.src} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                            <img src={foto.src} className="d-block w-100 event-carousel-img" alt={foto.alt} />
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselFotos" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselFotos" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Próximo</span>
                </button>
            </div>
        </section>
    )
}

export default Carousel