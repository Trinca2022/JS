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

let precioEnvio = Number(250)

let mensaje = prompt('Hola, somos Café House, ¿cómo te llamás?')
let saludoFinal = "Gracias por tu compra, ¡hasta la próxima!"

let respuestaCompra = prompt("Bienvenido/a " + mensaje + "\n¿Querés comprar café?\n(1)- Si\n(2)- No")
if (respuestaCompra == 1) {

    let quiereComprar = Number(prompt("¿Qué café te interesa comprar?\n(1)- Café Colombiano\n(2)- Café Brasilero\n(3)- Café Italiano"))
    switch (quiereComprar) {
        case 1:
            let kilosColombiano = Number(prompt(`Elegiste el Café ${cafeColombiano.nombre} que tiene una intensidad ${cafeColombiano.intensidad} y cuesta $${cafeColombiano.precio} el Kilo \n \n¿Cuántos Kilos querés comprar?`))
            let envioColombiano = Number(prompt("¿Lo querés con envío?\n(1)- Si\n(2)- No"))

            if (envioColombiano == 1) { alert("El precio final de tu compra es de $" + (cafeColombiano.precio * kilosColombiano + precioEnvio)) }
            else { alert("El precio final de tu compra es de $" + cafeColombiano.precio * kilosColombiano) }

            alert(saludoFinal)

            break;
        case 2:
            let kilosBrasilero = Number(prompt(`Elegiste el Café ${cafeColombiano.nombre} que tiene una intensidad ${cafeColombiano.intensidad} y cuesta $${cafeColombiano.precio} el Kilo \n \n¿Cuántos Kilos querés comprar?`))
            let envioBrasilero = Number(prompt("¿Lo querés con envío?\n(1)- Si\n(2)- No"))


            if (envioBrasilero == 1) { alert("El precio final de tu compra es de $" + (cafeBrasilero.precio * kilosBrasilero + precioEnvio)) }
            else { alert("El precio final de tu compra es de $" + cafeBrasilero.precio * kilosBrasilero) }

            alert(saludoFinal)
            break;
        case 3:
            kilosItaliano = Number(prompt(`Elegiste el Café ${cafeItaliano.nombre} que tiene una intensidad ${cafeItaliano.intensidad} y cuesta $${cafeItaliano.precio} el Kilo \n \n¿Cuántos Kilos querés comprar?`))
            envioItaliano = Number(prompt("¿Lo querés con envío?\n(1)- Si\n(2)- No"))

            if (envioItaliano == 1) { alert("El precio final de tu compra es de $" + (cafeItaliano.precio * kilosItaliano + precioEnvio)) }
            else { alert("El precio final de tu compra es de $" + cafeItaliano.precio * kilosItaliano) }

            alert(saludoFinal)
            break;
        default:
            alert("Tenes que elegir 1, 2 o 3")

    }

}







else if (respuestaCompra == 2) { alert("Gracias por tu visita") }
else { alert("escribiste mal tu respuesta") }

