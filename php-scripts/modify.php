<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=utf-8");


if( $_SERVER["REQUEST_METHOD"] === "POST" ) {
    $data = [
        "msg" => "success123:w"
    ];

    http_response_code(422);
    echo json_encode( $data );
}