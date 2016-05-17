
app.controller( 'controllerproductos', [ '$timeout','$scope', 'Fabrica', '$http','$localStorage','$sessionStorage', function ($timeout,$scope, Fabrica, $http,$localStorage,$sessionStorage ) 
{

	$scope.AOBJ_Productos_Cotizacion=[];
	 //_* VARIABLES PARA EL PAGINATE CON ANGULAR
	 $scope.currentPage = 1;
	 $scope.pageSize = 3;
	 $scope.BL_Ver_Confirmacion = false;


  $scope.FN_Listar_Productos = function( Opcion, PK_ID_Categoria )
  {

    if(Opcion == 1)
    {
      var Objeto_Datos = {
        Nombre_Funcion_Modelo: "FN_Listar_Productos",
        Nombre_Modelo: "M_Modulo_Producto"
      };
      $http.post('http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/CRUD/CRUD_FN_Listar', Objeto_Datos )
      .success(function( Respuesta ){
        var Respuesta_Accion = ( Respuesta );
        if( Respuesta_Accion != 'No se encontro la variable: Nombre_Funcion_Modelo' )
        {
         $scope.AOBJ_Listar_Productos = Respuesta;
         Fabrica.objeto.AOBJ_Productos_Principal = Respuesta;
         for (var i = 0; i <  Fabrica.objeto.AOBJ_Productos_Principal.length; i++) {
          Fabrica.objeto.AOBJ_Productos_Principal[i].TXT_Texto_Btn = "Añadir Producto";
          Fabrica.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto = true;
          Fabrica.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto = 0;
          Fabrica.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad = 0;
          Fabrica.objeto.AOBJ_Productos_Principal[i].NUM_Costo = 0;
          Fabrica.objeto.AOBJ_Productos_Principal[i].BL_Estado_Descripcion = false;
          Fabrica.objeto.AOBJ_Productos_Principal[i].BL_Estado_Ver_Producto = true;
        }
        Fabrica.objeto.FN_EMPAREJAR_INFO();
      }
      else
      {
        $scope.Mensaje = "Error interno:" + Respuesta;
        $scope.FN_Crear_Mensaje( $scope.Mensaje, 100, 'Error' );
      }
    })
      .error(function( Respuesta ){
        console.error( Respuesta,status );
      });
    }
    if(Opcion == 2)
    {
      var Objeto_Datos_Categoria = {
        Nombre_Funcion_Modelo: "FN_Listar_Producto_Categoria",
        Nombre_Modelo: "M_Modulo_Producto",
        Objeto_Variables_Para_Usar: "PK_ID_Categoria",
        PK_ID_Categoria: PK_ID_Categoria
      };
      $http.post(  'Modulo/CRUD/CRUD_FN_Listar', Objeto_Datos_Categoria )
      .success(function( Respuesta ){
        var Respuesta_Accion = ( Respuesta );
        if( Respuesta_Accion != 'No se encontro la variable: Nombre_Funcion_Modelo' )
        {
         $scope.AOBJ_Listar_Productos = Respuesta;
         Fabrica.objeto.AOBJ_Productos_Principal = Respuesta;
         for (var i = 0; i <  Fabrica.objeto.AOBJ_Productos_Principal.length; i++) {
          Fabrica.objeto.AOBJ_Productos_Principal[i].TXT_Texto_Btn = "Añadir Producto";
          Fabrica.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto = true;
          Fabrica.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto = 0;
          Fabrica.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad = 0;
          Fabrica.objeto.AOBJ_Productos_Principal[i].NUM_Costo = 0;
          Fabrica.objeto.AOBJ_Productos_Principal[i].BL_Estado_Descripcion = false;
          Fabrica.objeto.AOBJ_Productos_Principal[i].BL_Estado_Ver_Producto = true;
        }

        Fabrica.objeto.FN_EMPAREJAR_INFO();
      }
      else
      {
        $scope.Mensaje = "Error interno:" + Respuesta;
        $scope.FN_Crear_Mensaje( $scope.Mensaje, 100, 'Error' );
      }
    })
      .error(function( Respuesta ){
        console.error( Respuesta,status );
      });
    }
  };
	  //_* *******************************************************
	//_* ********************************************************
	//_* ********************************ORDEN***********************
	//_* AGREGAR UN PRODUCTO RECIBE TRES PARAMETRO, LA POSICION EN QUE SE ENCUENTRA EL PRODUCTOS DENTRO DEL ARRAY, EL TOTAL
	//_*  QUE SE CALCULA EN EL INPUT DE LA VISTA Y EL ESTADO CON EL CUAL SE SI YA FUE O NO AGREGADO EL PRODUCTO
	$scope.FN_Agregar_Productos = function ( id_ing )
	{
	  //_* *****LLAMO LA FUNCION DECLARADA EN LA FABRICA
	  Fabrica.objeto.FN_Agregar_Productos( id_ing );
	};
	//_* ELIMINAR RECIBE UN PARAMETRO, LA POSICION DEL OBJETO DENTRO DEL ARRAY
	//_* CON LA PROPIEDAD SPLICE ELIMINO EL OBJETO DEL ARRAY Y LUEGO REGRESO VALORES PREDETERMINADOS
	$scope.FN_Eliminar_Producto = function ( id_ing )
	{
		Fabrica.objeto.FN_Eliminar_Producto( id_ing );
	};
	//_* ACTUALIZAR DATOS RECIBE DOS PARAMETROS LA POSICION DEL OBJETO Y EL TOTALPRODUCTO
	//_* ESTA FUNCION SE EJECUTA CADA VEZ QUE CAMBIEMOS EL VALOR DE LA CANTIAD DE UNIDADES DEL PRODUCTO
	//_* SE ENCARGA DE ACTUALIZAR LA CANTIDAD DE PRODUCTO EN EL CONTENEDOR DE LA ORDEN
	$scope.FN_Actualizar_Datos = function ( TipoActualizar, id_ing )
	{
		Fabrica.objeto.FN_Actualizar_Datos( TipoActualizar, id_ing );
	};
	//_* CALCULAR TOTAL TANSOLO LLAMA A LA FUNCION CALCULAR TOTAL DE LA FABRICA Y ESTA SE ENCARGA DE
	//_* RESETEAR EL TOTAL DE LA ORDEN Y VOLVER A CALCULAR CUANTO ES QUE SE LLEBA EN LA ORDEN
	$scope.FN_Calcular_Total = function ()
	{
		Fabrica.objeto.FN_Calcular_Total();
	};

	$scope.FN_Agregar_Productos_Cotizacion = function( $index ){

		$scope.AOBJ_Productos_Cotizacion+=$scope.dato.AOBJ_Productos[ $index ];
		console.log( $scope.AOBJ_Productos_Cotizacion );

	}
	

	$scope.FN_Orden = function ()
	{
		$scope.BL_Ver_Mensajes = false;
		$scope.BL_Contenedor_Notificaciones = false;
		Fabrica.objeto.BL_Ver_Orden = !Fabrica.objeto.BL_Ver_Orden;
		$scope.BL_Opciones_Cuenta = false;
		$scope.Bl_Menu_Desplegado = false;
		$scope.BL_Ver_Menu = false;
		$scope.BL_Scroll_Body =! $scope.BL_Scroll_Body;
		$scope.BL_Ordenes_Enviadas = false;

		if(Fabrica.objeto.BL_Ver_Orden == false){
			$scope.FN_Listar_Productos(1, null);
		}
		Fabrica.objeto.AOBJ_Productos_Principal = [];
	};

	//_* ************************************ELIMINAR**************
	$scope.FN_Confirmacion_Alerta = function ( Tipo_Funcion, Posicion, Confirmacion, Mensaje_Confirmacion )
	{
  //_* TIPO_FUNCION: REPRESENTA LA FUNCION QUE QUEREMOS LLAMAR.
  //_* POSICION: SE USA CUANDO QUEREMOS ELIMINAR UN ELEMENTO EN ESPECIFICO, PARA ESTO SE DEBE PASAR COMO PARAMETRO EL
  //_* $INDEX DEL NG-REPEAT
  //_* CONFIRMACION: REPRESENTA EL EL ESTADO EN QUE SE PUEDE ELIMINAR EL OBJETO POSEE DOS ESTADOS TRUE/FALSE,
  //_*  TRUE: ESE PUEDE ELIMINAR / FALSE: NO SE PUEDE ELIMINAR
  //_*  CUANDO EJECUTAMOS LA FUNCION FN_CONFIRMACION_ALERTA POR
  //_* PRIMERA VEZ PASAMOS COMO PARAMETROS EL TIPO_FUNCION, POSICION, ESTOS DATOS LOS GUARDAMOS
  //_*  EN: NUM_ELIMINAR_POSICION, NUM_TIPO_FUNCION Y EL PARAMETRO CONFIRMACION DEBE DE SER FALSE
  //_*  CONFIRMACION DEBE DE SER FALSE PARA ASI PODER REALIZAR LA CONFIRMACION DE LA ELIMINACION
  //_*  EJMPLO : (1,1,FALSE), AL PASAR EL TERCER PARAMETRO COMO FALSE, TANSOLO ESTAMOS
  //_* PREPARANDO LA FUCION ELIMINAR, CAPTURANDO LOS PRIMEROS DATOS QUE ESTAN PASANDO.
  //_*  CUANDO EL USUARIO PRESIONA EL BOTON CONFIRMAR ELIMINACION DE LA VENTANA EMERGENTE SE DEBEN DE PASAR
  //_*  LOS PARAMETROS  NUM_ELIMINAR_POSICION , NUM_TIPO_FUNCION, ESTAS DOS VARIABLE POSEERAN GUARDO LOS DATOS
  //_*  INGRESADOS CON ATERIORIDAD, LUEGO TANSOLO ES PASAR COMO TERCER PARAMETRO CONFIRMACION PERO EN ESTADO TRUE
  //_*  CON ESTO BOTENEMOS DOS PASOS PARA PODER ELIMINAR ALGUN ELEMENTO, LA CONFIRMACION SE CREO PARA
  //_*  LA ELIMINACION DE ELEMENTOS CON GRAN DE INFORMACION
  $scope.NUM_Eliminar_Posicion = Posicion;
  $scope.NUM_Tipo_Funcion = Tipo_Funcion;
  $scope.TXT_Texto_Confirmacion = Mensaje_Confirmacion;
  //_* ELIMINAR PRODUCTO DE ORDEN
  if ( Tipo_Funcion == 1 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion )
  	{
  		Fabrica.objeto.FN_Confirmacion_Alerta();
  		$scope.BL_Ver_Confirmacion = false;
  		$scope.TXT_Texto_Confirmacion = '';
  	}
  }
  //_* ELIMINAR LISTA DE PRODUCTO
  if ( Tipo_Funcion == 2 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion === true )
  	{
  		$scope.FN_Eliminar_Listas_Usuario($scope.NUM_Eliminar_Posicion);
  	}
  }
  if ( Tipo_Funcion == 3 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion )
  	{
  		$scope.FN_Eliminar_Todas_Listas_Usuario();
  	}
  }
  if ( Tipo_Funcion == 4 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion )
  	{
  		$scope.BL_Ver_Confirmacion = false;
  		$scope.TXT_Texto_Confirmacion = '';
  		$scope.FN_Habilitar_Estado_Cuenta_Usuario_Login();
  	}
  }
  if ( Tipo_Funcion == 5 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if (Confirmacion)
  	{
  		var Datos_Usuario = Fabrica.objeto.AOBJ_Datos_Usuario[0];
  		$http.post( 'http://localhost/Proyectos/WebService/OrdersPresale_WebService/Controlador/FN_Inhabilitar_Estado_Cuenta', Datos_Usuario )
  		.success(function( Respuesta ){
  			var Respuesta_Accion = ( Respuesta );
  			if ( Respuesta_Accion == 'true' ){
  				$scope.FN_Cerrar_Sesion();
  				$scope.BL_Ver_Confirmacion = false;
  				$scope.TXT_Texto_Confirmacion = '';
  			}else if ( Respuesta_Accion == 'false' ){
  				$scope.Mensaje = "La cuenta no se pudo inhabilitar";
  				$scope.FN_Crear_Mensaje( $scope.Mensaje, 100, 'Error' );
  				$scope.BL_Ver_Confirmacion = false;
  				$scope.TXT_Texto_Confirmacion = '';
  			}
  		})
  		.error(function(  Respuesta, status  ){
  			console.error(  Respuesta, status  );
  		});
  	}
  }
  //_* CONFIRMACION PARA ELIMINAR UN PERMISO DE LAS VISTAS
  if ( Tipo_Funcion == 6 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion )
  	{
  		$scope.FN_Eliminar_Permiso_Usuario( $scope.NUM_Eliminar_Posicion );
  	}
  }
  //_* CONFIRMACION PARA ELIMINAR UNA ORDEN
  if ( Tipo_Funcion == 7 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion )
  	{
  		$scope.FN_Eliminar_Pedido_Enviado( $scope.NUM_Eliminar_Posicion );
  	}
  }
  if ( Tipo_Funcion == 8 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion )
  	{
  		$scope.FN_Eliminar_Orden_Enviada( $scope.NUM_Eliminar_Posicion );
  	}
  }
  if ( Tipo_Funcion == 9 )
  {
  	$scope.BL_Ver_Confirmacion = !$scope.BL_Ver_Confirmacion;
  	if ( Confirmacion )
  	{
  		$scope.FN_Eliminar_Todos_Producto_Dtll_Lista( $scope.NUM_Eliminar_Posicion );
  	}
  }
};

