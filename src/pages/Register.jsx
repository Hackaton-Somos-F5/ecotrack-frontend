import { useState, useEffect } from "react";
import { colegios } from "../services/api";
import "../css/Register.css";
import {
  FaEnvelope,
  FaSchool,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaCity,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre del colegio es obligatorio";
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria";
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = "La ciudad es obligatoria";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "Debes aceptar los términos y condiciones";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) {
      setServerError("");
    }
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
      const { confirmPassword, acceptedTerms, ...dataToSend } = formData;
      const userData = await colegios.register(dataToSend);

      const formattedUser = {
        id: userData.id || userData.colegio_id,
        nombre: userData.nombre || userData.colegio_nombre,
        email: formData.email
      };

      login(formattedUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en registro:", error);
      setServerError(error.message || "Error al registrar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="bg-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="register-container">
        <div className="register-card">
          <h1>Crea tu cuenta</h1>
          <p>Registra tu colegio y comienza a monitorear residuos<Link to="/" className="register-link">o volver al inicio</Link></p>

          <form className="register-form" onSubmit={handleSubmit} noValidate>
            <div className="form-scroll-area">
              <div className="form-section">
                <h3>Datos del colegio</h3>

                <div className="form-group">
                  <label>Nombre del colegio *</label>
                  <div className="input-wrapper">
                    <FaSchool className="input-icon" />
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Ej. Colegio Verde"
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Dirección *</label>
                    <div className="input-wrapper">
                      <FaMapMarkerAlt className="input-icon" />
                      <input
                        type="text"
                        name="direccion"
                        placeholder="Calle Ejemplo 123"
                        value={formData.direccion}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    {errors.direccion && <span className="error">{errors.direccion}</span>}
                  </div>

                  <div className="form-group">
                    <label>Ciudad *</label>
                    <div className="input-wrapper">
                      <FaCity className="input-icon" />
                      <input
                        type="text"
                        name="ciudad"
                        placeholder="Barcelona"
                        value={formData.ciudad}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    {errors.ciudad && <span className="error">{errors.ciudad}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Teléfono *</label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="+34 600 000 000"
                      value={formData.telefono}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {errors.telefono && <span className="error">{errors.telefono}</span>}
                </div>
              </div>

              <div className="form-divider"></div>

              <div className="form-section">
                <h3>Datos de acceso</h3>

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

                <div className="form-row">
                  <div className="form-group">
                    <label>Contraseña *</label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Mínimo 8 caracteres"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                  </div>

                  <div className="form-group">
                    <label>Confirmar contraseña *</label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Repite la contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="error">{errors.confirmPassword}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="checkbox-section">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  id="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label htmlFor="acceptedTerms">
                  Acepto los <span className="link">términos y condiciones</span>
                </label>
              </div>
              {errors.acceptedTerms && (
                <span className="error">{errors.acceptedTerms}</span>
              )}
            </div>

            {serverError && (
              <div className="server-error">
                ❌ {serverError}
              </div>
            )}

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "⏳ Registrando..." : "Crear cuenta"}
            </button>

            <p className="login-redirect">
              ¿Ya tienes cuenta? {" "}
              <Link to="/login" className="login-link">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;