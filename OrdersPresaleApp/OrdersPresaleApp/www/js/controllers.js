angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*Objetos de datos*/
  // Objeto de datos con las variables necesarias para el debido logeo de los usuarios.
  $scope.Persona = {
    NombreDeUsuario:'',
    ContraseniaDeUsuario:''
  };

  $scope.OB_Establecimiento={Nombre_Establecimiento:'',Nombre_Encargado:'', Nit:'' ,Telfono_Establecimiento:'' ,Direccion_Establecimiento:'',Municipio_Establecimiento:'' , FK_ID_Usuario:''};
  $scope.OB_Registro_Usuario={Primer_Nombre:'', segundo_nombre:'', apellido:'', segundo_apellido:'', Departamento:'', Municipio:'', Telefono_celular:'', sexo:'', tipo_cliente:'',Correo_Electronico:'', Contrasenia:'',Imagen_Usuario:'', Fondo_Perfil_Usuario:'', Disponibilidad:'', Posee_Empresa:'', Estado_Cuenta:'',FK_ID_Rol:'', Nombre_Usuario:''};  
  $scope.Estado_Logeo=false;


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };



  $scope.FN_Login=function(){
   /*dirección para realizar la peticion en la web*/
   /*$http.get('http://opapp-octoapp.rhcloud.com/Controlador/consultar_cuenta') */


   /*Direccion para hacer la peticion local*/
   $http.get('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/consultar_cuenta')
   .success(function(result){
    $scope.Cuentas=result;
    var TamanioArray=$scope.Cuentas.length;

    for( var i = 0; i <=TamanioArray; i++ ) {
      if ($scope.Cuentas[i]['Nombre_Usuario']==$scope.Persona['NombreDeUsuario'] && $scope.Cuentas[i]['Contrasenia']==$scope.Persona['ContraseniaDeUsuario'] ){
       $scope.Estado_Logeo=true;
       $scope.Datos_Usuario=$scope.Cuentas[i];
       $scope.modal.hide();
       console.log($scope.Datos_Usuario);
       break;

     }else{
       $scope.Estado_Logeo=false; 
     }
   }
 })
   .error(function(res,status){
    alert("Error al consumir el servicio para Login");
  })
 };


 $scope.FN_Cerrar_Session=function(){
   $scope.Estado_Logeo=false;
   $scope.Persona = {
    NombreDeUsuario:'',
    ContraseniaDeUsuario:''
  };
  $scope.Datos_Usuario="";
  $state.go('app');
}


$scope.FN_Consultar_Cotizaciones=function(){
  $http.post('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/consultar_cotizaciones',$scope.Datos_Usuario)    
  .success(function(result){
    $scope.Cotizaciones=result;
    console.log($scope.Cotizaciones);
  })

  .error(function(result){
    alert("No se pudo consumir el Servicio")
  });


}

$scope.FN_Registrar_Usuario=function(){

  $http.post('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/registro_usuario', $scope.OB_Registro_Usuario)
  .success(function(result){
    console.log(result);
  })

  .error(function(result, status){
    console.log(result)

  });

}


})


.controller('controllerproductos', ['$http','$scope', function($http, $scope){

 /* $http.get('http://opapp-octoapp.rhcloud.com/Controlador/consultar_productos')  */  
 $http.get('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/consultar_productos')
 .success(function(result){
  $scope.Productos=result;
})

 .error(function(result, status){
  alert("Error al consumir el servicio para productos");
  console.log(result, null, status);
});
}])







