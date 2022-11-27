// Defino constructor para las propiedades de los tipos de café
class CreadordeCafe {
    constructor(id, nombre, intensidad, precio, kilo) {
        this.id = id;
        this.nombre = nombre;
        this.intensidad = intensidad;
        this.precio = precio;
        this.kilo = kilo
    }
}

//Genero array de productos
const productosExistentes = [];

let cafeColombiano = new CreadordeCafe(1, "Colombiano", "Suave", 1200, 1);
productosExistentes.push(cafeColombiano);
let cafeBrasilero = new CreadordeCafe(2, "Brasilero", "Medio", 1000, 1);
productosExistentes.push(cafeBrasilero);
let cafeItaliano = new CreadordeCafe(3, "Italiano", "Fuerte", 1500, 1);
productosExistentes.push(cafeItaliano);


//Constantes
const precioEnvio = 250
const saludoFinal = "Graciasd, ¡hasta la próxima!"

// Genero función que resume las operaciones al seleccionar tipo de café
function preguntarKilos(creadoraDeCafe) {
    let kilos = Number(prompt(`Elegiste el Café ${creadoraDeCafe.nombre} que tiene una intensidad ${creadoraDeCafe.intensidad} y cuesta $${creadoraDeCafe.precio} el Kilo \n \n¿Cuántos Kilos querés comprar?`))
    let envio = Number(prompt("¿Lo querés con envío?\n El costo del envío es de $250\n(1)- Si\n(2)- No"))

    if (envio == 1) { alert("El precio final de tu compra es de $" + (creadoraDeCafe.precio * kilos + precioEnvio)) }
    else { alert("El precio final de tu compra es de $" + creadoraDeCafe.precio * kilos) }

    alert(saludoFinal)
}

// Genero función ligada a HTML para comenzar a comprar haciendo click
function compraCafe() {
    // Comienza a preguntar
    let mensaje = prompt('Hola, somos Café Don Julio, ¿cómo te llamás?')

    let respuestaCompra = Number(prompt("Bienvenido/a " + mensaje + "\n¿Querés comprar café?\n(1)- Si\n(2)- No"))

    // Continua preguntando si la respuesta no es correcta
    while (respuestaCompra < 1 || respuestaCompra > 2 || Number.isNaN(respuestaCompra)) {
        alert("Volvé a elegir 1 o 2")
        respuestaCompra = Number(prompt("Bienvenido/a " + mensaje + "\n¿Querés comprar café?\n(1)- Si\n(2)- No"))
    }

    // Si la respuesta es correcta hace lo siguiente:
    if (respuestaCompra === 1) {

        let quiereComprar = 0;

        quiereComprar = Number(prompt("¿Qué café te interesa comprar?\n(1)- Café Colombiano\n(2)- Café Brasilero\n(3)- Café Italiano"))

        while (quiereComprar < 1 || quiereComprar > 3 || Number.isNaN(quiereComprar)) {

            alert("Volvé a elegir 1, 2 o 3")
            quiereComprar = Number(prompt("¿Qué café te interesa comprar?\n(1)- Café Colombiano\n(2)- Café Brasilero\n(3)- Café Italiano"))
        }

        const cafeSeleccionado = productosExistentes.find((cafe => cafe.id === quiereComprar))

        if (quiereComprar === 1 || quiereComprar === 2 || quiereComprar === 3) {

            preguntarKilos(cafeSeleccionado);

        }

        else {
            alert("Gracias por tu visita")
        }
    }
}