
    var app = angular.module('appMaestras', ['ngRoute', 'ngResource', 'hc.marked'])
    .config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/maestras', {
                templateUrl: "templates/maestras-lista.html",
                controller: "inicioCtrl"
            });
            $routeProvider.when('/maestras/nueva', {
//                templateUrl: "templates/maestras-nueva.html",
                templateUrl: "forms/maestrasForm.html",
                controller: "nuevoCtrl"
            });
            $routeProvider.when('/maestras/editar/:id', {
//                templateUrl: "templates/maestras-nueva.html",
                templateUrl: "forms/maestrasForm.html",
                controller: "editCtrl" 
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
        $scope.pololo = "maestrasFactory.polla";
        $scope.guardar = function() {
            maestrasFactory.resource.save($scope.maestra).$promise.then(function(respuesta)
            {
                if (respuesta.mensaje)
                {

                }
            });
//            maestrasFactory.irInicio();
        };

    })
    .controller('editCtrl', function($scope, maestrasFactory, $routeParams)
    {
        var id = $routeParams.id;
        maestrasFactory.resource.get({id: id}, function(data) {
            $scope.maestra = data.plantilla_maestra;
        });
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


