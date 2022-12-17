// Defino constructor para las propiedades de los tipos de café



class CreadordeCafe {
    constructor(id, nombre, intensidad, precio, kilo, img) {
        this.id = id;
        this.nombre = nombre;
        this.intensidad = intensidad;
        this.precio = precio;
        this.kilo = kilo
        this.img = img
    }
}


//Genero array de productos
const productosExistentes = [];

let cafeColombiano = new CreadordeCafe(1, "Colombiano", "Suave", 1200, 1, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCHmSNxRgqyJj5djkB4IJ7iJJL8jD02CQIBg&usqp=CAU");
productosExistentes.push(cafeColombiano);
let cafeBrasilero = new CreadordeCafe(2, "Brasilero", "Medio", 1000, 1, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCHmSNxRgqyJj5djkB4IJ7iJJL8jD02CQIBg&usqp=CAU");
productosExistentes.push(cafeBrasilero);
let cafeItaliano = new CreadordeCafe(3, "Italiano", "Fuerte", 1500, 1, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCHmSNxRgqyJj5djkB4IJ7iJJL8jD02CQIBg&usqp=CAU");
productosExistentes.push(cafeItaliano);

// Constanste lista de productos de html


let carritoDeProductos = []



const listaProductos = document.getElementById("listaProductos");


const mostrarProductos = () => {
    productosExistentes.forEach(productoArray => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card" style="width: 15rem;">
            <img src="${productoArray.img}"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Café ${productoArray.nombre}</h5>
                <p class="card-text">Este café tiene una intensidad ${productoArray.intensidad} y cuesta $${productoArray.precio} el Kilo </p>
                <a href="#" class="btn btn-primary" id="boton${productoArray.id}">Agregar al Carrito</a>
            </div>
        </div>
        `
        listaProductos.appendChild(card);

        const boton = document.getElementById(`boton${productoArray.id}`);
        boton.addEventListener("click", () => { agregarAlCarrito(productoArray.id) })



    })
}

const agregarAlCarrito = (id) => {
    const productoListo = carritoDeProductos.find(productoArray => productoArray.id === id)
    if (productoListo) {
        productoListo.kilo++;
    } else {
        productoAgregado = productosExistentes.find(productoArray => productoArray.id === id);
        carritoDeProductos.push(productoAgregado)
    }
    console.log(carritoDeProductos)

    localStorage.setItem("carrito", JSON.stringify(carritoDeProductos));
}

mostrarProductos();






// Productos que aparecen en el carrito



//const containerProductosDelCarrito = document.getElementById("containerProductosDelCarrito")

/*const pruebaLoca = document.getElementById("pruebaLoca")

const prueba = document.createElement("h1")
prueba.innerHTML = "hola"

pruebaLoca.appendChild(prueba)

/*
const productosDelCarrito = () => {
    carritoDeProductos.forEach(productoArray => {
        const articuloCarrito = document.createElement("li");
        articuloCarrito.classList.add("list-group-item d-flex justify-content-between align-items-center");
        articuloCarrito.innerHTML = `
            Café ${productoArray.nombre}

        `
    })
    containerProductosDelCarrito.appendChild(articuloCarrito);
}

productosDelCarrito();
*/