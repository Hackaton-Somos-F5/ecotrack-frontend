import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Register from "../../pages/Register";
import { colegios } from "../../services/api";
import { AuthProvider } from "../../context/AuthContext";

vi.mock("../../services/api", () => ({
  colegios: {
    register: vi.fn(),
  },
}));

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthProvider>,
    );
  };

  it("renders form correctly", () => {
    renderComponent();

    expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ej. Colegio Verde"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Registrarse"));

    expect(
      await screen.findByText("El nombre del colegio es obligatorio"),
    ).toBeInTheDocument();
    expect(screen.getByText("La dirección es obligatoria")).toBeInTheDocument();
    expect(screen.getByText("Debes aceptar los términos y condiciones")).toBeInTheDocument();
  });

  it("shows error if passwords do not match", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Ej. Colegio Verde"), {
      target: { value: "Colegio Test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Calle Ejemplo 123"), {
      target: { value: "Calle Test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Barcelona"), {
      target: { value: "Barcelona" },
    });

    fireEvent.change(screen.getByPlaceholderText("+34 600 000 000"), {
      target: { value: "600000000" },
    });

    fireEvent.change(screen.getByPlaceholderText("ejemplo@correo.com"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Mínimo 8 caracteres"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByPlaceholderText("Repite la contraseña"), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    expect(
      await screen.findByText("Las contraseñas no coinciden"),
    ).toBeInTheDocument();
  });

  it("calls registerUser when form is valid", async () => {
    colegios.register.mockResolvedValue({});

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Ej. Colegio Verde"), {
      target: { value: "Colegio Test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Calle Ejemplo 123"), {
      target: { value: "Calle Test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Barcelona"), {
      target: { value: "Barcelona" },
    });

    fireEvent.change(screen.getByPlaceholderText("+34 600 000 000"), {
      target: { value: "600000000" },
    });

    fireEvent.change(screen.getByPlaceholderText("ejemplo@correo.com"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Mínimo 8 caracteres"), {
      target: { value: "12345678" },
    });

    fireEvent.change(screen.getByPlaceholderText("Repite la contraseña"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(colegios.register).toHaveBeenCalledTimes(1);
    });

    expect(colegios.register).toHaveBeenCalledWith({
      nombre: "Colegio Test",
      direccion: "Calle Test",
      ciudad: "Barcelona",
      telefono: "600000000",
      email: "test@test.com",
      password: "12345678",
    });
  });

  it("shows server error when API fails", async () => {
    colegios.register.mockRejectedValue(new Error("Error al registrar. Intenta nuevamente."));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Ej. Colegio Verde"), {
      target: { value: "Colegio Test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Calle Ejemplo 123"), {
      target: { value: "Calle Test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Barcelona"), {
      target: { value: "Barcelona" },
    });

    fireEvent.change(screen.getByPlaceholderText("+34 600 000 000"), {
      target: { value: "600000000" },
    });

    fireEvent.change(screen.getByPlaceholderText("ejemplo@correo.com"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Mínimo 8 caracteres"), {
      target: { value: "12345678" },
    });

    fireEvent.change(screen.getByPlaceholderText("Repite la contraseña"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("Registrarse"));

    expect(
      await screen.findByText(/Error al registrar/i),
    ).toBeInTheDocument();
  });
});
