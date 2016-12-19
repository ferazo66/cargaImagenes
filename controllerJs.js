/**
 * Created by ferazo on 14/12/2016.
 */
angular.module('app',[])
    .controller("controllerPersona",function($scope, $http) {
        $http.get("http://localhost/pruebacodigofacilito/conex/ws/consultaPro.php")
            .success(function (data) {
                $scope.perso = data.PERSONAS;
                console.log('nom: ' + data.perso);

            }
        );

        $scope.getImagen = function (Id_propietario) {
            console.log("prueba" + Id_propietario);
            var request=$http({
                method: "POST",
                url: "http://localhost/pruebacodigofacilito/conex/ws/consultaIma.php",
                data: {Id_propietario: Id_propietario},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                $scope.ima = data.IMAGENES;
                //console.log("Insertado" + $scope.ima.direccion);
            });
        };
    }
);

//var request= $http({method:"ima",
//    url:"http://localhost/pruebacodigofacilito/conex/ws/consultaIma.php",
//    data:{})}
//
//    .then(function (response) {
//        $scope.ima = response.data.IMAGENES;
//        console.log('ima' + $scope.ima);
//    }, function (error) {
//        console.log('Error imagenes')
//    }
//);

