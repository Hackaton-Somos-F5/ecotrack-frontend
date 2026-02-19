import { useState } from "react";
import { auth } from "../services/api";
import "../css/Register.css"; // Reutilizamos los estilos
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Login() {
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

            const result = await auth.login(formData);

            console.log("Login exitoso:", result);

            // Guardar en localStorage
            localStorage.setItem("colegio", JSON.stringify(result));

            alert(`✅ ¡Bienvenido ${result.colegio_nombre}!`);

            // Redirigir al dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error("Error en login:", error);
            setServerError(
                error.message || "Credenciales incorrectas. Verifica tu email y contraseña."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h1>Iniciar sesión</h1>
            <p>Accede a tu panel de control de residuos</p>

            <form onSubmit={handleSubmit} noValidate>
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
                            placeholder="Tu contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                {serverError && (
                    <div
                        className="server-error"
                        style={{
                            color: "#dc2626",
                            background: "#fee2e2",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "15px",
                            fontSize: "14px",
                        }}
                    >
                        ❌ {serverError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "⏳ Entrando..." : "Iniciar sesión"}
                </button>

                <p className="login-redirect">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="login-link">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;