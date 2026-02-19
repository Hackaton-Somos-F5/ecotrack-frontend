# Como desarrollador Frontend quiero crear una funcionalidad para registrar nuevos residuos en el sistema a través de un modal interactivo, asegurando que los datos se guarden correctamente en el backend vinculados al colegio de la sesión actual.

## Criterios de Aceptación

- [x] El modal permite seleccionar una categoría de residuo válida obtenida del API.
- [x] Se validan los campos obligatorios antes del envío (`categoria_id`, `peso_kg`, `volumen_litros`, `aula`).
- [x] La petición se realiza utilizando el endpoint `POST /colegios/{colegio_id}/residuos`.
- [x] El `colegio_id` se obtiene dinámicamente de la sesión activa del usuario.
- [x] El cuerpo de la petición sigue el formato:
  ```json
  {
    "categoria_id": integer,
    "peso_kg": float,
    "volumen_litros": float,
    "aula": "string"
  }
  ```
- [x] Tras un registro exitoso (HTTP 201), el modal se cierra automáticamente.
- [x] Se muestra un mensaje de éxito o se actualiza la vista padre/dashboard para reflejar el nuevo dato.
- [x] Se gestionan los estados de carga (deshabilitar botones mientras se guarda) y errores del servidor.

## Tareas

- [x] Referenciar el servicio de API `residuos.registrar(colegio_id, data)` en el componente de modal.
- [x] Implementar la validación de tipos de datos (evitar pesos negativos o strings vacíos).
- [x] Configurar el componente `WasteModal` para que reciba una función `onSuccess` que refresque los datos del componente padre.
- [x] Asegurar que el modal esté centrado, sea responsivo y mantenga el diseño premium definido.
- [x] Pruebas de integración: Verificar que el residuo aparezca en el historial y afecte los umbrales del dashboard.
