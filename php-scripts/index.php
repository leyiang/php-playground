<?php
    $url = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"] . dirname($_SERVER["PHP_SELF"]);

    $endpoint = $url . "/modify.php";
    $preview = $url . "/file.php";
    $buffer = "./content.txt";
    $content = null;

    if( file_exists( $buffer ) ) {
        $content = file_get_contents( $buffer );
    }
?>

<script>
window.endpoint = "<?= $endpoint ?>";
window.previewURI = "<?= $preview ?>";

<?php if( isset($content) ) : ?>
window.injectValue = `<?= $content ?>`;
<?php endif; ?>

</script>

<!--REPLACE-->