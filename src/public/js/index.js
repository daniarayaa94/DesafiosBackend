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
        <td><button class="btn btn-danger" onclick="eliminarProd(${producto.id})">Eliminar</button></td>
        `;
    });
});


$("#guardarProd").click(function(){
    var datos = $("#formularioProd").serialize();
    $.ajax({
        data: datos,
        url: 'api/products',
        type: 'post',
        success: function (response){
            console.log("se envia el emit desde node")
        }
    });
});


function eliminarProd(id){
    $.ajax({
        url: '/api/products/'+id,
        type: 'delete',
        success: function (response){
            console.log("se envia el emit desde node")
        }
    });
}