import { useState } from "react";
import { registerUser } from "../services/api";
import "../css/Register.css";
import {
  FaUser,
  FaEnvelope,
  FaSchool,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaCity,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    telefono: "",

    nombreDirector: "",
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

    if (!formData.nombreDirector.trim()) {
      newErrors.nombreDirector =
        "El nombre del director/docente es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "Debes aceptar los términos";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
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

      await registerUser(dataToSend);

      alert("Registro exitoso 🎉");

      setFormData({
        nombre: "",
        direccion: "",
        ciudad: "",
        telefono: "",
        nombreDirector: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
      });
    } catch (error) {
      setServerError("Error al registrar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Crea tu cuenta</h1>
      <p>Registra tu colegio y comienza a monitorear residuos</p>

      <form onSubmit={handleSubmit} noValidate>
        <h3>Datos del colegio</h3>

        <div className="form-group">
          <label>Nombre del colegio</label>
          <div className="input-wrapper">
            <FaSchool className="input-icon" />
            <input
              type="text"
              name="nombre"
              placeholder="Ej. Colegio Verde"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <div className="input-wrapper">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="direccion"
              placeholder="Calle Ejemplo 123"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          {errors.direccion && (
            <span className="error">{errors.direccion}</span>
          )}
        </div>

        <div className="form-group">
          <label>Ciudad</label>
          <div className="input-wrapper">
            <FaCity className="input-icon" />
            <input
              type="text"
              name="ciudad"
              placeholder="Barcelona"
              value={formData.ciudad}
              onChange={handleChange}
            />
          </div>
          {errors.ciudad && <span className="error">{errors.ciudad}</span>}
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <div className="input-wrapper">
            <FaPhone className="input-icon" />
            <input
              type="text"
              name="telefono"
              placeholder="+34 600 000 000"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          {errors.telefono && <span className="error">{errors.telefono}</span>}
        </div>

        <h3>Datos de acceso</h3>

        <div className="form-group">
          <label>Nombre del director/docente</label>
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="nombreDirector"
              placeholder="Ej. Harry Potter"
              value={formData.nombreDirector}
              onChange={handleChange}
            />
          </div>
          {errors.nombreDirector && (
            <span className="error">{errors.nombreDirector}</span>
          )}
        </div>

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

        <div className="form-group">
          <label>Confirmar contraseña</label>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="******"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
          />
          <label>
            Acepto los <span className="link">términos y condiciones</span> así
            como las políticas de privacidad.
          </label>
        </div>
        {errors.acceptedTerms && (
          <span className="error">{errors.acceptedTerms}</span>
        )}

        {serverError && <p className="server-error">{serverError}</p>}

        {serverError && <p className="server-error">{serverError}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="login-redirect">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="login-link">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;