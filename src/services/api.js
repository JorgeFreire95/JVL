import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Announcements
export const getAnnouncements = async () => {
    const response = await api.get('/announcements/');
    return response.data;
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

// Contacts
export const getContacts = async () => {
    const response = await api.get('/contacts/');
    return response.data;
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

// Users
export const getUsers = async () => {
    const response = await api.get('/users/');
    return response.data;
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
    const response = await api.post('/login/', credentials);
    return response.data;
};

export const logoutUser = async (sessionToken) => {
    const response = await api.post('/logout/', { session_token: sessionToken });
    return response.data;
};

export default api;
