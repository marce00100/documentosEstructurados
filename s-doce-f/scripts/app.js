
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
                texto = '<!--cuadrotexto--><input type="text"><!--_cuadrotexto-->';
            }
            else if (tipo === "2")
            {
                texto = '<!--bloquetexto--><textarea></textarea><!--_bloquetexto-->';
            }
            else if (tipo === "3")
            {
                texto = '<!--autotexto--><label></label><!--_autobloquetexto-->';
            }
            insertText(texto, $rootScope.lastFocused);
        };

        $rootScope.adecuarTextoPlantilla = function(contenido)
        {
            text = contenido;
            var opcion = '<textarea>';
            var id = 0;
            while (text.toString().indexOf(opcion) != -1)
            {
                var opcionNueva = '<textarea id="txt_' + id.toString() +'"  ng-model="txt_' + id.toString() +'" markitup="markupSettings" class="markitup" >';

                text = text.toString().replace(opcion, opcionNueva);
                id++;
            }
            return text;

        };
        $rootScope.reemplazarInputs = function()
        {

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



