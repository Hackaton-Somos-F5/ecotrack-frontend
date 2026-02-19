import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../css/WasteModal.css';

export default function WasteModal({ isOpen, onClose, onSuccess }) {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        categoria_id: '',
        peso_kg: '',
        volumen_litros: '',
        aula: '',
        estado: 'PENDIENTE',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await api.categorias.getAll();
            setCategories(data);
            if (data.length > 0 && !form.categoria_id) {
                setForm(prev => ({ ...prev, categoria_id: data[0].id }));
            }
        } catch (err) {
            console.error("Error al cargar categorías:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const errs = {};
        if (!form.categoria_id) errs.categoria_id = 'Selecciona una categoría';
        if (!form.peso_kg || parseFloat(form.peso_kg) <= 0) errs.peso_kg = 'Peso inválido';
        if (!form.volumen_litros || parseFloat(form.volumen_litros) <= 0) errs.volumen_litros = 'Volumen inválido';
        if (!form.aula.trim()) errs.aula = 'El aula es obligatoria';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        try {
            setSubmitting(true);
            await api.residuos.registrar(user.id, {
                categoria_id: parseInt(form.categoria_id),
                peso_kg: parseFloat(form.peso_kg),
                volumen_litros: parseFloat(form.volumen_litros),
                aula: form.aula,
                estado: form.estado
            });

            // Reset form
            setForm({
                categoria_id: categories[0]?.id || '',
                peso_kg: '',
                volumen_litros: '',
                aula: '',
                estado: 'PENDIENTE',
            });

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            alert("Error al guardar residuo: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalBox" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2 className="modalTitle">Registrar Residuo</h2>
                    <button className="modalClose" onClick={onClose}>✕</button>
                </div>

                <form className="modalBody" onSubmit={handleSubmit}>
                    {/* Categoría */}
                    <div className="fieldGroup">
                        <label>Tipo de residuo (Categoría)</label>
                        <div className="tipoGrid">
                            {loading ? <p>Cargando categorías...</p> :
                                categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        className={`tipoPill ${parseInt(form.categoria_id) === cat.id ? 'tipoPillActive' : ''}`}
                                        onClick={() => setForm({ ...form, categoria_id: cat.id })}
                                    >
                                        {cat.icon} {cat.label}
                                    </button>
                                ))
                            }
                        </div>
                        {errors.categoria_id && <span className="fieldError">{errors.categoria_id}</span>}
                    </div>

                    {/* Peso y Volumen */}
                    <div className="fieldRow">
                        <div className="fieldGroup">
                            <label>Peso (kg)</label>
                            <input
                                name="peso_kg"
                                type="number"
                                step="0.1"
                                placeholder="ej. 5.5"
                                value={form.peso_kg}
                                onChange={handleChange}
                                className={errors.peso_kg ? 'inputError' : ''}
                            />
                            {errors.peso_kg && <span className="fieldError">{errors.peso_kg}</span>}
                        </div>
                        <div className="fieldGroup">
                            <label>Volumen (L)</label>
                            <input
                                name="volumen_litros"
                                type="number"
                                step="0.1"
                                placeholder="ej. 10"
                                value={form.volumen_litros}
                                onChange={handleChange}
                                className={errors.volumen_litros ? 'inputError' : ''}
                            />
                            {errors.volumen_litros && <span className="fieldError">{errors.volumen_litros}</span>}
                        </div>
                    </div>

                    {/* Aula y Estado */}
                    <div className="fieldRow">
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
                        <button type="button" className="btnCancelar" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btnGuardar" disabled={submitting}>
                            {submitting ? 'Guardando...' : 'Guardar residuo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
