const User = require("../models/Usuarios");
const mongoosePaginate = require('mongoose-paginate-v2');
const Test = require("../models/Tets");
const { MongoClient } = require('mongodb');
module.exports = async (req, res) => {

  console.log(req.body)
  var today = new Date();

  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();
  req.body.FechaDelTest = date;

  try {
    if (req.body.opcion=== '+1' && req.body.ODAsigmatismo1 !== 'on')
    {
      req.body.ODReni =  req.body.ODReniPlus1
      req.body.OIReni =  req.body.OIReniPlus1

    }
    if (req.body.opcion=== '+2'  && req.body.ODAsigmatismo1 !== 'on'){
      req.body.ODReni =  req.body.ODReniPlus2
      req.body.OIReni =  req.body.OIReniPlus2
    }

    if (req.body.opcion=== '+1' && req.body.ODAsigmatismo1 === 'on' )
    {
      req.body.ODReni = 'Astigmatismo' +' '+ req.body.ODReniPlus1

    }
    if (req.body.opcion=== '+1' && req.body.OIAsigmatismo1 === 'on' )
    {
      req.body.OIReni =  'Astigmatismo' +' '+ req.body.OIReniPlus1

    }
    if (req.body.opcion=== '+2' && req.body.ODAsigmatismo2 === 'on'){
      req.body.ODReni =  'Astigmatismo' +' '+ req.body.ODReniPlus2
    }
    if (req.body.opcion=== '+2' && req.body.OIAsigmatismo2 === 'on'){
      req.body.OIReni =  'Astigmatismo' +' '+ req.body.OIReniPlus2
    }

    const uri = 'mongodb+srv://NoLeDeboANadie:rickygei@noledeboanadie.i6p3wc9.mongodb.net/test'; // replace with your MongoDB connection string
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  
      await client.connect();
      console.log('Connected to the database');
  
  
  const database = client.db('test');
  const patientsCollection = database.collection('tests');
  // Step 1: Get patients above 18 and retrieve their _id
  const patientsResult = await patientsCollection.insertOne({
    todo:req.body}
    );

    console.log(req.body);
    //await Test.create(req.body);
    
    // Mostrar una alerta de éxito y redirigir a '/HomeSessions'
    res.send('<script>alert("Se guardaron los datos del paciente correctamente"); window.location.href="/HomeSessions";</script>');
  } catch (error) {
      console.error(error);
    // Mostrar una alerta de error y redirigir a '/HomeSessions'
    res.send('<script>alert("Hubo un error al guardar los datos del paciente"); window.location.href="/HomeSessions";</script>');

    
  }
};