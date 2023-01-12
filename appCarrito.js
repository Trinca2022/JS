//Traigo elementos del local storage
const carritoProductos = JSON.parse(localStorage.getItem("carrito"))
const importeTotal = JSON.parse(localStorage.getItem("precioTotal"))

//Traigo elementos del DOM
const carritoVacio = document.getElementById('carritoVacio')
const containerProductosDelCarrito = document.getElementById('containerProductosDelCarrito')


//Función que ejecuta un cartel de carrito vacío cuando no hay nada en el local storage, de lo contrario genera un HTML que resume la compra y muestra el total $
const renderizarCarrito = () => {

  if (localStorage.getItem('carrito') === null) {
    const h1 = document.createElement('h1')
    h1.setAttribute("class", "textoCarritoVacio")
    h1.innerText = 'Tu carrito está vacío'
    carritoVacio.appendChild(h1)
  }

  else {
    //Título de la lista
    const resumenCompra = document.createElement('li')
    resumenCompra.setAttribute("id", `resumenDeCompra`)
    resumenCompra.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
    resumenCompra.innerHTML = `<div class="ms-2 me-auto">
        <div class="fw-bold">Resumen de compra</div>
        `
    containerProductosDelCarrito.appendChild(resumenCompra)

    //Genero un li para cada producto añadido
    carritoProductos.forEach(carritoProducto => {
      //creo un item que va a ir en el carrito
      const itemEnCarrito = document.createElement('li')
      //aplico id dinámico a este li para después poder eliminarlo en evento onclick
      itemEnCarrito.setAttribute("id", `liProducto${carritoProducto.id}`)
      itemEnCarrito.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
      //creo una div que va a tener la info del producto del carrito
      const divItemCarrito = document.createElement('div')
      divItemCarrito.classList.add('ms-2', 'me-auto')
      //creo una div que va a contener el titulo del carrito
      const nombreProducto = document.createElement('div')
      nombreProducto.classList.add('fw-bold', 'divProductoCarrito')
      nombreProducto.innerHTML = `Café ${carritoProducto.nombre} - Cantidad: ${carritoProducto.kilo} - Precio: $${carritoProducto.kilo * carritoProducto.precio}
      <button id="botonEliminar${carritoProducto.id}" class="botonEliminarProducto">X</button>
      `

      divItemCarrito.appendChild(nombreProducto)
      itemEnCarrito.appendChild(divItemCarrito)
      containerProductosDelCarrito.appendChild(itemEnCarrito)

      //GENERO CON ID DINÁMICO UN BOTON QUE ELIMINA CADA PRODUCTO
      const botonEliminar = document.getElementById(`botonEliminar${carritoProducto.id}`);
      botonEliminar.addEventListener("click", () => {
        eliminarProducto(carritoProducto.id);
        //ELIMINO DEL HTML EL LI DEL PRODUCTO ELIMINADO. 
        const liProducto = document.getElementById(`liProducto${carritoProducto.id}`)
        containerProductosDelCarrito.removeChild(liProducto);


      })

    })

    //GENERO OTRO LI QUE ALOJA EL MONTO TOTAL A PAGAR
    const importeAPagar = document.createElement('li')
    importeAPagar.setAttribute("id", "idLiImporteAPagar")
    importeAPagar.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
    importeAPagar.innerHTML = `<div class="ms-2 me-auto">
        <div class="fw-bold">Importe Total: $${importeTotal}</div>
        `
    containerProductosDelCarrito.appendChild(importeAPagar)
  }
}

renderizarCarrito();



//Elimina un producto específico del carrito según el id pasado como parámetro
const eliminarProducto = (id) => {
  //Busca el producto con ese id y lo guarda en productoAEliminar
  const productoAEliminar = carritoProductos.find(producto => producto.id === id)
  //Localiza el índice de ese producto y lo guarda en indexABorrar
  const indexABorrar = carritoProductos.indexOf(productoAEliminar)
  //Elimina el producto que se encuentra en esa posición del índice
  carritoProductos.splice(indexABorrar, 1)
  //Remueve el localStorage el carrito y el precio calculado en index
  localStorage.removeItem('carrito');
  localStorage.removeItem('precioTotal');

  //Calculo un nuevo precio según los productos que ahora eliminé
  let importeCompra = 0;
  carritoProductos.forEach(producto => {
    importeCompra += producto.precio * producto.kilo;
  })

  //Guarda en storage el nuevo carrito y el nuevo precio total
  localStorage.setItem("precioTotal", JSON.stringify(importeCompra))
  localStorage.setItem("carrito", JSON.stringify(carritoProductos));

  //CON UN ID OBTENGO EL LI DEL PRECIO DEL DOM
  const liImporte = document.getElementById(`idLiImporteAPagar`);

  //REMUEVO ESE LI DEL HTML PORQUE TIENE EL MONTO TOTAL VIEJO
  containerProductosDelCarrito.removeChild(liImporte);

  //OBTENGO DEL LOCAL STORAGE EL PRECIO TOTAL NUEVO
  const importeTotal = JSON.parse(localStorage.getItem("precioTotal"))

  //GENERO UN NUEVO LI QUE ALOJA AL NUEVO PRECIO TOTAL
  const importeAPagar = document.createElement('li')
  importeAPagar.setAttribute("id", "idLiImporteAPagar")
  importeAPagar.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
  importeAPagar.innerHTML = `<div class="ms-2 me-auto">
        <div class="fw-bold">Importe Total: $${importeTotal}</div>
        `
  containerProductosDelCarrito.appendChild(importeAPagar)

  //ELIMINAR LI DE RESUMEN Y MONTO TOTAL CUANDO ES 0
  if (importeCompra == 0) {
    //OBTENGO LI DE RESUMEN DEL DOM PARA BORRARLO
    const resumenCompra = document.getElementById(`resumenDeCompra`)
    containerProductosDelCarrito.removeChild(resumenCompra);
    //OBTENGO LI DE PRECIO DEL DOM PARA BORRARLO
    const liImporte = document.getElementById(`idLiImporteAPagar`);
    containerProductosDelCarrito.removeChild(liImporte);
    //AVISO DE CARRITO VACÍO
    vaciarCarrito();
  }

}

//Chequeo si el carrito está vacío para que no genere dos veces el cartel: si está vacío, genera un string vacío.
const vaciarCarrito = () => {
  if (localStorage.getItem(`carrito`) === null) {
    const stringVacio = document.createElement("div");
    stringVacio.innerText = ``
  }
  //Si el storage tiene productos: vacía carrito del storage y elimina los productos mostrados del HTML
  else {
    localStorage.removeItem('carrito');
    containerProductosDelCarrito.parentElement.removeChild(containerProductosDelCarrito);
    renderizarCarrito();
  }
}


//Botón que finaliza la compra
const botonFinalizar = document.getElementById(`botonFinalizarCompra`);
botonFinalizar.addEventListener("click", () => {
  if (localStorage.getItem('carrito') === null) {
    //APLICO LIBRERÍA SWEET ALERT
    Swal.fire({
      title: '¡Tu carrito está vacío!',
      icon: 'error',
      timer: 1500
    })
  }
  else {
    Swal.fire({
      title: 'Gracias por tu compra, ¡hasta la próxima!',
      showConfirmButton: false,
      timer: 1500
    })
    vaciarCarrito();
  }
})

