// Busco con fetch el json
const consultarProductos = async () => {

    const datos = await fetch('./Productos/productos.json')
    const productosExistentes = await datos.json()

    return productosExistentes
}

//Genero una función con async await. Cuando ejecuta, guarda los productos del fetch en array productosExistentes
async function main() {
    let productosExistentes = await consultarProductos()

    let carritoDeProductos = []

    // Si el carrito ya tiene articulos en localStorage, los mantiene
    if (localStorage.getItem('carrito') !== null) {
        carritoDeProductos = JSON.parse(localStorage.getItem("carrito"))
    }

    //Traigo del DOM el div que aloja las cards
    const listaProductos = document.getElementById("listaProductosIndex");

    const mostrarProductos = () => {
        //Para cada producto existente genera una card
        productosExistentes.forEach(productoExistente => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = `
            <div class="card" style="width: 15rem;">
            <img src="${productoExistente.img}"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Café ${productoExistente.nombre}</h5>
                <p class="card-text">Este café tiene una intensidad ${productoExistente.intensidad} y cuesta $${productoExistente.precio} el Kilo </p>
                <div class="suma-resta">
                    <button class="boton-resta" id="botonRestar${productoExistente.id}">-</button>
                    <input class="inputKilos" type="number" min="1" max="150" value="1" id="inputKilos${productoExistente.id}">
                    <button class="boton-suma" id="botonSumar${productoExistente.id}">+</button>
                </div>
                <a class="btn btn-primary botonComprar" id="botonAgregar${productoExistente.id}">Añadir al carrito</a>
            </div>
            </div>
            `
            listaProductos.appendChild(card);

            //Genero evento para botón AÑADIR AL CARRITO

            //Traigo del DOM con id dinámico
            const botonAgregar = document.getElementById(`botonAgregar${productoExistente.id}`);
            const inputKilos = document.getElementById(`inputKilos${productoExistente.id}`)

            botonAgregar.addEventListener("click", () => {
                agregarAlCarrito(productoExistente.id, Number(inputKilos.value));

                //APLICO LIBRERÍA
                Toastify({
                    text: `Café ${productoExistente.nombre} añadido al carrito`,
                    duration: 3000,
                    gravity: "bottom",
                    stopOnFocus: true,
                    style: {
                        background: "white",
                        color: "black"
                    },
                    onClick: function () { }
                }).showToast();
            })

            //TRAIGO DEL DOM LOS BOTONES DEL INPUT CON ID DINÁMICO
            const botonSumar = document.getElementById(`botonSumar${productoExistente.id}`)
            const botonRestar = document.getElementById(`botonRestar${productoExistente.id}`)

            //EVENTOS PARA BOTONES + Y -

            botonSumar.addEventListener("click", () => {
                let valorInput = Number(inputKilos.value)
                valorInput++
                inputKilos.value = Math.min(valorInput, 50).toString()
            })

            botonRestar.addEventListener("click", () => {
                let valorInput = Number(inputKilos.value)
                valorInput--
                inputKilos.value = Math.max(1, valorInput).toString()
            })


        })

    }


    //Agrega al carrito
    const agregarAlCarrito = (id, cantidad) => {
        //Busca en el el carrito un producto cuyo id es igual al parámetro id. Si lo encuentra, lo guarda en productoListo
        const productoListo = carritoDeProductos.find(producto => producto.id === id)
        // si productoListo existe
        if (productoListo) {
            //agrega al producto que encontré 1 kilo más
            productoListo.kilo += cantidad;
            // no encontró el id del producto en el array: carritoDeProductos    
        } else {
            // busco dentro de los productos existentes el producto que tenga ese ID 
            const productoAgregado = productosExistentes.find(producto => producto.id === id);
            //Guardo en la propiedad kilos el valor de cantidad
            productoAgregado.kilo = cantidad
            // agrego el objeto encontrado (el producto con el id que quería) en el array carritoDeProductos
            carritoDeProductos.push(productoAgregado)

        }

        //Creo un importe de compra total según la cantidad de productos en mi carrito de productos y según su precio
        let importeDeCompra = 0;
        carritoDeProductos.forEach(producto => {
            importeDeCompra += producto.precio * producto.kilo;
        })
        localStorage.setItem("precioTotal", JSON.stringify(importeDeCompra))

        //Guarda en storage el producto
        localStorage.setItem("carrito", JSON.stringify(carritoDeProductos));
    }

    mostrarProductos();

}

main();


