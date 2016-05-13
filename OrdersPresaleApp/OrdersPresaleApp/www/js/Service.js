
/*FACTORY PARA GESTIONAR LOS DATOS Y OBJETOS DE FORMA GLOBAL PUDIENDO SER ACCEDIDO POR DIVERSOS CONTROLADORES*/
app.service('Factory', ['$http', function($http){
  var servicio={
    objeto:{OB_Productos:[],
      OB_Datos_Usuario:[],
      OB_Dll_Cotizacion:[],
      OB_Cotizaciones:[],
      Estado_Logeo:'',
      Cargar_Dll_Cotizacion:function(result){
       servicio.objeto.OB_Dll_Cotizacion=result;
       console.log(servicio.objeto.OB_Dll_Cotizacion);

     }
     ,
     Cargar_Estado_Logeo:function(Estado_Logeo){
      servicio.objeto.Estado_Logeo=Estado_Logeo;
      console.log(servicio.objeto.Estado_Logeo);
    },
    Cargar_Datos_Usuario:function(Datos_Usuario){
      servicio.objeto.OB_Datos_Usuario=Datos_Usuario;
      console.log(servicio.objeto.OB_Datos_Usuario);

    },
    Consultar_Productos:function(){

      $http.get('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/consultar_productos')

      .success(function(result){
        servicio.objeto.OB_Productos=result;
        console.log(servicio.objeto.OB_Productos);

      })

      .error(function(result, status){
        alert("Error al consumir el servicio para productos");
        console.log(result, null, status);
      });
    },
    FN_Consultar_Cotizaciones:function(Datos_Usuario){
      $http.post('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/consultar_cotizaciones',Datos_Usuario)    
      .success(function(result){
        servicio.objeto.OB_Cotizaciones=result;
        console.log(servicio.objeto.OB_Cotizaciones);

      })
      .error(function(result){
        alert("No se pudo consumir el Servicio")
      });
    }

  }

};

return servicio;
}])