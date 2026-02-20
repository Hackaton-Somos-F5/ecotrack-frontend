import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../css/Home.css';
import { FaArrowRight, FaLeaf, FaBullseye, FaGlobeAmericas, FaBoxOpen, FaTrashAlt, FaTruckLoading } from 'react-icons/fa';

function Hero() {
    return (
        <section className="hero">
            <div className="heroBg">
                <div className="hero-circle circle-1"></div>
                <div className="hero-circle circle-2"></div>
            </div>
            <div className="heroInner">
                <div className="heroContent">
                    <span className="premium-label"><FaLeaf /> Smart Resource Flow</span>
                    <h1 className="heroTitle">
                        Cuidando vuestro colegio,<br />
                        protegiendo<br />
                        <span>vuestro planeta</span>
                    </h1>
                    <p className="heroSubtitle">
                        Transformamos hábitos escolares en acciones reales.
                        Cada residuo recogido es un paso hacia un futuro más limpio.
                    </p>
                    <div className="heroCta">
                        <Link to="/register" className="btn-premium primary">
                            Únete a la revolución <FaArrowRight />
                        </Link>
                        <Link to="/login" className="btn-premium secondary">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
                <div className="heroVisual">
                    <div className="glass-visual-bg">
                        <img
                            src="./src/assets/logoSinFondo.png"
                            alt="EcoCole logo"
                            className="heroLogo"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function QuienesSomos() {
    return (
        <section id="quienes-somos" className="section sectionWho">
            <div className="contentWrapper">
                <span className="premium-label-alt">Sobre nosotros</span>
                <h2 className="sectionTitle">¿Quiénes somos?</h2>
                <div className="glass-card main-info">
                    <p className="sectionText">
                        EcoCole es una iniciativa dedicada a la recogida de residuos en entornos
                        escolares, dando solución al medio ambiente. Creemos que cada colegio puede
                        ser parte del cambio ambiental que necesitamos.
                    </p>
                </div>
            </div>
        </section>
    );
}

function MisionImpacto() {
    return (
        <section id="mision" className="section sectionMision">
            <div className="contentWrapper grid2">
                <div className="glass-card feature-card">
                    <div className="cardIcon"><FaBullseye /></div>
                    <h3>Nuestra Misión</h3>
                    <p>
                        Fomentar una cultura de responsabilidad ambiental en los centros
                        educativos, haciendo del reciclaje un hábito diario y natural para las
                        futuras generaciones.
                    </p>
                </div>
                <div className="glass-card feature-card">
                    <div className="cardIcon"><FaGlobeAmericas /></div>
                    <h3>Nuestro Impacto</h3>
                    <p>
                        Desarrollamos métricas reales para medir el impacto en plástico,
                        papel, vidrio y más. Cada dato recogido contribuye a construir un
                        futuro más sostenible.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ComoReciclar() {
    const pasos = [
        {
            icon: <FaBoxOpen />,
            num: '01',
            titulo: 'Separar',
            desc: 'Clasifica tus residuos según el tipo: plástico, papel, vidrio u orgánico.',
        },
        {
            icon: <FaTrashAlt />,
            num: '02',
            titulo: 'Depositar',
            desc: 'Deposítalo en el contenedor correcto dentro de tu colegio.',
        },
        {
            icon: <FaTruckLoading />,
            num: '03',
            titulo: 'Inspeccionar',
            desc: 'Nuestro equipo recoge y verifica los residuos para asegurar su correcta gestión.',
        },
    ];

    return (
        <section id="como-reciclar" className="section sectionReciclar">
            <div className="contentWrapper">
                <span className="premium-label-alt">Guía rápida</span>
                <h2 className="sectionTitle">¿Cómo reciclar?</h2>
                <div className="pasosGrid">
                    {pasos.map((p) => (
                        <div className="glass-card pasoCard" key={p.num}>
                            <div className="pasoNum">{p.num}</div>
                            <div className="pasoIcon">{p.icon}</div>
                            <h4>{p.titulo}</h4>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CtaFinal() {
    return (
        <section className="section sectionCta">
            <div className="cta-glass">
                <div className="contentWrapper">
                    <span className="premium-label">Únete ahora</span>
                    <h2 className="sectionTitle">Únete a la Revolución</h2>
                    <p className="sectionText">
                        ¿Preparados para el cambio? Cada colegio que se une a EcoCole es un paso más hacia un planeta más limpio y saludable.
                        Empieza a marcar la diferencia hoy.
                    </p>
                    <Link to="/register" className="btn-premium primary inverted">
                        Quiero registrar mi colegio <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.glass-card, .sectionTitle, .premium-label-alt, .premium-label').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-page-wrapper">
            <div className="page-background">
                <div className="floating-circle circle-a"></div>
                <div className="floating-circle circle-b"></div>
                <div className="floating-circle circle-c"></div>
            </div>

            <Hero />
            <QuienesSomos />
            <MisionImpacto />
            <ComoReciclar />
            <CtaFinal />
        </div>
    );
}
