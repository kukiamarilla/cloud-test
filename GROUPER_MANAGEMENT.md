# Gestión de Agrupadores

## Descripción

Se ha implementado una vista completa de gestión de agrupadores que permite:

- **Listar** todos los agrupadores existentes
- **Crear** nuevos agrupadores
- **Editar** agrupadores existentes
- **Eliminar** agrupadores
- **Asignar categorías** a los agrupadores

## Funcionalidades

### 1. Listado de Agrupadores
- Muestra una tabla con todos los agrupadores
- Incluye el nombre del agrupador y las categorías asignadas
- Botones de acción para editar y eliminar

### 2. Creación de Agrupadores
- Modal para agregar nuevos agrupadores
- Campo de nombre obligatorio
- Selector múltiple de categorías
- Validación de formulario

### 3. Edición de Agrupadores
- Modal de edición con datos precargados
- Permite modificar nombre y categorías
- Actualización en tiempo real

### 4. Eliminación de Agrupadores
- Confirmación antes de eliminar
- Eliminación segura con feedback

## Componentes Creados

### 1. `GrouperList` (`resources/js/components/custom/grouper-list.tsx`)
- Componente principal para el listado
- Maneja la lógica de edición y eliminación
- Incluye modal de edición integrado

### 2. `GrouperManagementContainer` (`resources/js/components/containers/grouper-management-container.tsx`)
- Contenedor que combina listado y creación
- Maneja el estado de refresco de datos
- Coordina los componentes de gestión

### 3. `GrouperManagementView` (`resources/js/components/custom/grouper-management-view.tsx`)
- Vista que se puede mostrar/ocultar
- Integrada en la aplicación principal
- Botón para activar la gestión

### 4. `Badge` (`resources/js/components/ui/badge.tsx`)
- Componente UI para mostrar categorías
- Variantes de estilo disponibles

## Servicios Actualizados

### `grouper.ts` (`resources/js/service/grouper.ts`)
Se agregaron las siguientes funciones:
- `updateGrouper()` - Actualizar agrupador existente
- `deleteGrouper()` - Eliminar agrupador
- `getGrouper()` - Obtener agrupador específico

## Integración en la Aplicación

La vista de gestión de agrupadores se ha integrado en la aplicación principal (`App.tsx`) como un componente que se puede mostrar/ocultar. Se encuentra entre los controles de agregar movimientos/categorías y los gráficos de estadísticas.

## Uso

1. **Acceder a la gestión**: Hacer clic en el botón "Gestionar Agrupadores"
2. **Crear nuevo agrupador**: Hacer clic en "Agregar Agrupador"
3. **Editar agrupador**: Hacer clic en el ícono de editar en la tabla
4. **Eliminar agrupador**: Hacer clic en el ícono de eliminar en la tabla
5. **Cerrar vista**: Hacer clic en "Cerrar" en la parte superior

## Características Técnicas

- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Estado local**: Manejo de estado con React hooks
- **Validación**: Validación de formularios en frontend y backend
- **Feedback visual**: Confirmaciones y mensajes de error
- **Refresco automático**: La lista se actualiza automáticamente después de operaciones

## API Endpoints Utilizados

- `GET /api/groupers` - Listar agrupadores
- `POST /api/groupers` - Crear agrupador
- `PUT /api/groupers/{id}` - Actualizar agrupador
- `DELETE /api/groupers/{id}` - Eliminar agrupador
- `GET /api/categories` - Listar categorías (para el selector)

## Estructura de Datos

```typescript
interface Grouper {
    id: number;
    name: string;
    categories: Category[];
    created_at: string;
    updated_at: string;
}
```

## Notas de Desarrollo

- Se mantiene la arquitectura existente del proyecto
- Se reutilizan componentes UI existentes
- Se sigue el patrón de servicios para las llamadas a la API
- Se implementa manejo de errores consistente
- Se mantiene la consistencia visual con el resto de la aplicación 