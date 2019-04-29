


function checkOn() {
    if (document.getElementById("disclaimer").checked == true)
        document.getElementById("confirm").removeAttribute("disabled");
    else
        document.getElementById("confirm").setAttribute("disabled", "true");

}

function changeRename() { //invocata dall'input per il nuovo nome
    var form = document.getElementById("rename");

    var newName = toLowerSpace(form.value);
    if ((newName.localeCompare("")) != 0 && !lowerFonts.includes(newName)) {
        document.getElementById("checkRename").innerHTML = "<span style='color: green;'>&#10004</span>";
        document.getElementById("disclaimer").removeAttribute("disabled");
        if (document.getElementById("disclaimer").checked)
            document.getElementById("confirm").removeAttribute("disabled");
        fontName = form.value;
    }
    else {
        document.getElementById("checkRename").innerHTML = "<span style='color: red;'>&#10006</span>";
        document.getElementById("disclaimer").setAttribute("disabled", "true");
        document.getElementById("confirm").setAttribute("disabled", "true");

    }
}


function handleDrop(evt) {
    evt.preventDefault();
    showOutput(evt.dataTransfer.files);
}


function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}

function readFile(file, asText) {
    asText = (asText === undefined) ? true : asText;
    if (asText) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function () {
            preCheck(reader.result);
        }
    }
    else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            woffData = reader.result;
        }

    }
}

function uploadClick() {
    location.href = "#openModal";
}

function getExtension(file) {
    return file.name.substr((file.name.lastIndexOf('.') + 1));
}

function showOutput(files) {
    var form = document.getElementById("rename");
    form.value = "";
    document.getElementById("disclaimer").checked = false;

    switch (files.length) {
        case 0:
            return;

        case 2:
            var type = getExtension(files[0]);
            var type2 = getExtension(files[1]);
            if (type == type2) {
                output.innerHTML = "<span style='color: red;'>we don't need 2 " + type + " files </span>";
                return;
            }
            if (type2 == "css")
                cssFile = files[1];
            else {
                if (type2 == "woff2" || type2 == "woff")
                    woffFile = files[1];
            }

        case 1:
            var type = getExtension(files[0]);
            if (type == "css")
                cssFile = files[0];
            else {
                if (type == "woff2" || type == "woff")
                    woffFile = files[0];
            }
            document.getElementById("cancel").removeAttribute("disabled");
            break;


        default:
            output.innerHTML = "<span style='color: red;'>you can upload up to 1 css and 1 woff file</span>";
            return;

    }

    if (cssFile == null) {
        if (woffFile != null)
            output.innerHTML = woffFile.name + " uploaded but <br> <span style='color: red;'> you must upload also a .css file</span>";
        else
            output.innerHTML = "<span style='color: red;'> you must upload a .css file</span>";

    }
    else
        readFile(cssFile);
}


function preCheck(data) {
    cssText = data;
    var preCheckError = -1;
    var copy = data;
    copy = copy.toLowerCase();
    if (!copy.includes("@font-face")) {
        preCheckError = 0;


    }
    else {
        if (!copy.includes("font-family")) {
            preCheckError = 1;

        }
        else {
            if (!copy.includes("src")) {
                preCheckError = 2;

            }
            else {
                if (!copy.includes("url")) {
                    preCheckError = 3;

                }
                else {
                    if (copy.includes("http") && (!copy.includes("localhost") || copy.includes("file:///"))) {
                        preCheckError = -1;

                    }
                    else { //serve woff
                        preCheckError = 4;

                    }

                }
            }
        }
    }
    var div = document.getElementById("rename").parentNode;
    div.setAttribute("hidden", "");
    checkCss(preCheckError);
    var output = document.getElementById("output");
    output.innerHTML = msg;
    if (uploadEnabled) {
        if (getCssInfo()) {
            var div = document.getElementById("rename").parentNode;
            div.removeAttribute("hidden");
            var p = document.getElementById("oldExample");
            p.innerHTML = "Found font with same name: " + oldName + ". <span style='font-family:" + oldName + ";'> Example of it</span>";
            changeRename();
        }
        else {
            var div = document.getElementById("rename").parentNode;
            div.setAttribute("hidden", "true");
            var form = document.getElementById("rename");
            form.value = "";
            document.getElementById("disclaimer").removeAttribute("disabled");
        }
    }

}

function checkCss(preCheckError) {
    msg = "";
    switch (preCheckError) {
        case -1:
            msg = cssFile.name + " ~ " + (cssFile.size * 0.000000953674).toFixed(2) + " MB " +
                "<span style='color: green;'>&#10004</span><br>"; //tutto ok
            if (woffFile != null)
                msg = msg + "woff file not needed: font src is online";
            setUploadEnabled(true);
            break;
        case 0:
            msg = "<span style='color: red;'> Invalid css: @font-face command not found</span>";
            setUploadEnabled(false);
            break;
        case 1:
            msg = "<span style='color: red;'> Invalid css: font-family not found</span>";
            setUploadEnabled(false);
            break;
        case 2:
            msg = "<span style='color: red;'> Invalid css: src not found</span>";
            setUploadEnabled(false);
            break;
        case 3:
            msg = "<span style='color: red;'> Invalid css: src url not found</span>";
            setUploadEnabled(false);
            break;
        case 4:

            var tmpReturn = checkWoff();
            if (tmpReturn[1] == true) {
                setUploadEnabled(true);
                document.getElementById("disclaimer").removeAttribute("disabled");
                msg = cssFile.name + " ~ " + (cssFile.size * 0.000000953674).toFixed(2) + " MB " +
                    "<span style='color: green; '>&#10004</span>";
            }
            else {
                msg = cssFile.name + " ~ " + (cssFile.size * 0.000000953674).toFixed(2) + " MB " +
                    "<span style='color: green; '>&#10004</span>";
                setUploadEnabled(false);
            }
            msg = msg + tmpReturn[0];

            break;
    }

}

