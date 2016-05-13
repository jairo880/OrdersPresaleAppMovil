
/*CONTROLADOR DE CATALOGO O PRODUCTOS*/
app.controller('controllerproductos', ['$scope', 'Factory', '$http', function ($scope, Factory, $http) 
{

  $scope.OB_Productos_Cotizacion=[];
  $scope.Dato=[];
  $scope.OB_Datos_Usuario=[];


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




$scope.FN_Enviar_Cotizacion=function(){

  $scope.OB_Datos_Usuario=Factory.objeto.OB_Datos_Usuario;
  console.log($scope.OB_Datos_Usuario);

  if ($scope.OB_Productos_Cotizacion.length > 0){
    $scope.FK_ID_Usuario=$scope.OB_Datos_Usuario['PK_ID_Usuario'];
    console.log($scope.FK_ID_Usuario);

  }else{
    alert("Por favor seleccione productos antes de enviar");
  }

}

}]);



