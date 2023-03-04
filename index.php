<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <title>C.P Gen.</title>
</head>
<body>
<?php
$json = json_decode(file_get_contents("colors.json"), true);
$json["orange"] = "#c97828";
//$colors= [];
//$colors["green"] = "#63c928";
//$colors["red"] = "#c92828";

// {"green":"#63c928","red":"#c92828"}


//$json = json_encode($colors);
//file_put_contents('colors.json', $json);
 ?>


<h1> Color Palette Generator</h1>
<div id="colorsContainer">
    <fieldset id="colorsHolder">
        <legend><h3> Color Palette </h3></legend>
    </fieldset>
    <fieldset style="margin-left: 40px;">
        <legend><h3> Add a color </h3></legend>
        <form method="POST">
        <input type="text" placeholder="Hex Color" id="hexColorInput" name="hexColorInput">
        <input type="text" placeholder="Color reference" id="colorReferenceInput" name="colorReferenceInput">
            <button id="addColorButton" name="addColorButton">
                Add
            </button>
        </form>
    </fieldset>
</div>

<?php
if (isset($_POST["addColorButton"])) {
    $color = $_POST['hexColorInput'];
    $ref = $_POST['colorReferenceInput'];

    $json["$ref"] = "$color";
    $json = json_encode($json);

    file_put_contents('colors.json', $json);
    $json = json_decode($json);
}
?>
<?php
foreach ($json as $color => $ref) {
    ?><script> AddColor("<?php print $color?>", "<?php print $ref?>");</script>
<?php } ?>

</body>
</html>