function checkWoff() {
    var msg = "<br>";
    var isOk = false;
    if (woffFile != null) {
        msg += woffFile.name + " ~ " + (woffFile.size * 0.000000953674).toFixed(2) + " MB " + //info woff file
            "<span style='color: green;'>&#10004</span> ";  //spunta verde
        readFile(woffFile, false);
        isOk = true;
    }
    else
        msg += ".woff (or .woff2) file needed " + "<span style='color: red;'>&#10006</span><br>";


    return [msg, isOk];
}


function setUploadEnabled(bool) {
    if (bool) {
        uploadEnabled = true;
    }
    else {
        document.getElementById("disclaimer").setAttribute("disabled", "true");
        document.getElementById("confirm").setAttribute("disabled", "true");
        document.getElementById("disclaimer").checked = false;
        uploadEnabled = false;
    }
}


function getCssInfo() {
    if (cssText == null) {
        document.getElementById("close").click();
        alert("Error: css not found");
    }
    else {
        var copy = cssText;
        var index = copy.indexOf("font-family");
        index = index + 11;
        var start = 0;
        var count = 0;
        var end = 0;
        while (count < 2 && index < copy.length) {
            if (copy.charAt(index) == "'") {
                if (count == 0) {
                    start = index + 1;
                    count = count + 1;
                }
                else {
                    end = index;
                    count = count + 1;
                }

            }
            index = index + 1;
        }

        var urlIndex = copy.indexOf("url");
        count = 0;
        var urlStart = 0;
        var urlEnd = 0;
        while (count < 2 && index < copy.length) {
            if (copy.charAt(urlIndex) == "(" || copy.charAt(urlIndex) == ")") {
                if (count == 0) {
                    urlStart = urlIndex + 1;
                    count = count + 1;
                }
                else {
                    urlEnd = urlIndex;
                    count = count + 1;
                }

            }
            urlIndex = urlIndex + 1;
        }

        urlUpload = cssText.substring(urlStart, urlEnd);
        return alreadyExist(cssText.substring(start, end));
    }
}

function alreadyExist(aName) {
    lowerFonts = fonts.map(toLowerSpace);
    var checkName = toLowerSpace(aName);
    if (alreadyInFonts(checkName)) {
        var ind = lowerFonts.indexOf(checkName);
        oldName = fonts[ind];
        return true;
    }
    else {

        fontName = aName;
        return false;
    }

}

function alreadyInFonts(string) {
    return lowerFonts.includes(string);
}

function toLowerSpace(string) {
    var tmp = string.replace(/\s/g, '');
    tmp = tmp.toLowerCase();
    return tmp;
}


function confirmUpload() {
    fontName = fontName.charAt(0).toUpperCase() + fontName.slice(1);
    createStyle();
    clientFonts[fontName] = urlUpload;
    fonts.push(fontName);
    fonts.sort();

    sessionStorage.setItem("fonts", JSON.stringify(fonts));
    sessionStorage.setItem("clientFonts",JSON.stringify(clientFonts));


    confirmFontInput(fontName);
    document.getElementById("close").click();
}

function createStyle() {
    var url = urlUpload;
    if (woffData != null)
        url = woffData;
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
@font-face {\
    font-family: " + fontName + ";\
    src: url('" + url + "');\
}\
"));

    styles.push("\
@font-face {\
    font-family: " + fontName + ";\
    src: url('" + url + "');\
}\
");
    sessionStorage.setItem("styles",JSON.stringify(styles));

    document.head.appendChild(newStyle);
}

function isClientFont(checkname) {
    if (clientFonts[checkname] != undefined)
        return true;
    else
        return false;
}

function cancelUpload() {
    cssFile = null;
    cssText = null;
    uploadEnabled = false;
    woffFile = null;
    woffData = null;
    urlUpload = "";
    fontName = "";
    oldName = "";

    document.getElementById("output").innerHTML = "";
    document.getElementById("hiddenInput").value = null;
    document.getElementById("confirm").setAttribute("disabled", "true");
    document.getElementById("cancel").setAttribute("disabled", "true");
    document.getElementById("disclaimer").setAttribute("disabled", "true");
    document.getElementById("disclaimer").checked = false;
    var div = document.getElementById("rename").parentNode;
    div.setAttribute("hidden", "true");
    document.getElementById("checkRename").innerHTML = "";
    document.getElementById("rename").value = null;
}



