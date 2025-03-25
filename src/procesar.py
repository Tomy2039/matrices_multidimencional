import json
import os

# Ruta del archivo JSON
data_file = os.path.join(os.path.dirname(__file__), "../data/datos.json")

# Verificar si el archivo existe
if not os.path.exists(data_file):
    print("No hay datos registrados.")
    exit()

# Leer el archivo JSON generado por JavaScript
with open(data_file, "r") as file:
    personas = json.load(file)

# Mostrar la lista de personas
print("\n=== Lista de Personas Registradas ===")
for persona in personas:
    print(persona)
