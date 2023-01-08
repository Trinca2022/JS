// Busco con fetch el json

const consultarProductos = async () => {
    const datos = await fetch('./Productos/productos.json')
    const productosExistentes = await datos.json()
    return productosExistentes
}

//const productosExistentes = consultarProductos().then(prod => console.log(prod));

/*consultarProductos().then(productosExistentes => {
    console.log(productosExistentes)
})*/



// Defino constructor para las propiedades de los tipos de café
/*
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

*/
//Genero array de productos

/*
let cafeColombiano = new CreadordeCafe(1, "Colombiano", "suave", 1200, 1, "./Imagenes/Colombiano.jpg");
productosExistentes.push(cafeColombiano);
let cafeBrasilero = new CreadordeCafe(2, "Brasilero", "media", 1000, 1, "./Imagenes/Brasilero.jpg");
productosExistentes.push(cafeBrasilero);
let cafeItaliano = new CreadordeCafe(3, "Italiano", "fuerte", 1500, 1, "./Imagenes/Italiano.jpg");
productosExistentes.push(cafeItaliano);
let cafePeruano = new CreadordeCafe(4, "Peruano", "equilibrada", 1300, 1, "./Imagenes/Peruano.jpg");
productosExistentes.push(cafePeruano);
*/
// Constante lista de productos de html


let carritoDeProductos = []


// Si el carrito ya tiene articulos en localStorage, los mantiene
if (localStorage.getItem('carrito') !== null) {
    carritoDeProductos = JSON.parse(localStorage.getItem("carrito"))
}

const listaProductos = document.getElementById("listaProductosIndex");


const mostrarProductos = () => {
    //USO EL .THEN PARA PODER UTILIZAR EL ARRAY DE JSON
    consultarProductos().then(productosExistentes => {
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
                <span class="pull-left">
                <button id="botonSuma${productoArray.id} "type="button" class="js-cart-quantity-btn cart-item-btn btn" onclick="LS.minusQuantity({{ item.id }}{% if not cart_page %}, true{% endif %})">
                </button>
                <span>
                    <input type="number" name="quantity[{{ item.id }}]" data-item-id="{{ item.id }}"  class="js-cart-quantity-input cart-item-input form-control"/>
                </span>
                <span class="js-cart-input-spinner cart-item-spinner" style="display: none;">
                </span>
                <button id="botonResta${productoArray.id} type="button" class="js-cart-quantity-btn cart-item-btn btn" onclick="LS.plusQuantity({{ item.id }}{% if not cart_page %}, true{% endif %})">
                </button>
                </span>
                <a href="#" class="btn btn-primary botonComprar" id="boton${productoArray.id}">Añadir al carrito</a>
            </div>
            </div>
                             `
            listaProductos.appendChild(card);


            //const cantidadInput = document.getElementById(`cantidad${productoArray.id}`); ESTO NO SALIÓ PORQUE PIDE USAR LA CONST

            /*//Genero evento para botón +
            const botonSumar = document.getElementById(`botonSuma${productoArray.id}`);
            botonSumar.addEventListener("click", () => {
                sumoCarrito(productoArray.id);
            });
     
                    //Genero evento para botón -
            const botonRestar = document.getElementById(`botonResta${productoArray.id}`);
            botonRestar.addEventListener("click", () => {
                restoCarrito(productoArray.id);
            })*/

            //Genero evento para botón comprar
            const boton = document.getElementById(`boton${productoArray.id}`);


            boton.addEventListener("click", () => { agregarAlCarrito(productoArray.id), totalCompra() })
        })
    })
}


/*//EJECUTO LO MISMO QUE agregarAlCarrito pero con los botones + y -
const sumoCarrito = (id) => {
const productoSumado = carritoDeProductos.find(producto => producto.id === id)
            if (productoSumado) {
                productoSumado.kilo++;
            }
}

const restoCarrito = (id) => {
const productoRestado = carritoDeProductos.find(producto => producto.id === id)
            if (productoRestado) {
                productoRestado.kilo--;
            }
}*/



//Agrega al carrito cuyo id es igual a id
const agregarAlCarrito = (id) => {
    //Busca en el el carrito un producto cuyo id es igual al parámetro id. Si lo encuentra, lo guarda en productoListo
    const productoListo = carritoDeProductos.find(producto => producto.id === id)
    // si productoListo existe
    if (productoListo) {
        //localStorage.setItem("carrito", JSON.stringify(carritoDeProductos));
        //agrega al producto que encontré 1 kilo más
        //productoListo.kilo = cantidadInput.value;
        productoListo.kilo++;
        // no encontró el id del producto en el array: carritoDeProductos    
    } else {

        //USO EL .THEN PARA PODER UTILIZAR EL ARRAY DE JSON
        consultarProductos().then(productosExistentes => {
            // busco dentro de los productos existentes el producto que tenga ese ID 
            const productoAgregado = productosExistentes.find(producto => producto.id === id);


            // agrego el objeto encontrado (el producto con el id que quería) en el array carritoDeProductos
            carritoDeProductos.push(productoAgregado)
        })
    }


    //Guarda en storage el producto
    localStorage.setItem("carrito", JSON.stringify(carritoDeProductos));
}



mostrarProductos();

const totalCompra = () => {
    let importeDeCompra = 0;
    carritoDeProductos.forEach(producto => {
        importeDeCompra += producto.precio * producto.kilo;
    })
    localStorage.setItem("precioTotal", JSON.importeDeCompra)
}

totalCompra();

/*<div style="width:130px">
                    <div class="input-group quantity">
                    <button id= "botonResta${productoArray.id}" type="button" class="btn btn-outline-secondary btn-sm minus">-<i class="fa fa-minus"></i></button>
                    <input id="frm-cantidad" class="text-end form-control" type="number" required="required" min="1" max="198" name="cantidad">
                    <button id= "botonSuma${productoArray.id}" type="button" class="btn btn-sm btn-outline-secondary plus">+<i class="fa fa-plus"></i></button>
                    </div>
                </div>*/