const carritoProductos = JSON.parse(localStorage.getItem("carrito"))

const carritoVacio = document.getElementById('carritoVacio')

const containerProductosDelCarrito = document.getElementById('containerProductosDelCarrito')


const renderizarCarrito = () => {

    if (localStorage.getItem('carrito') === null) {

        const h1 = document.createElement('h1')

        h1.innerText = 'Tu carrito está vacío'

        carritoVacio.appendChild(h1)

    }

    else {
        carritoProductos.forEach(carritoProducto => {
            //creo un item que va a ir en el carrito
            const itemEnCarrito = document.createElement('li')
            itemEnCarrito.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
            //creo una div que va a tener la info del producto del carrito
            const divItemCarrito = document.createElement('div')
            divItemCarrito.classList.add('ms-2', 'me-auto')
            //creo una div que va a contener el titulo del carrito
            const nombreProducto = document.createElement('div')
            nombreProducto.classList.add('fw-bold')
            nombreProducto.innerText = `Café ${carritoProducto.nombre}`

            divItemCarrito.appendChild(nombreProducto)
            itemEnCarrito.appendChild(divItemCarrito)
            containerProductosDelCarrito.appendChild(itemEnCarrito)


        });
    }
}

renderizarCarrito();




const vaciarCarrito = () => {
    localStorage.removeItem('carrito');

    containerProductosDelCarrito.parentElement.removeChild(containerProductosDelCarrito);

    renderizarCarrito()


}



/*

<li class="list-group-item d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
    <div class="fw-bold">Subheading</div>
    Content for list item
  </div>
  <span class="badge bg-primary rounded-pill">14</span>
</li>
<li class="list-group-item d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
    <div class="fw-bold">Subheading</div>
    Content for list item
  </div>
  <span class="badge bg-primary rounded-pill">14</span>
</li>
<li class="list-group-item d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
    <div class="fw-bold">Subheading</div>
    Content for list item
  </div>
  <span class="badge bg-primary rounded-pill">14</span>
</li>
</ol>}

*/
