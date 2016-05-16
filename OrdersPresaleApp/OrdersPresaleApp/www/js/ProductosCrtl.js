
/*CONTROLADOR DE CATALOGO O PRODUCTOS*/
app.controller('controllerproductos', ['$scope', 'Factory', '$http', function ($scope, Factory, $http) 
{

  $scope.OB_Productos_Cotizacion=[];
  $scope.Dato=[];
  $scope.OB_Datos_Usuario=[];
  $scope.BOOL_MODAL_ENVIAR_COT=false;


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


$scope.FN_Control_Modal_Info_Cot=function(){
  /*MOFIFICACIÓN DE VARIABLE PARA CONTRO DE MODAL QUE CONTIENE LA DIRECCION Y EL TELEFONO A DONDE SE VA A ENVIAR LA COTIZACION*/



console.log($scope.BOOL_MODAL_ENVIAR_COT);

}

$scope.FN_Enviar_Cotizacion=function(){

  $scope.OB_Datos_Usuario=Factory.objeto.OB_Datos_Usuario;
  console.log($scope.OB_Datos_Usuario);


  if ($scope.OB_Productos_Cotizacion.length > 0){
   $scope.FK_ID_Usuario=$scope.OB_Datos_Usuario['PK_ID_Usuario'];

   $http.post("http://localhost/Trabajos/OrdersPresaleWebService/Controlador/registrar_cotizacion")
   .success(function(result, status){
    alert("El servicio registrar cotización se pudo consumir");
  })
   .error(function(result, status){
    alert("Error al consumir el servicio registrar cotización");
    console.log(restult, null ,status);
  })


 }else{
  alert("Por favor seleccione productos antes de enviar");
}

}






}]);





