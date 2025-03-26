let pedidos = [];

document.getElementById('formAgregarPedido')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const producto = document.getElementById('productoNombre').value;
    const precio = parseFloat(document.getElementById('productoPrecio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const tamano = document.getElementById('tamano').value;
    
    const confirmacion = confirm(`¿Está seguro de agregar ${cantidad} ${producto}(s) tamaño ${tamano} al pedido?`);
    if (confirmacion) {
        agregarPedido({ producto, cantidad, tamano, precio });
        ocultarFormularioPedido();
        actualizarResumenPedido();
    }
});

function mostrarFormularioPedido(producto, precio) {
    document.getElementById('productoNombre').value = producto;
    document.getElementById('productoPrecio').value = precio;
    document.getElementById('formulario-pedido').style.display = 'block';
}

function ocultarFormularioPedido() {
    document.getElementById('formulario-pedido').style.display = 'none';
}

function agregarPedido(pedido) {
    // Verificar si ya existe un pedido del mismo producto y tamaño
    const pedidoExistente = pedidos.find(p => p.producto === pedido.producto && p.tamano === pedido.tamano);
    if (pedidoExistente) {
        // Actualizar cantidad y precio
        pedidoExistente.cantidad += pedido.cantidad;
        pedidoExistente.precio += pedido.precio * pedido.cantidad;
    } else {
        // Agregar nuevo pedido
        pedidos.push({ ...pedido, estado: 'En proceso' });
    }
    actualizarResumenPedido();
}

function actualizarResumenPedido() {
    const listaResumen = document.getElementById('listaResumen');
    listaResumen.innerHTML = '';
    pedidos.forEach((pedido, index) => {
        const pedidoItem = document.createElement('li');
        pedidoItem.classList.add('list-group-item');
        pedidoItem.textContent = `Pedido: ${pedido.cantidad} ${pedido.producto}(s) tamaño ${pedido.tamano} - Estado: ${pedido.estado} - Precio: $${(pedido.precio * pedido.cantidad).toFixed(2)}`;
        listaResumen.appendChild(pedidoItem);
    });
    actualizarTotal();
}

function actualizarTotal() {
    const total = pedidos.reduce((sum, pedido) => sum + (pedido.precio * pedido.cantidad), 0);
    const totalElement = document.getElementById('totalResumen');
    if (totalElement) {
        totalElement.innerHTML = `<h3>Total a pagar: $${total.toFixed(2)}</h3>`;
    }
}

function confirmarPedido() {
    alert('Pedido confirmado. Gracias por su compra.');
    // Guardar los pedidos en el almacenamiento local
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    // Redirigir a la página de pedidos para ver el resumen
    window.location.href = 'pedido.html';
}

function cargarPedidos() {
    // Cargar los pedidos desde el almacenamiento local
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos = pedidosGuardados;

    const listaPedidos = document.getElementById('listaPedidos');
    listaPedidos.innerHTML = '';
    pedidos.forEach((pedido, index) => {
        const pedidoItem = document.createElement('li');
        pedidoItem.classList.add('list-group-item');
        pedidoItem.textContent = `Pedido: ${pedido.cantidad} ${pedido.producto}(s) tamaño ${pedido.tamano} - Estado: ${pedido.estado} - Precio: $${(pedido.precio * pedido.cantidad).toFixed(2)}`;
        listaPedidos.appendChild(pedidoItem);
    });
    const totalElement = document.getElementById('total');
    const total = pedidos.reduce((sum, pedido) => sum + (pedido.precio * pedido.cantidad), 0);
    if (totalElement) {
        totalElement.innerHTML = `<h3>Total a pagar: $${total.toFixed(2)}</h3>`;
    }
}

// Cargar pedidos en la página de pedidos
if (document.getElementById('listaPedidos')) {
    cargarPedidos();
}
