
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
                    texto = '<input type="text">';
                }
                else if (tipo === "2")
                {
                    texto = '<textarea></textarea>';
                }
                else if (tipo === "3")
                {
                    texto = '<label></label>';
                }
                insertText(texto, $rootScope.lastFocused);
            };

            $rootScope.adecuarContenidoPlantilla = function(contenido)
            {
                text = contenido;
                var opcion = '<textarea>';
                var opcionNueva = '<textarea markitup="markupSettings" class="markitup">';
                while (text.toString().indexOf(opcion) != -1)
                {
                    text = text.toString().replace(opcion, opcionNueva);
                }
                return text;
            };

            $rootScope.adecuarParaVisualizar = function(contenido)
            {
                text = contenido;
                var opcion = '<textarea';
                var opcionNueva = '<!textarea';
                while (text.toString().indexOf(opcion) != -1)
                {
                    text = text.toString().replace(opcion, opcionNueva);
                }
                return text;
            };

            $rootScope.adecuarDocumentoParaGuardar = function(contenido)
            {
                text = contenido;
                var opcion = '<textarea markitup="markupSettings" class="markitup">';
                var opcionNueva = '<!textarea>';
                while (text.toString().indexOf(opcion) != -1)
                {
                    text = text.toString().replace(opcion, opcionNueva);
                }
                return text;
            };
            
            $rootScope.adecuarContenidoDocumento = function(contenido)
            {
                text = contenido;
                var opcion = '<!textarea>';
                var opcionNueva = '<textarea markitup="markupSettings" class="markitup">';
                while (text.toString().indexOf(opcion) != -1)
                {
                    text = text.toString().replace(opcion, opcionNueva);
                }
                return text;
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
        })
        .directive('bindHtmlCompile', ['$compile', function($compile) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attrs) {
                        scope.$watch(function() {
                            return scope.$eval(attrs.bindHtmlCompile);
                        }, function(value) {
                            // In case value is a TrustedValueHolderType, sometimes it
                            // needs to be explicitly called into a string in order to
                            // get the HTML string.
                            element.html(value && value.toString());
                            // If scope is provided use it, otherwise use parent scope
                            var compileScope = scope;
                            if (attrs.bindHtmlScope) {
                                compileScope = scope.$eval(attrs.bindHtmlScope);
                            }
                            $compile(element.contents())(compileScope);
                        });
                    }
                };
            }]);
    ;




