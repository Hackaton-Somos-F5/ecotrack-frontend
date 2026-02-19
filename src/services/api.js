// services/api.js
// Conectado con EcoTrackLite-Backend (FastAPI - http://127.0.0.1:8000)

// ✅ CORREGIDO: Eliminado el espacio al final
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').trim();

// Helper para hacer peticiones
async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    
    console.log(`[API] ${options.method || 'GET'} ${url}`); // Debug
    
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        // FastAPI devuelve { detail: "mensaje" } en errores
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.detail || errorData.message || `Error HTTP ${res.status}: ${res.statusText}`;
        console.error('[API Error]', errorData);
        throw new Error(message);
    }

    return res.json();
}

// --- AUTH ---
export const auth = {
    login: (data) =>
        request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// --- COLEGIOS ---
export const colegios = {
    register: (data) =>
        request('/colegios/', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getAll: (skip = 0, limit = 100) =>
        request(`/colegios/?skip=${skip}&limit=${limit}`),

    getById: (id) =>
        request(`/colegios/${id}`),

    getStats: (id) =>
        request(`/colegios/${id}/stats`),
};

// --- RESIDUOS ---
export const residuos = {
    registrar: (colegioId, data) =>
        request(`/colegios/${colegioId}/residuos`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getByColegio: (colegioId, filtros = {}) => {
        const params = new URLSearchParams();
        if (filtros.categoria_id) params.append('categoria_id', filtros.categoria_id);
        if (filtros.estado) params.append('estado', filtros.estado);
        const queryString = params.toString();
        return request(`/colegios/${colegioId}/residuos${queryString ? `?${queryString}` : ''}`);
    },

    getResumen: () =>
        request('/residuos/resumen'),
};

// --- CATEGORÍAS ---
export const categorias = {
    getAll: () =>
        request('/categorias/'),

    seed: () =>
        request('/categorias/seed', { method: 'POST' }),
};

// --- ALERTAS ---
export const alertas = {
    getAll: () =>
        request('/alertas/'),
};

// Export default para compatibilidad
export default { auth, colegios, residuos, categorias, alertas };