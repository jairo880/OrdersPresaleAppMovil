//_* app.js es el controlador donde se manejan las rutas de las diferentes vistas de la pagina web
angular.module('AppOrders_Presale', ['ionic','AppOrders_Presale.controllers','angularUtils.directives.dirPagination','ngStorage'])

.run(function($ionicPlatform,$timeout) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'App_OrdersPresale_Principal'
  })

  .state('app.registro', {
    url: '/registro',
    views: {
      'menuContent': {
        templateUrl: 'templates/Usuario/registro.html',
        controller:'App_OrdersPresale_Principal'

      }
    }
  })

  .state('app.productos', {
    url: '/productos',
    views: {
      'menuContent': {
        templateUrl: 'templates/Productos/productos.html',
        controller: 'controllerproductos'

      }
    }
  })


  /*VISTAS INFORMACIÓN*/
  .state('app.informacion', {
    url: '/informacion',
    views: {
      'menuContent': {
        templateUrl: 'templates/Informacion/informacion.html',
        
      }
    }
  })

  .state('app.informacionproyecto', {
    url: '/informacionproyecto',
    views: {
      'menuContent': {
        templateUrl: 'templates/Informacion/informacionproyecto.html',
      }
    }
  })


/*VISTAS ANIDADAS COTIZACIONES*/
  .state('app.cotizaciones', {
    url: '/cotizaciones',
    views: {
      'menuContent': {
        templateUrl: 'templates/Cotizaciones/cotizaciones.html',
        controller: 'App_OrdersPresale_Principal'
      }
    }
  })

    .state('app.dllcotizacion', {
    url: '/cotizaciones/:detallecotizacion',
    views: {
      'menuContent': {
        templateUrl: 'templates/Cotizaciones/detallescotizacion.html',
        controller: 'controller_dll_cot'
      }
    }
  })





  $urlRouterProvider.otherwise('/app/productos');
})

