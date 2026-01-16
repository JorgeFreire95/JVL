import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { getContacts } from '../services/api';
import './Contact.css';

const Contact = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await getContacts();
                console.log("Contactos cargados:", data);
                setTeam(data);
            } catch (error) {
                console.error("Failed to load contacts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="contact-page">
            <div className="page-header">
                <div className="container">
                    <h1>Contáctanos</h1>
                    <p>Estamos aquí para servirte. Envíanos un mensaje o visítanos.</p>
                </div>
            </div>

            <div className="container content-section">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Información de Contacto</h2>
                        <p>Si tienes alguna pregunta o petición de oración, no dudes en contactarnos.</p>

                        <div className="info-item">
                            <div className="icon-box"><MapPin size={24} /></div>
                            <div>
                                <h3>Dirección</h3>
                                <p>Calle Principal 123, Ciudad, País</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><Phone size={24} /></div>
                            <div>
                                <h3>Teléfono</h3>
                                <p>+1 234 567 890</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><Mail size={24} /></div>
                            <div>
                                <h3>Email</h3>
                                <p>contacto@iglesia.com</p>
                            </div>
                        </div>

                        <div className="map-container">
                            {/* Placeholder for Google Maps */}
                            <div className="map-placeholder">Mapa de Ubicación</div>
                        </div>
                    </div>

                    <div className="contact-cards-container">
                        <h2>Nuestro Equipo</h2>
                        <p>Ponte en contacto directo con nuestros líderes.</p>

                        {loading ? (
                            <p>Cargando equipo...</p>
                        ) : (
                            <div className="team-grid">
                                {team.map((member) => (
                                    <div key={member.id} className="team-card">
                                        <div className="team-image">
                                            {member.photo ? (
                                                <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div className="image-placeholder-circle">Foto</div>
                                            )}
                                        </div>
                                        <h3>{member.name}</h3>
                                        <p className="team-role">{member.role}</p>
                                        <a href={member.whatsapp_link} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                                            <MessageCircle size={18} /> WhatsApp
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
