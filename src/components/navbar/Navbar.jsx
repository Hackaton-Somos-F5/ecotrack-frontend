import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">♻</span>
                    <span className="logo-text">ECO<strong>COLE</strong></span>
                </Link>

                <div className="navbar-links">
                    <a href="#quienes-somos">Quiénes somos</a>
                    <a href="#mision">Misión</a>
                    <a href="#como-reciclar">Cómo reciclar</a>
                </div>

                <div className="navbar-actions">
                    <Link to="/dashboard" className="btn-outline">Panel de control</Link>
                    <Link to="/register" className="btn-primary">Únete</Link>
                </div>
            </div>
        </nav>
    );
}
