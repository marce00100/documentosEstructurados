    function img64md($fs)
    {
        var imgBase64 = "";
        if ((typeof $fs !== "undefined") && ($fs !== null))
        {
            console.log($fs);
            imgBase64 = "![" + $fs.filename + "]( data:image;base64," + $fs.base64 + ")";
            //return (isUndefined(fs.base64) || isNull(fs.base64))?'':fs.base64 ; //file.base64;
        }
        return imgBase64;
    }

    function insertText(text, objecto)
    {
        var input = objecto;
        console.log(input);
        if (input == undefined) {
            return;
        }
        var scrollPos = input.scrollTop;
        var pos = 0;
        var browser = ((input.selectionStart || input.selectionStart == "0") ?
            "ff" : (document.selection ? "ie" : false));
        if (browser == "ie") {
            input.focus();
            var range = document.selection.createRange();
            range.moveStart("character", -input.value.length);
            pos = range.text.length;
        }
        else if (browser == "ff") {
            pos = input.selectionStart
        }
        ;
        var front = (input.value).substring(0, pos);
        var back = (input.value).substring(pos, input.value.length);
        input.value = front + text + back;
        pos = pos + text.length;
        if (browser == "ie") {
            input.focus();
            var range = document.selection.createRange();
            range.moveStart("character", -input.value.length);
            range.moveStart("character", pos);
            range.moveEnd("character", 0);
            range.select();
        }
        else if (browser == "ff") {
            input.selectionStart = pos;
            input.selectionEnd = pos;
            input.focus();
        }
        input.scrollTop = scrollPos;
        console.log(angular.element(input).val());
        angular.element(input).trigger('input');
    }

    

