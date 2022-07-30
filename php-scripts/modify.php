<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=utf-8");


if( $_SERVER["REQUEST_METHOD"] === "POST" ) {
    $data = json_decode( file_get_contents("php://input"), true );
    $handle = fopen("./file.php", "w");
    fwrite($handle, $data["value"]);

    echo json_encode([
        "msg" => "success"
    ]);
}