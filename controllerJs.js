/**
 * Created by ferazo on 14/12/2016.
 */
angular.module('app',[])
    .controller("controllerPersona",function($scope, $http,upload) {
        $http.get("http://localhost/imagenes/cargaImagenes/ws/consultaPro.php")
            .success(function (data) {
                $scope.perso = data.PERSONAS;
                console.log('nom: ' + data.perso);

            }
        );
        $scope.getImagen = function (Id_propietario) {
            console.log("prueba" + Id_propietario);
            var request=$http({
                method: "POST",
                url: "http://localhost/imagenes/cargaImagenes/ws/consultaIma.php",
                data: {Id_propietario: Id_propietario},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                $scope.ima = data.IMAGENES;
                console.log("Insertado" + $scope.ima.direccion);
            });
        };
        $scope.uploadFile = function(direccion,estado,Id_propietario){
            var name = $scope.name;
            var file = $scope.file;
            upload.uploadFile(file, name).then(function(res){
                console.log(res);
            });
                console.log(direccion + estado + Id_propietario)
                var request = $http({
                    method: "POST",
                    url: "http://localhost/imagenes/cargaImagenes/ws/subirArchivos.php",
                    data: {
                        direccion: direccion,
                        estado: estado,
                        Id_propietario: Id_propietario
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
        $scope.deletFile=function(Id_imagenes,direccion,estado,Id_propietario){
            console.log("prueba" + direccion + estado + Id_propietario);
            var request=$http({
                method: "POST",
                url: "http://localhost/imagenes/cargaImagenes/ws/eliminarArchivos.php",
                data: {
                    Id_imagenes:Id_imagenes,
                    direccion: direccion,
                    estado: estado,
                    Id_propietario: Id_propietario
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }

    }
)
.directive('uploaderModel', ["$parse", function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs)
        {
            iElement.on("change", function(e)
            {
                $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
            });
        }
    };
}])
    .service('upload', ["$http", "$q", function ($http, $q){
        this.uploadFile = function(file, name){
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("name", name);
            formData.append("file", file);
            return $http.post("ws/moverArchivos.php", formData, {
                headers: {
                    "Content-type": undefined
                },
                transformRequest: angular.identity
            })
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(msg, code){
                    deferred.reject(msg);
                })
            return deferred.promise;
        }
    }])


