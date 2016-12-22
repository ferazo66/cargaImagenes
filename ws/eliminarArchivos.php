<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Id_imagenes=$request->Id_imagenes;
@$direccion=$request->direccion;
@$estado=$request->estado;
@$Id_propietario = $request->Id_propietario;
$pagina="errorLogin.php";

$sql = "
UPDATE imagenes set estado='$estado' WHERE Id_imagenes='$Id_imagenes' AND direccion='$direccion'AND Id_propietario='$Id_propietario'

";
if (mysqli_connect_errno()) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode(array(
        'status' => 'failure',
        'message' => 'Could Not connect to database',
    ));
}
$data = mysqli_query($conn, $sql);
