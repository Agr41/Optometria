var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();
const Test = require('../models/Tets'); // Asegúrate de que esta ruta es correcta
const Pacientes = require('../models/pacientes'); // Asegúrate de que esta ruta es correcta

module.exports = async (req, res) => {
    var idioma = req.session.language;

    const tests = await Test.find({});
    var hombres = 0;
    var mujeres = 0;
    var edadRange6To12 = 0;
    var edadRange13To17 = 0;
    var edadRange18OrMore = 0;
    let PersonasEmetropes = 0;
    let PersonasMiopes = 0;
    let PersonasHipermetropes = 0;
    let PersonasMA = 0;
    let PersonasHA = 0;
    let PersonasAstigmatismo = 0;

    let trc = 0;
    let gpd = 0;
    let cld = 0;
    let otherCitiesCount = 0;

    if (req.query.filtered !== "true") {
        // personas emétropes
        PersonasEmetropes = await Test.find({ ODReni: "EMETROPE", OIReni: "EMETROPE" }).countDocuments();
        // personas miopes
        PersonasMiopes = await Test.find({ ODReni: "MIOPIA", OIReni: "MIOPIA" }).countDocuments();
        // personas hipermétropes
        PersonasHipermetropes = await Test.find({ ODReni: "HIPERMETROPIA", OIReni: "HIPERMETROPIA" }).countDocuments();
        // personas con astigmatismo miopico
        PersonasMA = await Test.find({ ODReni: "Astigmatismo MIOPIA", OIReni: "Astigmatismo MIOPIA" }).countDocuments();
        // personas con astigmatismo hipermetropico
        PersonasHA = await Test.find({ ODReni: "Astigmatismo HIPERMETROPIA", OIReni: "Astigmatismo HIPERMETROPIA" }).countDocuments();
        // personas con astigmatismo emétropes
        PersonasAstigmatismo = await Test.find({ ODReni: "Astigmatismo EMETROPE", OIReni: "Astigmatismo EMETROPE" }).countDocuments();

        // Ciudad
        trc = await Pacientes.find({ ciudad: { $regex: /torre[oóÓóÓnN]*/i } }).countDocuments();
        gpd = await Pacientes.find({ ciudad: { $regex: /g[oóÓóÓ]mez\s*palacio?/i } }).countDocuments();
        cld = await Pacientes.find({ ciudad: { $regex: /lerdo/i } }).countDocuments();
        otherCitiesCount = await Pacientes.find({ ciudad: { $not: { $regex: /(Torre[oóÓóÓnN]*|G[oóÓóÓ]*mez\s*Palacio?|Lerdo)/i } } }).countDocuments();

        // Sexo
        hombres = await Pacientes.find({ sexo: "M" }).countDocuments();
        mujeres = await Pacientes.find({ sexo: "F" }).countDocuments();

        // Edades
        edadRange6To12 = await Pacientes.find({ Edad: { $gte: 6, $lte: 12 } }).countDocuments();
        edadRange13To17 = await Pacientes.find({ Edad: { $gte: 13, $lte: 17 } }).countDocuments();
        edadRange18OrMore = await Pacientes.find({ Edad: { $gte: 18 } }).countDocuments();
    } else {
        var arrayCond = [];
        if (req.query.hombres === "true") arrayCond.push({ sexo: "M" });
        if (req.query.mujeres === "true") arrayCond.push({ sexo: "F" });
        if (req.query.kids === "true") arrayCond.push({ Edad: { $gte: 6, $lte: 12 } });
        if (req.query.teens === "true") arrayCond.push({ Edad: { $gte: 13, $lte: 17 } });
        if (req.query.adults === "true") arrayCond.push({ Edad: { $gte: 18 } });

        const uri = 'mongodb+srv://NoLeDeboANadie:rickygei@noledeboanadie.i6p3wc9.mongodb.net/test';
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected to the database');

        const database = client.db('test');
        const patientsCollection = database.collection('pacientes');
        const testsCollection = database.collection('tests');

        const patientsQuery = { $and: arrayCond };
        const patientsResult = await patientsCollection.find(patientsQuery).toArray();
        const patientIds = patientsResult.map(patient => patient._id.toString());

        // personas emétropes
        PersonasEmetropes = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "EMETROPE", OIReni: "EMETROPE" });
        // personas miopes
        PersonasMiopes = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "MIOPIA", OIReni: "MIOPIA" });
        // personas hipermétropes
        PersonasHipermetropes = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "HIPERMETROPIA", OIReni: "HIPERMETROPIA" });
        // personas con astigmatismo miopico
        PersonasMA = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "Astigmatismo MIOPIA", OIReni: "Astigmatismo MIOPIA" });
        // personas con astigmatismo hipermetropico
        PersonasHA = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "Astigmatismo HIPERMETROPIA", OIReni: "Astigmatismo HIPERMETROPIA" });
        // personas con astigmatismo emétropes
        PersonasAstigmatismo = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "Astigmatismo EMETROPE", OIReni: "Astigmatismo EMETROPE" });

        // Ciudad
        trc = await Pacientes.find({ ciudad: { $regex: /torre[oóÓóÓnN]*/i }, $and: arrayCond }).countDocuments();
        gpd = await Pacientes.find({ ciudad: { $regex: /g[oóÓóÓ]mez\s*palacio?/i }, $and: arrayCond }).countDocuments();
        cld = await Pacientes.find({ ciudad: { $regex: /lerdo/i }, $and: arrayCond }).countDocuments();
        otherCitiesCount = await Pacientes.find({ ciudad: { $not: { $regex: /(Torre[oóÓóÓnN]*|G[oóÓóÓ]*mez\s*Palacio?|Lerdo)/i } }, $and: arrayCond }).countDocuments();

        // Sexo
        hombres = await Pacientes.find({ sexo: "M", $and: arrayCond }).countDocuments();
        mujeres = await Pacientes.find({ sexo: "F", $and: arrayCond }).countDocuments();

        // Edades
        edadRange6To12 = await Pacientes.find({ Edad: { $gte: 6, $lte: 12 }, $and: arrayCond }).countDocuments();
        edadRange13To17 = await Pacientes.find({ Edad: { $gte: 13, $lte: 17 }, $and: arrayCond }).countDocuments();
        edadRange18OrMore = await Pacientes.find({ Edad: { $gte: 18 }, $and: arrayCond }).countDocuments();
    }

    if (req.session.userId != null) {
        res.render('graficas', {
            title: 'Gráficas',
            Logeado: true,
            role: req.session.role,
            PersonasEmetropes,
            PersonasMiopes,
            PersonasHipermetropes,
            Astigmatismo: PersonasAstigmatismo,
            HA: PersonasHA,
            MA: PersonasMA,
            torreon: trc,
            gomez: gpd,
            lerdo: cld,
            otros: otherCitiesCount,
            masculino: hombres,
            femenino: mujeres,
            kids: edadRange6To12,
            teens: edadRange13To17,
            adults: edadRange18OrMore,
            idioma, 
            lng: req.session.language
        });
    } else {
        res.redirect('/LoginInicio');
    }
};
