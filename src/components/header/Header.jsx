import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';

export default function Header({ notificaciones = 1 }) {
    const { user, logout } = useAuth();
    const userName = user?.nombre || "Invitado";

    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavegar = (ruta) => {
        setMenuAbierto(false);
        navigate(ruta);
    };

    return (
        <header className="headerBar">
            <Link to="/" className="headerLogo">
                <div className="headerLogoCircle">
                    <div className="circleOverlay" />
                    <img src="/src/assets/logoSinFondo.png" alt="EcoCole Logo" className="logoImage" />
                </div>
                <div className="headerLogoText">
                    <span className="headerLogoName">ECO<strong>COLE</strong></span>
                    <span className="headerLogoTagline">Smart Resource Flow</span>
                </div>
            </Link>

            <div className="headerActions">
                {user && (
                    <button className="headerNotifBtn" aria-label="Notificaciones">
                        <svg className="headerBell" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C10.3 2 8.8 2.7 7.7 3.8C6.6 4.9 6 6.4 6 8V14L4 16V17H20V16L18 14V8C18 6.4 17.4 4.9 16.3 3.8C15.2 2.7 13.7 2 12 2Z" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            <path d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19" stroke="#555" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                        </svg>
                        {notificaciones > 0 && (
                            <span className="headerNotifDot">{notificaciones > 9 ? '9+' : notificaciones}</span>
                        )}
                    </button>
                )}

                <div className="avatarWrapper" ref={menuRef}>
                    <button
                        className={`headerAvatarBtn ${menuAbierto ? 'avatarActive' : ''}`}
                        aria-label="Perfil de usuario"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                    >
                        <div className="headerAvatar">
                            <svg viewBox="0 0 100 100" fill="none">
                                <circle cx="50" cy="50" r="50" fill="#C8A882" />
                                <path d="M20 85 Q20 65 50 65 Q80 65 80 85 L80 100 L20 100Z" fill="#4A90D9" />
                                <path d="M46 65 L50 80 L54 65Z" fill="#E8A020" />
                                <path d="M44 65 L50 72 L56 65" stroke="white" strokeWidth="2" fill="none" />
                                <ellipse cx="50" cy="42" rx="18" ry="21" fill="#D4956A" />
                                <path d="M32 36 Q32 20 50 20 Q68 20 68 36 Q68 30 50 28 Q32 30 32 36Z" fill="#5C3D1E" />
                                <path d="M32 36 Q30 42 32 44" stroke="#5C3D1E" strokeWidth="3" fill="none" />
                                <path d="M68 36 Q70 42 68 44" stroke="#5C3D1E" strokeWidth="3" fill="none" />
                                <rect x="34" y="40" width="12" height="9" rx="3" stroke="#333" strokeWidth="1.5" fill="rgba(150,200,255,0.3)" />
                                <rect x="54" y="40" width="12" height="9" rx="3" stroke="#333" strokeWidth="1.5" fill="rgba(150,200,255,0.3)" />
                                <line x1="46" y1="44" x2="54" y2="44" stroke="#333" strokeWidth="1.5" />
                                <line x1="34" y1="44" x2="31" y2="43" stroke="#333" strokeWidth="1.5" />
                                <line x1="66" y1="44" x2="69" y2="43" stroke="#333" strokeWidth="1.5" />
                                <path d="M49 50 Q47 54 50 55 Q53 54 51 50" fill="#C07850" opacity="0.6" />
                            </svg>
                        </div>
                    </button>

                    {menuAbierto && (
                        <div className="dropdownMenu">
                            {user ? (
                                <>
                                    <div className="dropdownUser">
                                        <span className="dropdownUserName">{userName}</span>
                                        <span className="dropdownUserRole">Administrador</span>
                                    </div>
                                    <div className="dropdownDivider" />
                                    <p className="dropdownSection">Formularios</p>
                                    <button className="dropdownItem" onClick={() => handleNavegar('/wasteForm')}>
                                        <span className="dropdownItemIcon">🗑️</span>
                                        <span>Gestión de Residuos</span>
                                    </button>
                                    <button className="dropdownItem" onClick={() => handleNavegar('/dashboard')}>
                                        <span className="dropdownItemIcon">📊</span>
                                        <span>Panel de Control</span>
                                    </button>
                                    <p className="dropdownSection">Cuenta</p>
                                    <button className="dropdownItem dropdownLogout" onClick={() => { logout(); navigate('/login'); }}>
                                        <span className="dropdownItemIcon">🚪</span>
                                        <span>Cerrar sesión</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="dropdownUser">
                                        <span className="dropdownUserName">Invitado</span>
                                        <span className="dropdownUserRole">Por favor, inicia sesión</span>
                                    </div>
                                    <div className="dropdownDivider" />
                                    <p className="dropdownSection">Cuenta</p>
                                    <button className="dropdownItem" onClick={() => handleNavegar('/login')}>
                                        <span className="dropdownItemIcon">👤</span>
                                        <span>Iniciar sesión</span>
                                    </button>
                                    <button className="dropdownItem" onClick={() => handleNavegar('/register')}>
                                        <span className="dropdownItemIcon">📝</span>
                                        <span>Registrarse</span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
