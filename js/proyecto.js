

// Objeto que almacena los precios de cada producto según su tamaño
const preciosProductos = {
    "pastel con rosas rosadas": { "pequeno": 800, "mediano": 900, "grande": 1000 , "extra grande":1500 },
    "pastel de dos planta": { "pequeno": 500, "mediano": 650, "grande": 2500, "extra grande": 2800 },
    "pastel de boda rosa rojo": { "pequeno": 2800, "mediano": 3800, "grande": 4800 },
    "hello kitty": { "pequeno": 900, "mediano": 1000, "grande": 1350 },
    "winnie pooh": { "pequeno": 1000, "mediano": 1700, "grande": 2200 }
};

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []; // Cargar pedidos existentes al iniciar
    
function mostrarFormularioPedido(producto, precio) {
    document.getElementById("formulario-pedido").style.display = "block";
    document.getElementById("productoNombre").value = producto;
    document.getElementById("productoPrecio").value = precio;
}

function ocultarFormularioPedido() {
    document.getElementById("formulario-pedido").style.display = "none";
}

document.getElementById("formAgregarPedido").addEventListener("submit", function (e) {
    e.preventDefault();
    const producto = document.getElementById("productoNombre").value;
    const precio = parseFloat(document.getElementById("productoPrecio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const tamano = document.getElementById("tamano").value;

    pedidos.push({ producto, precio, cantidad, tamano });

    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    actualizarResumen();
    ocultarFormularioPedido();
});

function actualizarResumen() {
    const listaResumen = document.getElementById("listaResumen");
    const totalResumen = document.getElementById("totalResumen");
    listaResumen.innerHTML = "";
    let total = 0;

    pedidos.forEach((pedido, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${pedido.cantidad}x ${pedido.producto} (${pedido.tamano}) - L${(pedido.precio * pedido.cantidad).toFixed(2)}`;
        total += pedido.precio * pedido.cantidad;

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger btn-sm";
        btnEliminar.textContent = "X";
        btnEliminar.onclick = () => eliminarPedido(index);
        li.appendChild(btnEliminar);

        listaResumen.appendChild(li);
    });

    totalResumen.innerHTML = `<h4>Total: L${total.toFixed(2)}</h4>`;
}

function eliminarPedido(index) {
    pedidos.splice(index, 1);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    actualizarResumen();
}

function confirmarPedido() {
    if (pedidos.length === 0) {
        alert("No hay pedidos para confirmar.");
        return;
    }

    const resumen = {
        pedidos,
        total: pedidos.reduce((acc, pedido) => acc + pedido.precio * pedido.cantidad, 0),
    };

    localStorage.setItem("resumenPedido", JSON.stringify(resumen));
    alert("Pedido confirmado. Gracias por su compra.");
    pedidos = [];
    localStorage.removeItem("pedidos"); // Limpiar pedidos del localStorage
    actualizarResumen();
}

// Cargar pedidos y actualizar resumen al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    actualizarResumen();
});
//
document.addEventListener("DOMContentLoaded", function() {
    const botonEnviar = document.querySelector("#modalResena .btn-primary");
    const textareaResena = document.querySelector("#modalResena textarea");

    botonEnviar.addEventListener("click", function() {
        const reseña = textareaResena.value.trim();
        
        if (reseña) {
            // Aquí puedes enviar la reseña a un servidor usando fetch()
            console.log("Reseña enviada:", reseña);
            
            // Mostrar confirmación
            alert("¡Gracias por tu reseña!");
            
            // Limpiar el área de texto
            textareaResena.value = "";
            
            // Cerrar el modal
            $("#modalResena").modal("hide");
        } else {
            alert("Por favor, escribe una reseña antes de enviar.");
        }
    });
});

//

function cargarPedidos() {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos = pedidosGuardados;

    const listaPedidos = document.getElementById('listaPedidos');
    listaPedidos.innerHTML = '';
    pedidos.forEach((pedido) => {
        const pedidoItem = document.createElement('li');
        pedidoItem.classList.add('list-group-item');
        pedidoItem.textContent = `Pedido: ${pedido.cantidad} ${pedido.producto}(s) tamaño ${pedido.tamano} - Estado: ${pedido.estado} - Precio: L${(pedido.precio * pedido.cantidad).toFixed(2)}`;
        listaPedidos.appendChild(pedidoItem);
    });
    const totalElement = document.getElementById('total');
    const total = pedidos.reduce((sum, pedido) => sum + (pedido.precio * pedido.cantidad), 0);
    if (totalElement) {
        totalElement.innerHTML = `<h3>Total a pagar: L${total.toFixed(2)}</h3>`;
    }
}

// Cargar pedidos en la página de pedidos
if (document.getElementById('listaPedidos')) {
    cargarPedidos();
}

// Función para alternar la barra lateral
document.getElementById('sidebarToggle')?.addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
    content.style.marginLeft = content.style.marginLeft === "250px" ? "0" : "250px";
});
