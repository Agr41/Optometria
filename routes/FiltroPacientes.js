const Paciente = require("../models/pacientes.js")
const Test = require("../models/Tets.js")
const Joi = require('joi');
//    res.send(`<script>alert("¡Carácteres introducidos no permitidos!"); window.location.href='/PanelPacientes';</script>`)


module.exports = async (req, res) => {
    var page = req.query.page;
    var Filtro = req.body.Tipo;

    if (page === undefined  ){


        if(Filtro ==="Nombre"){

          
          try{
            const schema = Joi.object({
              busqueda: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).required()
            });
        
            // Paso 3: Validar
            const { error, value } = schema.validate({ busqueda: req.body.busqueda });
            if (error) {
              throw new Error('Caracteres no permitidos');
            }

            
            const consulta = value.busqueda; // Usar el valor validado

            const pacientes = await Paciente.paginate({ NombreCompleto: { $regex: consulta , $options: 'i' } }, { page: 1, limit: 10 });
            const FiltroPaginado = true;
            var TotalPaginas = [];
            for (i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
          
            res.render('PanelPacientes',{pacientes,Logeado, role, FiltroPaginado,Filtro,consulta,TotalPaginas})
          }catch(e){            
            res.send(`<script>alert("¡Carácteres introducidos no permitidos!"); window.location.href='/PanelPacientes';</script>`) 
        }
        }
        if (Filtro === "Folio") {
          try {
            // Definir el esquema de Joi para un folio numérico
            const schema = Joi.object({
              busqueda: Joi.number().required()  // Validates that the input is a number
            });
        

            var valor = parseFloat(req.body.busqueda)
            // Validar


            const { error, value } = schema.validate({ busqueda: valor});
            if (error) {
              throw new Error('Folio no válido');
            }
           

            const consulta = value.busqueda; // Usar el valor validado

            const pacientes = await Paciente.paginate({ Folio: consulta} , { page: 1, limit: 10 });
            const FiltroPaginado = true;
            var TotalPaginas = [];
            for (let i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
        
            res.render('PanelPacientes', { pacientes, Logeado, role, FiltroPaginado, Filtro, consulta, TotalPaginas });
          } catch (e) {
            res.send(`<script>alert("¡Folio no válido!"); window.location.href='/PanelPacientes';</script>`)
          }
        }
        if(Filtro ==="HIPERMETROPIA"){
          const tests = await Test.find({$or: [{ ODReni: "HIPERMETROPIA"},{ OIReni: "HIPERMETROPIA"} ]});
          const testIds = tests.map(test => test.id);
          
          const pacientes = await Paciente.paginate({ _id: { $in: testIds } }, { page: 1, limit: 10 });
          
          const FiltroPaginado = true;
          const consulta = req.body.busqueda;
          var TotalPaginas = [];
          for (i = 0; i < pacientes.totalPages; i++) {
            TotalPaginas.push(i + 1);
          }
    
          res.render('PanelPacientes',{pacientes,Logeado, role, FiltroPaginado,Filtro,consulta,TotalPaginas})

      }
    
      if(Filtro ==="EMETROPE"){
        const tests = await Test.find({$or: [{ ODReni: "EMETROPE" },{ OIReni: "EMETROPE" }]});
        const testIds = tests.map(test => test.id);
        
        const pacientes = await Paciente.paginate({ _id: { $in: testIds } }, { page: 1, limit: 10 });
        const FiltroPaginado = true;
        const consulta = req.body.busqueda;
        var TotalPaginas = [];
        for (i = 0; i < pacientes.totalPages; i++) {
          TotalPaginas.push(i + 1);
        }
  //console.log(pacientes)
        res.render('PanelPacientes',{pacientes,Logeado, role, FiltroPaginado,Filtro,consulta,TotalPaginas})

    }
    if(Filtro ==="MIOPIA"){
      const tests = await Test.find({
        $or: [
          { ODReni: "MIOPIA" },
          { OIReni: "MIOPIA" }
        ]
      });
            const testIds = tests.map(test => test.id);
      
      const pacientes = await Paciente.paginate({ _id: { $in: testIds } }, { page: 1, limit: 10 });      
      const FiltroPaginado = true;
      const consulta = req.body.busqueda;
      var TotalPaginas = [];
      for (i = 0; i < pacientes.totalPages; i++) {
        TotalPaginas.push(i + 1);
      }

      res.render('PanelPacientes',{pacientes,Logeado, role, FiltroPaginado,Filtro,consulta,TotalPaginas})

  }


    }else if (page != undefined){
        var Filtro = req.query.Filtro
        var consulta = req.query.consulta;

        if(Filtro ==="Nombre"){
          try {
            var pacientes01 = await Paciente.paginate({NombreCompleto:{$regex:consulta, $options: 'i' }},{page,limit:10}) 


            if( page > pacientes01.totalPages ){
              page =pacientes01.totalPages
            
              
            }
          

            const pacientes = await Paciente.paginate({NombreCompleto:{$regex:consulta, $options: 'i' }},{page,limit:10}) 
            //console.log("Pacientes paginado", pacientes)
            const FiltroPaginado = true;
            var TotalPaginas = [];
            var PaginaActual= pacientes.page;

            /*
            for (i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
            */
            if ((pacientes.totalPages - PaginaActual) >= 10) {
              // Si hay 10 o más páginas después de la página actual, empieza desde la página actual
              for (var i = PaginaActual - 1; i < PaginaActual - 1 + 10; i++) {
                  TotalPaginas.push(i + 1);
              }
          } else {
              // Si hay menos de 10 páginas después de la página actual, empieza más atrás para asegurar 10 páginas en total
              var inicio = Math.max(0, pacientes.totalPages - 10); // Asegúrate de no ir a un índice negativo
              for (var i = inicio; i < pacientes.totalPages; i++) {
                  TotalPaginas.push(i + 1);
              }
          }

            res.render('PanelPacientes',{pacientes,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})

          }catch(err){
            res.send(`<script>window.location.href='/PanelPacientes';</script>`)

          }

        }
        if(Filtro ==="Folio"){
          try {
            var pacientes01 = await Paciente.paginate({NombreCompleto:{$regex:consulta, $options: 'i' }},{page,limit:10}) 



            if( page > pacientes01.totalPages ){
              page =pacientes01.totalPages
            
              
            }
          

            const pacientes = await Paciente.paginate({Folio:{$regex:consulta}},{page,limit:10}) 
            const FiltroPaginado = true;
            var TotalPaginas = [];
            var PaginaActual= pacientes.page;

            /*
            for (i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
            */
            if ((pacientes.totalPages - PaginaActual) >= 10) {
              // Si hay 10 o más páginas después de la página actual, empieza desde la página actual
              for (var i = PaginaActual - 1; i < PaginaActual - 1 + 10; i++) {
                  TotalPaginas.push(i + 1);
              }
          } else {
              // Si hay menos de 10 páginas después de la página actual, empieza más atrás para asegurar 10 páginas en total
              var inicio = Math.max(0, pacientes.totalPages - 10); // Asegúrate de no ir a un índice negativo
              for (var i = inicio; i < pacientes.totalPages; i++) {
                  TotalPaginas.push(i + 1);
              }
          }
            res.render('PanelPacientes',{pacientes,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})

          }catch(err){
            res.send(`<script>window.location.href='/PanelPacientes';</script>`)

          }

        }
        if(Filtro ==="HIPERMETROPIA"){
          const tests = await Test.find({$or: [{ ODReni: "HIPERMETROPIA"},{ OIReni: "HIPERMETROPIA"} ]});
          const testIds = tests.map(test => test.id);
          
          const pacientes = await Paciente.paginate( {_id: { $in: testIds } },{page,limit:10}) 
          const FiltroPaginado = true;
          var TotalPaginas = [];
          for (i = 0; i < pacientes.totalPages; i++) {
            TotalPaginas.push(i + 1);
          }
    
          res.render('PanelPacientes',{pacientes,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})

      }
      if(Filtro ==="EMETROPE"){
        const tests = await Test.find({$or: [{ ODReni: "EMETROPE"},{ OIReni: "EMETROPE"} ]});
        const testIds = tests.map(test => test.id);
        
        const pacientes = await Paciente.paginate( {_id: { $in: testIds } },{page,limit:10})         
        const FiltroPaginado = true;
        var TotalPaginas = [];
        for (i = 0; i < pacientes.totalPages; i++) {
          TotalPaginas.push(i + 1);
        }
  
        res.render('PanelPacientes',{pacientes,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})

    }
    if(Filtro ==="MIOPIA"){
      const tests = await Test.find({$or: [{ ODReni: "MIOPIA"},{ OIReni: "MIOPIA"} ]});
      const testIds = tests.map(test => test.id);
      
      const pacientes = await Paciente.paginate( {_id: { $in: testIds } },{page,limit:10})          
      const FiltroPaginado = true;
      var TotalPaginas = [];
      for (i = 0; i < pacientes.totalPages; i++) {
        TotalPaginas.push(i + 1);
      }

      res.render('PanelPacientes',{pacientes,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})

  }

    }

}
