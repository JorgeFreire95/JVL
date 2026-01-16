import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Church, AlertCircle } from 'lucide-react';
import { loginUser } from '../services/api';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isGitHubPages, setIsGitHubPages] = useState(false);

    useEffect(() => {
        // Detectar si estamos en GitHub Pages
        const isPages = window.location.hostname.includes('github.io');
        setIsGitHubPages(isPages);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (isGitHubPages) {
            setError('El login solo funciona en la versión local. Necesitas ejecutar: npm run dev');
            return;
        }

        // Usar el email como campo principal
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await loginUser({ email, password });
            if (response.user) {
                // Store user info and session token
                const userData = {
                    ...response.user,
                    session_token: response.session_token,
                    password_md5: response.password_md5
                };
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/admin-panel');
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 409 || err.response?.data?.has_active_session) {
                setError('Ya tienes una sesión activa. Cierra sesión primero desde el panel.');
            } else {
                setError('Credenciales inválidas. Intenta de nuevo.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo">
                        <Church size={40} />
                    </div>
                    <h1>Bienvenido</h1>
                    <p>Ingresa a tu cuenta de miembro</p>
                </div>

                {isGitHubPages && (
                    <div style={{
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffc107',
                        color: '#856404',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <AlertCircle size={20} style={{ flexShrink: 0 }} />
                        <div>
                            <strong>Versión de demostración</strong>
                            <p>El login solo funciona en la versión local. Ejecuta <code>npm run dev</code> para usar todas las funciones.</p>
                        </div>
                    </div>
                )}

                <form className="login-form" onSubmit={handleLogin}>
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" placeholder="Tu correo electrónico" required disabled={isGitHubPages} />
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label htmlFor="password">Contraseña</label>
                            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                        </div>
                        <input type="password" id="password" placeholder="••••••••" required disabled={isGitHubPages} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={isGitHubPages}>Iniciar Sesión</button>
                </form>

                <div className="login-footer">
                    <p>¿No tienes una cuenta? <Link to="/contactos">Contáctanos</Link></p>
                    <Link to="/" className="back-home">Volver al inicio</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
