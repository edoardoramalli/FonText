<?php
if (is_ajax()) {
    if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
        $action = $_POST["action"];
        switch($action) { //Switch case for value of action
            case "aggiungi": add(); break;
            case "getval" : valore(); break;
        }
    }
}
//Function to check if the request is an AJAX request
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
function add(){
    $datei = fopen("conteggio.txt","r");
    $count = fgets($datei,1000);
    fclose($datei);
    $count=$count + 1 ;
    $datei = fopen("conteggio.txt","w");
    fwrite($datei, $count);
    fclose($datei);
    echo json_encode($count);
}
function valore(){
    $datei = fopen("conteggio.txt","r");
    $count = fgets($datei,1000);
    fclose($datei);
    echo $count;
}
?>
