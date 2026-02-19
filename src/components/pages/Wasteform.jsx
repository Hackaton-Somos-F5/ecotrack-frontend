import { useState } from 'react';
import '../css/WasteForm.css';

// --- Datos mock ---
const RESIDUOS_MOCK = [
    {
        id: 1,
        num: 'ID #001',
        tipo: 'Plástico',
        icono: '♻️',
        iconoBg: '#e8f5e9',
        iconoColor: '#2ecc71',
        peso: '5.5 kg',
        volumen: '10 L',
        aula: 'Aula 402',
        colegio: 'Colegio San José',
        fecha: '20/10/2025 10:30',
        estado: 'RECOLECTADO',
    },
    {
        id: 2,
        num: 'ID #002',
        tipo: 'Papel',
        icono: '📄',
        iconoBg: '#e3f2fd',
        iconoColor: '#2196f3',
        peso: '2.1 kg',
        volumen: '15 L',
        aula: 'Aula 105',
        colegio: 'Colegio San José',
        fecha: '21/10/2025 09:15',
        estado: 'PENDIENTE',
    },
    {
        id: 3,
        num: 'ID #003',
        tipo: 'Orgánico',
        icono: '🥬',
        iconoBg: '#fff8e1',
        iconoColor: '#ff9800',
        peso: '8.4 kg',
        volumen: '12 L',
        aula: 'Comedor',
        colegio: 'Colegio San José',
        fecha: '21/10/2025 14:00',
        estado: 'RECOLECTADO',
    },
];

const FILTROS = ['Todos', 'Plástico', 'Papel', 'Orgánico', 'Vidrio'];

const TIPOS = ['Plástico', 'Papel', 'Orgánico', 'Vidrio', 'Metal'];

// --- Tarjeta de residuo ---
function ResiduoCard({ residuo }) {
    const esRecolectado = residuo.estado === 'RECOLECTADO';
    return (
        <div className="residuoCard">
            <div className="residuoCardTop">
                <div className="residuoCardLeft">
                    <div
                        className="residuoIcono"
                        style={{ background: residuo.iconoBg }}
                    >
                        <span>{residuo.icono}</span>
                    </div>
                    <div>
                        <p className="residuoNum">{residuo.num}</p>
                        <p className="residuoTipo">{residuo.tipo}</p>
                    </div>
                </div>
                <span className={`residuoBadge ${esRecolectado ? 'badgeRecolectado' : 'badgePendiente'}`}>
                    {residuo.estado}
                </span>
            </div>

            <div className="residuoStats">
                <div className="residuoStat">
                    <span className="statLabel">PESO</span>
                    <span className="statValue">{residuo.peso}</span>
                </div>
                <div className="residuoStat">
                    <span className="statLabel">VOLUMEN</span>
                    <span className="statValue">{residuo.volumen}</span>
                </div>
            </div>

            <div className="residuoMeta">
                <span className="metaItem">
                    <span className="metaIcon">🏫</span>
                    {residuo.aula} · {residuo.colegio}
                </span>
                <span className="metaItem">
                    <span className="metaIcon">📅</span>
                    {residuo.fecha}
                </span>
            </div>
        </div>
    );
}