//==================================COMENTARIOS PRODUCTOS===================================

 //_* MODULO DE COMENTARIOS PARA LOS PRODUCTOS
 $scope.BL_Comentario = false;
    //_* ESTA VARIABLE CONTENDRA EL PK_ID_PRODUCTO POR SI EL USUARIO DESEA REGISTRAR UN COMENTARIO
    //_* TENDRE GUARDAO EN QUE PORDUCTO  ESTA UBICADO Y A QUE FK ASOCIARE EL COMENTARIO
    $scope.PK_ID_Producto_Seleccionado = 0;
    //_*  ESTA FUNCION SE VIO NECESARIA, YA QUE PARA DESPLEGAR LAS OPCIONES DE UN COMENTARIO, NO SE PODIA
    //_* HACER USO DE NG-CLICK YA QUE AL POSEER NG-IF SE DEBE LLAMAR UNA FUNCION PARA PODER EJERCER CAMBIOS
    $scope.Num_Posicion_Comentario = 0;
    $scope.BL_Edicion_Datos_Comentario = false;
    $scope.FN_Ver_Opciones_Comentario = function( Elemento )
    {
      Fabrica.objeto.AOBJ_Comentarios_Producto[ Elemento ].BL_Opciones_Comentario =! Fabrica.objeto.AOBJ_Comentarios_Producto[Elemento].BL_Opciones_Comentario ;
    };
    $scope.FN_Editar_Comentario = function( Elemento,Tipo_Accion )
    {
      //_* FUNCION QUE SOLO DESPLEGARA LAS OPCIONES DE EDICCION, ESTA FUNCION SE EJECTUTA CUANDO
      //_*  SE CLICKEA SOBRE  EL TEXTAREA, POR ELLO TANSOLO HAGO QUE CUANDO SE CLICKEE CAMBIE A TRUE,
      //_*  SI USARA LA ACCION 2, CADA VEZ QUE SE CLICKEE EL TEXTAREA SE OCULTARIA O VISUALIZARIA LAS OPCIONES
      if( Tipo_Accion == 1 )
      {
        $scope.BL_Edicion_Datos_Comentario = true;
        //_* ESTA PARTE SE USA PARA CUANDO SE DE EN LA OPCION EDITAR PERO DEL DESPLEGABLE DE OPCIONES
        Fabrica.objeto.AOBJ_Comentarios_Producto[ Elemento ].BL_Opciones_Comentario = false;
      }
      //_* FUNCION QUE SERVIRA PARA OCULTAR LAS OPCIONES DE EDICION
      if( Tipo_Accion ==2 )
      {
        $scope.BL_Edicion_Datos_Comentario =! $scope.BL_Edicion_Datos_Comentario;
        //_*  SI SE CANCELO LA EDICION DE VUELVO A LISTAR LOS COMENTARIOS PARA TENERLOS ACTUALIZADOS
        $scope.FN_Ver_Comentarios_Producto($scope.PK_ID_Producto_Seleccionado);
      }
      $scope.Num_Posicion_Comentario = Elemento;
    };




    $scope.FN_Ver_Comentarios_Producto = function( PK_ID_Producto )
    {

      var Id = PK_ID_Producto;
      $scope.PK_ID_Producto_Seleccionado = PK_ID_Producto;
      $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Ver_Comentarios_Producto', Id)
      .success(function ( Respuesta ) {
        //_* VARIABLE EN LA QUE GUARDO LOS DATOS DEBUELTOS POR PHP POR MEDIO DE JSON_ENCODE
        Fabrica.objeto.AOBJ_Comentarios_Producto = Respuesta;
        for (var i = 0; i < Fabrica.objeto.AOBJ_Comentarios_Producto.length; i++) {
          Fabrica.objeto.AOBJ_Comentarios_Producto[i].BL_Opciones_Comentario = false;
        }
      })
      .error(function ( Respuesta, status ) {
        console.error( 'error', status, Respuesta );
      });
    };
    $scope.N = {
      PK_ID_Producto: 0,
      PK_ID_Usuario: 0,
      Comentario: ""
    };

    $scope.FN_Registrar_Nuevo_Comentario = function( Nuevo_Comentario )
    {

      $scope.N.PK_ID_Producto = $scope.PK_ID_Producto_Seleccionado;

      $scope.N.PK_ID_Usuario = Fabrica.objeto.AOBJ_Datos_Usuario[0].PK_ID_Usuario;

      //Se esta pasando un objeto que posee el id del producto y el comentario
      var Comentario = Nuevo_Comentario;
      $http.post(  'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Registrar_Nuevo_Comentario_APP_Movil', Comentario )
      .success(function ( Respuesta ) {
        var Respuesta_Accion = ( Respuesta );
        if(Respuesta_Accion == '_Sesion_No_Iniciada')
        {
          //_* MENSAJE DE ALERTAN
          $scope.Mensaje = "Inicia sesion para poder publicar un comentario";
          $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Alerta');
        }
        else if(Respuesta_Accion == 'Comentario_Registrado')
        {
          //_* MENSAJE DE ALERTAN
          //_*  $SCOPE.MENSAJE = "TU COMENTARIO HA SIDO PUBLICADO";
          //_*  $scope.FN_CREAR_MENSAJE($SCOPE.MENSAJE, 100, 'FINALIZADO');
          $scope.FN_Ver_Comentarios_Producto($scope.PK_ID_Producto_Seleccionado);
          $scope.N.Comentario = "";
        }
        else
        {
          //_* MENSAJE DE ALERTAN
          $scope.Mensaje = "Ha ocurrido un error al publicar tu comentario";
          $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Error');
          $scope.FN_Ver_Comentarios_Producto($scope.PK_ID_Producto_Seleccionado);
        }
      })
      .error(function ( Respuesta, status ) {
        console.error( 'error', Respuesta, status );
      });
    };
    $scope.FN_Eliminar_Comentario =  function( PK_ID_Comentario )
    {
      $http.post(  'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Eliminar_Comentario', PK_ID_Comentario )
      .success(function ( Respuesta ) {
        var Respuesta_Accion = ( Respuesta );
        if(Respuesta_Accion == 'Comentario_Eliminado')
        {
          //_*  //_* MENSAJE DE ALERTAN
          //_*  $SCOPE.MENSAJE = "COMENTARIO ELIMINADO";
          //_*  $scope.FN_CREAR_MENSAJE($SCOPE.MENSAJE, 100, 'FINALIZADO');
          $scope.FN_Ver_Comentarios_Producto($scope.PK_ID_Producto_Seleccionado);
        }
        else
        {
          //_* MENSAJE DE ALERTAN
          $scope.Mensaje = "Ha ocurrido un error al eliminar tu comentario";
          $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Error');
        }
      })
      .error(function ( Respuesta, status ) {
        console.error( 'error', Respuesta, status );
      });
    };
    $scope.FN_Valoracion_Comentario = function( Posicion )
    {
      var Datos_Comentario = Fabrica.objeto.AOBJ_Comentarios_Producto[ Posicion ];
      console.error( Datos_Comentario );
      $http.post(  'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Valoracion_Comentario', Datos_Comentario )
      .success(function ( Respuesta ) {
        var Respuesta_Accion = ( Respuesta );
        if( Respuesta_Accion == '_Sesion_No_Iniciada' )
        {
          $scope.Mensaje = "Inicia sesión para poder valorar este comentario";
          $scope.FN_Crear_Mensaje( $scope.Mensaje, 100, 'Alerta' );
        }
        else if( Respuesta_Accion == 'Valoracion_Agregada' )
        {
          //_*  $SCOPE.MENSAJE = "LE HAS DADO ME GUSTA A EL COMENTARIO";
          //_*  $scope.FN_CREAR_MENSAJE($SCOPE.MENSAJE, 100, 'FINALIZADO');
          $scope.FN_Ver_Comentarios_Producto( $scope.PK_ID_Producto_Seleccionado );
        }
        else if( Respuesta_Accion == 'Valoracion_Removida' )
        {
          //_*  $SCOPE.MENSAJE = "HAS REMOVIDO TU LIKE DEL COMENTARIO";
          //_*  $scope.FN_CREAR_MENSAJE($SCOPE.MENSAJE, 100, 'FINALIZADO');
          $scope.FN_Ver_Comentarios_Producto( $scope.PK_ID_Producto_Seleccionado );
        }
        else if( Respuesta_Accion == 'false' )
        {
          $scope.Mensaje = "Ha ocurrido un error al valorar el comentario";
          $scope.FN_Crear_Mensaje( $scope.Mensaje, 100, 'Error' );
        }
        else
        {
          $scope.Mensaje = "Ha ocurrido un error al valorar el comentario";
          $scope.FN_Crear_Mensaje( $scope.Mensaje, 100, 'Error' );
        }
      })
      .error(function ( Respuesta, status ) {
        console.error( 'error', Respuesta, status );
      });
    };
    $scope.FN_Modificar_Comentario =  function(Posicion_Comentario)
    {
      var Comentario = Fabrica.objeto.AOBJ_Comentarios_Producto[Posicion_Comentario];
      $http.post(  'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Modificar_Comentario', Comentario )
      .success(function ( Respuesta ) {
        var Respuesta_Accion = ( Respuesta );
        if(Respuesta_Accion == 'true')
        {
          //_*  //_* MENSAJE DE ALERTAN
          //_*  $SCOPE.MENSAJE = "COMENTARIO ACTUALIZADO";
          //_*  $scope.FN_CREAR_MENSAJE($SCOPE.MENSAJE, 100, 'FINALIZADO');
          $scope.FN_Ver_Comentarios_Producto( $scope.PK_ID_Producto_Seleccionado );
          //_* OCULTO EL MENU DE OPCIONES DE EDICCION
          $scope.BL_Edicion_Datos_Comentario = false;
        }
        else
        {
          //_* MENSAJE DE ALERTAN
          $scope.Mensaje = "Ha ocurrido un error al actualizar tu comentario";
          $scope.FN_Crear_Mensaje( $scope.Mensaje, 100, 'Error' );
        }
      })
      .error(function ( Respuesta, status ) {
        console.error( 'error', Respuesta, status );
      });
    };


