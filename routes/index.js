var express = require('express');
var router = express.Router();
var pg = require('pg');


//conexion a la base de datos


//***************************************
var usuarios_query = "SELECT row_to_json(fc) FROM (SELECT array_to_json(f) As FROM (" +
    "SELECT row_to_json(ID_USUARIO,NOMBRE,APELLIDO,EDAD,CUIDAD,PAIS,CORREO,CONTRASENA,CURSOS) As propierties" +
    " FROM usuarios As f) As fc ";

console.log(usuarios_query);
//***************************************





// var conString = "host=ec2-54-235-86-226.compute-1.amazonaws.com port=5432 dbname=d4c74ofj98nt54 user=bqpcbjyohbgyaf password=6a386ffc585489c27af73834294688e4bcd4008440de971e46ad99d5fbde1db6";
// const conString = new Sequelize('postgres://bqpcbjyohbgyaf:6a386ffc585489c27af73834294688e4bcd4008440de971e46ad99d5fbde1db6@ec2-54-235-86-226.compute-1.amazonaws.com:5432/d4c74ofj98nt54');


var conString = "dbname=d4c74ofj98nt54 host=ec2-54-235-86-226.compute-1.amazonaws.com port=5432 user=bqpcbjyohbgyaf password=6a386ffc585489c27af73834294688e4bcd4008440de971e46ad99d5fbde1db6 sslmode=off";
// var conString = "postgres://bqpcbjyohbgyaf:6a386ffc585489c27af73834294688e4bcd4008440de971e46ad99d5fbde1db6@ec2-54-235-86-226.compute-1.amazonaws.com:5432/d4c74ofj98nt54/sslmode=off";

router.get('/data', function (req, res) {
    var cliente = new pg.Client(conString);// cliente ya conectado
    cliente.connect();//cliente ya conectado
    var query = cliente.query(usuarios_query); //postgresql a ejecutado esa consulta
    console.log(query);

    query.on("row", function (row, result) {
        result.addRow(row);

    });

    query.on("end", function (result) {

        res.json(result.rows[0].row_to_json);
        res.render('data');
        res.end();

    });

});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Learnet'});
});

//ruta para login
router.get('/Login', function (req, res, next) {
    res.render('Login', {title: 'Login'});
});

//ruta para registrarse
//UserRegister
router.get('/UserRegister', function (req, res, next) {
    res.render('UserRegister', {title: 'UserRegister'});
});

//ForumMenu
router.get('/ForumMenu', function (req, res, next) {
    res.render('ForumMenu', {title: 'ForumMenu'});
});

//ForumView
router.get('/ForumView', function (req, res, next) {
    res.render('ForumView', {title: 'ForumView'});
});


//Cover
router.get('/Inicio', function (req, res, next) {
    res.render('Inicio', {title: 'Inicio'});
});
router.get('/AcercaDe', function (req, res, next) {
    res.render('AcercaDe', {title: 'AcercaDe'});
});

//animation1
router.get('/animation1', function (req, res, next) {
    res.render('animation1', {title: 'animation1'});
});

router.get('/platzi', function (req, res, next) {
    res.render('https://platzi.com/cursos/programacion-basica', {title: 'platzi'});
});


router.get('/BuscadorMaster', function (req, res, next) {
    res.render('BuscadorMaster', {title: 'BuscadorMaster'});
});

router.get('/buscadorResultado', function (req, res, next) {
    res.render('buscadorResultado', {title: 'buscadorResultado'});
});


module.exports = router;
