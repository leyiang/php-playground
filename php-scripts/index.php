<?php
    $url = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"] . dirname($_SERVER["PHP_SELF"]);

    $endpoint = $url . "/modify.php";
    $preview = $url . "/file.php";
?>

<script>
window.endpoint = "<?= $endpoint ?>";
window.previewURI = "<?= $preview ?>";
</script>

<!--REPLACE-->