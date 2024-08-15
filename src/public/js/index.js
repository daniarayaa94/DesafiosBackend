const socket = io()


socket.on('actualizar_productos', (productos) => {
    /*const tablaProductos = document.getElementById('productos').getElementsByTagName('tbody')[0];
    tablaProductos.innerHTML = '';

    productos.forEach((producto) => {
        const row = tablaProductos.insertRow();
        row.innerHTML = `
        <th scope="row">${producto.id}</th>
        <td>${producto.title}</td>
        <td>${producto.stock}</td>
        <td>$${producto.price}</td>
        <td>${producto.category}</td>
        <td><button class="btn btn-danger" onclick="eliminarProd(${producto.id})">Eliminar</button></td>
        `;
    });*/
});

async function removeProduct(cartId, productId) {
    try {

        
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            location.reload();
        } else {
            const errorData = await response.json();
            console.error('Error al eliminar el producto:', errorData.message);
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

async function removeProductsCart(cartId) {
    try {
        const response = await fetch(`/api/carts/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Actualizar la vista del carrito
            location.reload();
        } else {
            const errorData = await response.json();
            console.error('Error al vaciar el carrito:', errorData.message);
        }
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
    }
}


 let addToCart = async (productId) =>{
    
    let cartId = localStorage.getItem('cartId');

    

    if (!cartId) {
        // Crear un nuevo carrito
        const response = await fetch('/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        cartId = data.cartId;
        localStorage.setItem('cartId', cartId);
    }

    // Agregar el producto al carrito
    await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const cartLink = document.getElementById('cart-link');
    cartLink.href = `/cart/${cartId}`;
    cartLink.style.display = 'flex';

    alert('Producto agregado al carrito');
}




function eliminarProd(id){
    $.ajax({
        url: '/api/products/'+id,
        type: 'delete',
        success: function (response){
            console.log("se envia el emit desde node")
        }
    });
}

  document.addEventListener('DOMContentLoaded', function() {
      const cartId = localStorage.getItem('cartId');
      
    if (cartId) {
        
        const cartLink = document.getElementById('cart-link');
        cartLink.href = `/cart/${cartId}`;
        cartLink.style.display = 'flex';
    }
});