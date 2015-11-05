
    var app = angular.module('appMaestras', ['ngRoute', 'ngResource', 'hc.marked'])
    .config(['$routeProvider', function($routeProvider)
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
            $routeProvider.when('/maestras/x', {
                templateUrl: "templates/pruebas.html",
                controller: "pruebaCtrl"
            });
            $routeProvider.otherwise({
                redirectTo: '/maestras'
            });
        }])
    .config(['markedProvider', function(markedProvider)
        {
            markedProvider.setOptions({gfm: true});
        }])

    .factory('maestrasFactory', function($resource, $location)
    {
        var comun = {};
        comun.resource = $resource("../s-doce-b/public/index.php/maestras/:id", {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@id"}}
        });

        comun.irInicio = function() {
            $location.url("/maestras");
        };

        return comun;
    })

    .controller('inicioCtrl', function($scope, maestrasFactory)
    {
        maestrasFactory.resource.get(function(respuesta) {
            $scope.lista = respuesta.plantillas_maestras;
        });
    })
    .controller('nuevoCtrl', function($scope, maestrasFactory)
    {
        $scope.maestra = {};
        $scope.guardar = function() {
            maestrasFactory.resource.save($scope.maestra).$promise.then(function(respuesta)
            {
                if (respuesta.mensaje)
                {

                }
            });
        };

    })
    .controller('editCtrl', function($scope, maestrasFactory, $routeParams)
    {
        var id = $routeParams.id;
        maestrasFactory.resource.get({id: id}, function(data) {
            $scope.maestra = data.plantilla_maestra;
        });
        $scope.maestra = {};
        $scope.guardar = function()
        {
            maestrasFactory.resource.update({id: $scope.maestra._id}, $scope.maestra)
            .$promise.then(function(respuesta)
            {
                if (respuesta.mensaje)
                {

                }
            });
        };

    });

    app.run(function($rootScope) {
//        $rootScope = {};
        $rootScope.fnDefine = function(valor)
        {
            return (angular.isUndefined(valor) || valor == null) ? "" : valor;
        };
        $rootScope.fnMdNegritas = function()
        {
            return "****";
        };
    });
    app.factory('pruebaFct', function() {
        var comun = {};
        comun.text = function()
        {
            return 'hola ccccccccccccccc';
        };

        return comun;
    });
    app.controller('pruebaCtrl', function($scope, pruebaFct)
    {
        var pctrl = $scope;
        var persona = pruebaFct.text();
        pctrl.agregarNombre = function()
        {
            pctrl.txtPrueba = persona;
        };

        pctrl.btnNegritas = function()
        {
            pctrl.txtPrueba = pctrl.fnDefine(pctrl.txtPrueba) + pctrl.fnMdNegritas();
        };
    });


