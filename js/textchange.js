var size = 35;
var name = "arial";
var style = "normal";
var weight = "100";
var variant = "normal";
var align = "left";
var justify = "none";
var transform = "none";
var transformarray = [0, 0, 0];
var decorationline = "none";
var declinearray = [0, 0, 0];
var decorationstyle = "solid";
var decorationcolor = "#000000";
var decskiparray = [0, 0, 0, 0];
var decorationskip = "none";
var direction = "ltr";
var letter = "1";
var word = "1";
var height = "53";
var indent = "0";
var shadowh = "0";
var shadowv = "0";
var shadowc = "#000000";
var shadowb = "0";
var shadow = "none";
var backgroundcolor = "#FFFFFF";
var myopacity = "1";
var rcolor = 0;
var gcolor = 0;
var bcolor = 0;


function passname(n) {
    name = n;
    apply();
}

function slidersizechange() {
    size = document.getElementById("slidersize").value;

    apply();
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function styleChangeNormal() {
    style = "normal";
    document.getElementById("normalstyle").setAttribute("class", "btnactive");
    document.getElementById("italicstyle").removeAttribute("class", "btnactive");
    apply();


}

function styleChangeItalic() {
    style = "italic";
    document.getElementById("italicstyle").setAttribute("class", "btnactive");
    document.getElementById("normalstyle").removeAttribute("class", "btnactive");
    apply();
}

function sliderWeightChange() {
    weight = document.getElementById("sliderweight").value;


    apply();
}

function variantChangeNormal() {
    variant = "normal";
    document.getElementById("normalvariant").setAttribute("class", "btnactive");
    document.getElementById("smallcapsvariant").removeAttribute("class", "btnactive");
    apply();
}

function variantChangeSmallcaps() {
    variant = "small-caps";
    document.getElementById("normalvariant").removeAttribute("class", "btnactive");
    document.getElementById("smallcapsvariant").setAttribute("class", "btnactive");
    apply();
}

function colorChange() {
    var color = document.getElementById("fontcolor").value;
    var colorarray = hexToRgb(color);
    rcolor = colorarray[0];
    gcolor = colorarray[1];
    bcolor = colorarray[2];
    apply();
}

function alignLeftChange() {
    align = "left";
    document.getElementById("leftalign").setAttribute("class", "leftalignactive");
    document.getElementById("centeralign").setAttribute("class", "centeralign");
    document.getElementById("rightalign").setAttribute("class", "rightalign");
    document.getElementById("justifyalign").setAttribute("class", "justifyalign");
    disableJustify();
    apply();
}

function alignCenterChange() {
    align = "center";
    document.getElementById("leftalign").setAttribute("class", "leftalign");
    document.getElementById("centeralign").setAttribute("class", "centeralignactive");
    document.getElementById("rightalign").setAttribute("class", "rightalign");
    document.getElementById("justifyalign").setAttribute("class", "justifyalign");
    disableJustify();
    apply();
}

function alignRightChange() {
    align = "right";
    document.getElementById("leftalign").setAttribute("class", "leftalign");
    document.getElementById("centeralign").setAttribute("class", "centeralign");
    document.getElementById("rightalign").setAttribute("class", "rightalignactive");
    document.getElementById("justifyalign").setAttribute("class", "justifyalign");
    disableJustify();
    apply();
}
function disableJustify() {
    document.getElementById("autojustify").disabled = true;
    document.getElementById("wordjustify").disabled = true;
    document.getElementById("caratterejustify").disabled = true;
    document.getElementById("wordjustify").removeAttribute("class", "btnactive");
    document.getElementById("caratterejustify").removeAttribute("class", "btnactive");
    document.getElementById("autojustify").removeAttribute("class", "btnactive");

    justify="none";
}

function alignJustifyChange() {
    align = "justify";
    document.getElementById("autojustify").disabled = false;
    document.getElementById("wordjustify").disabled = false;
    document.getElementById("caratterejustify").disabled = false;


    document.getElementById("leftalign").setAttribute("class", "leftalign");
    document.getElementById("centeralign").setAttribute("class", "centeralign");
    document.getElementById("rightalign").setAttribute("class", "rightalign");
    document.getElementById("justifyalign").setAttribute("class", "justifyalignactive");
    apply();
}

function autoChange() {
    console.log("ciaooo");
    document.getElementById("autojustify").setAttribute("class", "btnactive");
    document.getElementById("wordjustify").removeAttribute("class", "btnactive");
    document.getElementById("caratterejustify").removeAttribute("class", "btnactive");
    justify="auto";
    apply()
}
function wordChange() {
    justify = "inter-word";
    document.getElementById("wordjustify").setAttribute("class", "btnactive");
    document.getElementById("autojustify").removeAttribute("class", "btnactive");
    document.getElementById("caratterejustify").removeAttribute("class", "btnactive");
    apply();
}

function carattereChange() {
    justify = "inter-character";
    document.getElementById("caratterejustify").setAttribute("class", "btnactive");
    document.getElementById("wordjustify").removeAttribute("class", "btnactive");
    document.getElementById("autojustify").removeAttribute("class", "btnactive");
    apply();
}

function upperTransformChange() {
    if (transformarray[0] === 1) {
        transform = "none";
        transformarray[0] = 0;
        document.getElementById("uppercasetransform").setAttribute("class", "button");

    }
    else {
        transformarray[0] = 1;
        transformarray[1] = 0;
        transformarray[2] = 0;
        transform = "uppercase";
        document.getElementById("uppercasetransform").setAttribute("class", "btnactive");
        document.getElementById("lowercasetransform").setAttribute("class", "button");
        document.getElementById("capitalizetransform").setAttribute("class", "button");


    }
    apply();
}

function lowerTransformChange() {
    if (transformarray[1] === 1) {
        transform = "none";
        transformarray[1] = 0;
        document.getElementById("lowercasetransform").setAttribute("class", "button");

    }
    else {
        transformarray[0] = 0;
        transformarray[1] = 1;
        transformarray[2] = 0;
        transform = "lowercase";
        document.getElementById("uppercasetransform").setAttribute("class", "button");
        document.getElementById("lowercasetransform").setAttribute("class", "btnactive");
        document.getElementById("capitalizetransform").setAttribute("class", "button");


    }
    apply();
}

function capitalizeTransformChange() {
    if (transformarray[2] === 1) {
        transform = "none";
        transformarray[2] = 0;
        document.getElementById("capitalizetransform").setAttribute("class", "button");

    }
    else {
        transformarray[0] = 0;
        transformarray[1] = 0;
        transformarray[2] = 1;
        transform = "capitalize";
        document.getElementById("uppercasetransform").setAttribute("class", "button");
        document.getElementById("lowercasetransform").setAttribute("class", "button");
        document.getElementById("capitalizetransform").setAttribute("class", "btnactive");


    }
    apply();
}

function underlineDecorationChange() {
    declinearray[0]++;
    declinearray[0] = (declinearray[0] % 2);
    lineDecorationSum();
}

function overlineDecorationChange() {
    declinearray[1]++;
    declinearray[1] = (declinearray[1] % 2);
    lineDecorationSum();
}

function linethroughDecorationChange() {
    declinearray[2]++;
    declinearray[2] = (declinearray[2] % 2);
    lineDecorationSum();
}

function lineDecorationSum() {
    var txt = "";
    if (declinearray[0] === 1) {
        txt = "underline ";
        document.getElementById("underlinedecoration").setAttribute("class", "btnactive");

    }
    else {
        document.getElementById("underlinedecoration").removeAttribute("class", "btnactive");

    }
    if (declinearray[1] === 1) {
        txt += "overline ";
        document.getElementById("overlinedecoration").setAttribute("class", "btnactive");

    }
    else {
        document.getElementById("overlinedecoration").removeAttribute("class", "btnactive");

    }
    if (declinearray[2] === 1) {
        txt += "line-through ";
        document.getElementById("linethroughdecoration").setAttribute("class", "btnactive");

    }
    else {
        document.getElementById("linethroughdecoration").removeAttribute("class", "btnactive");

    }
    if (declinearray[0] !== 1) {
        if (declinearray[1] !== 1) {
            if (declinearray[2] !== 1) {
                txt = "none";

            }
        }
    }
    decorationline = txt;
    apply();
}

function solidDecorationChange() {
    decorationstyle = "solid";
    document.getElementById("solidstyledecoration").setAttribute("class", "btnactive");
    document.getElementById("doublestyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dottedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dashedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("wavystyledecoration").removeAttribute("class", "btnactive");
    apply();
}

function doubleDecorationChange() {
    decorationstyle = "double";
    document.getElementById("solidstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("doublestyledecoration").setAttribute("class", "btnactive");
    document.getElementById("dottedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dashedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("wavystyledecoration").removeAttribute("class", "btnactive");
    apply();
}

function dottedDecorationChange() {
    decorationstyle = "dotted";
    document.getElementById("solidstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("doublestyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dottedstyledecoration").setAttribute("class", "btnactive");
    document.getElementById("dashedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("wavystyledecoration").removeAttribute("class", "btnactive");
    apply();
}

function dashedDecorationChange() {
    decorationstyle = "dashed";
    document.getElementById("solidstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("doublestyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dottedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dashedstyledecoration").setAttribute("class", "btnactive");
    document.getElementById("wavystyledecoration").removeAttribute("class", "btnactive");
    apply();
}

function wavyDecorationChange() {
    decorationstyle = "wavy";
    document.getElementById("solidstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("doublestyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dottedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("dashedstyledecoration").removeAttribute("class", "btnactive");
    document.getElementById("wavystyledecoration").setAttribute("class", "btnactive");
    apply();
}

function decorationColorChange() {
    decorationcolor = document.getElementById("decorationcolor").value;
    apply();
}


function ltrDirectionChange() {
    direction = "ltr";
    document.getElementById("ltrdirection").setAttribute("class", "btnactive");
    document.getElementById("rtldirection").removeAttribute("class", "btnactive");
    var str = document.getElementById("mytext").value;
    document.getElementById("mytext").value = reverseString(str);
    apply();
}

function rtlDirectionChange() {
    direction = "rtl";
    document.getElementById("ltrdirection").removeAttribute("class", "btnactive");
    document.getElementById("rtldirection").setAttribute("class", "btnactive");
    var str = document.getElementById("mytext").value;
    document.getElementById("mytext").value = reverseString(str);
    apply();
}

function sliderLetterChange() {
    letter = document.getElementById("sliderletter").value;

    apply();
}

function sliderWordChange() {
    word = document.getElementById("sliderword").value;

    apply();
}

function sliderHeightChange() {
    height = document.getElementById("sliderheight").value;

    apply();
}

function sliderIndentChange() {
    indent = document.getElementById("sliderindent").value;
    apply();
}

function sliderShadowHChange() {
    shadowh = document.getElementById("slidershadowh").value;

    shadowsum();
}

function sliderShadowVChange() {
    shadowv = document.getElementById("slidershadowv").value;

    shadowsum();

}
function sliderShadowBChange() {
    shadowb = document.getElementById("slidershadowb").value;

    shadowsum();

}

function shadowColorChange() {
    shadowc = document.getElementById("shadowcolor").value;
    shadowsum();

}

function shadowsum() {
    shadow = shadowh + "px " + shadowv + "px " + shadowb+ "px " +shadowc;
    if (shadowh === "0" && shadowv === "0" && shadowb==="0") {
        shadow = "none";
    }

    apply();
}

function sliderOpacityChange() {
    myopacity = document.getElementById("slideropacity").value;
    apply();
}

function hexToRgb(color) {
    if (color.substring(0, 1) === '#') {
        color = color.substring(1);
    }
    var rgb = [];
    rgb[0] = parseInt(color.substring(0, 2), 16);
    rgb[1] = parseInt(color.substring(2, 4), 16);
    rgb[2] = parseInt(color.substring(4), 16);
    return rgb;


}

function luminanace(r, g, b) {

    var rr = 0.0;
    var gg = 0.0;
    var bb = 0.0;
    var R = 0.0;
    var G = 0.0;
    var B = 0.0;
    rr = r / 255;
    gg = g / 255;
    bb = b / 255;
    if (rr <= 0.03928) {
        R = rr / 12.92;
    }
    else {
        R = ((rr + 0.055) / 1.055);
        R = Math.pow(R, 2.4);
    }
    if (gg <= 0.03928) {
        G = gg / 12.92;
    }
    else {
        G = ((gg + 0.055) / 1.055);
        G = Math.pow(G, 2.4);
    }
    if (bb <= 0.03928) {
        B = bb / 12.92;
    }
    else {
        B = ((bb + 0.055) / 1.055);
        B = Math.pow(B, 2.4);
    }

    var result = 0.0;
    result = (R * 0.2126) + (G * 0.7152) + (B * 0.0722);
    return result;

}

function contrast(rgb1, rgb2) {
    var r = (luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05) / (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
    r = Math.round(r * 100) / 100
    return r;
}

function backgroundColorChange() {
    backgroundcolor = document.getElementById("backgroundcolor").value;
    apply();
}

function apply() {

    document.getElementById("textsize").innerText = size + " px";
    document.getElementById("textweight").innerText = weight;
    document.getElementById("textletter").innerText = letter + " px";
    document.getElementById("textword").innerText = word + " px";
    document.getElementById("textheight").innerText = height + " px";
    document.getElementById("text2indent").innerText = indent + " px";
    document.getElementById("textshadowv").innerText = "V: " + shadowv;
    document.getElementById("textshadowh").innerText = "H: " + shadowh;
    document.getElementById("textshadowb").innerText = shadowb +" px";

    document.getElementById("textopacity").innerText = myopacity * 100 + "%";


    var id = document.getElementById("mytext");

    id.style.fontFamily = name;

    id.style.fontSize = size + "px";

    id.style.fontStyle = style;

    id.style.fontWeight = weight;

    id.style.fontVariant = variant;

    id.style.color = "rgba(" + [rcolor, gcolor, bcolor, myopacity].join(',') + ")";

    id.style.textAlign = align;

    id.style.textJustify = justify;

    id.style.textTransform = transform;

    id.style.setProperty("-webkit-Text-decoration-line", decorationline);
    id.style.setProperty("-webkit-Text-decoration-style", decorationstyle);
    id.style.setProperty("-webkit-Text-decoration-color", decorationcolor);
    id.style.setProperty("-webkit-text-decoration-skip", decorationskip);
    id.style.setProperty("Text-decoration-line", decorationline);
    id.style.setProperty("Text-decoration-style", decorationstyle);
    id.style.setProperty("Text-decoration-color", decorationcolor);
    //id.style.setProperty("text-decoration-skip",decorationskip);

    id.style.direction = direction;

    id.style.letterSpacing = letter + "px";

    id.style.wordSpacing = word + "px";

    id.style.lineHeight = height + "px";

    id.style.textIndent = indent + "px";

    id.style.textShadow = shadow;

    id.style.backgroundColor = backgroundcolor;


    var result;
    var rgb = [rcolor, gcolor, bcolor];
    result = contrast(rgb, hexToRgb((backgroundcolor)));
    if (result < 1) {
        result = contrast(hexToRgb((backgroundcolor)), rgb);
    }
    validation(result);
    document.getElementById("contrasto").innerText = result + " : 1";
    print();
}

function validation(c) {
    if (c > 4.5) {
        document.getElementById("AAnormal").style.color = "green";
    }
    else {
        document.getElementById("AAnormal").style.color = "red";

    }
    if (c > 3) {
        document.getElementById("AAlarge").style.color = "green";
    }
    else {
        document.getElementById("AAlarge").style.color = "red";

    }
    if (c > 7) {
        document.getElementById("AAAnormal").style.color = "green";

    }
    else {
        document.getElementById("AAAnormal").style.color = "red";

    }
    if (c > 4.5) {
        document.getElementById("AAAlarge").style.color = "green";
    }
    else {
        document.getElementById("AAAlarge").style.color = "red";

    }
    if (typeOfText()) {
        document.getElementById("largeText").style.opacity = "1";
    }
    else {
        document.getElementById("largeText").style.opacity = "0.5";
    }
}

function typeOfText() {
    if ((size >= 18 && weight >= 700) || size >= 24) {
        return true;
    }
    return false;
}

function print() {
    var txt = "";
    if (isClientFont(name)) {
        if (clientFonts[name].includes("woff"))
            txt = "@font-face {\nFont-family: " + name + "; \nsrc: url(" + clientFonts[name] + ");}\n";
        else
            txt = "@import url(" + clientFonts[name] + ");\n";
    }
    else
        txt = "@import url\n('https://fonts.googleapis.com/css?family=" + name + "');\n";
    txt += "*{\n";
    txt += "  Font-family: " + "\"" + name + "\"" + ";\n";
    txt += "  Font-size: " + size + "px;\n";
    txt += "  Font-style: " + style + ";\n";
    txt += "  Font-weight: " + weight + ";\n";
    txt += "  Font-variant: " + variant + ";\n";
    txt += "  Direction: " + direction + ";\n";
    txt += "  Color: rgba(" + rcolor + "," + gcolor + "," + bcolor + "," + myopacity + ")" + ";\n";
    txt += "  Text-align: " + align + ";\n";
    txt += "  Text-justify: " + justify + ";\n";
    txt += "  Text-decoration-line: " + decorationline + ";\n";
    txt += "  Text-decoration-style: " + decorationstyle + ";\n";
    txt += "  Text-decoration-color: " + decorationcolor + ";\n";
    txt += "  Text-transform: " + transform + ";\n";
    txt += "  Text-indent: " + indent + "px" + ";\n";
    txt += "  Letter-spacing: " + letter + "px" + ";\n";
    txt += "  Line-height: " + height + "px" + ";\n";
    txt += "  Word-spacing: " + word + "px" + ";\n";
    txt += "  Text-shadow: " + shadow + ";\n";
    txt += "  BackgroundColor: " + backgroundcolor + ";\n";
    txt += "}";
    //document.getElementById("contenitore").innerHTML="<pre><code class=\"css\" id=\"mycss\"></code></pre>";
    document.getElementById("mycss").innerText = txt;

    $(document).ready(function () {
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    });

}

function css() {


    var txt = "";
    if (isClientFont(name)) {
        if (clientFonts[name].includes("woff"))
            txt = "@font-face {\nFont-family: " + name + "; \nsrc: url(" + clientFonts[name] + ");}\n";
        else
            txt = "@import url(" + clientFonts[name] + ");\n";
    }
    else
        txt = "@import url('https://fonts.googleapis.com/css?family=" + name + "');\n";
    txt += "*{\n";
    txt += "    Font-family: " + "\"" + name + "\"" + ";\n";
    txt += "    Font-size: " + size + "px;\n";
    txt += "    Font-style: " + style + ";\n";
    txt += "    Font-weight: " + weight + ";\n";
    txt += "    Font-variant: " + variant + ";\n";
    txt += "    Direction: " + direction + ";\n";
    txt += "    Color: rgba(" + rcolor + "," + gcolor + "," + bcolor + "," + myopacity + ")" + ";\n";
    txt += "    Text-align: " + align + ";\n";
    txt += "  Text-justify: " + justify + ";\n";
    txt += "    Text-decoration-line: " + decorationline + ";\n";
    txt += "    Text-decoration-style: " + decorationstyle + ";\n";
    txt += "    Text-decoration-color: " + decorationcolor + ";\n";
    txt += "    Text-transform: " + transform + ";\n";
    txt += "    Text-indent: " + indent + "px" + ";\n";
    txt += "    Letter-spacing: " + letter + "px" + ";\n";
    txt += "    Line-height: " + height + "px" + ";\n";
    txt += "    Word-spacing: " + word + "px" + ";\n";
    txt += "    Text-shadow: " + shadow + ";\n";
    txt += "    BackgroundColor: " + backgroundcolor + ";\n";
    txt += "}";
    var filename = "style.css";
    download(filename, txt);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

function toClipBoard() {

    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNodeContents(document.getElementById('mycss'));

    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy");
    snack()
}

function snack() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

