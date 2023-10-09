const Paciente = require("../models/pacientes.js")
const Test = require("../models/Tets.js")
module.exports = async (req, res) => {
    var page = req.query.page;
    var Filtro = req.body.Tipo;

    if (page === undefined  ){

        if(Filtro ==="Nombre"){
            const pacientes = await Paciente.paginate({NombreCompleto:{$regex:req.body.busqueda}},{page:1,limit:10}) 
            const FiltroPaginado = true;
            const consulta = req.body.busqueda;
            var TotalPaginas = [];
            for (i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
      
            res.render('PanelPacientes',{pacientes,Logeado, role, FiltroPaginado,Filtro,consulta,TotalPaginas})

        }
        if(Filtro ==="Folio"){
            const pacientes = await Paciente.paginate({Folio:{$regex:req.body.busqueda}},{page:1,limit:10}) 
            const FiltroPaginado = true;
            const consulta = req.body.busqueda;
            var TotalPaginas = [];
            for (i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
      
            res.render('PanelPacientes',{pacientes,Logeado, role, FiltroPaginado,Filtro,consulta,TotalPaginas})

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
  console.log(pacientes)
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
            const pacientes = await Paciente.paginate({NombreCompleto:{$regex:consulta}},{page,limit:10}) 
            const FiltroPaginado = true;
            var TotalPaginas = [];
            for (i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
      
            res.render('PanelPacientes',{pacientes,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})

        }
        if(Filtro ==="Folio"){
            const pacientes = await Paciente.paginate({Folio:{$regex:consulta}},{page,limit:10}) 
            const FiltroPaginado = true;
            var TotalPaginas = [];
            for (i = 0; i < pacientes.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
      
            res.render('PanelPacientes',{pacientes,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})

        }

    }

}
