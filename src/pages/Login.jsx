import { useState } from "react";
import { auth } from "../services/api";
import "../css/Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
        if (serverError) setServerError("");
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
            console.log("Intentando login con:", formData);
            const response = await auth.login(formData);
            console.log("Login exitoso:", response);

            // Normalizamos la respuesta para el contexto
            const userData = {
                id: response.colegio_id,
                nombre: response.colegio_nombre,
                email: formData.email
            };

            login(userData);
            alert(`✅ ¡Bienvenido ${response.colegio_nombre}! 👋`);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error en login:", error);
            setServerError(error.message || "Error al iniciar sesión. Verifica tus credenciales.");
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
                    <label>Correo electrónico *</label>
                    <div className="input-wrapper">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Contraseña *</label>
                    <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                {serverError && (
                    <div className="server-error" style={{ color: "#dc2626", background: "#fee2e2", padding: "12px", borderRadius: "8px", marginBottom: "15px", fontSize: "14px" }}>
                        ❌ {serverError}
                    </div>
                )}

                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? "⏳ Iniciando sesión..." : "Iniciar sesión"}
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
