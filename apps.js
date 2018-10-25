require('./config/config.js');
// console.log(process.env.PORT);
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('cookie-session');
const port = process.env.PORT;
const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded ({
    extended: true
}) )

//configuracion de las cookies
app.use (
session({
    secret: 'node'
})
)
//cofiguracion de ejs
app.set('view engine', 'ejs');
let tareas= ['uno', 'dos']; 
//compartir recursos
app.use('/public', express.static('public'));

//ruta inicial
app.get('/', function(request, response){
    response.render('formulario.ejs', {tareas});
    
})
//ruta formulario
app.post('/adicionar', function(request, response){
    let tarea=request.body.nuevaTarea;
    tareas.push(tarea);
    response.redirect('/');
})
//eliminar tareas
app.get('/borrar/:id', function(request, response){
    let id= request.params.id;
    tareas.splice('id', 2);
})
app.listen(port, function() {
    console.log('escuchando en el puerto:', port);
})