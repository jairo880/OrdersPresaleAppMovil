var app = angular.module("AppOrders_Presale.controllers", [ ]);

//_* Fabrica PARA GESTIONAR LOS DATOS Y OBJETOS DE FORMA GLOBAL PUDIENDO SER ACCEDIDO POR DIVERSOS CONTROLADORES
app.factory( 'Fabrica', [ '$http','$localStorage','$sessionStorage', function($http,$localStorage,$sessionStorage)
{

  var servicio={
    objeto:{
      BL_Ver_Orden:false,
      AOBJ_Productos_Principal:[ ],
      AOBJ_Datos_Usuario:[ ],
      AOBJ_Dll_Cotizacion:[ ],
      AOBJ_Cotizaciones:[ ],
      Estado_Logeo:'',
      NUM_Cantidad_Productos_En_Orden: 0,
      AOBJ_Productos: [],
      Promesa: "",

      BL_Comentario: false,
      BL_Datos_Envio_Producto: false,
      FN_Desplegar_Comentarios_Productos: function()

      {
        servicio.objeto.BL_Comentario =! servicio.objeto.BL_Comentario;
      },

      Cargar_Dll_Cotizacion:function( Respuesta )
      {
       servicio.objeto.AOBJ_Dll_Cotizacion=Respuesta;
       console.log( servicio.objeto.AOBJ_Dll_Cotizacion );

     },
     Cargar_Estado_Logeo:function( Estado_Logeo )
     {
      servicio.objeto.Estado_Logeo = Estado_Logeo;
      console.log( servicio.objeto.Estado_Logeo );
    },
    Cargar_Datos_Usuario:function( Datos_Usuario )
    {
      servicio.objeto.AOBJ_Datos_Usuario=Datos_Usuario;
      console.log( servicio.objeto.AOBJ_Datos_Usuario );

    },
    Consultar_Productos:function(  )
    {

      $http.get( 'http://localhost/Proyectos/WebService/OrdersPresale_WebService/Controlador/consultar_productos')

      .success( function( Respuesta )
      {
        servicio.objeto.AOBJ_Productos_Principal = Respuesta;
        for (var i = 0; i <  servicio.objeto.AOBJ_Productos_Principal.length; i++) {
          servicio.objeto.AOBJ_Productos_Principal[i].TXT_Texto_Btn = "Añadir Producto";
          servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto = true;
          servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto = 0;
          servicio.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad = 0;
          servicio.objeto.AOBJ_Productos_Principal[i].NUM_Costo = 0;
          servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Descripcion = false;
          servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Ver_Producto = true;
        }

        servicio.objeto.FN_EMPAREJAR_INFO();
      })

      .error( function( Respuesta, status )
      {
        alert( "Error al consumir el servicio para productos" );
        console.log( Respuesta, null, status );
      } );
    },
    FN_Consultar_Cotizaciones:function( Datos_Usuario )
    {
      $http.post( 'http://localhost/Proyectos/WebService/OrdersPresale_WebService/Controlador/consultar_cotizaciones',Datos_Usuario)    
      .success( function( Respuesta )
      {
        servicio.objeto.AOBJ_Cotizaciones = Respuesta;
        console.log( servicio.objeto.AOBJ_Cotizaciones );

      })
      .error( function( Respuesta )
      {
        alert( "No se pudo consumir el Servicio")
      }
      );
    },
    FN_EMPAREJAR_INFO: function ()
    //_* ESTA FUNCION LO QUE HACE ES QUE AL VOLVER A LISTAR LOS PRODUCTOS,
    //_*  VERIFICA SI YA ALGUN PRODUCTO
    //_*  SE ENCUENTRA AGREGADO EN LA ORDEN, ESTO LO HAGO MEDIANTE EL ID,
    //_*  SI SE ENCUNENTRA AGREGADO EL PRODUCTO EN LA ORDEN, TOMA LOS VALORES
    //_* QUE POSEE EL PRODUCTO DE LA ORDEN Y SE LOS APLICA AL PRODUCTO QUE SE
    //_*  MUESTRA EN LA LISTA
    {
      //_* AL EJECUTAR LA FUNCION FN_EMPAREJAR_INFO LE PASO LOS DATOS
      //_*  QUE SE ENCUENTREN GUARDADOS EN LA VARIABLE DE LOCALSTORAGE
      //_* PARA ASI SABER QUE PRODUCTOS TIENE AGREGADOS HASTA EL MOMENTO
      //_* ASI  SI EL USUARIO LE DA EN ELIMINAR A UN PRODUCTO QUE YA TENIA
      //_*  NO TENDRE PROBLEMAS
      //_* YA QUE EL  AOBJ_PRODUCTOS POSEERA LOS DATOS ACTUALIZADOS.


      //_* ANTES DE PASAR LOS PARAMTROS A LA VARIABLE AOBJ_PRODUCTOS
      //_*  VERIFICO SI LA VARIABLE DE LOCALSTORAGE
      //_* POSEE DATOS, ESTO LO HAGO VALIDANDO SI ES UNDEFINED,
      //_*  SI NO ES UNDEFINED LLENO LA VARIABLE CON LOS DATOS
      //_* SI  ES UNDEFINED CREO UN ARRAY VACIO Y SE LO PASO A LA VARIABLE
      servicio.objeto.NUM_Cantidad_Productos_En_Orden = 0;
      if( servicio.objeto.AOBJ_Productos_Local_Storage !== undefined )
      {
        servicio.objeto.AOBJ_Productos = servicio.objeto.AOBJ_Productos_Local_Storage;
          // console.error(servicio.objeto.AOBJ_Productos);

        }
        else
        {
          servicio.objeto.AOBJ_Productos_Local_Storage = [];
          servicio.objeto.AOBJ_Productos = servicio.objeto.AOBJ_Productos_Local_Storage;

          // console.error(servicio.objeto.AOBJ_Productos);
        }
        //_* AL CONTADOR DE PRODUCTOS LE PASO LOS DATOS DE GUARDE EN LA VARIABLE CONTADOR DE LOCALSTORAGE
        //_*  SERVICIO.OBJETO.NUM_CANTIDAD_PRODUCTOS_EN_ORDEN = $LOCALSTORAGE.NUM_CANTIDAD_PRODUCTOS_EN_ORDEN ;
        //_*  $LOCALSTORAGE.$RESET();


        for (var i = 0; i < servicio.objeto.AOBJ_Productos_Principal.length; i++) {
          for (var k = 0; k < servicio.objeto.AOBJ_Productos.length; k++) {
            if (servicio.objeto.AOBJ_Productos_Principal[i].PK_ID_Producto == servicio.objeto.AOBJ_Productos[k].PK_ID_Producto)
            {
              servicio.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad= servicio.objeto.AOBJ_Productos[k].NUM_Cantidad;
              servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto=servicio.objeto.AOBJ_Productos[k].NUM_Total_Producto;
              servicio.objeto.AOBJ_Productos_Principal[i].TXT_Texto_Btn  = 'Remover';
              servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto  = false;
              servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto = servicio.objeto.AOBJ_Productos[k].NUM_Costo;
              // alert("PRODUCTO ENCONTRADO EN LA ORDEN");
              servicio.objeto.NUM_Cantidad_Productos_En_Orden += 1;



            }
            else
            {
             // alert("NO SE ENCONTRARON PRODUCTOS ");
           }

         }
       }
     },
      FN_Agregar_Productos: function (id_ing)//Para agregar un producto primero se recorre el AOBJ_Productos_Principal
      //_*  CON LA PREGUNTA DE QUE SI EL ID_ING CONCUERDA CON ALGUNO DE LA LISTA, SI CONCUERDA PASA A LA PREGUNTA, AUN NO SE HA
      //_* AGREGADO,, SI NO SE HA AGREGADO PASA A CREAR UNA NUEVA POSICION EN AOBJ_PRODUCTOS Y A CAMBIAR EL ESTADO DEL PRODUCTO
      //_*  EN LA LISTA AOBJ_PRODUCTOS_PRINCIPAL A AGREGADO, BL_ESTADO_PRODUCTO INDICA SI EL PRODUCTO SE ENCUENTRA AGREGADO O NO.
      {
        for ( var i = 0; i < servicio.objeto.AOBJ_Productos_Principal.length; i++ ) {
          if ( servicio.objeto.AOBJ_Productos_Principal[i].PK_ID_Producto == id_ing )
          {




            if ( !servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto )
            {


              servicio.objeto.AOBJ_Productos_Principal[i].TXT_Texto_Btn = 'Remover';
              servicio.objeto.AOBJ_Productos.push({
                PK_ID_Producto: servicio.objeto.AOBJ_Productos_Principal[i].PK_ID_Producto,
                Nombre_Producto: servicio.objeto.AOBJ_Productos_Principal[i].Nombre_Producto,
                Valor_Unitario: servicio.objeto.AOBJ_Productos_Principal[i].Valor_Unitario,
                NUM_Cantidad: servicio.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad,
                NUM_Costo: servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto,
                Ruta_Imagen_Producto: servicio.objeto.AOBJ_Productos_Principal[i].Ruta_Imagen_Producto,
                Cant_Unid_Max: servicio.objeto.AOBJ_Productos_Principal[i].Cant_Unid_Max,
                Cant_Unid_Min: servicio.objeto.AOBJ_Productos_Principal[i].Cant_Unid_Min


              });
              servicio.objeto.NUM_Cantidad_Productos_En_Orden += 1;
              //_* SERVICIO.OBJETO.AOBJ_MENSAJE_ALERTA[0].TXT_MENSAJE = 'HAS AÑADIDO' + ' ' + SERVICIO.OBJETO.NUM_CANTIDAD_PRODUCTOS_EN_ORDEN + ' ' + ' PRODUCTO';
              //_* $TIMEOUT(SERVICIO.OBJETO.FN_MENSAJE_ALERTA, 200,'FINALIZADO');
              servicio.objeto.FN_Calcular_Total();
              servicio.objeto.FN_Actualizar_Datos(1, servicio.objeto.AOBJ_Productos_Principal[i].PK_ID_Producto);
              //_* GUARDO EN OTRA VARIABLE DE LOCALSTORAGE  EL CONTADOR DE PRODUCTOS AGREGADOS
              //_* $LOCALSTORAGE.NUM_CANTIDAD_PRODUCTOS_EN_ORDEN = SERVICIO.OBJETO.NUM_CANTIDAD_PRODUCTOS_EN_ORDEN;
              //_* CONSOLE.ERROR($LOCALSTORAGE.NUM_CANTIDAD_PRODUCTOS_EN_ORDEN);
              //_* AL SER AGREGADO UN PRODUCTO A AOBJ_PRODUCTOS GUARDO EN LA VARIABLE $LOCALSTORAGE.DATOS_PRODUCTOS
              //_* EL PRODUCTO
              $localStorage.Datos_Productos = servicio.objeto.AOBJ_Productos;
              //_* CONSOLE.ERROR( $LOCALSTORAGE.DATOS_PRODUCTOS);


            }
            if ( servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto )
            {

              servicio.objeto.FN_Eliminar_Producto(servicio.objeto.AOBJ_Productos_Principal[i].PK_ID_Producto);

            }



          }
        }
      },
      FN_Eliminar_Producto: function (id_ing)
      {
        //_* PARA ELIMINAR UN PRODUCTO SE RECORRE AOBJ_PRODUCTOS CON LA PREGUNTA, HAY ALGUN PRODUCTO QUE CONCUERDE
        //_* CON ID_ING, SI SE ENCUNTRA SE ELIMINA DE AOBJ_PRODUCTOS Y LUEGO RECORRO AOBJ_PRODUCTOS_PRINCIPAL
        //_* CON LA PREGUNTA HAY ALGUN PRODUCTO QUE CONCUERDE CON EL ID_ING, SI ES ASI, PASO A CAMBIAR LOS VALORES QUE
        //_* SE LE ASIGNA A UN PRODUCTO AGREGADO , MUESTRO MENSAJE DE QUE SE ELIMINO EL PRODUCTO, MERMO EL CONTRADOR DE PRODUCTOS DE LA ORDEN
        //_* LLAMO A LA FUNCION FN_ACTUALIZAR_DATOS
        for (var i = 0; i < servicio.objeto.AOBJ_Productos.length; i++) {
          if (servicio.objeto.AOBJ_Productos[i].PK_ID_Producto == id_ing)
          {
            servicio.objeto.AOBJ_Productos.splice(i, 1);
            //_* AL BORRAR UN PRODUCTO VUELVO A RESETEAR EL LOCALSTORAGE
            delete $localStorage.Datos_Productos;
            //_* DESPUES DE RESETEAR LOCALSTORAGE, VUELVO A AGREGAR AOBJ_PRODUCTOS
            //_* ASI CONSIGO MANTENER ACTUALIZADO LOCALSTORAGE
            $localStorage.Datos_Productos = servicio.objeto.AOBJ_Productos;
            //_*  CONSOLE.ERROR($LOCALSTORAGE.DATOS_PRODUCTOS);
            servicio.objeto.NUM_Cantidad_Productos_En_Orden -= 1;

            //_* Este codigo no se esta utilizando en la parte movil ya que al ver la orden actual  se esta limpiando AOBJ_Productos_Principal por que la app queda con el tamaño  total de los productos, por ello este codigo no funcionara ya que el objeto esta vacio, lo que hace este codigo es recorrer el objeto principal de productos y cambiar todos los datos a default
            // for (var j = 0; j < servicio.objeto.AOBJ_Productos_Principal.length; j++) {
            //   if (servicio.objeto.AOBJ_Productos_Principal[j].PK_ID_Producto == id_ing)
            //   {
            //     alert("hoañ");

            //     servicio.objeto.AOBJ_Productos_Principal[j].TXT_Texto_Btn = 'Añadir a orden';
            //     servicio.objeto.AOBJ_Productos_Principal[j].BL_Estado_Producto = true;
            //     servicio.objeto.AOBJ_Productos_Principal[j].NUM_Cantidad = 0;
            //     servicio.objeto.AOBJ_Productos_Principal[j].NUM_Total_Producto = 0;
            //     servicio.objeto.NUM_Cantidad_Productos_En_Orden -= 1;
            //     //_*  SERVICIO.OBJETO.AOBJ_MENSAJE_ALERTA[0].TXT_MENSAJE = 'PRODUCTO REMOVIDO DE LA ORDEN';
            //     //_*  $TIMEOUT(SERVICIO.OBJETO.FN_MENSAJE_ALERTA, 200,'FINALIZADO');
            //     for (var L = 0; L < servicio.objeto.AOBJ_Productos_Principal.length; L++) {
            //       if (servicio.objeto.AOBJ_Productos_Principal[L].PK_ID_Producto == id_ing)
            //       {
            //         servicio.objeto.FN_Actualizar_Datos(1, servicio.objeto.AOBJ_Productos_Principal[L].PK_ID_Producto);
            //       }
            //     }
            //   }
            // }


          }
        }


      },
      FN_Actualizar_Datos: function (TipoActualizar, id_ing)
      //_* FN_ACTUALIZAR_DATOS FUNCIONA DEACUERDO AL PARAMETRO QUE SE INGRESA TIPOACTUALIZAR,
      //_*  SI SE INGRESA 1: ESTOY MODIFICANDO INFORMACION DESDE LA LISTA DE PRODUCTOS PRINCIPAL
      //_*  SI SE INGRESA 2_ ESTOY MODIFCANDO INFORMACION DESDE LA LISTA DE LA ORDEN DE PRODUCTOS
      //_*  LUEGO DE IDENTIFICAR EL TIPO DE ACTUUALIZAR QUE SE SOLICITA PASO A RECORRER
      //_*  AOBJ_PRODUCTOS_PRINCIPAL EN BUSCA DE ALGUN ID QUE CONCUERDE CON EL QUE SE INGRESO
      //_*  LUEGO PASO A LA PREGUNTA EL PRODUCTO EL PRODUCTO YA SE ENCUENTRA AGREGADO EN LA ORDEN, SI NO ES ASI
      //_*  TANSOLO ACTUALIZO LA INFORMACION DEL PRODUCTO DE LA LISTA PRINCIPAL
      //_*  SI SE ENCUNTRA AGREGADO, RECORRO AOBJ_PRODUCTOS CON LA PREGUNTA HAY ALGUN PRODUCTO QUE CONQCUERDE CON EL ID INGRESADO
      //_*  SI CONCUERDA IGUALO LOS VALORES COMO CANTIDAD, Y COSTO, POR ULTIMO EJECTUO CALCULAR_TOTAL
      //_*  EN CASO DE QUE SEA TIPOACTUALIZAR PASO AC ACTUALIZAR TANTO INFORMACION DEL PRODUCTO EN LA ORDEN COMO PRODUCTO EN LA LISTA PRINCIPAL
      {

        if (TipoActualizar == 1)
        {

          for (var i = 0; i < servicio.objeto.AOBJ_Productos_Principal.length; i++)
          {
            if (servicio.objeto.AOBJ_Productos_Principal[i].PK_ID_Producto == id_ing)
            {
              if (servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto === true)
              {
                servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto = servicio.objeto.AOBJ_Productos_Principal[i].Valor_Unitario * servicio.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad;
                servicio.objeto.FN_Calcular_Total();
              }
              if (servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto === false)
              {

                for (var j = 0; j < servicio.objeto.AOBJ_Productos.length; j++)
                {
                  if (servicio.objeto.AOBJ_Productos[j].PK_ID_Producto == id_ing)
                  {
                    servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto = servicio.objeto.AOBJ_Productos_Principal[i].Valor_Unitario * servicio.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad;
                    servicio.objeto.AOBJ_Productos[j].NUM_Cantidad = servicio.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad;
                    servicio.objeto.AOBJ_Productos[j].NUM_Costo = servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto;


                    servicio.objeto.FN_Calcular_Total();
                  }
                }
              }
            }
          }

        }



        else if (TipoActualizar == 2) {
          for (var i = 0; i < servicio.objeto.AOBJ_Productos.length; i++) {
            if (servicio.objeto.AOBJ_Productos[i].PK_ID_Producto == id_ing)
            {

              for (var j = 0; j < servicio.objeto.AOBJ_Productos_Principal.length; j++) {
                if (servicio.objeto.AOBJ_Productos_Principal[j].PK_ID_Producto == id_ing)
                {

                  servicio.objeto.AOBJ_Productos_Principal[j].NUM_Cantidad = servicio.objeto.AOBJ_Productos[i].NUM_Cantidad;
                  servicio.objeto.AOBJ_Productos_Principal[j].NUM_Total_Producto = servicio.objeto.AOBJ_Productos_Principal[j].Valor_Unitario * servicio.objeto.AOBJ_Productos_Principal[j].NUM_Cantidad;
                  servicio.objeto.AOBJ_Productos[i].NUM_Costo = servicio.objeto.AOBJ_Productos_Principal[j].NUM_Total_Producto;
                  servicio.objeto.FN_Calcular_Total();


                }
              }
            }
          }
        }
      },
      FN_Calcular_Total: function ()
      {
        //_* PARA CALCULAR EL TOTAL DE LA ORDEN, PRIMERO REINICIO EL CONTADOR DEL TOTAL
        //_*  COMO EL TOTAL SE MUESTRA ES EN LA ORDEN RECORRO AOBJ_PRODUCTOS CALCULANDO EN CADA ITERACION EL TOTAL
        servicio.objeto.NUM_Precio_Total_Orden = 0;
        for (var k = 0; k < servicio.objeto.AOBJ_Productos.length; k++)
        {

          servicio.objeto.NUM_Precio_Total_Orden += servicio.objeto.AOBJ_Productos[k].NUM_Costo;



        }
      },
      FN_Confirmacion_Alerta: function ()
      {
        //_* PARA ELIMINAR TODO EN LA ORDEN HAGO USO DE LA PROIEDAD SPLICE A LA CUAL LE DIGO QUE BORRE TODO DEACUERDO A LA CANTIDAD
        //_*  DE CAMPOS QUE POSEA AOBJ_PRODUCTOS,  REINICIO EL CONTADOR DE PRODUCTOS AGERREGADOS EN LA ORDEN
        //_*  Y LUEGO REINICIO TODOS LOS VALORES QDE LA ORDEN PRINCIAPL A SU ESTADO INICIAL
        servicio.objeto.NUM_Precio_Total_Orden = 0;
        servicio.objeto.NUM_Cantidad_Productos_En_Orden = 0;
        servicio.objeto.AOBJ_Productos.splice(0, servicio.objeto.AOBJ_Productos.length);
        
        //_*  SERVICIO.OBJETO.AOBJ_MENSAJE_ALERTA[0].TXT_MENSAJE = 'SE HAN REMOVIDO LOS PRODUCTOS DE LA ORDEN ';
        //_*  $TIMEOUT(SERVICIO.OBJETO.FN_MENSAJE_ALERTA, 200);
        //_*  SERVICIO.OBJETO.TIPO_MENSAJE_ALERTA = "FINALIZADO";

        //_* AL BORRAR UN PRODUCTO VUELVO A RESETEAR EL LOCALSTORAGE
        delete $localStorage.Datos_Productos;
        //_* DESPUES DE RESETEAR LOCALSTORAGE, VUELVO A AGREGAR AOBJ_PRODUCTOS
        //_* ASI CONSIGO MANTENER ACTUALIZADO LOCALSTORAGE
        $localStorage.Datos_Productos = servicio.objeto.AOBJ_Productos;
        //_*  CONSOLE.ERROR($LOCALSTORAGE.DATOS_PRODUCTOS);

        for (var i = 0; i < servicio.objeto.AOBJ_Productos_Principal.length; i++) {

          servicio.objeto.AOBJ_Productos_Principal[i].TXT_Texto_Btn = 'Añadir a orden';
          servicio.objeto.AOBJ_Productos_Principal[i].BL_Estado_Producto = true;
          servicio.objeto.AOBJ_Productos_Principal[i].NUM_Cantidad = 0;
          servicio.objeto.AOBJ_Productos_Principal[i].NUM_Total_Producto = 0;
          servicio.objeto.NUM_Cantidad_Productos_En_Orden = 0;
        }


      },


      
    }

  };

  return servicio;
}])
