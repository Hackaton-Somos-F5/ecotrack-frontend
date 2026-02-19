# Como administrador del colegio quiero poder visualizar y filtrar el historial de residuos de manera dinámica para realizar un seguimiento preciso del reciclaje por categorías.

## Criterios de Aceptación

- [x] Los botones de categorías se cargan dinámicamente desde el endpoint `GET /categorias/`.
- [x] Se muestra un botón inicial "Todos" para visualizar la lista completa de residuos.
- [x] La lista de residuos se obtiene dinámicamente desde el endpoint `GET /colegios/{colegio_id}/residuos`.
- [x] Al seleccionar un botón de categoría:
    - [x] Se resalta visualmente la categoría activa.
    - [x] La lista de residuos se filtra inmediatamente para mostrar solo los elementos que pertenecen a esa categoría.
- [x] La búsqueda por texto (aula o nombre de residuo) debe funcionar en tiempo real sobre la lista filtrada.
- [x] Se gestionan los estados de carga con un esqueleto (skeleton) o mensaje de "Cargando..." mientras se obtienen los datos.
- [x] Si una categoría seleccionada no tiene residuos registrados, se muestra un estado vacío (Empty State) con un mensaje amigable.

## Tareas Técnicas

- [x] Implementar la llamada a `api.categorias.getAll()` al montar el componente para poblar los filtros.
- [x] Implementar la llamada a `api.residuos.getByColegio(user.id)` para obtener el historial completo.
- [x] Crear un estado `filtro` (inicializado en "Todos") que almacene la categoría seleccionada.
- [x] Desarrollar la lógica de filtrado computado combinando el estado `filtro` y el estado `busqueda`.
- [x] Asegurar que las tarjetas de residuos utilicen los iconos y colores dinámicos devueltos por la API para cada categoría.
- [x] Verificar que el diseño grid responsivo (2-3 columnas en desktop, 1 en mobile) se mantenga correctamente tras la carga de datos.
