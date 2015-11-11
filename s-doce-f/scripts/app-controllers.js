    /*
     * Rutas  y Controladores de MAESTRAS ===================================================================
     * 
     */

    app.config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/maestras', {
                templateUrl: "templates/maestras-lista.html",
                controller: "maestrasInicioCtrl"
            });
            $routeProvider.when('/maestras/nueva', {
                templateUrl: "templates/maestras-nueva.html",
                controller: "maestrasNuevaCtrl"
            });
            $routeProvider.when('/maestras/editar/:id', {
                templateUrl: "templates/maestras-editar.html",
                controller: "maestrasEditarCtrl"
            });

            $routeProvider.when('/x', {
                templateUrl: "templates/pruebas.html",
                controller: "pruebaCtrl"
            });

            $routeProvider.otherwise({
                redirectTo: '/maestras'
            });
        }])
        .controller('maestrasInicioCtrl', ['$scope', 'appFactory', function($scope, appFactory)
            {
                appFactory.restMaestras.get(function(respuesta) {
                    $scope.lista = respuesta.plantillas_maestras;
                });
            }])
        .controller('maestrasNuevaCtrl', ['$scope', 'appFactory', function($scope, appFactory)
            {
                $scope.maestra = {};
                $scope.guardar = function() {
                    appFactory.restMaestras.save($scope.maestra).$promise.then(function(respuesta)
                    {
                        if (respuesta.mensaje)
                        {

                        }
                    });
                };
            }])
        .controller('maestrasEditarCtrl', ['$scope', 'appFactory', '$routeParams', function($scope, appFactory, $routeParams)
            {
                $scope.maestra = {};
                var id = $routeParams.id;
                appFactory.restMaestras.get({id: id}, function(data) {
                    $scope.maestra = data.plantilla_maestra;
                });

                $scope.guardar = function()
                {
                    appFactory.restMaestras.update({id: $scope.maestra._id}, $scope.maestra)
                        .$promise.then(function(respuesta)
                        {
                            if (respuesta.mensaje)
                            {

                            }
                        });
                };
            }]);

    /*
     * Rutas  y Controladores de PLANTILLAS ============================================================
     * 
     */

    app.config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/plantillas', {
                templateUrl: "templates/plantillas-lista.html",
                controller: "plantillasInicioCtrl"
            });
            $routeProvider.when('/plantillas/nueva', {
                templateUrl: "templates/plantillas-nueva.html",
                controller: "plantillasNuevaCtrl"
            });
            $routeProvider.when('/plantillas/editar/:id', {
                templateUrl: "templates/plantillas-editar.html",
                controller: "plantillasEditarCtrl"
            });
        }])
        .controller('plantillasInicioCtrl', ['$scope', 'appFactory', function($scope, appFactory)
            {
                appFactory.restPlantillas.get(function(respuesta) {
                    $scope.lista = respuesta.plantillas;
                });
            }])
        .controller('plantillasNuevaCtrl', ['$scope', 'appFactory', function($scope, appFactory)
            {
                $scope.plantilla = {};
                $scope.guardar = function() {
                    appFactory.restPlantillas.save($scope.plantilla).$promise.then(function(respuesta)
                    {
                        if (respuesta.mensaje)
                        {

                        }
                    });
                };
            }])
        .controller('plantillasEditarCtrl', ['$scope', 'appFactory', '$routeParams', function($scope, appFactory, $routeParams)
            {
                $scope.plantilla = {};
                var id = $routeParams.id;
                appFactory.restPlantillas.get({id: id}, function(data) {
                    $scope.plantilla = data.plantilla;
                });

                $scope.guardar = function()
                {
                    appFactory.restPlantillas.update({id: $scope.plantilla._id}, $scope.plantilla)
                        .$promise.then(function(respuesta)
                        {
                            if (respuesta.mensaje)
                            {

                            }
                        });
                };
            }]);

    /*
     * Rutas  y Controladores de DOCUMENTOS ============================================================
     * 
     */

    app.config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/documentos', {
                templateUrl: "templates/documentos-lista.html",
                controller: "documentosInicioCtrl"
            });
            $routeProvider.when('/documentos/nuevo', {
                templateUrl: "templates/documentos-nuevo.html",
                controller: "documentosNuevoCtrl"
            });
            $routeProvider.when('/documentos/editar/:id', {
                templateUrl: "templates/documentos-editar.html",
                controller: "documentosEditarCtrl"
            });
        }])
        .controller('documentosInicioCtrl', ['$scope', 'appFactory', function($scope, appFactory)
            {
                appFactory.restDocumentos.get(function(respuesta) {
                    $scope.lista = respuesta.documentos;
                });
            }])
        .controller('documentosNuevoCtrl', ['$scope', 'appFactory', '$resource', function($scope, appFactory, $resource)
            {
                $scope.documento = {};

                $resource("../s-doce-b/public/index.php/plantillas/vigente/1").get(function(respuesta) {
                    $scope.plantillasVigentes = respuesta.plantillas;
                });

                $scope.cargarPlantilla = function(idSeleccionado)
                {
                    appFactory.restPlantillas.get({id: idSeleccionado}, function(data) {
                        $scope.documento.contenido = data.plantilla.contenido;
                    });
                };


                $scope.guardar = function() {
                    appFactory.restDocumentos.save($scope.documento).$promise.then(function(respuesta)
                    {
                        if (respuesta.mensaje)
                        {

                        }
                    });
                };
            }])
        .controller('documentosEditarCtrl', ['$scope', 'appFactory', '$routeParams', function($scope, appFactory, $routeParams)
            {
                $scope.documento = {};
                var id = $routeParams.id;
                appFactory.restDocumentos.get({id: id}, function(data) {
                    $scope.documento = data.documento;
                });

                $scope.guardar = function()
                {
                    appFactory.restDocumentos.update({id: $scope.documento._id}, $scope.documento)
                        .$promise.then(function(respuesta)
                        {
                            if (respuesta.mensaje)
                            {

                            }
                        });
                };
            }]);







//app.factory('pruebaFct', function() {
//    var comun = {};
//    comun.text = function()
//    {
//        return 'hola ccccccccccccccc';
//    };
//    return comun;
//});
//app.controller('pruebaCtrl', function($scope, pruebaFct)
//{
//    var pctrl = $scope;
//    var persona = pruebaFct.text();
//    pctrl.agregarNombre = function()
//    {
//        pctrl.txtPrueba = persona;
//    };
//    pctrl.btnNegritas = function()
//    {
//        pctrl.txtPrueba = pctrl.fnDefine(pctrl.txtPrueba) + pctrl.fnMdNegritas();
//    };
//});
