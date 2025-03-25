const readline = require("readline");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON donde se guardan los datos
const dataFile = path.join(__dirname, "../data/datos.json");

// Crear la interfaz de lectura
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let personas = []; // Lista de personas

// Función para registrar personas
function registrarPersona() {
    rl.question("Ingrese el nombre: ", (nombre) => {
        rl.question("Ingrese el apellido: ", (apellido) => {
            rl.question("Ingrese el DNI: ", (dni) => {
                let telefonos = [];

                function agregarTelefono() {
                    rl.question("Ingrese un teléfono (o Enter para terminar): ", (telefono) => {
                        if (telefono) {
                            telefonos.push(telefono);
                            agregarTelefono();
                        } else {
                            // Guardar los datos de la persona
                            personas.push([nombre, apellido, dni, telefonos]);

                            rl.question("¿Desea agregar otra persona? (s/n): ", (respuesta) => {
                                if (respuesta.toLowerCase() === "s") {
                                    registrarPersona();
                                } else {
                                    guardarYEnviarDatos();
                                }
                            });
                        }
                    });
                }

                agregarTelefono();
            });
        });
    });
}

// Guardar en archivo y llamar a Python
function guardarYEnviarDatos() {
    fs.writeFileSync(dataFile, JSON.stringify(personas, null, 4)); // Guardar en archivo JSON con formato

    // Llamar al script de Python
    const pythonProcess = spawn("python", ["procesar.py"]);

    pythonProcess.stdout.on("data", (data) => {
        console.log("\nSalida de Python:\n" + data.toString());
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error("Error en Python:\n" + data.toString());
    });

    pythonProcess.on("close", () => {
        rl.close();
    });
}

// Iniciar registro
registrarPersona();
