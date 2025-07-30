# API Documentation

## Endpoints

### Movimientos

#### GET /api/movements
Obtiene la lista de movimientos con filtros y paginación.

**Parámetros de consulta:**
- `date_from` (opcional): Fecha de inicio en formato YYYY-MM-DD
- `date_to` (opcional): Fecha de fin en formato YYYY-MM-DD
- `type` (opcional): Tipo de movimiento ('income' o 'expense')
- `category_id` (opcional): ID de la categoría
- `sort_by` (opcional): Campo para ordenar (default: 'date')
- `sort_order` (opcional): Orden de clasificación ('asc' o 'desc', default: 'desc')
- `per_page` (opcional): Número de elementos por página (default: 15)
- `page` (opcional): Número de página (default: 1)

**Ejemplos de uso:**
```
GET /api/movements?date_from=2024-01-01&date_to=2024-12-31
GET /api/movements?type=income&per_page=10
GET /api/movements?category_id=1&sort_by=amount&sort_order=desc
GET /api/movements?page=2&per_page=20
```

**Respuesta:**
```json
{
    "current_page": 1,
    "data": [
        {
            "id": 1,
            "description": "Salario",
            "amount": 5000,
            "date": "2024-01-15",
            "type": "income",
            "category_id": 1,
            "category": {
                "id": 1,
                "name": "Trabajo"
            }
        }
    ],
    "first_page_url": "http://localhost:8000/api/movements?page=1",
    "from": 1,
    "last_page": 5,
    "last_page_url": "http://localhost:8000/api/movements?page=5",
    "links": [...],
    "next_page_url": "http://localhost:8000/api/movements?page=2",
    "path": "http://localhost:8000/api/movements",
    "per_page": 15,
    "prev_page_url": null,
    "to": 15,
    "total": 75
}
```

#### GET /api/movements/statistics
Obtiene estadísticas de movimientos con filtros por fecha.

**Parámetros de consulta:**
- `date_from` (opcional): Fecha de inicio en formato YYYY-MM-DD
- `date_to` (opcional): Fecha de fin en formato YYYY-MM-DD
- `category_id` (opcional): ID de la categoría

**Ejemplos de uso:**
```
GET /api/movements/statistics?date_from=2024-01-01&date_to=2024-12-31
GET /api/movements/statistics?category_id=1
```

**Respuesta:**
```json
{
    "total_income": 15000,
    "total_expense": 8000,
    "balance": 7000,
    "total_movements": 25,
    "date_range": {
        "from": "2024-01-01",
        "to": "2024-12-31"
    }
}
```

### Categorías

#### GET /api/categories
Obtiene la lista de categorías con filtros y paginación.

**Parámetros de consulta:**
- `name` (opcional): Nombre de la categoría (búsqueda parcial)
- `sort_by` (opcional): Campo para ordenar (default: 'name')
- `sort_order` (opcional): Orden de clasificación ('asc' o 'desc', default: 'asc')
- `per_page` (opcional): Número de elementos por página (default: 15)
- `page` (opcional): Número de página (default: 1)

**Ejemplos de uso:**
```
GET /api/categories?name=trabajo
GET /api/categories?per_page=10&sort_by=created_at&sort_order=desc
```

**Respuesta:**
```json
{
    "current_page": 1,
    "data": [
        {
            "id": 1,
            "name": "Trabajo",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    ],
    "first_page_url": "http://localhost:8000/api/categories?page=1",
    "from": 1,
    "last_page": 2,
    "last_page_url": "http://localhost:8000/api/categories?page=2",
    "links": [...],
    "next_page_url": "http://localhost:8000/api/categories?page=2",
    "path": "http://localhost:8000/api/categories",
    "per_page": 15,
    "prev_page_url": null,
    "to": 15,
    "total": 30
}
```

## Notas importantes

1. **Fechas**: Las fechas deben estar en formato ISO 8601 (YYYY-MM-DD)
2. **Paginación**: Por defecto se muestran 15 elementos por página
3. **Ordenamiento**: Los campos válidos para ordenar son: 'id', 'description', 'amount', 'date', 'type', 'category_id', 'created_at', 'updated_at'
4. **Filtros de fecha**: Cuando se especifica `date_from`, se incluyen todos los movimientos desde el inicio del día. Cuando se especifica `date_to`, se incluyen todos los movimientos hasta el final del día.
5. **Búsqueda de categorías**: La búsqueda por nombre es parcial (usa LIKE %nombre%) 