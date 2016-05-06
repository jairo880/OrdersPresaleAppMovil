var app = angular.module('starter.controllers', [])


/*FACTORY PARA GESTIONAR LOS DATOS Y OBJETOS DE FORMA GLOBAL PUDIENDO SER ACCEDIDO POR DIVERSOS CONTROLADORES*/
app.service('Factory', ['$http', function($http){
  var servicio={
    objeto:{OB_Productos:[],
      OB_Datos_Usuario:[],
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
        console.log(result);
        alert("Se pudo ejecutar la función");
      })
      .error(function(result){
        alert("No se pudo consumir el Servicio")
      });
    }

  }

};

return servicio;
}])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, Factory) {

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
  $scope.OB_Detalles_Cotizacion="";

  $scope.OB_Registro_Usuario={Primer_Nombre:'', segundo_nombre:'', apellido:'', segundo_apellido:'', Departamento:'', Municipio:'', Telefono_celular:'', sexo:'', tipo_cliente:'',Correo_Electronico:'', Contrasenia:'',Imagen_Usuario:'', Fondo_Perfil_Usuario:'', Disponibilidad:'', Posee_Empresa:'', Estado_Cuenta:'',FK_ID_Rol:'', Nombre_Usuario:'', PK_ID_Establecimiento:'', Nombre_Establecimiento:'',Nombre_Encargado:'',Nit:'',Telefono_Establecimiento:'',Direccion_Establecimiento:'',Municipio_Establecimiento:''};  
  $scope.Estado_Logeo=false;





  // console.log($scope.OB_Registro_Usuario);

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/Usuario/login.html', {
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
       break;

     }else{
       $scope.Estado_Logeo=false; 
     }
   }

   Factory.objeto.Cargar_Datos_Usuario($scope.Datos_Usuario);
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
  $scope.OB_Detalles_Cotizacion="";
  $scope.OB_Registro_Usuario={Primer_Nombre:'', segundo_nombre:'', apellido:'', segundo_apellido:'', Departamento:'', Municipio:'', Telefono_celular:'', sexo:'', tipo_cliente:'',Correo_Electronico:'', Contrasenia:'',Imagen_Usuario:'', Fondo_Perfil_Usuario:'', Disponibilidad:'', Posee_Empresa:'', Estado_Cuenta:'',FK_ID_Rol:'', Nombre_Usuario:'', PK_ID_Establecimiento:'', Nombre_Establecimiento:'',Nombre_Encargado:'',Nit:'',Telefono_Establecimiento:'',Direccion_Establecimiento:'',Municipio_Establecimiento:''};  
}


$scope.FN_Consultar_Cotizaciones=function(){

  Factory.objeto.FN_Consultar_Cotizaciones($scope.Datos_Usuario);


}

$scope.FN_Registrar_Usuario=function(){
 $http.post('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/registro_usuario', $scope.OB_Registro_Usuario)
 .success(function(result){
  console.log(result);
  console.log(result, null, status);

})

 .error(function(result, status){
  console.log(result)

});

}


$scope.FN_Detalles_Cotizacion=function($index){
  var indice = $index;
  $scope.FK_ID_Cotizacion_Usuario=$scope.Cotizaciones[indice]['PK_ID_Cotizacion_Usuario'];
  

  $http.post('http://localhost/Trabajos/OrdersPresaleWebService/Controlador/consultar_dll_cotizacion', $scope.FK_ID_Cotizacion_Usuario)

  .success(function(result){
    $scope.Obb_Detalles_Cotizacion=result;
    console.log($scope.Obb_Detalles_Cotizacion);
  })

  .error(function(result, status){
    console.log(result, null, status);

  });
}


})


/*CONTROLADOR DE CATALOGO O PRODUCTOS*/
app.controller('controllerproductos', ['$scope', 'Factory', function ($scope, Factory) 
{
  Factory.objeto.Consultar_Productos();


  $scope.Dato = Factory.objeto;
  console.log($scope.Productos);
}]);