// --- Modal para añadir residuo ---
function ModalAnadir({ onClose, onGuardar }) {
    const [form, setForm] = useState({
        tipo: 'Plástico',
        peso: '',
        volumen: '',
        aula: '',
        colegio: '',
        fecha: '',
        estado: 'PENDIENTE',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const errs = {};
        if (!form.peso) errs.peso = 'Campo obligatorio';
        if (!form.volumen) errs.volumen = 'Campo obligatorio';
        if (!form.aula.trim()) errs.aula = 'Campo obligatorio';
        if (!form.fecha) errs.fecha = 'Campo obligatorio';
        return errs;
    };

    const handleSubmit = () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        onGuardar(form);
        onClose();
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalBox" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2 className="modalTitle">Añadir Residuo</h2>
                    <button className="modalClose" onClick={onClose}>✕</button>
                </div>

                <div className="modalBody">
                    {/* Tipo */}
                    <div className="fieldGroup">
                        <label>Tipo de residuo</label>
                        <div className="tipoGrid">
                            {TIPOS.map(t => (
                                <button
                                    key={t}
                                    className={`tipoPill ${form.tipo === t ? 'tipoPillActive' : ''}`}
                                    onClick={() => setForm({ ...form, tipo: t })}
                                    type="button"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Peso y Volumen */}
                    <div className="fieldRow">
                        <div className="fieldGroup">
                            <label>Peso (kg)</label>
                            <input
                                name="peso"
                                type="number"
                                placeholder="ej. 5.5"
                                value={form.peso}
                                onChange={handleChange}
                                className={errors.peso ? 'inputError' : ''}
                            />
                            {errors.peso && <span className="fieldError">{errors.peso}</span>}
                        </div>
                        <div className="fieldGroup">
                            <label>Volumen (L)</label>
                            <input
                                name="volumen"
                                type="number"
                                placeholder="ej. 10"
                                value={form.volumen}
                                onChange={handleChange}
                                className={errors.volumen ? 'inputError' : ''}
                            />
                            {errors.volumen && <span className="fieldError">{errors.volumen}</span>}
                        </div>
                    </div>

                    {/* Aula */}
                    <div className="fieldGroup">
                        <label>Aula / Zona</label>
                        <input
                            name="aula"
                            type="text"
                            placeholder="ej. Aula 402, Comedor..."
                            value={form.aula}
                            onChange={handleChange}
                            className={errors.aula ? 'inputError' : ''}
                        />
                        {errors.aula && <span className="fieldError">{errors.aula}</span>}
                    </div>

                    {/* Colegio */}
                    <div className="fieldGroup">
                        <label>Colegio</label>
                        <input
                            name="colegio"
                            type="text"
                            placeholder="ej. Colegio San José"
                            value={form.colegio}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Fecha */}
                    <div className="fieldGroup">
                        <label>Fecha y hora</label>
                        <input
                            name="fecha"
                            type="datetime-local"
                            value={form.fecha}
                            onChange={handleChange}
                            className={errors.fecha ? 'inputError' : ''}
                        />
                        {errors.fecha && <span className="fieldError">{errors.fecha}</span>}
                    </div>

                    {/* Estado */}
                    <div className="fieldGroup">
                        <label>Estado</label>
                        <div className="estadoToggle">
                            <button
                                type="button"
                                className={`estadoBtn ${form.estado === 'PENDIENTE' ? 'estadoBtnPendiente' : ''}`}
                                onClick={() => setForm({ ...form, estado: 'PENDIENTE' })}
                            >
                                Pendiente
                            </button>
                            <button
                                type="button"
                                className={`estadoBtn ${form.estado === 'RECOLECTADO' ? 'estadoBtnRecolectado' : ''}`}
                                onClick={() => setForm({ ...form, estado: 'RECOLECTADO' })}
                            >
                                Recolectado
                            </button>
                        </div>
                    </div>
                </div>

                <div className="modalFooter">
                    <button className="btnCancelar" onClick={onClose}>Cancelar</button>
                    <button className="btnGuardar" onClick={handleSubmit}>Guardar residuo</button>
                </div>
            </div>
        </div>
    );
}

// --- Página principal ---
export default function Residuos() {
    const [filtro, setFiltro] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');
    const [residuos, setResiduos] = useState(RESIDUOS_MOCK);
    const [modalAbierto, setModalAbierto] = useState(false);

    const residuosFiltrados = residuos.filter(r => {
        const coincideFiltro = filtro === 'Todos' || r.tipo === filtro;
        const coincideBusqueda =
            r.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
            r.aula.toLowerCase().includes(busqueda.toLowerCase()) ||
            r.colegio.toLowerCase().includes(busqueda.toLowerCase());
        return coincideFiltro && coincideBusqueda;
    });

    const handleGuardar = (form) => {
        const iconos = { Plástico: '♻️', Papel: '📄', Orgánico: '🥬', Vidrio: '🪟', Metal: '⚙️' };
        const iconosBg = { Plástico: '#e8f5e9', Papel: '#e3f2fd', Orgánico: '#fff8e1', Vidrio: '#e0f7fa', Metal: '#f3e5f5' };
        const nuevo = {
            id: Date.now(),
            num: `ID #${String(residuos.length + 1).padStart(3, '0')}`,
            tipo: form.tipo,
            icono: iconos[form.tipo] || '🗑️',
            iconoBg: iconosBg[form.tipo] || '#f5f5f5',
            iconoColor: '#2ecc71',
            peso: `${form.peso} kg`,
            volumen: `${form.volumen} L`,
            aula: form.aula,
            colegio: form.colegio || 'Colegio San José',
            fecha: form.fecha.replace('T', ' '),
            estado: form.estado,
        };
        setResiduos([nuevo, ...residuos]);
    };

    return (
        <div className="residuosPage">
            {/* Top bar */}
            <div className="residuosTopBar">
                <button className="backBtn" onClick={() => window.history.back()}>←</button>
                <h1 className="residuosTitle">Eco Cole</h1>
                <button className="profileBtn">👤</button>
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
                {FILTROS.map(f => (
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
            {modalAbierto && (
                <ModalAnadir
                    onClose={() => setModalAbierto(false)}
                    onGuardar={handleGuardar}
                />
            )}
        </div>
    );
}