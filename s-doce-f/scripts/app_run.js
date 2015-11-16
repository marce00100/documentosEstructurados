    app.run(function($rootScope) {
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
                texto = '<input>';
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
            var id = 101;

            while (text.toString().indexOf(opcion) != -1)
            {
                var opcionNueva = '<textarea id="' + id + '" markitup="markupSettings" class="markitup">';
                text = text.toString().replace(opcion, opcionNueva);
                id++;
            }
            opcion = "<input>";
            while (text.toString().indexOf(opcion) != -1)
            {
                var opcionNueva = '<input id="' + id + '" type="text">';
                text = text.toString().replace(opcion, opcionNueva);
                id++;
            }
            return text;
        };

        $rootScope.limpiar = function()
        {
            var inputs = angular.element("#editorDocumento").find('input');
            var texts = angular.element("#editorDocumento").find('textarea');
            for (var i = 0; i < texts.length; i++)
                angular.element(texts[i]).val("");
            for (var i = 0; i < inputs.length; i++)
                angular.element(inputs[i]).val("");
        };

        $rootScope.adecuarParaVisualizar = function(contenido)
        {
            text = contenido;
            var inputs = angular.element("#editorDocumento").find('input');
            var texts = angular.element("#editorDocumento").find('textarea');

            for (var i = 0; i < texts.length; i++)
            {
                var id = angular.element(texts[i]).attr('id');
                var opcionId = '<textarea id="' + id + '" markitup="markupSettings" class="markitup">';
                var opcionNueva = angular.element(texts[i]).val();
                text = text.toString().replace(opcionId, opcionNueva);
            }
            for (var i = 0; i < inputs.length; i++)
            {
                var id = angular.element(inputs[i]).attr('id');
                var opcionId = '<input id="' + id + '" type="text">';
                var opcionNueva = angular.element(inputs[i]).val();
                text = text.toString().replace(opcionId, opcionNueva);
            }
            return text;
        };

        $rootScope.adecuarDocumentoParaGuardar = function()
        {
            var inputs = angular.element("#editorDocumento").find('input');
            var texts = angular.element("#editorDocumento").find('textarea');
            contenidosJson = {};
            for (var i = 0; i < inputs.length; i ++)
                contenidosJson[angular.element(inputs[i]).attr('id').toString()] = angular.element(inputs[i]).val();
            for (var i = 0; i < texts.length; i++)
                contenidosJson[angular.element(texts[i]).attr('id').toString()] = angular.element(texts[i]).val();

            return contenidosJson;
        };

        $rootScope.adecuarContenidoDocumento = function(documentoContenido, plantillaContenido)
        {
            text = documentoContenido;
            var inputs = angular.element(plantillaContenido).find('input');
            var texts = angular.element(plantillaContenido).find('textarea');

            for (var i = 0; i < texts.length; i++)
            {
                var id = angular.element(texts[i]).attr('id');
                valor = documentoContenido[id];
                angular.element(texts[i]).val(valor);
            }
            for (var i = 0; i < inputs.length; i++)
            {
                var id = angular.element(inputs[i]).attr('id');
                valor = documentoContenido[id];
                angular.element(inputs[i]).val(valor);
            }
            return plantillaContenido;
        };


    });