import React from 'react';
import { Church, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col">
                    <div className="footer-logo">
                        <img src="/logo-jvl.jpg" alt="Logo JVL" className="footer-logo-img" />
                        <span>Jesucristo Verdad Libertad</span>
                    </div>
                    <p className="footer-desc">
                        Una comunidad de fe, esperanza y amor. Únete a nosotros para adorar y servir.
                    </p>
                </div>

                <div className="footer-col">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/anuncios">Anuncios</a></li>
                        <li><a href="/contactos">Contactos</a></li>
                        <li><a href="/login">Miembros</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Contacto</h3>
                    <ul className="footer-contact">
                        <li><MapPin size={18} /> Calle Principal 123, Ciudad</li>
                        <li><Phone size={18} /> +1 234 567 890</li>
                        <li><Mail size={18} /> contacto@iglesia.com</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Síguenos</h3>
                    <div className="social-links">
                        <a href="#" className="social-link"><Facebook size={20} /></a>
                        <a href="#" className="social-link"><Instagram size={20} /></a>
                        <a href="#" className="social-link"><Youtube size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Iglesia Presbiteriana. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
