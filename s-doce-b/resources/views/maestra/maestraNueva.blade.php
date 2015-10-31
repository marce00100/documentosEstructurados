
<link href="../../js/pagedown-extra-master/demo/prettify.css" rel="stylesheet" type="text/css"/>
<script src="../../js/jquery-1.11.3.min.js" type="text/javascript"></script>

<script src="../../js/pagedown-extra-master/pagedown/Markdown.Converter.js" type="text/javascript"></script>
<script src="../../js/pagedown-extra-master/pagedown/Markdown.Sanitizer.js" type="text/javascript"></script>
<script src="../../js/pagedown-extra-master/pagedown/Markdown.Editor.js" type="text/javascript"></script>
<script src="../../js/pagedown-extra-master/demo/prettify.js" type="text/javascript"></script>
<script src="../../js/pagedown-extra-master/Markdown.Extra.js" type="text/javascript"></script>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" /> 
        <meta http-equiv="X-UA-Compatible" content="chrome=1" />
        <meta name="description" content="js-markdown-extra : PHP-Markdown-extra compatible Javascript markdown syntax parser" />

        <style>
            #wmd-input { width:99%; height:400px; font-size:10pt; font-family:monospace; border:1px solid gray; }
            #wmd-preview { height:400px; overflow:scroll; border:1px solid gray; padding:0.5em; }
            #txtHtmlCodigo { width:auto; height:200px; font-size:10pt; font-family:monospace; overflow:scroll; border:1px solid gray; padding:0.5em; }
            #txtHtmlResultado img { width: auto; height:auto; }
        </style>

    </head>
    <body>

        <script>
            $(function() {
                $("#idtexto").val("hola");

                var converter1 = Markdown.getSanitizingConverter();
                Markdown.Extra.init(converter1, {
                    extensions: "all",
                    highlighter: "prettify"
                });

                var editor1 = new Markdown.Editor(converter1);
                editor1.hooks.chain("onPreviewRefresh", prettyPrint); // google code prettify
                editor1.run();



            });
        </script>

        <!-- MAIN CONTENT -->
        <div id="main_content_wrap" class="outer">
            <section id="main_content" class="inner">
                <div style="float:left; width:50%;">
                    <h1>Markdown - pageDOwn</h1>

                    <textarea class="wmd-input" id="wmd-input" ></textarea>
                </div>

                <div style="float:right; width:50%;">
                    <h1>Html</h1>
                    <div id="wmd-preview" >
                    </div>
                    <pre id="txtHtmlCodigo">
                    </pre>
                </div>
            </section>
        </div>
        <form action="{{action('MaestraController@crear')}}" method="POST">
            <input type="hidden" name="_token" value="<?= csrf_token(); ?>"
            <br> Nombre: <input type="text" id="nombre" name="nombre" >
        <br> Apellido: <input type="text" id="apellido" name="apellido">
        <br> Cargo: <input type="text" id="cargo" name="cargo">
        <br> CI: <input type="text" id="ci" name="ci">
        <br> Ciudad: <input type="text" id="ciudad" name="ciudad">
        <input type="submit" value="guardar" >
        </form>
    </body>

</html>
