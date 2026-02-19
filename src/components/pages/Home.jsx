import { Link } from 'react-router-dom';
import '../css/Home.css';


function Hero() {
    return (
        <section className="hero">
            <div className="heroBgCircle" />
            <div className="heroContent">
                <span className="sectionLabel">Smart Resource Flow</span>
                <h1 className="heroTitle">
                    Cuidando vuestro colegio,<br />
                    <em>protegiendo</em><br />
                    vuestro planeta
                </h1>
                <p className="heroSubtitle">
                    Transformamos hábitos escolares en acciones reales.
                    Cada residuo recogido es un paso hacia un futuro más limpio.
                </p>
                <div className="heroCta">
                    <Link to="/register" className="btnPrimary">
                        Únete a la revolución
                    </Link>
                    <a href="#quienes-somos" className="btnOutline">
                        Saber más
                    </a>
                </div>
            </div>
            <div className="heroVisual">
    <img src="src/img/logoSinFondo.png" alt="EcoCole logo" className="heroLogo"/>
</div>

        </section>
    );
}

function QuienesSomos() {
    return (
        <section id="quienes-somos" className="section sectionWho">
            <div className="container">
                <span className="sectionLabel">Sobre nosotros</span>
                <h2 className="sectionTitle">¿Quiénes somos?</h2>
                <p className="sectionText">
                    EcoCole es una iniciativa dedicada a la recogida de residuos en entornos
                    escolares, dando solución al medio ambiente. Creemos que cada colegio puede
                    ser parte del cambio ambiental que necesitamos.
                </p>
            </div>
        </section>
    );
}

function MisionImpacto() {
    return (
        <section id="mision" className="section sectionMision">
            <div className="container grid2">
                <div className="misionCard">
                    <div className="cardIcon">🎯</div>
                    <h3>Nuestra Misión</h3>
                    <p>
                        Fomentar una cultura de responsabilidad ambiental en los centros
                        educativos, haciendo del reciclaje un hábito diario y natural para las
                        futuras generaciones.
                    </p>
                </div>
                <div className="misionCard">
                    <div className="cardIcon">🌍</div>
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
            icon: '📦',
            num: '01',
            titulo: 'Separar',
            desc: 'Clasifica tus residuos según el tipo: plástico, papel, vidrio u orgánico.',
        },
        {
            icon: '🗑️',
            num: '02',
            titulo: 'Depositar',
            desc: 'Deposítalo en el contenedor correcto dentro de tu colegio.',
        },
        {
            icon: '🚛',
            num: '03',
            titulo: 'Inspeccionar',
            desc: 'Nuestro equipo recoge y verifica los residuos para asegurar su correcta gestión.',
        },
    ];

    return (
        <section id="como-reciclar" className="section sectionReciclar">
            <div className="container">
                <span className="sectionLabel">Guía rápida</span>
                <h2 className="sectionTitle">¿Cómo reciclar?</h2>
                <div className="pasosGrid">
                    {pasos.map((p) => (
                        <div className="pasoCard" key={p.num}>
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
            <div className="container">
                <span className="sectionLabel">Únete ahora</span>
                <h2 className="sectionTitle">Únete a la Revolución</h2>
                <p className="sectionText">
                    ¿Listo para convertir tu colegio en un agente del cambio?<br />
                    Regístrate y empieza a marcar la diferencia hoy.
                </p>
                <Link to="/register" className="btnPrimary">
                    Solicitar información
                </Link>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container footerInner">
                <div className="footerLogo">
                    <span className="logoIcon">♻</span>
                    <span>
                        ECO<strong>COLE</strong>
                    </span>
                </div>
                <div className="footerLinks">
                    <a href="#quienes-somos">Quiénes somos</a>
                    <a href="#mision">Misión</a>
                    <a href="#como-reciclar">Cómo reciclar</a>
                </div>
                <p className="footerCopy">© 2024 EcoCole · Smart Resource Flow</p>
            </div>
        </footer>
    );
}

export default function Home() {
    return (
        <div className="pageWrapper">
            <Hero />
            <QuienesSomos />
            <MisionImpacto />
            <ComoReciclar />
            <CtaFinal />
            <Footer />
        </div>
    );
}
