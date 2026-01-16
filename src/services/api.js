import axios from 'axios';

// Determinar la URL de la API según el entorno
let API_URL;

// URL del backend en producción (Railway / Render)
const PROD_API_URL = 'https://jvl-backend.up.railway.app/api';

const hostname = window.location.hostname;

// En desarrollo local usamos el backend local de Django
if (hostname === 'localhost' || hostname === '127.0.0.1') {
    API_URL = 'http://localhost:8000/api';
    console.log('Modo desarrollo: usando backend local en http://localhost:8000');
}
// En GitHub Pages - usar siempre el backend remoto
else if (hostname.includes('github.io')) {
    API_URL = PROD_API_URL;
    console.log('GitHub Pages: usando backend en Railway');
}
// En otros casos (por ejemplo, si algún día sirves frontend y backend juntos)
else {
    API_URL = PROD_API_URL;
}

console.log('API URL:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor para manejo de errores
api.interceptors.response.use(
    response => response,
    error => {
        // Si es error de conexión, retornar datos vacíos en lugar de fallar
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
            console.warn('No se pudo conectar al servidor:', error.message);
            // Retornar datos vacíos en lugar de rechazar
            return { data: [] };
        }
        return Promise.reject(error);
    }
);

// Announcements
export const getAnnouncements = async () => {
    try {
        const response = await api.get('/announcements/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener anuncios:', error);
        return [];
    }
};

export const createAnnouncement = async (data) => {
    const response = await api.post('/announcements/', data);
    return response.data;
};

export const updateAnnouncement = async (id, data) => {
    const response = await api.put(`/announcements/${id}/`, data);
    return response.data;
};

export const deleteAnnouncement = async (id) => {
    await api.delete(`/announcements/${id}/`);
};

export const getContacts = async () => {
    try {
        const response = await api.get('/contacts/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        return [];
    }
};

export const createContact = async (data) => {
    const response = await api.post('/contacts/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateContact = async (id, data) => {
    const response = await api.put(`/contacts/${id}/`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}/`);
};

export const getUsers = async () => {
    try {
        const response = await api.get('/users/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};

export const createUser = async (data) => {
    const response = await api.post('/users/', data);
    return response.data;
};

export const updateUser = async (id, data) => {
    const response = await api.patch(`/users/${id}/`, data);
    return response.data;
};

export const deleteUser = async (id) => {
    await api.delete(`/users/${id}/`);
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/login/', credentials);
        return response.data;
    } catch (error) {
        console.error('Error en loginUser:', error);
        if (error.response) {
            // El servidor respondió con un status fuera del rango 2xx
            console.error('Error response:', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            // La petición fue hecha pero no hubo respuesta
            console.error('No hay respuesta del servidor');
            throw new Error('No se pudo conectar al servidor');
        } else {
            // Error en la configuración de la petición
            console.error('Error config:', error.message);
            throw error;
        }
    }
};

export const logoutUser = async (sessionToken) => {
    const response = await api.post('/logout/', { session_token: sessionToken });
    return response.data;
};

export default api;
