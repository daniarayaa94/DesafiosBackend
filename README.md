
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
![Crear Producto](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img9.png)

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
![Modificar Producto](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img8.png)

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
![Obtener Productos](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img7.png)

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
![Obtener Producto por ID](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img6.png)

### Eliminar Producto

- **URL:** `DELETE /api/products/:id`
- **Response:**
  ```json
  {
    "message": "Producto eliminado"
  }
  ```
![Eliminar Producto](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img5.png)

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
![Crear Carrito](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img4.png)

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
![Obtener Carritos](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img3.png)

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
![Obtener Carrito por ID](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img2.png)

### Modificar Carrito

- **URL:** `POST /api/carts/:cid/product/:pid`
- **Response:**
  ```json
  {
    "message": "Carrito modificado"
  }
  ```
![Modificar Carrito](https://raw.githubusercontent.com/daniarayaa94/Entrega01/main/img/img1.png)

## Notas

- Asegúrate de que los productos existen antes de agregarlos a un carrito.
- La cantidad de productos en stock se actualiza automáticamente al agregarlos a un carrito.
- Los productos se agregan de uno en uno, incrementando la cantidad si ya existen en el carrito.

