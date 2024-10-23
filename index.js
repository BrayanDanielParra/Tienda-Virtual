


let carrito = [];

        // Cargar carrito desde localStorage al iniciar
        document.addEventListener('DOMContentLoaded', () => {
            const carritoGuardado = localStorage.getItem('carrito');
            if (carritoGuardado) {
                carrito = JSON.parse(carritoGuardado);
                console.log('Carrito cargado desde localStorage:', carrito); // Para verificar que se carga correctamente
            }
            actualizarCarrito();
        });

        function agregarProducto(id, nombre, precio) {
            const productoExistente = carrito.find(producto => producto.id === id);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }

            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }

        function eliminarProducto(id) {
            carrito = carrito.filter(producto => producto.id !== id);
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }

        function editarProducto(id, nuevaCantidad) {
            const producto = carrito.find(producto => producto.id === id);

            if (producto) {
                producto.cantidad = nuevaCantidad;
                if (producto.cantidad <= 0) {
                    eliminarProducto(id);
                }
            }

            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }

        function actualizarCarrito() {
            const listaCarrito = document.getElementById('lista-carrito');
            listaCarrito.innerHTML = '';

            if (carrito.length === 0) {
                listaCarrito.innerHTML = '<li>No hay productos en el carrito.</li>';
                return;
            }

            carrito.forEach(producto => {
                const item = document.createElement('li');
                item.textContent = `${producto.nombre} - ${producto.cantidad} x us $${producto.precio}`;

                // Botón para eliminar
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.classList.add('btn', 'btn-danger', 'ms-2');
                botonEliminar.onclick = () => eliminarProducto(producto.id);

                // Botón para editar
                const botonEditar = document.createElement('button');
                botonEditar.textContent = 'Editar';
                botonEditar.classList.add('btn', 'btn-warning', 'ms-2');
                botonEditar.onclick = () => {
                    const nuevaCantidad = parseInt(prompt('Ingresa la nueva cantidad:', producto.cantidad));
                    if (!isNaN(nuevaCantidad)) {
                        editarProducto(producto.id, nuevaCantidad);
                    }
                };

                item.appendChild(botonEliminar);
                item.appendChild(botonEditar);
                listaCarrito.appendChild(item);
            });
        }

        function guardarCarritoEnLocalStorage() {
            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log('Carrito guardado en localStorage:', carrito); // Para verificar que se guarda correctamente
        }