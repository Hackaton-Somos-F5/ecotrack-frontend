import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../css/Dashboard.css';

const WASTE_TYPES = [
    { code: 'ORGANIC',  label: 'Orgánico',  percentage: 45,  icon: '🥬', color: '#f59e0b', bg: '#fef3c7' },
    { code: 'PLASTIC',  label: 'Plástico',  percentage: 92,  icon: '♻️', color: '#2ecc71', bg: '#d1fae5' },
    { code: 'PAPER',    label: 'Papel',     percentage: 40,  icon: '📄', color: '#3b82f6', bg: '#dbeafe' },
    { code: 'GLASS',    label: 'Vidrio',    percentage: 50,  icon: '🪟', color: '#06b6d4', bg: '#cffafe' },
    { code: 'WASTE',    label: 'Residuos',  percentage: 75,  icon: '🗑️', color: '#8b5cf6', bg: '#ede9fe' },
    { code: 'HAZARD',   label: 'Peligroso', percentage: 20,  icon: '⚠️', color: '#ef4444', bg: '#fee2e2' },
];

const SERVICES = [
    { icon: '🚛', label: 'Recogida',  desc: 'Solicitar recogida urgente' },
    { icon: '📊', label: 'Informes',  desc: 'Ver informes mensuales' },
    { icon: '📅', label: 'Programar', desc: 'Programar próxima recogida' },
    { icon: '📞', label: 'Contacto',  desc: 'Contactar con la empresa' },
];

function WasteCard({ code, label, percentage, icon, color, bg }) {
    const isHigh = percentage >= 75;
    return (
        <div className="wasteCard">
            <div className="wasteCardHeader">
                <div className="wasteCardIcon" style={{ background: bg }}>
                    <span>{icon}</span>
                </div>
                <span className={`wasteCardBadge ${isHigh ? 'wasteCardBadgeHigh' : 'wasteCardBadgeLow'}`}>
                    {isHigh ? 'Alto' : 'Normal'}
                </span>
            </div>
            <p className="wasteCardLabel">{label}</p>
            <p className="wasteCardCode">{code}</p>
            <div className="wasteCardBarTrack">
                <div
                    className="wasteCardBarFill"
                    style={{ width: `${percentage}%`, background: color }}
                />
            </div>
            <div className="wasteCardFooter">
                <span className="wasteCardPct" style={{ color }}>{percentage}%</span>
                <button className="wasteCardBtn" style={{ background: color }}>
                    Solicitar
                </button>
            </div>
        </div>
    );
}

function ServiceSection() {
    return (
        <section className="serviceSection">
            <h2 className="serviceSectionTitle">Servicios disponibles</h2>
            <div className="serviceGrid">
                {SERVICES.map(s => (
                    <button key={s.label} className="serviceCard">
                        <span className="serviceCardIcon">{s.icon}</span>
                        <span className="serviceCardLabel">{s.label}</span>
                        <span className="serviceCardDesc">{s.desc}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}

function NextPickupCard() {
    return (
        <div className="nextPickupCard">
            <div className="nextPickupLeft">
                <span className="nextPickupIcon">🚛</span>
                <div>
                    <p className="nextPickupTitle">Próxima recogida</p>
                    <p className="nextPickupDate">Mañana, 08:30 AM</p>
                    <p className="nextPickupSub">Colegio San José · Plástico y Papel</p>
                </div>
            </div>
            <span className="nextPickupBadge">Programada</span>
        </div>
    );
}

function BottomControls() {
    return (
        <div className="bottomControls">
            <button className="bottomBtn bottomBtnPrimary">➕ Añadir residuo</button>
            <button className="bottomBtn bottomBtnSecondary">📋 Ver historial</button>
        </div>
    );
}

export default function Dashboard() {
    return (
        <div className="dashboardPage">
            

            <main className="dashboardMain">
                <div className="dashboardTitleRow">
                    <div>
                        <h1 className="dashboardTitle">Panel de Control</h1>
                        <p className="dashboardSubtitle">Colegio San José · Resumen de residuos</p>
                    </div>
                    <div className="dashboardStats">
                        <div className="dashboardStat">
                            <span className="dashboardStatNum">6</span>
                            <span className="dashboardStatLabel">Tipos</span>
                        </div>
                        <div className="dashboardStat">
                            <span className="dashboardStatNum">170kg</span>
                            <span className="dashboardStatLabel">Total</span>
                        </div>
                    </div>
                </div>

                <div className="wasteGrid">
                    {WASTE_TYPES.map(w => (
                        <WasteCard key={w.code} {...w} />
                    ))}
                </div>

                <ServiceSection />
                <NextPickupCard />
                <BottomControls />
            </main>

            
        </div>
    );
}