<!DOCTYPE html>

<html>

    <head>
        <title>PageDown Demo Page</title>
        
        <link rel="stylesheet" type="text/css" href="demo.css" />
        <link href="prettify.css" type="text/css" rel="stylesheet" />
        
        <script type="text/javascript" src="../pagedown/Markdown.Converter.js"></script>
        <script type="text/javascript" src="../pagedown/Markdown.Sanitizer.js"></script>
        <script type="text/javascript" src="../pagedown/Markdown.Editor.js"></script>
        <script type="text/javascript" src="prettify.js"></script>       
        <script type="text/javascript" src="../Markdown.Extra.js"></script>
    </head>
    
    <body onload="prettyPrint()">
        <div class="wmd-panel">
            <div id="wmd-button-bar"></div>
            <textarea class="wmd-input" id="wmd-input"></textarea>
        </div>
        <div id="wmd-preview" class="wmd-panel wmd-preview"></div>
        
        <br /> <br />
        
        <script type="text/javascript">
            (function () {

                var converter1 = Markdown.getSanitizingConverter();
                Markdown.Extra.init(converter1, {
                  extensions: "all",
                  highlighter: "prettify"
                });

                var editor1 = new Markdown.Editor(converter1);
                editor1.hooks.chain("onPreviewRefresh", prettyPrint); // google code prettify
                editor1.run();
                
//                var converter2 = new Markdown.Converter();
//
//                converter2.hooks.chain("preConversion", function (text) {
//                    return text.replace(/\b(a\w*)/gi, "*$1*");
//                });
//                converter2.hooks.chain("plainLinkText", function (url) {
//                    return "This is a link to " + url.replace(/^https?:\/\//, "");
//                });
//                
//                // "all" is the default
//                Markdown.Extra.init(converter2, {highlighter: "prettify"});
//
//                var help = function () { alert("Do you need help?"); }
//                var options = {
//                    helpButton: { handler: help },
//                    strings: { quoteexample: "whatever you're quoting, put it right here" }
//                };
//                var editor2 = new Markdown.Editor(converter2, "-second", options);
//                editor2.hooks.chain("onPreviewRefresh", prettyPrint); // google code prettify
//                
//                editor2.run();
            })();
        </script>
    </body>
</html>
