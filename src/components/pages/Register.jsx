import { useState } from "react";
import { registerUser } from "../services/api";
import "../css/Register.css";
import { FaUser, FaEnvelope, FaSchool, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!formData.school.trim()) {
      newErrors.school = "El centro escolar es obligatorio";
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
      const { confirmPassword, ...dataToSend } = formData;

      await registerUser(dataToSend);

      alert("Registro exitoso 🎉");

      setFormData({
        fullName: "",
        email: "",
        school: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
      });
    } catch (error) {
      setServerError(
        typeof error === "string"
          ? error
          : "Error al registrar. Intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Crea tu cuenta</h1>
      <p>Únete a la red de colegios sostenibles</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Nombre completo</label>
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="Ej. Juan Pérez"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>
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
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Centro escolar</label>
          <div className="input-wrapper">
            <FaSchool className="input-icon" />
            <input
              type="text"
              name="school"
              placeholder="Nombre del centro"
              value={formData.school}
              onChange={handleChange}
            />
            {errors.school && <span className="error">{errors.school}</span>}
          </div>
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
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
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
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
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
