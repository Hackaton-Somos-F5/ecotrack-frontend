# Como desarrollador Frontend quiero implementar la carga dinámica de datos en el dashboard utilizando la API de categorías y residuos para que la información mostrada sea real y actualizada según la base de datos.

## Criterios de Aceptación

- [ ] Las categorías del dashboard se cargan desde el endpoint `/categorias/`
- [ ] Cada tarjeta de categoría muestra el porcentaje de residuos calculado dinámicamente
- [ ] Los residuos se filtran por `colegio_id` y `categoria_id` usando el endpoint `/colegios/{colegio_id}/residuos`
- [ ] Si no hay datos, se maneja el estado de carga y error correctamente
- [ ] Los iconos y colores se mantienen consistentes con la respuesta del API (code, label, icon, color, bg)

## Tareas

- [ ] Crear servicio o funciones de fetch para obtener categorías y residuos
- [ ] Refactorizar `Dashboard.jsx` para eliminar el array estático `WASTE_TYPES`
- [ ] Implementar `useEffect` para cargar datos al montar el componente
- [ ] Desarrollar la lógica para calcular el porcentaje de residuos por categoría comparado con su umbral
- [ ] Verificar la correcta visualización de los datos dinámicos en la UI
