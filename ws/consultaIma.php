<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../datos/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Id_propietario = $request->Id_propietario;
$pagina="errorLogin.php";

 $sql = "
SELECT imagenes.Id_imagenes, imagenes.direccion,imagenes.estado, imagenes.Id_propietario FROM imagenes as imagenes WHERE Id_propietario='$Id_propietario' AND  estado='1'    ";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);

            if ($data) {
            $outp = "";
                while ($row = mysqli_fetch_array($data)) {
                     if ($outp != "") {$outp .= ",";}
                    $outp .= '{"Id_imagenes":"'  .  $row['Id_imagenes'] . '",';
                    $outp .= '"direccion":"'   .  $row['direccion']. '",';
                    $outp .= '"estado":"'   .  $row['estado']. '",';
                    $outp .= '"Id_propietario":"'   .  $row['Id_propietario']. '"}';
                }
                $outp ='{"IMAGENES":['.$outp.']}';
                $conn->close();
               echo($outp);
            }
?>