// Variable para desplegar el elemento nueva direcion en el envio de orden
$scope.Otra_Direccion = false;
$scope.Otro_Telefono = false;

$scope.FN_Desplegar_Campos_Envio_Orden =  function ( Opcion )
{
  alert("Hola");
  if(Opcion == 1)
  {
    $scope.Otra_Direccion =! $scope.Otra_Direccion;
  }
  if(Opcion == 2)
  {
    $scope.Otro_Telefono =! $scope.Otro_Telefono;
  }
};

$scope.AOBJ_Envio_Orden = [];
$scope.BL_Ver_Envio_Orden =  false;
$scope.FN_Envio_Orden = function ( Tipo_Accion,Datos_De_Entrega )
{
  if( Tipo_Accion == 1 ){

    var Datos_Objeto =
    {
      PK_ID_Usuario:Fabrica.objeto.AOBJ_Datos_Usuario[0].PK_ID_Usuario
    };
          //_* LA PRIMERA OPCION ES PARA VERIFICAR SI EL USUARIO HA INICIADO SESION
          $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Verificacion_Sesion_APP_Movil', Datos_Objeto )
          .success(function ( Respuesta ) {
            var Respuesta_Accion = ( Respuesta );
            if( Respuesta_Accion == '_Sesion_No_Iniciada' )
            {
              $scope.Mensaje = "Inicia sesión para poder enviar la orden actual";
              $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Info');
            }
            if( Respuesta_Accion == '_Sesion_Iniciada' )
            {

             $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Verificacion_Cuenta_APP_Movil', Datos_Objeto  )
             .success(function ( Respuesta ) {
              var Respuesta_Accion = ( Respuesta );
              if( Respuesta_Accion == 'Verificada' )
              {

                $scope.BL_Ver_Envio_Orden =! $scope.BL_Ver_Envio_Orden;
                Fabrica.objeto.BL_Datos_Envio_Producto =!  Fabrica.objeto.BL_Datos_Envio_Producto;
                $scope.AOBJ_Envio_Orden = Fabrica.objeto.AOBJ_Productos;
                $scope.Bl_Dtll_Lista = false;
              }
              if( Respuesta_Accion == 'Cuenta_No_Verifica' )
              {
                $scope.Mensaje = "Tu cuenta no ha sido verificada, no podras realizar el envio de un pedido hasta que se confirme la autenticidad de tus datos";
                $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Info');
              }
            })
             .error(function ( Respuesta, status ) {
              console.error( 'error', Respuesta, status );
            });

            // console.log($scope.AOBJ_Envio_Orden);
            // console.log($scope.AOBJ_Listas_Detalle);
            $scope.NUM_Precio_Total_Orden_Envio = 0;
            for (var i = 0; i < $scope.AOBJ_Envio_Orden.length; i++) {

             $scope.NUM_Precio_Total_Orden_Envio += $scope.AOBJ_Envio_Orden[i].NUM_Costo;
           }
         }
       })
          .error(function ( Respuesta, status ) {
            console.error( 'error', Respuesta, status );
          });
        }
        if( Tipo_Accion == 2 )
        {
          //_* OPCION PARA ENVIAR LA ORDEN
          $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Envio_Orden_Guardado_Datos_Productos', $scope.AOBJ_Envio_Orden )
          .success(function ( Respuesta ) {
            var Respuesta_Accion = ( Respuesta );
            if( Respuesta_Accion == 'Orden_Guardada' )
            {
              //_* LUEGO DE GUARDAR LOS DATOS DE LA ORDEN PASO A MANAR LOS ATOS NECESARIOS PARA REALIZAR UN REGISTRO EN
              //_* LA TABLA  TBL_COTIZACION_PRODUCTO, LA CUAL NECESITA LOS DATOS DIRECCION,TELEFONO


              console.error(Datos_De_Entrega);
              $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Envio_Orden', Datos_De_Entrega )
              .success(function ( Respuesta ) {
                var Respuesta_Accion = ( Respuesta );
                if( Respuesta_Accion == 'true' )
                {
                  $scope.Mensaje = "Tú orden ha sido enviada";
                  $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Finalizado');
                  $scope.BL_Ver_Envio_Orden =! $scope.BL_Ver_Envio_Orden;
                  $scope.BL_Datos_Envio_Producto =! $scope.BL_Datos_Envio_Producto;
                }
                else
                {
                  $scope.Mensaje = "Ha ocurrido un error al enviar la orden";
                  $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Error');
                }
              })
              .error(function ( Respuesta, status ) {
                console.error( 'error', Respuesta, status );
              });
            }
            if( Respuesta_Accion == 'No_Hay_Datos' )
            {
              $scope.Mensaje = "Error al iniciar el proceso de envio de orden";
              $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Error');
              $scope.BL_Ver_Envio_Orden =! $scope.BL_Ver_Envio_Orden;
              $scope.BL_Datos_Envio_Producto = true;
            }
          })
          .error(function ( Respuesta, status ) {
            console.error( 'error', status, Respuesta );
          });
        }
        if( Tipo_Accion == 3 )
        {
          $scope.BL_Ver_Envio_Orden =! $scope.BL_Ver_Envio_Orden;
          $scope.BL_Datos_Envio_Producto =! $scope.BL_Datos_Envio_Producto;
        }

        if( Tipo_Accion == 4 )
        {

          $http.post( 'http://localhost/Proyectos/OrdersPresale/Orders_Presale/Modulo/Modulo_Usuario/FN_Verificacion_Cuenta' )
          .success(function ( Respuesta ) {
            var Respuesta_Accion = ( Respuesta );
            if( Respuesta_Accion == 'Verificada' )
            {
              $scope.BL_Ver_Envio_Orden =! $scope.BL_Ver_Envio_Orden;
              $scope.BL_Datos_Envio_Producto = true;
              $scope.AOBJ_Envio_Orden = $scope.AOBJ_Listas_Detalle;
              $scope.Bl_Dtll_Lista = true;
            }
            if( Respuesta_Accion == 'Cuenta_No_Verifica' )
            {
              $scope.Mensaje = "Tu cuenta no ha sido verificada, no podras realizar el envio de un pedido hasta que se confirme la autenticidad de tus datos";
              $scope.FN_Crear_Mensaje($scope.Mensaje, 100, 'Info');
            }
          })
          .error(function ( Respuesta, status ) {
            console.error( 'error', Respuesta, status );
          });

        // console.log($scope.AOBJ_Envio_Orden);
        // console.log($scope.AOBJ_Listas_Detalle);

        $scope.NUM_Precio_Total_Orden_Envio = 0;
        for (var i = 0; i < $scope.AOBJ_Envio_Orden.length; i++) {

          $scope.NUM_Precio_Total_Orden_Envio += parseInt($scope.AOBJ_Envio_Orden[i].Sub_Total);
        }
      }
    };
    //=================================================COMENTARIOS PRODUCTOS=============================

 //  $scope.FN_Enviar_Cotizacion=function(){
 //   $http.post('http://localhost/Proyectos/WebService/OrdersPresale_WebService/Controlador/registrar_cotizacion', $scope.AOBJ_Productos_Cotizacion)
 //   .success(function(result, status){
 //    alert("Se pudo realizar la petición registrar cotización correctamente");
 //  })

 //   .error(function(result, status){
 //    console.log("No se pudo realizar la peticion registrar cotizacion");
 //    console.log(resutl, null, status);
 //  });

 // }

 $scope.dato = Fabrica.objeto;
}]);
