/*
const fs = require('fs');
const path = require('path');

// Directorio que contiene los archivos JSON
const directoryPath = 'C:\\Users\\mraar\\Desktop';

// Función para leer y transformar el JSON
function transformJsonFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
    } else {
      // Parsear el JSON
      const originalJsonArray = JSON.parse(data);

      // Transformar cada objeto JSON en el array
      const transformedJsonArray = originalJsonArray.map(originalJson => {
        // Crear un nuevo objeto con los campos requeridos fuera de CamposDeFormulario
        const transformedJson = {
          "_id": originalJson._id,
          "id": originalJson.todo.id,
          "FechaDelTest": {
            "$date": originalJson.todo.FechaDelTest
          },
          "Optometrista": originalJson.todo.Optometrista,
          "CamposDeFormulario": {},
          "__v": 0
        };

        // Excluir los campos que no van en CamposDeFormulario
        const excludedFields = ['FechaDelTest', 'Optometrista', 'id'];
        
        // Agregar todos los demás campos a CamposDeFormulario
        for (const [key, value] of Object.entries(originalJson.todo)) {
          if (!excludedFields.includes(key)) {
            transformedJson.CamposDeFormulario[key] = value;
          }
        }

        return transformedJson;
      });

      // Guardar el nuevo JSON en un nuevo archivo
      const newFilePath = path.join(directoryPath, `transformed-${path.basename(filePath)}`);
      fs.writeFile(newFilePath, JSON.stringify(transformedJsonArray, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file to disk: ${err}`);
        } else {
          console.log(`File has been transformed and saved as ${newFilePath}`);
        }
      });
    }
  });
}N

// Leer todos los archivos del directorio y aplicar la transformación
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log(`Unable to scan directory: ${err}`);
    return;
  }

  files.forEach(file => {
    // Asegúrate de procesar solo archivos .json
    if (path.extname(file) === '.json') {
      transformJsonFile(path.join(directoryPath, file));
    }
  });
});

*/
/*
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://NoLeDeboANadie:rickygei@noledeboanadie.i6p3wc9.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db(); // Agrega el nombre de tu base de datos si no es 'test'
        const collection = database.collection('tests');
        const result = await collection.deleteMany({"todo": {"$exists": true}});
        console.log(`${result.deletedCount} documents were deleted`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

*/
const mongoose = require('mongoose');
const fs = require('fs');
const Test = require('./models/Tets'); // Asegúrate de que la ruta al modelo es correcta
const ObjectId = mongoose.Types.ObjectId;

// Conexión a MongoDB
mongoose.connect('mongodb+srv://NoLeDeboANadie:rickygei@noledeboanadie.i6p3wc9.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

const loadAndInsertData = async () => {
    try {
      const filePath = 'C:\\Users\\mraar\\Desktop\\test.tests.json';
      const jsonData = fs.readFileSync(filePath);
      let data = JSON.parse(jsonData);
  
      // Convertir los datos antes de la inserción
      data = data.map(item => {
        // Convertir la fecha
        if (item.FechaDelTest && item.FechaDelTest['$date']) {
          item.FechaDelTest = new Date(item.FechaDelTest['$date']);
        }
  
        // Convertir el _id
        if (item._id && item._id['$oid']) {
          item._id = new ObjectId(item._id['$oid']);
        }
  
        return item;
      });
  
      // Inserta los datos en la base de datos
      await Test.insertMany(data);
      console.log('Datos insertados exitosamente');
    } catch (err) {
      console.error('Error insertando datos:', err);
    } finally {
      mongoose.disconnect();
    }
  };

// Ejecuta la función
loadAndInsertData();
