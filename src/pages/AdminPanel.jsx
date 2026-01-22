import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Edit, Trash2, Save, X,
    Calendar, Users, UserPlus, User, LogOut, Menu, Camera
} from 'lucide-react';
import {
    getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
    getContacts, createContact, updateContact, deleteContact,
    getUsers, createUser, updateUser, deleteUser, logoutUser,
    getEvents, createEvent, updateEvent, deleteEvent
} from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('announcements');
    const [announcements, setAnnouncements] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Initial Data Fetch
    useEffect(() => {
        // Obtener el usuario actual del localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setCurrentUser(user);
                // Verificar si es administrador (is_staff)
                setIsAdmin(user.is_staff === true);
            } catch (error) {
                console.error("Error parsing user data:", error);
                navigate('/login');
                return;
            }
        } else {
            navigate('/login');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [annData, contactData, userData, eventData] = await Promise.all([
                getAnnouncements(),
                getContacts(),
                getUsers(),
                getEvents()
            ]);
            setAnnouncements(annData);
            setContacts(contactData);
            setUsers(userData);
            setEvents(eventData);
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    };

    // Handlers for Announcements
    const handleSaveAnnouncement = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            if (currentItem?.id) {
                await updateAnnouncement(currentItem.id, data);
            } else {
                await createAnnouncement(data);
            }
            setIsEditing(false);
            setCurrentItem(null);
            fetchData();
        } catch (error) {
            console.error("Error saving announcement", error);
            alert("Error al guardar. Verifica los datos.");
        }
    };

    const handleDeleteAnnouncement = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este anuncio?')) {
            try {
                await deleteAnnouncement(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting", error);
            }
        }
    };

    // Handlers for Contacts
    const handleSaveContact = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!formData.get('photo').name) {
            formData.delete('photo');
        }

        try {
            if (currentItem?.id) {
                await updateContact(currentItem.id, formData);
            } else {
                await createContact(formData);
            }
            setIsEditing(false);
            setCurrentItem(null);
            fetchData();
            alert("Contacto guardado exitosamente");
        } catch (error) {
            console.error("Error saving contact", error);
            alert("Error al guardar contacto.");
        }
    };

    const handleDeleteContact = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este contacto?')) {
            try {
                await deleteContact(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting", error);
            }
        }
    };

    // Handlers for Events
    const handleSaveEvent = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!formData.get('image').name) {
            formData.delete('image');
        }

        try {
            if (currentItem?.id) {
                await updateEvent(currentItem.id, formData);
            } else {
                await createEvent(formData);
            }
            setIsEditing(false);
            setCurrentItem(null);
            fetchData();
            alert("Evento guardado exitosamente");
        } catch (error) {
            console.error("Error saving event", error);
            alert("Error al guardar evento.");
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este evento?')) {
            try {
                await deleteEvent(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting event", error);
            }
        }
    };


    // Handlers for Users
    const handleSaveUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.is_staff = data.is_staff === 'on';

        console.log("Saving user data:", data); // Debugging

        // Remove empty password if editing (so we don't overwrite it with empty string)
        if (currentItem?.id && !data.password) {
            delete data.password;
        }

        try {
            if (currentItem?.id) {
                await updateUser(currentItem.id, data);
                alert("Usuario actualizado exitosamente");
            } else {
                await createUser(data);
                alert("Usuario creado exitosamente");
            }
            setIsEditing(false);
            setCurrentItem(null);
            fetchData();
        } catch (error) {
            console.error("Error saving user", error);
            let msg = "Error al guardar usuario.";

            // Revisar errores específicos del servidor
            if (error.response?.data) {
                const data = error.response.data;
                if (data.username) {
                    msg = Array.isArray(data.username) ? data.username[0] : data.username;
                } else if (data.email) {
                    msg = Array.isArray(data.email) ? data.email[0] : data.email;
                } else if (data.password) {
                    msg = Array.isArray(data.password) ? data.password[0] : data.password;
                } else if (data.detail) {
                    msg = data.detail;
                }
            }
            alert(msg);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await deleteUser(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting user", error);
            }
        }
    };

    const openModal = (item = null) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleLogout = async () => {
        try {
            const sessionToken = currentUser?.session_token;
            if (sessionToken) {
                await logoutUser(sessionToken);
            }
        } catch (error) {
            console.error("Error al cerrar sesión en el servidor:", error);
        } finally {
            localStorage.removeItem('user');
            navigate('/');
        }
    };

    const renderContent = () => {
        if (activeTab === 'announcements') {
            return announcements.map(item => (
                <div key={item.id} className="admin-card">
                    <h3>{item.title}</h3>
                    <p className="date">
                        {item.date} {item.end_date ? ` - ${item.end_date}` : ''}
                    </p>
                    <div className="actions">
                        <button onClick={() => openModal(item)} className="btn-icon"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteAnnouncement(item.id)} className="btn-icon danger"><Trash2 size={18} /></button>
                    </div>
                </div>
            ));
        } else if (activeTab === 'contacts') {
            return contacts.map(item => (
                <div key={item.id} className="admin-card">
                    <div className="card-header-img">
                        {item.photo ? <img src={item.photo} alt={item.name} /> : <div className="placeholder-img">Sin Foto</div>}
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                    <div className="actions">
                        <button onClick={() => openModal(item)} className="btn-icon"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteContact(item.id)} className="btn-icon danger"><Trash2 size={18} /></button>
                    </div>
                </div>
            ));
        } else if (activeTab === 'events') {
            return events.map(item => (
                <div key={item.id} className="admin-card">
                    <div className="card-header-img">
                        {item.image ? <img src={item.image} alt={item.title} /> : <div className="placeholder-img">Sin Foto</div>}
                    </div>
                    <h3>{item.title}</h3>
                    <p className="date">{item.date}</p>
                    <div className="actions">
                        <button onClick={() => openModal(item)} className="btn-icon"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteEvent(item.id)} className="btn-icon danger"><Trash2 size={18} /></button>
                    </div>
                </div>
            ));
        } else if (activeTab === 'users') {
            return users.map(item => (
                <div key={item.id} className="admin-card">
                    <div className="user-icon-header">
                        <User size={40} />
                    </div>
                    <h3>{item.username}</h3>
                    <p>{item.email}</p>
                    <p className="small-text">{item.is_staff ? 'Administrador' : 'Usuario'}</p>
                    <div className="actions">
                        <button onClick={() => openModal(item)} className="btn-icon"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteUser(item.id)} className="btn-icon danger"><Trash2 size={18} /></button>
                    </div>
                </div>
            ));
        }
    };

    return (
        <div className="admin-panel">
            {/* Mobile Navbar */}
            <div className="admin-navbar-mobile">
                <div className="navbar-content">
                    <h2>Panel Admin</h2>
                    <button
                        className="hamburger-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        <button
                            className={`sidebar-btn ${activeTab === 'announcements' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('announcements');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <Calendar size={20} /> Anuncios
                        </button>
                        <button
                            className={`sidebar-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('contacts');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <Users size={20} /> Contactos
                        </button>
                        <button
                            className={`sidebar-btn ${activeTab === 'events' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('events');
                                setMobileMenuOpen(false);
                            }}
                        >
                            <Camera size={20} /> Eventos
                        </button>
                        {isAdmin && (
                            <button
                                className={`sidebar-btn ${activeTab === 'users' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab('users');
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <UserPlus size={20} /> Usuarios
                            </button>
                        )}
                        <button
                            className="sidebar-btn logout-btn"
                            onClick={handleLogout}
                            style={{ color: '#ef4444' }}
                        >
                            <LogOut size={20} /> Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="admin-sidebar">
                <h2>Panel Admin</h2>
                <button
                    className={`sidebar-btn ${activeTab === 'announcements' ? 'active' : ''}`}
                    onClick={() => setActiveTab('announcements')}
                >
                    <Calendar size={20} /> Anuncios
                </button>
                <button
                    className={`sidebar-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contacts')}
                >
                    <Users size={20} /> Contactos
                </button>
                <button
                    className={`sidebar-btn ${activeTab === 'events' ? 'active' : ''}`}
                    onClick={() => setActiveTab('events')}
                >
                    <Camera size={20} /> Eventos
                </button>
                {isAdmin && (
                    <button
                        className={`sidebar-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <UserPlus size={20} /> Usuarios
                    </button>
                )}

                <button
                    className="sidebar-btn logout-btn"
                    onClick={handleLogout}
                    style={{ marginTop: 'auto', color: '#ef4444' }}
                >
                    <LogOut size={20} /> Cerrar Sesión
                </button>
            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <h1>Gestión de {
                        activeTab === 'announcements' ? 'Anuncios' :
                            activeTab === 'contacts' ? 'Contactos' :
                                activeTab === 'events' ? 'Eventos' : 'Usuarios'
                    }</h1>
                    {!(activeTab === 'users' && !isAdmin) && (
                        <button className="btn btn-primary" onClick={() => openModal()}>
                            <Plus size={20} /> Nuevo
                        </button>
                    )}
                </div>

                {loading ? <p>Cargando...</p> : (
                    <div className="admin-grid">
                        {activeTab === 'users' && !isAdmin ? (
                            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666' }}>
                                No tienes permisos para gestionar usuarios.
                            </p>
                        ) : (
                            renderContent()
                        )}
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>
                                {currentItem ? 'Editar' : 'Crear'} {
                                    activeTab === 'announcements' ? 'Anuncio' :
                                        activeTab === 'contacts' ? 'Contacto' :
                                            activeTab === 'events' ? 'Evento' : 'Usuario'
                                }
                            </h2>
                            <button onClick={() => setIsEditing(false)} className="close-btn"><X size={24} /></button>
                        </div>

                        <form
                            key={currentItem ? currentItem.id : 'new'}
                            autoComplete="off"
                            onSubmit={
                                activeTab === 'announcements' ? handleSaveAnnouncement :
                                    activeTab === 'contacts' ? handleSaveContact :
                                        activeTab === 'events' ? handleSaveEvent : handleSaveUser
                            }>
                            {/* Fake fields to trick browser autofill */}
                            <input type="text" style={{ display: 'none' }} />
                            <input type="password" style={{ display: 'none' }} />

                            {activeTab === 'announcements' && (
                                <>
                                    <div className="form-group">
                                        <label>Título</label>
                                        <input name="title" defaultValue={currentItem?.title} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha de Inicio</label>
                                        <input type="date" name="date" defaultValue={currentItem?.date} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha de Finalización (Opcional)</label>
                                        <input type="date" name="end_date" defaultValue={currentItem?.end_date} />
                                    </div>
                                    <div className="form-group">
                                        <label>Hora</label>
                                        <input name="time" defaultValue={currentItem?.time} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Ubicación</label>
                                        <input name="location" defaultValue={currentItem?.location} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Categoría</label>
                                        <select name="category" defaultValue={currentItem?.category || 'Iglesia General'}>
                                            <option value="Jóvenes">Jóvenes</option>
                                            <option value="Iglesia General">Iglesia General</option>
                                            <option value="Niños">Niños</option>
                                            <option value="Mujeres">Mujeres</option>
                                            <option value="Hombres">Hombres</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea name="description" defaultValue={currentItem?.description} required rows={4} />
                                    </div>
                                </>
                            )}

                            {activeTab === 'contacts' && (
                                <>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input name="name" defaultValue={currentItem?.name} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Cargo / Rol</label>
                                        <input name="role" defaultValue={currentItem?.role} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Link WhatsApp</label>
                                        <input
                                            type="url"
                                            name="whatsapp_link"
                                            defaultValue={currentItem?.whatsapp_link}
                                            placeholder="https://wa.me/1234567890"
                                            required
                                        />
                                        <small style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', display: 'block' }}>
                                            Formato: https://wa.me/NUMERODETELEFONO (sin espacios ni caracteres especiales)
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label>Orden</label>
                                        <input type="number" name="order" defaultValue={currentItem?.order || 0} />
                                    </div>
                                    <div className="form-group">
                                        <label>Foto</label>
                                        <input type="file" name="photo" accept="image/*" />
                                        {currentItem?.photo && <p className="small-text">Foto actual: {currentItem.photo}</p>}
                                    </div>
                                </>
                            )}

                            {activeTab === 'events' && (
                                <>
                                    <div className="form-group">
                                        <label>Título del Evento</label>
                                        <input name="title" defaultValue={currentItem?.title} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha</label>
                                        <input type="date" name="date" defaultValue={currentItem?.date} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Sermón Expuesto</label>
                                        <textarea name="sermon" defaultValue={currentItem?.sermon} required rows={6} placeholder="Escribe aquí el sermón o resumen del evento..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Foto del Evento (Portada)</label>
                                        <input type="file" name="image" accept="image/*" />
                                        {currentItem?.image && <p className="small-text">Foto actual: {currentItem.image}</p>}
                                    </div>
                                </>
                            )}

                            {activeTab === 'users' && (
                                <>
                                    <div className="form-group">
                                        <label>Correo Electrónico (Principal)</label>
                                        <input type="email" name="email" defaultValue={currentItem?.email} required autoComplete="new-password" />
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input name="username" defaultValue={currentItem?.username} required autoComplete="new-password" placeholder="Nombre para mostrar en el sistema" />
                                    </div>
                                    <div className="form-group">
                                        <label>Contraseña {currentItem?.id && '(Dejar en blanco para no cambiar)'}</label>
                                        <input type="password" name="password" required={!currentItem?.id} autoComplete="new-password" />
                                    </div>
                                    <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                                        <input type="checkbox" name="is_staff" id="is_staff" defaultChecked={currentItem?.is_staff} style={{ width: 'auto' }} />
                                        <label htmlFor="is_staff" style={{ marginBottom: 0 }}>¿Es Administrador?</label>
                                    </div>
                                </>
                            )}

                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">Cancelar</button>
                                <button type="submit" className="btn btn-primary"><Save size={18} /> Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
