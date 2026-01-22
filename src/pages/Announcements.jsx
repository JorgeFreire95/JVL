import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { getAnnouncements } from '../services/api';
import './Announcements.css';

const Announcements = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncements();
                setEvents(data);
            } catch (error) {
                console.error("Failed to load announcements");
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return (
            <div className="announcements-page">
                <div className="page-header">
                    <div className="container">
                        <h1>Anuncios y Eventos</h1>
                    </div>
                </div>
                <div className="container content-section" style={{ textAlign: 'center' }}>
                    <p>Cargando anuncios...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="announcements-page">
            <div className="page-header">
                <div className="container">
                    <h1>Anuncios y Eventos</h1>
                    <p>Mantente informado sobre nuestras actividades.</p>
                </div>
            </div>

            <div className="container content-section">
                {events.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No hay anuncios por el momento.</p>
                ) : (
                    <div className="events-list">
                        {events.map((event) => (
                            <div key={event.id} className="event-card">
                                <div className="event-date-badge">
                                    <span className="day">{new Date(event.date).getDate() + 1}</span>
                                    <span className="month">
                                        {new Date(event.date).toLocaleString('es-ES', { month: 'short' }).toUpperCase()}
                                    </span>
                                </div>
                                <div className="event-details">
                                    <span className="event-category">{event.category}</span>
                                    <h3>{event.title}</h3>
                                    <div className="event-meta">
                                        <span><Calendar size={16} /> {event.date}{event.end_date ? ` al ${event.end_date}` : ''}</span>
                                        <span><Clock size={16} /> {event.time}</span>
                                        <span><MapPin size={16} /> {event.location}</span>
                                    </div>
                                    <p>{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Announcements;
