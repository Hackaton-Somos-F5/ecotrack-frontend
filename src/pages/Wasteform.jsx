import { useState, useEffect } from 'react';
import '../css/Wasteform.css';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import WasteModal from '../components/WasteModal';

// --- Tarjeta de residuo ---
function ResiduoCard({ residuo }) {
    const esRecolectado = residuo.estado === 'RECOLECTADO';
    return (
        <div className="residuoCard">
            <div className="residuoCardTop">
                <div className="residuoCardLeft">
                    <div
                        className="residuoIcono"
                        style={{ background: residuo.categoria?.bg || '#f5f5f5' }}
                    >
                        <span>{residuo.categoria?.icon || '🗑️'}</span>
                    </div>
                    <div>
                        <p className="residuoNum">ID #{residuo.id}</p>
                        <p className="residuoTipo">{residuo.categoria?.label || 'Residuo'}</p>
                    </div>
                </div>
                <span className={`residuoBadge ${esRecolectado ? 'badgeRecolectado' : 'badgePendiente'}`}>
                    {residuo.estado}
                </span>
            </div>

            <div className="residuoStats">
                <div className="residuoStat">
                    <span className="statLabel">PESO</span>
                    <span className="statValue">{residuo.peso_kg} kg</span>
                </div>
                <div className="residuoStat">
                    <span className="statLabel">VOLUMEN</span>
                    <span className="statValue">{residuo.volumen_litros} L</span>
                </div>
            </div>

            <div className="residuoMeta">
                <span className="metaItem">
                    <span className="metaIcon">🏫</span>
                    {residuo.aula}
                </span>
                <span className="metaItem">
                    <span className="metaIcon">📅</span>
                    {new Date(residuo.fecha_registro).toLocaleString()}
                </span>
            </div>
        </div>
    );
}

// --- Página principal ---
export default function Residuos() {
    const { user } = useAuth();
    const [filtro, setFiltro] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');
    const [residuos, setResiduos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user?.id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [res, cats] = await Promise.all([
                api.residuos.getByColegio(user.id),
                api.categorias.getAll()
            ]);
            setResiduos(res);
            setCategorias(cats);
        } catch (err) {
            console.error("Error cargando residuos:", err);
        } finally {
            setLoading(false);
        }
    };

    const residuosFiltrados = residuos.filter(r => {
        const coincideFiltro = filtro === 'Todos' || r.categoria?.label === filtro;
        const coincideBusqueda =
            (r.categoria?.label || '').toLowerCase().includes(busqueda.toLowerCase()) ||
            (r.aula || '').toLowerCase().includes(busqueda.toLowerCase());
        return coincideFiltro && coincideBusqueda;
    });

    if (loading) return <div className="residuosPage"><p className="emptyState">Cargando residuos...</p></div>;

    return (
        <div className="residuosPage">
            {/* Top bar */}
            <div className="residuosTopBar">
                <button className="backBtn" onClick={() => window.history.back()}>←</button>
                <h1 className="residuosTitle">Gestión de Residuos</h1>
            </div>

            {/* Buscador */}
            <div className="searchBar">
                <span className="searchIcon">🔍</span>
                <input
                    type="text"
                    placeholder="Buscar por aula o residuo..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>

            {/* Filtros */}
            <div className="filtrosBar">
                {['Todos', ...categorias.map(c => c.label)].map(f => (
                    <button
                        key={f}
                        className={`filtroBtn ${filtro === f ? 'filtroBtnActive' : ''}`}
                        onClick={() => setFiltro(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Lista */}
            <div className="residuosList">
                {residuosFiltrados.length === 0 ? (
                    <div className="emptyState">
                        <span>🗑️</span>
                        <p>No hay residuos con ese filtro</p>
                    </div>
                ) : (
                    residuosFiltrados.map(r => <ResiduoCard key={r.id} residuo={r} />)
                )}
            </div>

            {/* Botón flotante */}
            <button className="fabBtn" onClick={() => setModalAbierto(true)} aria-label="Añadir residuo">
                +
            </button>

            {/* Modal */}
            <WasteModal
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onSuccess={fetchData}
            />
        </div>
    );
}