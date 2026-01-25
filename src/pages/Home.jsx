import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content animate-fade-in">
                    <h1>Bienvenidos a nuestra Iglesia Jesucristo Verdad y Libertad</h1>
                    <p>Un lugar para crecer en fe, esperanza y amor.</p>
                    <div className="hero-buttons">
                        <Link to="/contactos" className="btn btn-primary">Visítanos</Link>
                        <Link to="/anuncios" className="btn btn-outline-light">Ver Eventos</Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="container">
                    <h2 className="section-title">Nuestros Servicios</h2>
                    <p className="section-subtitle">Acompáñanos en nuestros tiempos de adoración y estudio.</p>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon"><Calendar size={32} /></div>
                            <h3>Culto de Adoración</h3>
                            <p>Domingos 11:00 AM</p>
                            <p className="service-desc">Adoración, alabanza y predicación de la Palabra.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon"><Clock size={32} /></div>
                            <h3>Escuela Dominical</h3>
                            <p>Domingos 12:00 PM</p>
                            <p className="service-desc">Clases bíblicas para todas las edades.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon"><MapPin size={32} /></div>
                            <h3>Reunión de oración</h3>
                            <p>Miércoles 7:00 PM</p>
                            <p className="service-desc">Orando juntos por nuestras familias, nuestra iglesia y nuestra comunidad.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="welcome-section">
                <div className="container welcome-grid">
                    <div className="welcome-text">
                        <h2>Una Iglesia para la Familia</h2>
                        <p>
                            Creemos en la importancia de la comunidad y el crecimiento espiritual en familia.
                            Nuestra iglesia ofrece ministerios para niños, jóvenes y adultos, buscando siempre
                            glorificar a Dios en todo lo que hacemos.
                        </p>
                        <Link to="/contactos" className="btn-link">
                            Conoce más sobre nosotros <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="welcome-image">
                        {/* Placeholder for an image */}
                        <div className="image-placeholder">Imagen de la Comunidad</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
