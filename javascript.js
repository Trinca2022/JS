class CreadordeCafe {
    constructor(id, nombre, intensidad, precio, kilo) {
        this.id = id;
        this.nombre = nombre;
        this.intensidad = intensidad;
        this.precio = precio;
        this.kilo = kilo
    }
}

let cafeColombiano = new CreadordeCafe(1111, "Colombiano", "Suave", 1200, 1);
let cafeBrasilero = new CreadordeCafe(2222, "Brasilero", "Medio", 1000, 1);
let cafeItaliano = new CreadordeCafe(3333, "Italiano", "Fuerte", 1500, 1);

const precioEnvio = 250

const saludoFinal = "Gracias por tu compra, ¡hasta la próxima!"

function preguntarKilos(creadoraDeCafe) {
    let kilos = Number(prompt(`Elegiste el Café ${creadoraDeCafe.nombre} que tiene una intensidad ${creadoraDeCafe.intensidad} y cuesta $${creadoraDeCafe.precio} el Kilo \n \n¿Cuántos Kilos querés comprar?`))
    let envio = Number(prompt("¿Lo querés con envío?\n(1)- Si\n(2)- No"))

    if (envio == 1) { alert("El precio final de tu compra es de $" + (creadoraDeCafe.precio * kilos + precioEnvio)) }
    else { alert("El precio final de tu compra es de $" + creadoraDeCafe.precio * kilos) }

    alert(saludoFinal)
}


function compraCafe() {
    // Comienza a preguntar
    let mensaje = prompt('Hola, somos Café Don Julio, ¿cómo te llamás?')

    let respuestaCompra = Number(prompt("Bienvenido/a " + mensaje + "\n¿Querés comprar café?\n(1)- Si\n(2)- No"))

    // Continua preguntando si la respuesta no es correcta
    while (respuestaCompra < 1 || respuestaCompra > 2 || Number.isNaN(respuestaCompra)) {
        alert("Volvé a elegir 1 o 2")
        respuestaCompra = Number(prompt("Bienvenido/a " + mensaje + "\n¿Querés comprar café?\n(1)- Si\n(2)- No"))
    }

    if (respuestaCompra === 1) {

        let quiereComprar = 0;

        quiereComprar = Number(prompt("¿Qué café te interesa comprar?\n(1)- Café Colombiano\n(2)- Café Brasilero\n(3)- Café Italiano"))

        while (quiereComprar < 1 || quiereComprar > 3 || Number.isNaN(quiereComprar)) {

            alert("Volvé a elegir 1, 2 o 3")
            quiereComprar = Number(prompt("¿Qué café te interesa comprar?\n(1)- Café Colombiano\n(2)- Café Brasilero\n(3)- Café Italiano"))
        }



        switch (quiereComprar) {

            case 1:
                preguntarKilos(cafeColombiano)
                break;
            case 2:
                preguntarKilos(cafeBrasilero)
                break;
            case 3:
                preguntarKilos(cafeItaliano)
                break;

        }

    }

    else if (respuestaCompra === 2) { alert("Gracias por tu visita") }
    else {
        alert("Volvé a escribir tu respuesta")
    }
}