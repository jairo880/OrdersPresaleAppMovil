
app.controller( 'App_OrdersPresale_Principal',  [ '$timeout', '$ionicModal','$scope', 'Fabrica', '$http','$localStorage','$sessionStorage', function ( $timeout,$ionicModal,$scope, Fabrica, $http,$localStorage,$state,$sessionStorage ) 
{


  $scope.AOBJ_Detalles_Cotizacion="";

  $scope.AOBJ_Registro_Usuario={

    Primer_Nombre:'',
    segundo_nombre:'',
    apellido:'',
    segundo_apellido:'',
    Departamento:'',
    Municipio:'',
    Telefono_celular:'',
    sexo:'',
    tipo_cliente:'',
    Correo_Electronico:'',
    Contrasenia:'',
    Imagen_Usuario:'',
    Fondo_Perfil_Usuario:'',
    Disponibilidad:'',
    Posee_Empresa:'',
    Estado_Cuenta:'',
    FK_ID_Rol:'',
    Nombre_Usuario:'',
    PK_ID_Establecimiento:'',
    Nombre_Establecimiento:'',
    Nombre_Encargado:'',
    Nit:'',
    Telefono_Establecimiento:'',
    Direccion_Establecimiento:'',
    Municipio_Establecimiento:''
  };  




  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl( 'templates/Usuario/login.html', {
    scope: $scope
  }).then( function( modal) {
    $scope.modal = modal;
  } );

  // Triggered in the login modal to close it
  $scope.FN_Cerrar_Login = function( ) {
    $scope.modal.hide(  );
  };

  // Open the login modal
  $scope.FN_Desplegar_Login = function( ) {
    $scope.modal.show(  );
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function( ) {
    console.log( 'Doing login', $scope.loginData );

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout( function( ) {
      $scope.FN_Cerrar_Login(  );
    }, 1000 );
  };

  $scope.Persona = 
  {
    Contrasenia:  "",
    Usuario_Nombre: " "

  };

      // Booleano para identificar si el usuario esta logeado
      $scope.Estado_Logeo = false;
      //_* PARA LOGIN
      $scope.BL_Login_Recup = true;

      

      //_* FUNCION PARA  INCIIAR SESION DE UN USUARIO
      $scope.FN_Iniciar_Sesion = function( Form_Data )
      {

        $http.post('http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Iniciar_Sesion',  Form_Data  )
        .success(function( Respuesta ){
          var ResultadoFuncion = Respuesta;
          if( ResultadoFuncion == 'Cuenta_Cancelada' )
          {
            $scope.FN_Confirmacion_Alerta( 4,0,false,'¿Tu cuenta se encuntra inhabilitada deseas habilitarla de nuevo?' );
          }
          if( ResultadoFuncion != false && ResultadoFuncion != 'Cuenta_Cancelada' )
            //_* EL CTRL RETORNA UN BOOL, SI ESTE ES TRUE EJECUTA LA FUNCION MENSAJE
          {
            //_* GUARDO LOS DATOS DE LA CUENTA DEL USUARIO PARA IMPRIMIRLOS EN LA VISTA, ESTA VARIABLE SE ECUENTRA EN LA FABRICA
            //_* LOS DATOS QUE SE GUARDAN SON DE LAS TALBAS CUENTA, CLIENTE, EMPLEADO Y ESTABLECIMIENTO, DEPENDIENDO DEL TIPO DE LOGIN QUE SE REALICE
            Fabrica.objeto.AOBJ_Datos_Usuario = Respuesta;


            $scope.Persona.Contrasenia = '';
            $scope.Persona.Usuario_Nombre ='';
            $scope.Estado_Logeo = true;
            $scope.Mensaje = "Bienvenido " + " " + Fabrica.objeto.AOBJ_Datos_Usuario[0].Nombre_Usuario;
            $scope.FN_Crear_Mensaje( $scope.Mensaje,100, 'Negro');
            $scope.FN_Cerrar_Login();

          }
          if( ResultadoFuncion == false )
            //_* EL CTRL RETORNA UN BOOL, SI ESTE ES TRUE EJECUTA LA FUNCION MENSAJE
          {
            $scope.Mensaje = "No se pudo Inciar Sessión, Verifique que sus datos sean correctos";
            $scope.FN_Crear_Mensaje( $scope.Mensaje,200, 'Error');


          }
          if( Fabrica.objeto.AOBJ_Datos_Usuario[0].FK_ID_Rol == 1)
          {
            window.location = url;
          }
        })
        .error(function ( Respuesta , status ) {
          console.error( Respuesta,status );
        });
      };

      $scope.FN_Cerrar_Sesion = function(){
        $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Cerrar_Sesion' )
        .success(function( Respuesta ){
          var ResultadoFuncion = Respuesta;
          if ( ResultadoFuncion == 'true' ){

            $scope.Estado_Logeo = false;
            var Datos_Defecto =
            [{
              Nombre_Usuario: 'Usuario',
              Imagen_Usuario: 'https://imageshack.com/i/pod8w5v9p',
              Fondo_Perfil_Usuario: 'https://imageshack.com/i/plrv0nSqj',
              Estado_Cuenta: 'En uso',
              Disponibilidad: 'Activo',
              PK_ID_Usuario: '0',
              Correo_Electronico: '',
              FK_ID_Rol: 5,
              //_* DATOS DE LA TABLA CLIENTE Y/O EMPLEADO
              PK_ID_Usuario_Persona: '',
              FK_ID_Cuenta: '',
              Nombre: '',
              Segundo_Nombre: '',
              Apellido: '',
              Segundo_Apellido:'',
              Departamento: '',
              Municipio:'',
              Fecha_Nacimiento:'',
              Telefono_Celular:'',
              Sexo:'',
              Tipo_Cliente: '',
              //_* DATOS DE LA TABLA ESTABLECIMIENTO PARA LOS DATOS DEL CLIENTE
              PK_ID_Establecimiento: '',
              Nombre_Establecimiento: '',
              Nombre_Encargado: '',
              Nit: '',
              Telefono_Establecimiento: '',
              Direccion_Establecimiento: '',
              Municipio_Establecimiento: '',
              FK_ID_Usuario: ''
            }];
            Fabrica.objeto.AOBJ_Datos_Usuario = Datos_Defecto;
            //_* ELIMINO LOS PRODUCTOS QUE HALLA TENIDO AGREGADOS EN LA ORDEN DEL LOCALSTORAGE
            delete $localStorage.Datos_Productos;
            /*Si el resultado del controlador es verdadero lo que quiere decir que destruyó la sesion correctamente*/
            $scope.Mensaje="La sessión se cerró correctamente";
            $scope.FN_Crear_Mensaje($scope.Mensaje,100, 'Finalizado');
            $scope.FN_Capturar_Datos_Usuario_Iniciado();
            $scope.FN_Cerrar_Login();
          }
          if(ResultadoFuncion=='false'){
            $scope.Mensaje="No se pudo cerrar Sessión";
            $scope.FN_Crear_Mensaje($scope.Mensaje,100, 'Error');
          }
        })
        .error(function( Respuesta,status ){
          console.error( Respuesta,status);
        });
      };
      $scope.FN_Capturar_Datos_Usuario_Iniciado = function ()
      {
        $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Capturar_Datos_Usuario_Iniciado' )
        .success(function ( Respuesta ) {
          var Respuesta_Accion = ( Respuesta );
          if(Respuesta_Accion == 'Cuenta_Cancelada')
          {
            $scope.FN_Cerrar_Sesion();
          }
          if( Respuesta_Accion != 'false' )
          {


            Fabrica.objeto.AOBJ_Datos_Usuario= Respuesta ;



          }
          if( Respuesta_Accion == 'false' )
          {
            var Datos_Defecto =
            [{
              Nombre_Usuario: 'Usuario',
              Imagen_Usuario: 'https://imageshack.com/i/pod8w5v9p',
              Fondo_Perfil_Usuario: 'https://imageshack.com/i/plrv0nSqj',
              Estado_Cuenta: 'Activo',
              Disponibilidad: 'Activo',
              PK_ID_Usuario: 0,
              Correo_Electronico: '',

              //_* DATOS DE LA TABLA CLIENTE Y/O EMPLEADO
              FK_ID_Rol: 5,
              PK_ID_Usuario_Persona: '',
              FK_ID_Cuenta: '',
              Nombre: '',
              Segundo_Nombre: '',
              Apellido: '',
              Segundo_Apellido:'',
              Departamento: '',
              Municipio:'',
              Telefono_Celular:'',
              Sexo:'',
              Tipo_Cliente: '',
              //_* DATOS DE LA TABLA ESTABLECIMIENTO PARA LOS DATOS DEL CLIENTE
              PK_ID_Establecimiento: '',
              Nombre_Establecimiento: '',
              Nombre_Encargado: '',
              Nit: '',
              Telefono_Establecimiento: '',
              Direccion_Establecimiento: '',
              Municipio_Establecimiento: '',
              FK_ID_Usuario: 5
            }];
            Fabrica.objeto.AOBJ_Datos_Usuario = Datos_Defecto;
            console.log(Fabrica.objeto.AOBJ_Datos_Usuario);
          }
        })
        .error(function ( Respuesta, status ) {
          console.error( 'error', Respuesta, status );
        });
      };
    //   $scope.FN_Cerrar_Session=function(  )
    //   {
    //    $scope.Estado_Logeo=false;

    //    Fabrica.objeto.AOBJ_Cotizaciones = [];
    //    Fabrica.objeto.AOBJ_Dll_Cotizacion=[];
    //    $scope.datos_Usuario="";
    //    $scope.AOBJ_Detalles_Cotizacion="";
    //    $scope.AOBJ_Registro_Usuario={

    //     Primer_Nombre:'',
    //     segundo_nombre:'',
    //     apellido:'',
    //     segundo_apellido:'',
    //     Departamento:'',
    //     Municipio:'',
    //     Telefono_celular:'',
    //     sexo:'',
    //     tipo_cliente:'',
    //     Correo_Electronico:'',
    //     Contrasenia:'',
    //     Imagen_Usuario:'',
    //     Fondo_Perfil_Usuario:'',
    //     Disponibilidad:'',
    //     Posee_Empresa:'',
    //     Estado_Cuenta:'',
    //     FK_ID_Rol:'',
    //     Nombre_Usuario:'',
    //     PK_ID_Establecimiento:'',
    //     Nombre_Establecimiento:'',
    //     Nombre_Encargado:'',
    //     Nit:'',
    //     Telefono_Establecimiento:'',
    //     Direccion_Establecimiento:'',
    //     Municipio_Establecimiento:''
    //   };


    //   Fabrica.objeto.Cargar_Estado_Logeo( $scope.Estado_Logeo );
    //   $state.go( 'app.informacion' );

    // }


    $scope.FN_Consultar_Cotizaciones=function(  )
    {

      Fabrica.objeto.FN_Consultar_Cotizaciones( $scope.Datos_Usuario );

      $scope.dato = Fabrica.objeto;
  // console.log( $scope.Dato.AOBJ_Cotizaciones );

}

$scope.FN_Registrar_Usuario=function(  )
{
 $http.post( 'http://localhost/Proyectos/WebService/OrdersPresale_WebService/Controlador/registro_usuario', $scope.AOBJ_Registro_Usuario)
 .success( function( result )
 {
  // console.log( result );
  // console.log( result, null, status );

})

 .error( function( result, status )
 {
  console.log( result, null, status)

} );

}


$scope.FN_Detalles_Cotizacion=function( $index )
{
  var indice = $index;
  
  $scope.FK_ID_Cotizacion_Usuario=$scope.Dato.AOBJ_Cotizaciones[indice]['FK_ID_Usuario'];

  $http.post( 'http://localhost/Proyectos/WebService/OrdersPresale_WebService/Controlador/consultar_dll_cotizacion', $scope.FK_ID_Cotizacion_Usuario)

  .success( function( result )
  {

   $scope.AOBJ_DLL_Cotizacion=result;

   Fabrica.objeto.Cargar_Dll_Cotizacion( result );
 })

  .error( function( result, status )
  {
    alert( "No se pudo consumir el servicio mostrar detalles de cotización" );
    console.log( result, null, status );

  } );
}

$scope.AOBJ_Mensaje_Alerta = [];
$scope.Promesa = "";
$scope.FN_Crear_Mensaje = function (Mensaje, Tiempo,Tipo_Alerta)
{
 var Permitido_Crear_Mensaje = false, Mensaje_Ya_Creado = false;
 var Mensajes_Alerta =
 {
  Mensaje_Alerta: Mensaje,
  Visibilidad_Alerta: false,
  Tipo_Mensaje_Alerta: Tipo_Alerta
};
        //Si el objeto de mensajes esta vacio puedo crear el mensaje sin ningun problema, pero si el objeto esta lleno paso a verificar si la notificacion a mostrar ya se encuentra en el objeto, esto lo realizo recorriendo  AOBJ_Mensaje_Alerta y buscando posicion por posicion para buscar el mensaje, si se encuentra el mensaje, cambio Permitido_Crear_Mensaje a false con lo que no se creara el mensaje, si no se encuentra el mensaje cambio Permitido_Crear_Mensaje  a true con lo que pasara al condicional que verifica si Permitido_Crear_Mensaje es true y asi genero el nuevo mensaje


        if($scope.AOBJ_Mensaje_Alerta.length)
        {

          for (var i = 0; i < $scope.AOBJ_Mensaje_Alerta.length; i++) {
            if($scope.AOBJ_Mensaje_Alerta[i].Mensaje_Alerta == Mensaje &&
              $scope.AOBJ_Mensaje_Alerta[i].Visibilidad_Alerta === true &&
              $scope.AOBJ_Mensaje_Alerta[i].Tipo_Mensaje_Alerta == Tipo_Alerta)
            {

          //Elimino el mennsaje encontrao y luego paso a generar un nuevo para asi dar un toque mas agradabele a el mensaje
          $scope.AOBJ_Mensaje_Alerta[i].Visibilidad_Alerta = false;
          $scope.AOBJ_Mensaje_Alerta.splice(i,1);
          $timeout.cancel(Promesa);

          Mensaje_Ya_Creado = true;


        }
        else
        {
          Mensaje_Ya_Creado = true;


        }
      }
      if( Mensaje_Ya_Creado )
      {
        Permitido_Crear_Mensaje = true;
      }
    }
    else
    {
      Permitido_Crear_Mensaje = true;
    }

    if( Permitido_Crear_Mensaje )
    {
      $scope.AOBJ_Mensaje_Alerta.push(Mensajes_Alerta);
      //_* CONSOLE.ERROR($scope.AOBJ_MENSAJE_ALERTA);
      new $timeout( $scope.FN_Mensaje_Alerta, Tiempo);
    }

  };
  $scope.FN_Mensaje_Alerta = function () {
    for (var i = 0; i < $scope.AOBJ_Mensaje_Alerta.length; i++) {
      $scope.AOBJ_Mensaje_Alerta[i].Visibilidad_Alerta = true;
      Promesa = $timeout($scope.FN_Cerrar_Mensaje, 8000);
    }


  };
  $scope.FN_Cerrar_Mensaje =  function () {

    $scope.AOBJ_Mensaje_Alerta.splice(0,1);
    $timeout.cancel(Promesa);

    //_* CONSOLE.ERROR($scope.AOBJ_MENSAJE_ALERTA);



  };
  $scope.FN_Cerrar_Mensaje_En_Especifico = function (Posicion) {

    $scope.AOBJ_Mensaje_Alerta.splice(Posicion,1);
    $timeout.cancel(Promesa);

    //_* CONSOLE.ERROR($scope.AOBJ_MENSAJE_ALERTA);



  }

  //Funcion para desplegar el modal de cotizacion desde la opcion de la barra de navegacion
  $scope.FN_Orden = function ()
  {
    Fabrica.objeto.BL_Ver_Orden = true;
  }


    $scope.dato = Fabrica.objeto;
  }]);







