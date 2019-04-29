var show = false;
var indice_prev = 0;


function myLoad() {
    loadStorage();

    document.getElementById("search").addEventListener("keydown", function (e) {
        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByClassName("autocomplete-item");
        if (e.keyCode == 40) { //freccia giù
            e.preventDefault();
            currentFocus++;

            addActive(x);
        } else if (e.keyCode == 38) {//freccia su
            e.preventDefault();
            currentFocus--;

            addActive(x);
        } else if (e.keyCode == 13) { //enter
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    document.getElementById("mytext").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            document.getElementById("mytext").value += "\n";
        }
    });
    apply();


    window.addEventListener("dragover", function (e) {
        e = e || event;
        e.preventDefault();
    }, false);
    window.addEventListener("drop", function (e) {
        e = e || event;
        e.preventDefault();
    }, false);

    var openModal=document.getElementById("openModal");
    openModal.addEventListener("click",function(e){
        var list=$(openModal).find('*');
        for(var i=0; i<list.length; i++) {
            if (e.target == list[i]) {
                return;
            }
        }
        document.getElementById("close").click();

    });

    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDrop, false);

    var hiddenIn = document.getElementById("hiddenInput");
    hiddenIn.addEventListener("change", function () {
        showOutput(document.getElementById("hiddenInput").files);
    });

    hiddenIn.addEventListener("click", function () {
        document.getElementById("hiddenInput").value = null;
    });

    dropZone.addEventListener('click', function (e) {
        var volatile = e.target;
        if (volatile.nodeName == "BUTTON" || volatile.id == "disclaimer" || volatile.id == "rename")
            return;
        else
            document.getElementById("hiddenInput").click();

    }, false);

    input = document.getElementById("myInput");

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    addVal();
}

function addVal(){
    var request = $.ajax({
        type: "POST",
        url: "/counter.php",
        dataType: 'json',
        data: { "action": "aggiungi"},
    });
    request.done(function (data) {
    });

}
function getInfo() {
    var request = $.ajax({
        type: "POST",
        url: "/counter.php",
        dataType: 'json',
        data: { "action": "getval"},
    });
    request.done(function (data) {
        document.getElementById("numero").innerHTML = data;
    });
}

function defaultTextArea() {  // TODO da togliere?
    slidersizechange();
}

function doubleCustom() {
    show = false;
    custom();
}

function showMore(index, j) {

    var a = document.createElement("DIV");
    var next = document.createElement("BUTTON");
    next.innerHTML = "next";
    next.setAttribute("id", "next" + index);
    var prev = document.createElement("BUTTON");
    prev.innerHTML = "prev";
    prev.setAttribute("id", "prev" + index);
    var home = document.createElement("BUTTON");
    home.innerHTML = "home";
    home.setAttribute("id", "home0");
    var tmp = document.getElementById("autocomplete-list");

    home.setAttribute("class", "search-buttons");
    next.setAttribute("class", "search-buttons");
    prev.setAttribute("class", "search-buttons");

    next.setAttribute("type", "button");
    home.setAttribute("type", "button");
    prev.setAttribute("type", "button");

    next.addEventListener("click", listButtonClicked);
    home.addEventListener("click", listButtonClicked);
    prev.addEventListener("click", listButtonClicked);

    if (j != 8) {
        next.removeEventListener("click", listButtonClicked);
        next.addEventListener("click", preRemoveActive);
    }

    if (j == 0) {
        prev.click();
    }

    a.appendChild(home);
    a.appendChild(prev);
    a.appendChild(next);
    tmp.appendChild(a);
}

function preRemoveActive() {
    var list = document.getElementsByClassName("autocomplete-active");
    removeActive(list);
}

function listButtonClicked(elem) {
    document.getElementById("myInput").focus();
    var tmp = elem.target;
    var id = tmp.getAttribute("id");
    var val = id.substr(4);
    switch (id.substr(0, 4)) {
        case "home":
            show = false;
            custom();
            break;

        case "prev":
            if (indice_prev != 0)
                custom(indice_prev - 9);
            break;

        case "next":
            show = true;
            custom(val);
            break;
    }
}

function confirmFontInput(value) {
    closeAllLists();
    input.value = value;
    input.style.setProperty("font-family", value);
    //TODO togli? var form=input.parentNode;
    show = false;
    passname(value);
}

function custom(index) {
    index = (index === undefined) ? 0 : index;
    closeAllLists();
    currentFocus = -1;
    input = document.getElementById("myInput");
    input.style.removeProperty("font-family");
    val = input.value;
    if ((val.replace(/\s+/g, '').localeCompare("")) == 0) {
        return;
    }
    else {
        var a = document.createElement("DIV");
        a.setAttribute("id", "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        input.parentNode.appendChild(a);
        arr = fonts;
        var i = index;
        var j = 0;
        while (i < arr.length && j < 8) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                if (j == 0)
                    indice_prev = i;
                /*create a DIV element for each matching element:*/

                b = document.createElement("DIV");
                b.style.setProperty("font-family", arr[i]);
                b.setAttribute("class", "autocomplete-item");
                b.addEventListener("click", function (e) {
                    var volatile = e.target;
                    if (volatile.nodeName != "DIV")
                        volatile = volatile.parentNode;
                    confirmFontInput(volatile.getElementsByTagName("input")[0].value);

                });
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                var tmp = arr[i].substr(val.length);
                tmp = tmp.fontcolor("979797");
                b.innerHTML += tmp;
                // inserisco un campo input per tenere in memoria il nome del font, utile per azioni di submit
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                a.appendChild(b);
                j++;
            }
            i++;
        }
        var existNext = false;
        while (!existNext && i < arr.length) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase())
                existNext = true;
            i++;
        }

        if ((j == 8 && existNext) || show)
            showMore(i, j);
    }
}

function addActive(x) {
    if (!x) return false;

    removeActive(x); //prima rimuovo tutti gli altri attivi
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);

    x[currentFocus].classList.add("autocomplete-active");
}

function removeActive(x) {

    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
    }
}

function closeAllLists(elmnt) { //chiude tutte le liste, tranne quella passata come argomento
    currentFocus = -1;  //resetta il contatore focus

    if (elmnt && elmnt.className == "search-buttons")
        return;
    else {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != document.getElementById("myInput")) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
}

