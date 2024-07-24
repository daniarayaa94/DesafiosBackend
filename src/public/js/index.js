const socket = io()


socket.on('actualizar_productos', (productos) => {
    console.log("asdasda")
    const tablaProductos = document.getElementById('productos').getElementsByTagName('tbody')[0];
    tablaProductos.innerHTML = '';

    productos.forEach((producto) => {
        const row = tablaProductos.insertRow();
        row.innerHTML = `
        <th scope="row">${producto.id}</th>
        <td>${producto.title}</td>
        <td>${producto.stock}</td>
        <td>$${producto.price}</td>
        `;
    });
});