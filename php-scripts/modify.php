<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=utf-8");

function wrap( $content ) {
    return "<?php require __DIR__ . '/vendor/autoload.php' ?>" . PHP_EOL . $content;
}

if( $_SERVER["REQUEST_METHOD"] === "POST" ) {
    $data = json_decode( file_get_contents("php://input"), true );
    $handle = fopen("./file.php", "w");
    $save = fopen("./content.txt", "w");
    fwrite($handle, wrap($data["value"]));
    fwrite($save, $data["value"]);

    echo json_encode([
        "msg" => "success"
    ]);
}