//código para hacer que el boton ppal del index vaya para abajo - ok
//las cards del index tienen el botón comprar - ok
//el html del producto seleccionado tiene select de molienda y cantidad y dos botones "Añadir producto al carrito" y "Ver carrito"
//Resumen del pedido + formulario
//usar librerías
//usar fetch para imágenes locales

const carritoProductos = JSON.parse(localStorage.getItem("carrito"))

const carritoVacio = document.getElementById('carritoVacio')

const containerProductosDelCarrito = document.getElementById('containerProductosDelCarrito')

const importeTotal = JSON.parse(localStorage.getItem("precioTotal"))

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
      nombreProducto.classList.add('fw-bold', 'divProductoCarrito')
      nombreProducto.innerText = `Café ${carritoProducto.nombre} - Cantidad: ${carritoProducto.kilo} - Precio: $${carritoProducto.kilo * carritoProducto.precio}`


      divItemCarrito.appendChild(nombreProducto)
      itemEnCarrito.appendChild(divItemCarrito)
      containerProductosDelCarrito.appendChild(itemEnCarrito)

    })

    const importeAPagar = document.createElement('li')
    importeAPagar.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
    importeAPagar.innerHTML = `<div class="ms-2 me-auto">
    <div class="fw-bold">Importe Total: $${importeTotal}</div>
    `

    containerProductosDelCarrito.appendChild(importeAPagar)




  }
}

renderizarCarrito();



//Vacía carrito del storage y elimina los productos mostrados
const vaciarCarrito = () => {
  localStorage.removeItem('carrito');

  containerProductosDelCarrito.parentElement.removeChild(containerProductosDelCarrito);

  renderizarCarrito()

}


const botonFinalizar = document.getElementById(`botonFinalizarCompra`);
botonFinalizar.addEventListener("click", () => {
  alert('¡Gracias por tu compra!');
  vaciarCarrito();
  location.href = `../index.html`
})
