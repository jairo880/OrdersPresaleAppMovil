app.controller( 'controller_dll_cot', [ '$scope', 'Factory', '$http', function ( $scope, Factory, $http ) 
{
	$scope.Dato=[];

	$scope.CargarDllCotizacion = function ( )
	{
		console.log( Factory.objeto.OB_Dll_Cotizacion );
		$scope.dato = Factory.objeto;
	}
}]);