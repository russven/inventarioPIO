let inventario = [];

// Función para agregar productos al inventario
function agregarProducto() {
    const productoInput = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');

    const nombre = productoInput.value.trim();
    const cantidad = parseInt(cantidadInput.value);

    // Verifica si los campos no están vacíos y la cantidad es válida
    if (nombre === '' || isNaN(cantidad) || cantidad < 0) {
        alert('Por favor, ingresa un nombre válido y una cantidad mayor o igual a cero.');
        return;
    }

    // Verificar si el producto ya existe
    const productoExistente = inventario.find(item => item.nombre === nombre);
    if (productoExistente) {
        alert(`El producto "${nombre}" ya existe. Actualiza su cantidad.`);
        return;
    }

    // Agregar el producto al inventario
    inventario.push({ nombre, cantidad });
    actualizarTabla();
    limpiarFormulario();
}

// Función para mostrar los productos en la tabla
function actualizarTabla() {
    const tbody = document.querySelector('#inventario tbody');
    tbody.innerHTML = ''; // Limpiar tabla

    inventario.forEach((producto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td class="actions">
                <button onclick="actualizarCantidad(${index})">Actualizar</button>
                <button class="delete" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(index) {
    const nuevaCantidad = parseInt(prompt('Ingrese la nueva cantidad:'));
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
        inventario[index].cantidad = nuevaCantidad;
        actualizarTabla();
    } else {
        alert('Por favor, ingresa una cantidad válida.');
    }
}

// Función para eliminar productos sin stock (cantidad = 0)
function eliminarProducto(index) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmacion) {
        inventario.splice(index, 1);  // Eliminar el producto sin necesidad de verificar cantidad
        actualizarTabla();
    }
}

// Función para limpiar el formulario de entrada
function limpiarFormulario() {
    document.getElementById('producto').value = '';
    document.getElementById('cantidad').value = '';
}
