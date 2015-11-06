
    var app = angular.module('appMaestras', ['ngRoute', 'ngResource', 'hc.marked'])
        .config(['markedProvider', function(markedProvider)
            {
                markedProvider.setOptions({gfm: true});
            }])
        .factory('appFactory', function($resource, $location)
        {
            var comun = {};
            comun.restMaestras = $resource("../s-doce-b/public/index.php/maestras/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}} 
            });

            comun.restPlantillas = $resource("../s-doce-b/public/index.php/plantillas/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}}
            });

//            comun.irInicio = function() {
//                $location.url("/maestras");
//            };
            return comun;
        })

        .run(function($rootScope) {
            $rootScope.markupSettings = settingsMarkdown;

        })
        .directive("markitup", function() {
            return {
                restrict: "A",
                scope: {
                    settings: "=markitup"
                },
                link: function(scope, element, attrs) {
                    angular.element(element).markItUp(scope.settings);
                }
            };
        });

    /*
     * Rutas  y Controladores de MAESTRAS ===================================================================
     * 
     */

    app.config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/maestras', {
                templateUrl: "templates/maestras-lista.html",
                controller: "inicioCtrl"
            });
            $routeProvider.when('/maestras/nueva', {
                templateUrl: "templates/maestras-nueva.html",
                controller: "nuevoCtrl"
            });
            $routeProvider.when('/maestras/editar/:id', {
                templateUrl: "templates/maestras-editar.html",
                controller: "editCtrl"
            });
            $routeProvider.when('/x', {
                templateUrl: "templates/pruebas.html",
                controller: "pruebaCtrl"
            });


            $routeProvider.otherwise({
                redirectTo: '/maestras'
            });
        }])
        .controller('inicioCtrl', function($scope, appFactory)
        {
            appFactory.restMaestras.get(function(respuesta) {
                $scope.lista = respuesta.plantillas_maestras;
            });
        })
        .controller('nuevoCtrl', function($scope, appFactory)
        {
//    $scope.markupSettings = settingsMarkdown;
            $scope.maestra = {};
            $scope.guardar = function() {
                appFactory.restMaestras.save($scope.maestra).$promise.then(function(respuesta)
                {
                    if (respuesta.mensaje)
                    {

                    }
                });
            };
        })
        .controller('editCtrl', function($scope, appFactory, $routeParams)
        {
            var id = $routeParams.id;
            appFactory.restMaestras.get({id: id}, function(data) {
                $scope.maestra = data.plantilla_maestra;
            });
            $scope.maestra = {};
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
        });

    /*
     * Rutas  y Controladores de PLANTILLAS ============================================================
     * 
     */

    app.config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/plantillas', {
                templateUrl: "templates/plantillas-lista.html",
                controller: "plantillainicioCtrl"
            });
            $routeProvider.when('/plantillas/nueva', {
                templateUrl: "templates/plantillas-nueva.html",
                controller: "plantillanuevoCtrl"
            });
            $routeProvider.when('/plantillas/editar/:id', {
                templateUrl: "templates/plantillas-editar.html",
                controller: "plantillaeditCtrl"
            });

        }])

        .controller('plantillainicioCtrl', function($scope, appFactory)
        {
            appFactory.restPlantillas.get(function(respuesta) {
                $scope.lista = respuesta.plantillas;
            });
        })
        .controller('plantillanuevoCtrl', function($scope, appFactory)
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
        })
        .controller('plantillaeditCtrl', function($scope, appFactory, $routeParams)
        {
            var id = $routeParams.id;
            appFactory.restPlantillas.get({id: id}, function(data) {
                $scope.plantilla = data.plantilla;
            });
            $scope.plantilla = {};

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
        });









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


