# Gestión de Categorías

## Descripción

Se ha implementado una vista completa de gestión de categorías que permite:

- **Listar** todas las categorías existentes
- **Crear** nuevas categorías
- **Editar** categorías existentes (solo el nombre)
- **No eliminar** categorías (por restricciones de negocio)

## Funcionalidades

### 1. Listado de Categorías
- Muestra una tabla con todas las categorías
- Incluye el nombre de la categoría
- Botón de acción para editar

### 2. Creación de Categorías
- Modal para agregar nuevas categorías
- Campo de nombre obligatorio
- Validación de formulario

### 3. Edición de Categorías
- Modal de edición con datos precargados
- Permite modificar solo el nombre
- Actualización en tiempo real

### 4. Restricción de Eliminación
- Las categorías no se pueden eliminar
- Esto es por diseño para mantener la integridad de los datos
- Las categorías pueden estar asociadas a movimientos y agrupadores

## Componentes Creados

### 1. `CategoryList` (`resources/js/components/custom/category-list.tsx`)
- Componente principal para el listado
- Maneja la lógica de edición
- Incluye modal de edición integrado
- No incluye funcionalidad de eliminación

### 2. `CategoryManagementContainer` (`resources/js/components/containers/category-management-container.tsx`)
- Contenedor que combina listado y creación
- Maneja el estado de refresco de datos
- Coordina los componentes de gestión

### 3. `CategoryManagementView` (`resources/js/components/custom/category-management-view.tsx`)
- Vista que se puede mostrar/ocultar
- Integrada en la aplicación principal
- Controlada por el contexto global

## Servicios Actualizados

### `categories.ts` (`resources/js/service/categories.ts`)
Se agregaron las siguientes funciones:
- `updateCategory()` - Actualizar categoría existente
- `getCategory()` - Obtener categoría específica

## Contexto Actualizado

### `refresh-context.tsx` (`resources/js/contexts/refresh-context.tsx`)
Se agregaron:
- `showCategoryManagement` - Estado para mostrar/ocultar la vista
- `setShowCategoryManagement` - Función para controlar la visibilidad

## Integración en la Aplicación

La vista de gestión de categorías se ha integrado en la aplicación principal (`App.tsx`) como un componente que se puede mostrar/ocultar. Se encuentra junto a la gestión de agrupadores.

## Uso

1. **Acceder a la gestión**: Hacer clic en "Gestionar Categorías" desde el sidebar
2. **Crear nueva categoría**: Hacer clic en "Agregar Categoría"
3. **Editar categoría**: Hacer clic en el ícono de editar en la tabla
4. **Cerrar vista**: Hacer clic en "Cerrar" en la parte superior

## Características Técnicas

- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Estado global**: Control centralizado de la visibilidad
- **Validación**: Validación de formularios en frontend y backend
- **Feedback visual**: Confirmaciones y mensajes de error
- **Refresco automático**: La lista se actualiza automáticamente después de operaciones
- **Sin eliminación**: Las categorías no se pueden eliminar por diseño

## API Endpoints Utilizados

- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría
- `PUT /api/categories/{id}` - Actualizar categoría
- `GET /api/categories/{id}` - Obtener categoría específica

## Estructura de Datos

```typescript
interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
```

## Diferencias con Gestión de Agrupadores

### Categorías:
- ✅ Listar
- ✅ Crear
- ✅ Editar (solo nombre)
- ❌ Eliminar (no permitido)

### Agrupadores:
- ✅ Listar
- ✅ Crear
- ✅ Editar (nombre y categorías)
- ✅ Eliminar

## Notas de Desarrollo

- Se mantiene la arquitectura existente del proyecto
- Se reutilizan componentes UI existentes
- Se sigue el patrón de servicios para las llamadas a la API
- Se implementa manejo de errores consistente
- Se mantiene la consistencia visual con el resto de la aplicación
- Se respeta la restricción de no eliminar categorías

## Consideraciones de Negocio

- Las categorías no se pueden eliminar porque pueden estar asociadas a:
  - Movimientos existentes
  - Agrupadores
  - Historial de transacciones
- Esto mantiene la integridad referencial de los datos
- Si es necesario "desactivar" una categoría, se puede implementar un campo de estado en el futuro 