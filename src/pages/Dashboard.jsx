import { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import { useAuth } from "../context/AuthContext";
import api from '../services/api';

function WasteCard({ code, label, percentage, icon, color, bg }) {
    const isHigh = percentage >= 75;
    return (
        <div className="wasteCard glassEffect">
            <div className="wasteCardHeader">
                <div className="wasteCardIconBox" style={{ backgroundColor: bg }}>
                    <span className="wasteCardEmoji">{icon}</span>
                </div>
                <div className="wasteCardMainInfo">
                    <h3 className="wasteCardTitle">{label}</h3>
                    <span className="wasteCardTag">{code}</span>
                </div>
                <div className={`wasteCardStatus ${isHigh ? 'statusHigh' : 'statusNormal'}`}>
                    {isHigh ? 'Alto' : 'Normal'}
                </div>
            </div>

            <div className="wasteCardContent">
                <div className="wasteCardStats">
                    <span className="statsLabel">Capacidad</span>
                    <span className="statsValue" style={{ color: color }}>{percentage}%</span>
                </div>
                <div className="wasteCardProgress">
                    <div className="progressTrack">
                        <div
                            className="progressFill"
                            style={{
                                width: `${Math.min(percentage, 100)}%`,
                                backgroundColor: color,
                                boxShadow: `0 0 12px ${color}44`
                            }}
                        />
                    </div>
                </div>
            </div>

            <button className="wasteCardButton" style={{ backgroundColor: color }}>
                Solicitar Recogida
            </button>
        </div>
    );
}

const SERVICES = [
    { icon: '🚛', label: 'Recogida', desc: 'Solicitar recogida urgente' },
    { icon: '📊', label: 'Informes', desc: 'Ver informes mensuales' },
    { icon: '📅', label: 'Programar', desc: 'Programar próxima recogida' },
    { icon: '📞', label: 'Contacto', desc: 'Contactar con la empresa' },
];

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
    const { user } = useAuth();
    const [wasteTypes, setWasteTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalKg, setTotalKg] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) return;

            try {
                setLoading(true);
                // Cargar categorías y residuos en paralelo
                const [cats, res] = await Promise.all([
                    api.categorias.getAll(),
                    api.residuos.getByColegio(user.id)
                ]);

                // Calcular porcentajes y agrupar datos
                const calculatedWaste = cats.map(cat => {
                    // Filtrar residuos de esta categoría y sumarlos
                    const totalCat = res
                        .filter(r => r.categoria_id === cat.id)
                        .reduce((sum, r) => sum + (r.peso_kg || 0), 0);

                    // Porcentaje = (total / umbral) * 100
                    const percentage = cat.umbral > 0 ? Math.round((totalCat / cat.umbral) * 100) : 0;

                    return {
                        id: cat.id,
                        code: cat.code,
                        label: cat.label,
                        icon: cat.icon,
                        color: cat.color,
                        bg: cat.bg,
                        percentage: percentage,
                        total: totalCat
                    };
                });

                setWasteTypes(calculatedWaste);
                setTotalKg(res.reduce((sum, r) => sum + (r.peso_kg || 0), 0));
                setError(null);
            } catch (err) {
                console.error("Error cargando datos del dashboard:", err);
                setError("No se pudieron cargar los datos del dashboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);

    if (loading) {
        return <div className="dashboardPage"><p className="loadingText">Cargando dashboard...</p></div>;
    }

    if (error) {
        return <div className="dashboardPage"><p className="errorText">{error}</p></div>;
    }

    return (
        <div className="dashboardPage">
            <main className="dashboardMain">
                <div className="dashboardTitleRow">
                    <div>
                        <h1 className="dashboardTitle">Panel de Control</h1>
                        <p className="dashboardSubtitle">{user?.nombre || 'Colegio'} · Resumen de residuos</p>
                    </div>
                    <div className="dashboardStats">
                        <div className="dashboardStat">
                            <span className="dashboardStatNum">{wasteTypes.length}</span>
                            <span className="dashboardStatLabel">Tipos</span>
                        </div>
                        <div className="dashboardStat">
                            <span className="dashboardStatNum">{totalKg}kg</span>
                            <span className="dashboardStatLabel">Total</span>
                        </div>
                    </div>
                </div>

                <div className="wasteGrid">
                    {wasteTypes.map(w => (
                        <WasteCard key={w.id} {...w} />
                    ))}
                </div>

                <ServiceSection />
                <NextPickupCard />
                <BottomControls />
            </main>
        </div>
    );
}