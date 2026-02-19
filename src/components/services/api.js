// services/api.js
// Aquí conectarás con tu backend cuando esté listo.
// Por ahora todas las funciones devuelven datos mock.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper para hacer peticiones
async function request(endpoint, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
}

// --- AUTH ---
export const auth = {
    register: (data) =>
        request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    login: (data) =>
        request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// --- RESIDUOS ---
export const residuos = {
    getAll: () => request('/residuos'),

    solicitar: (tipo) =>
        request('/residuos/solicitar', {
            method: 'POST',
            body: JSON.stringify({ tipo }),
        }),
};

// --- RECOGIDAS ---
export const recogidas = {
    getProximas: () => request('/recogidas/proximas'),
    getHistorial: () => request('/recogidas/historial'),
};