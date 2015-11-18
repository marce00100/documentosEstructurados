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
                    if (respuesta.mensaje) {
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
                    if (respuesta.mensaje) {
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
                    if (respuesta.mensaje) {
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
                .$promise.then(function(respuesta) {
                    if (respuesta.mensaje) {
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
    .controller('documentosNuevoCtrl', ['$scope', 'appFactory', '$resource', '$rootScope', 'marked', function($scope, appFactory, $resource, $rootScope, marked)
        {
            $scope.documento = {};

            function cargarPlantillasActivas()
            {
                // carga plantillas vigentes
                $resource("../s-doce-b/public/index.php/plantillas/vigente/1").get(function(respuesta) {
                    $scope.plantillasVigentes = respuesta.plantillas;
                });

                //carga plantilla maestra activa
                $resource("../s-doce-b/public/index.php/maestra/activa").get(function(respuesta) {
                    $scope.maestra = respuesta.plantilla_maestra;
                });
            }
            cargarPlantillasActivas();

            $scope.cargarPlantilla = function()
            {
                var idSeleccionado = $scope.documento.plantillaObjeto._id;
                appFactory.restPlantillas.get({id: idSeleccionado}, function(data)
                {
                    var plantillaContenido = $rootScope.adecuarContenidoPlantilla(data.plantilla.contenido);
                    $scope.documento.plantilla_contenido = plantillaContenido.contenidoIds;
                    $scope.documento.plantilla_contenidoHtml = marked(plantillaContenido.contenidoIdsHtml);
                });
            };

            $scope.guardar = function()
            {
                $scope.documento.plantilla_id = $scope.documento.plantillaObjeto._id;
                $scope.documento.plantilla_nombre = $scope.documento.plantillaObjeto.nombre;
                $scope.documento.contenido = $scope.adecuarDocumentoParaGuardar();
                appFactory.restDocumentos.save($scope.documento).$promise.then(function(respuesta)
                {
                    if (respuesta.mensaje) {
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
                var plantillaContenidosHtml = marked($scope.documento.plantilla_contenido); 
                $scope.documento.plantilla_contenidoHtml = $scope.adecuarContenidoDocumento($scope.documento.contenido, plantillaContenidosHtml );
            });

            $scope.guardar = function()
            {
                $scope.documento.contenido = $scope.adecuarDocumentoParaGuardar();
                appFactory.restDocumentos.update({id: $scope.documento._id}, $scope.documento)
                .$promise.then(function(respuesta)
                {
                    if (respuesta.mensaje) {
                    }
                });
            };
        }]);








    app.controller('pruebaCtrl', function($scope)
    {
        $scope.obtenerValores = function()
        {
            var inputs = angular.element("#contenedor").find('input');
            var texts = angular.element("#contenedor").find('textarea');
            contenidosJson = {nombre: "marco", apellido: "kkk"};
            contenidosJson.edad = "33";
            for (var i = 0; i < inputs.length; i++)
            {
                var propiedad = angular.element(inputs[i]).attr('id').toString();
                contenidosJson[propiedad] = angular.element(inputs[i]).val();
            }
//             for (var i = 0; i < texts.length; i++)
//                contenidosJson += '"' + angular.element(texts[i]).attr('id').toString() + '":"' + angular.element(texts[i]).val() + '",';


            $scope.resultado = contenidosJson;
        };

        $scope.pruebaTexto = function()
        {
            var char = "What is the best way to locate wherever the ";
            index = char.search("best");
            index2 = char.indexOf("best");
            newsub = "hidden='' ";
            nuevo = char.substr(0, index) + newsub + char.substr(index);
            console.log(char + " - " + index + " - " + index2 + " - " + nuevo);
        };
    });
