<?php
header("Access-Control-Allow-Origin: *");
require 'flight/Flight.php';
include './services/dadjokeService.php';

Flight::route('GET /api/dadjokes', function () {
    $search = isset($_GET['term'])? trim($_GET['term']) : '';
    $page =isset($_GET['page'])? trim($_GET['page']) : 1;
    $joke = new Dadjokes(); 
    if(!is_numeric($page)){
        $page = 1;
    }
   echo $joke->getJokes($search,$page);
});
Flight::start();
