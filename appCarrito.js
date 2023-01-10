
const carritoProductos = JSON.parse(localStorage.getItem("carrito"))

const carritoVacio = document.getElementById('carritoVacio')

const containerProductosDelCarrito = document.getElementById('containerProductosDelCarrito')

const importeTotal = JSON.parse(localStorage.getItem("precioTotal"))

//CONTAINER LI !!!!!!!!
//const divItemCarrito = document.getElementById('divItemCarrito')


//Función que ejecuta un cartel de carrito vacío cuando no hay nada en el local storage, de lo contrario genera un HTML que resume la compra y muestra el total $
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
      nombreProducto.innerHTML = `Café ${carritoProducto.nombre} - Cantidad: ${carritoProducto.kilo} - Precio: $${carritoProducto.kilo * carritoProducto.precio}
      <button id="botonEliminar${carritoProducto.id}">X</button>
      `

      divItemCarrito.appendChild(nombreProducto)
      itemEnCarrito.appendChild(divItemCarrito)
      containerProductosDelCarrito.appendChild(itemEnCarrito)

      const botonEliminar = document.getElementById(`botonEliminar${carritoProducto.id}`);
      botonEliminar.addEventListener("click", () => {
        //eliminarProducto(carritoProducto.id);
      })

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


/*
//Elimina un producto específico del carrito
const eliminarProducto = (id) => {
  const productoEliminado = carritoProductos.find(producto => producto.id === id)
  const indexBorrar = carritoProductos.indexOf(productoEliminado)
  //console.log(indexBorrar)
  carritoProductos.splice(indexBorrar, 1)
  // console.log(carritoProductos)
  localStorage.removeItem('carrito');
  localStorage.setItem("carrito", JSON.stringify(carritoProductos));
  console.log(carritoProductos)
  //localStorage.removeItem('precioTotal');

  let importeDeCompra = 0;
  carritoProductos.forEach(producto => {
    importeDeCompra += producto.precio * producto.kilo;
  })
  localStorage.setItem("precioTotal", JSON.stringify(importeDeCompra))

  //Guarda en storage el producto
  //localStorage.setItem("carrito", JSON.stringify(carritoProductos));
  // JSON.parse(localStorage.getItem("precioTotal"))
}*/


//Vacía carrito del storage y elimina los productos mostrados
const vaciarCarrito = () => {
  localStorage.removeItem('carrito');

  containerProductosDelCarrito.parentElement.removeChild(containerProductosDelCarrito);

  renderizarCarrito();

}


const botonFinalizar = document.getElementById(`botonFinalizarCompra`);
botonFinalizar.addEventListener("click", () => {
  Swal.fire({
    title: '¡Gracias por tu compra!',
    showConfirmButton: false,
    timer: 1000
  })
  vaciarCarrito();
  //location.href = `../index.html`

})
