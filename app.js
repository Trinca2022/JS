// Busco con fetch el json

const consultarProductos = async () => {

    const datos = await fetch('./Productos/productos.json')
    const productosExistentes = await datos.json()

    return productosExistentes
}

async function main() {
    let productosExistentes = await consultarProductos()



    let carritoDeProductos = []


    // Si el carrito ya tiene articulos en localStorage, los mantiene
    if (localStorage.getItem('carrito') !== null) {
        carritoDeProductos = JSON.parse(localStorage.getItem("carrito"))
    }

    const listaProductos = document.getElementById("listaProductosIndex");


    const mostrarProductos = () => {


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
                    <input type="number" min="0" max="150" value="0" id="input${productoExistente.id}">
                    <button class="boton-suma" id="botonSumar${productoExistente.id}">+</button>
                </div>
                <a class="btn btn-primary botonComprar" id="botonAgregar${productoExistente.id}">Añadir al carrito</a>
            </div>
            </div>
                             `
            listaProductos.appendChild(card);




            //Genero evento para botón comprar
            const botonAgregar = document.getElementById(`botonAgregar${productoExistente.id}`);
            const inputKilos = document.getElementById(`input${productoExistente.id}`)

            botonAgregar.addEventListener("click", () => { agregarAlCarrito(productoExistente.id, Number(inputKilos.value)) })
        
            const botonSumar = document.getElementById(`botonSumar${productoExistente.id}`)
            const botonRestar = document.getElementById(`botonRestar${productoExistente.id}`)
            
            botonSumar.addEventListener("click", () => {
                let valorInput = Number(inputKilos.value) 
                valorInput++
                inputKilos.value = Math.min(valorInput, 50).toString()
            })
        
            botonRestar.addEventListener("click", () => {
                let valorInput = Number(inputKilos.value) 
                valorInput--
                inputKilos.value = Math.max(0, valorInput).toString()
            })
        
        
        })

    }




    //Agrega al carrito
    const agregarAlCarrito = (id, cantidad) => {
        //Busca en el el carrito un producto cuyo id es igual al parámetro id. Si lo encuentra, lo guarda en productoListo
        const productoListo = carritoDeProductos.find(producto => producto.id === id)
        // si productoListo existe
        if (productoListo) {
            //localStorage.setItem("carrito", JSON.stringify(carritoDeProductos));
            //agrega al producto que encontré 1 kilo más
            //productoListo.kilo = cantidadInput.value;
            productoListo.kilo += cantidad;
            // no encontró el id del producto en el array: carritoDeProductos    
        } else {


            // busco dentro de los productos existentes el producto que tenga ese ID 
            const productoAgregado = productosExistentes.find(producto => producto.id === id);

            productoAgregado.kilo = cantidad
            // agrego el objeto encontrado (el producto con el id que quería) en el array carritoDeProductos
            carritoDeProductos.push(productoAgregado)

        }


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


