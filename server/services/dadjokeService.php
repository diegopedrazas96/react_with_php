<?php

class Dadjokes{
  
   public function getJokes(string $search, int $pag ){
    $ch = curl_init();
    $url = "https://icanhazdadjoke.com/search?term=$search&page=$pag";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
    curl_setopt($ch, CURLOPT_CAINFO,  getcwd().'/utilities/cert/cacert.pem');
    $response = curl_exec($ch);

    if($e = curl_error($ch)){
        return $e;
    }else{
       return ($response);
    } 
   curl_close($ch);
   
   }
}
?>