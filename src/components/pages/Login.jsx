import { useState } from "react";
import { loginUser } from "../services/api";
import "../css/Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        }
        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setServerError("");

        try {
            const response = await loginUser(formData);

            // Normalizamos la respuesta para que coincida con la estructura del resto de la app
            const userData = {
                id: response.colegio_id,
                nombre: response.colegio_nombre,
                email: formData.email // El email lo tenemos del formulario
            };

            login(userData);
            alert("¡Bienvenido de nuevo! 👋");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error en login:", error);


            let errorMsg = "Error al iniciar sesión. Verifica tus credenciales.";

            if (error.detail && Array.isArray(error.detail)) {
                errorMsg = error.detail
                    .map(err => `${err.loc[err.loc.length - 1]}: ${err.msg}`)
                    .join(" | ");
            } else if (error.detail && typeof error.detail === "string") {
                errorMsg = error.detail;
            } else if (typeof error === 'string') {
                errorMsg = error;
            }

            setServerError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Inicia sesión</h1>
            <p>Accede a tu panel de control de EcoTrack</p>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label>Correo electrónico</label>
                    <div className="input-wrapper">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                {serverError && <p className="server-error">{serverError}</p>}

                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>

                <p className="register-redirect">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="register-link">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
