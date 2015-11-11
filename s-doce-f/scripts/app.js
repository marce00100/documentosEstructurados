
    var app = angular.module('appMaestras', ['ngRoute', 'ngResource', 'hc.marked', 'naif.base64'])
    .config(['markedProvider', function(markedProvider)
        {
            markedProvider.setOptions({gfm: true});
        }])
    .factory('appFactory', function($resource, $location)
    {
        var comun = {};

        //API-REST del Backend de Maestras
        comun.restMaestras = $resource("../s-doce-b/public/index.php/maestras/:id", {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@id"}}
        });

        //API-REST del Backend de Plantillas
        comun.restPlantillas = $resource("../s-doce-b/public/index.php/plantillas/:id", {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@id"}}
        });

        //API-REST del Backend de Documentos
        comun.restDocumentos = $resource("../s-doce-b/public/index.php/documentos/:id", {id: "@_id"}, {
            update: {method: "PUT", params: {id: "@id"}}
        });

//            comun.irInicio = function() {
//                $location.url("/maestras");
//            };
        return comun;
    })
    .run(function($rootScope) {
        $rootScope.markupSettings = settingsMarkdown;

        $rootScope.insertarImagen = function(img)
        {
            $rootScope.lastFocused;
            angular.element("textarea").focus(function() {
                $rootScope.lastFocused = document.activeElement;
            });
            var img64 = img64md(img);
            insertText(img64, $rootScope.lastFocused);
            return img64;
        };

        $rootScope.insertarCodigo = function(tipo)
        {
            var texto = "";
            $rootScope.lastFocused;
            angular.element("textarea").focus(function() {
                $rootScope.lastFocused = document.activeElement;
            });
            if (tipo === "1")
            {
                texto = '<!--de_lineatexto--><input type="text"><!--de_lineatexto-->';
            }
            else if (tipo === "2")
            {
                texto = '<!--de_cajatexto--><textarea></textarea><!--de_cajatexto-->';
            }
            else if (tipo === "3")
            {
                texto = '<label></label>';
            }
            insertText(texto, $rootScope.lastFocused);
        };
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



