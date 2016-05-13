
/*CONTROLADOR DE CATALOGO O PRODUCTOS*/
app.controller('controllerproductos', ['$scope', 'Factory', '$http', function ($scope, Factory, $http) 
{

  $scope.OB_Productos_Cotizacion=[];
  $scope.Dato=[];

  $scope.FN_Consultar_Productos=function(){
    Factory.objeto.Consultar_Productos();
    $scope.Dato = Factory.objeto;
    console.log($scope.Productos);

  }



  $scope.FN_Control_Tareas_OB_Cotizacion=function($index, Bool_Productos_OB_Cotizacion){

   if(Bool_Productos_OB_Cotizacion==true){
    $scope.OB_Productos_Cotizacion.push($scope.Dato.OB_Productos[$index]);
    console.log($scope.OB_Productos_Cotizacion);
  }else if(Bool_Productos_OB_Cotizacion==false){
    console.log($index);
    $scope.OB_Productos_Cotizacion.splice($index);
    console.log($scope.OB_Productos_Cotizacion);
  }
}




 //  $scope.FN_Enviar_Cotizacion=function(){
 //   $http.post('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/registrar_cotizacion', $scope.OB_Productos_Cotizacion)
 //   .success(function(result, status){
 //    alert("Se pudo realizar la petición registrar cotización correctamente");
 //  })

 //   .error(function(result, status){
 //    console.log("No se pudo realizar la peticion registrar cotizacion");
 //    console.log(resutl, null, status);
 //  });

 // }

}]);



