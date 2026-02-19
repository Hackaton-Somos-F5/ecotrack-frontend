import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error en el registro";
  }
};
// services/api.js
// Aquí conectarás con tu backend cuando esté listo.
// Por ahora todas las funciones devuelven datos mock.


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


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


export const residuos = {
    getAll: () => request('/residuos'),

    solicitar: (tipo) =>
        request('/residuos/solicitar', {
            method: 'POST',
            body: JSON.stringify({ tipo }),
        }),
};


export const recogidas = {
    getProximas: () => request('/recogidas/proximas'),
    getHistorial: () => request('/recogidas/historial'),
};
