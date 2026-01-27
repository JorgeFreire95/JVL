import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import './Photos.css';

const Photos = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) return '';

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className="photos-page">
            <div className="page-header">
                <div className="container">
                    <h1>Eventos Realizados</h1>
                    <p>Galería de nuestros últimos eventos y sermones.</p>
                </div>
            </div>

            {loading ? (
                <div className="container" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>Cargando eventos...</p>
                </div>
            ) : events.length === 0 ? (
                <div className="container" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>No hay eventos registrados aún.</p>
                </div>
            ) : (
                <div className="container photos-grid" style={{ marginTop: '2rem' }}>
                    {events.map((event) => (
                        <div className="flip-card" key={event.id}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    {event.image ? (
                                        <img src={event.image} alt={event.title} />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#f0f0f0',
                                            color: '#888'
                                        }}>
                                            Sin Foto
                                        </div>
                                    )}
                                    <div className="front-caption">
                                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{formatDate(event.date)}</p>
                                    </div>
                                </div>
                                <div className="flip-card-back">
                                    <h3>{event.title}</h3>
                                    <div className="sermon-text">
                                        {event.sermon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Photos;
