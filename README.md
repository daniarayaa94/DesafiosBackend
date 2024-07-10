
# API de Productos y Carritos

Esta API permite gestionar productos y carritos de compra. A continuación, se detallan las rutas disponibles y cómo utilizarlas.

## Rutas de Productos

### Crear Producto

- **URL:** `POST /api/products`
- **Body (Form-encoded):**
  ```json
  {
    "title": "Nombre del producto",
    "description": "Descripción del producto",
    "code": "Código del producto",
    "price": "Precio del producto",
    "stock": "Cantidad en stock",
    "category": "Categoría del producto"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Producto agregado"
  }
  ```
![Crear Producto](./img/Captura de pantalla 2024-07-10 a la(s) 5.16.27 p. m..png)

### Modificar Producto

- **URL:** `PUT /api/products/:id`
- **Body (Form-encoded):**
  ```json
  {
    "title": "Nuevo nombre del producto",
    "description": "Nueva descripción del producto",
    "code": "Nuevo código del producto",
    "price": "Nuevo precio del producto",
    "stock": "Nueva cantidad en stock",
    "category": "Nueva categoría del producto"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Producto modificado"
  }
  ```
![Modificar Producto](./img/Captura de pantalla 2024-07-10 a la(s) 5.16.48 p. m..png)

### Obtener Productos

- **URL:** `GET /api/products?limit=12`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Nombre del producto",
      "description": "Descripción del producto",
      "code": "Código del producto",
      "price": "Precio del producto",
      "status": true,
      "stock": "Cantidad en stock",
      "category": "Categoría del producto"
    }
  ]
  ```
![Obtener Productos](./img/Captura de pantalla 2024-07-10 a la(s) 5.16.59 p. m..png)

### Obtener Producto por ID

- **URL:** `GET /api/products/:id`
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Nombre del producto",
    "description": "Descripción del producto",
    "code": "Código del producto",
    "price": "Precio del producto",
    "status": true,
    "stock": "Cantidad en stock",
    "category": "Categoría del producto"
  }
  ```
![Obtener Producto por ID](./img/Captura de pantalla 2024-07-10 a la(s) 5.17.19 p. m..png)

### Eliminar Producto

- **URL:** `DELETE /api/products/:id`
- **Response:**
  ```json
  {
    "message": "Producto eliminado"
  }
  ```
![Eliminar Producto](./img/Captura de pantalla 2024-07-10 a la(s) 5.17.32 p. m..png)

## Rutas de Carritos

### Crear Carrito

- **URL:** `POST /api/carts`
- **Body (JSON):**
  ```json
  {
    "products": [
      {
        "idp": 2,
        "quantity": 1
      },
      {
        "idp": 3,
        "quantity": 1
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Carrito agregado"
  }
  ```
![Crear Carrito](./img/Captura de pantalla 2024-07-10 a la(s) 5.18.16 p. m..png)

### Obtener Carritos

- **URL:** `GET /api/carts`
- **Response:**
  ```json
  [
    {
      "products": [
        {
          "idp": 2,
          "quantity": 1
        },
        {
          "idp": 3,
          "quantity": 1
        }
      ],
      "id": 2
    }
  ]
  ```
![Obtener Carritos](./img/Captura de pantalla 2024-07-10 a la(s) 5.18.25 p. m..png)

### Obtener Carrito por ID

- **URL:** `GET /api/carts/:id`
- **Response:**
  ```json
  {
    "products": [
      {
        "idp": 2,
        "quantity": 1
      },
      {
        "idp": 3,
        "quantity": 1
      }
    ],
    "id": 2
  }
  ```
![Obtener Carrito por ID](./img/Captura de pantalla 2024-07-10 a la(s) 5.19.09 p. m..png)

### Modificar Carrito

- **URL:** `POST /api/carts/:cid/product/:pid`
- **Response:**
  ```json
  {
    "message": "Carrito modificado"
  }
  ```
![Modificar Carrito](./img/Captura de pantalla 2024-07-10 a la(s) 5.19.26 p. m..png)

## Notas

- Asegúrate de que los productos existen antes de agregarlos a un carrito.
- La cantidad de productos en stock se actualiza automáticamente al agregarlos a un carrito.
- Los productos se agregan de uno en uno, incrementando la cantidad si ya existen en el carrito.

---

Este README proporciona una guía rápida para interactuar con la API de productos y carritos. Para más detalles, consulta la documentación del código.
