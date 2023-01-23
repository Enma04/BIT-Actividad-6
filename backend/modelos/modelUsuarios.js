/*
 Este archivo se encarga de gestionar toda la información del
 usuario en una base de datos conectada al serviodor.
 Aquí únicamente se realizan las configuraciones,
 modificaciones y manipulaciones de los datos de usuario,
 que previamente hayan pasado por el filtro
 (controladorUsuarios.js)
 */

var usuariosModel = {}

var datos = [];

//LÓGICA DE LA API CREATE
usuariosModel.Guardar = function (data, callback) {

     //ENVÍO DE DATOS
    datos.push({
        cedula       :data.cedula,
        nombre       :data.name,
        apellido     :data.apellido,
        edad         :data.edad,
        direccion    :data.direccion,
        telefono     :data.telefono,
        estadocivil  :data.estadocivil,
    })

    return callback({ state: true, mensaje: "Usuario guardado" });
} //Fin api CREATE

//LÓGICA DE LA API READ
usuariosModel.ListarUsuarios = function (data, callback) {
    return callback({ state: true, datos });
} //Fin api READ

//LÓGICA DE LA API UPDATE
usuariosModel.Modificar = function (data, callback) {

    //Actualizacion de los datos
    let posicion = datos.findIndex((item) => item.cedula == data.cedula)
    
    if (posicion == -1) {
        return callback({ state: false, mensaje: "El usuario no existe" });
    }
    else {
        datos[posicion].edad = data.edad;
        return callback({ ubicacion: posicion });
    }
    
} //Fin api UPDATE

//LÓGICA DE LA API DELETE
usuariosModel.Eliminar = function (data, eliminacion) {

    let posicion = datos.findIndex((item) => item.cedula == data.cedula);

    if (posicion == -1) {
        return eliminacion({ state: false, mensaje: "El usuario no existe" });
    }
    else {

        let nombre = datos[posicion].nombre;
        let apellido = datos[posicion].apellido;

        //Actualizacion de los datos
        datos.splice(posicion, 1);

        return  eliminacion({state: true, mensaje: `El usuario ${nombre} ${apellido} fue eliminado`});
    }
    
} //Fin api DELETE

//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
module.exports.modelUsuariosExport = usuariosModel;