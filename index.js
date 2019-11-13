var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var app = express();
const path = require ('path');
app.set('view-engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const router = express.Router();
app.set('view engine' , 'pug');
var express = require('sequelize');
var nunjucks = require('nunjucks');

const models = require ('./models');
const Op = models.Sequelize.Op;

nunjucks.configure('views',{
	autoescape: true,
	express : app,
	watch : true
});

const modals = require('./models');
//const Op = models.Sequlize.Op;

app.get('/',function(req, res){
    //res.send('Hello world');
    //var test = {
      //  nombre : "IDS",
       // campus : "VHSA"
    //};
	res.render('index.html',{
		title: 'My first Nunjucks Page',
		items : [
		{name : 'item #1'},
		{name : 'item #2'},
		{name : 'item #3'},
    //res.json(test);
	]
	});
})

app.get('/productos', function (req,res){
	models.Products.findAll().then( function (data){
		var productos = data;
		res.render('productos.html',{
			title : 'Lista de productos',
			products: productos
		});
	});
});

app.get('/agregarproducto', function (req,res){
	res.render ('agregarproducto.html',{
		title:'agregar producto'
	});
});

app.post('/agregarproducto/', function(req, res){
	models.Products.create({
		nombre_producto: req.body.nombre_producto,
		cantidad_existecia: req.body.cantidad_existecia,
		precio: req.body.precio
	}).then(function(data){
		res.redirect("/productos");
	});
});

app.get('/detalleproducto/:idproducto', function(req,res){
	models.Products.findByPk(
	req.params.idproducto
	).then(function(product) {
		if(product){
			res.render('detalleproducto.html',{
				title: 'Detalle de producto',
				producto : product
			});
		}else{
			res.json("producto no encontrado");
		}
	});
});


		
app.get('/detalleproducto/:idproducto', function(req,res){
	models.Products.findByPk(
		req.params.idproducto
		).then(function(product){
			if(product){
				res.render('detalleproducto.html',{
					tittle: 'Detalle de producto',
					producto : product
				});
			}else{
				res.json("producto no encontrado");
			}
		});
});

app.get('/contact', function(req,res){
	//res.send('contactanos');
	res.render('index', {title: 'Hola chavos de IDS', message: 'Bienvenido al sistema de administracion', message2: 'Test'});
});

app.get('/listproducts',function(req, res){
	/*
    var item1 = {
        nombre_producto : "Leche LALA",
        id_producto : 1,
        cantidad_existencia : 250,
        precio : 15.25
    };
    productos.push(item1);
	
    res.json(productos);
	*/
	
	models.Products.FindAll().then( function(data){
	var info = {
		'status': 'success',
		'data':data
	}
	res.json(info);
	
	});
});

app.post('/addproduct' , function(req, res){
	models.Products.create({
		nombre_producto: req.body.nombre_producto,
		cantidad_existecia: req.body.cantidad_existencia,
		precio: req.body.precio
	}). then(function(data){
		var info = {
			'status': 'success',
			'message': "productos creado correctamente",
			'data' : data
		}
		res.json(info);
		
	});	
});

app.get('/eliminarproducto/:idproducto', function(req,res){
	models.Products.findByPk(
		req.params.idproducto
		).then(function(product){
			if(product){
				models.Products.destroy({
					where: {
						idproducto: req.params.idproducto
					}
				}).then(function(data){
					res.redirect("/productos");
				});
			}else{
				res.json("producto no encontrado");
			}
		});
});

app.get('/modificarproducto/:idproducto', function(req,res){
	models.Products.findByPk(
	req.params.idproducto
	).then(function(product) { 
	if(product) {
		res.render('editarproducto.html',{
			title: 'modificar producto',
			producto : product
		});
	}else{
		res.json("producto no encontrado");
	}
	});
});

app.post('/modificarproducto',function(req,res){
	models.Products.findByPk(
		req.body.idproducto
		).then(function(product){
			if(product){
				models.Products.update({
					nombre_producto: req.body.nombre_producto,
					cantidad_existecia: req.body.cantidad_existecia,
					precio: req.body.precio
				},{
					where: { idproducto: req.body.idproducto}
				}).then(function(Data) { 
				res.redirect("/productos");
				},function(error) {
					res.json(error);
				});
			}else{
				res.json("Producto no encontrado");
			}
		});
});

app.post('/deleteproduct', function(req, res){
	models.Products.destroy({
		where: {
			idproducto: req.body.idproducto
		}
	}).then(function(data){
		var info = {
			'status' : 'success',
			'message': "producto eliminado correctamente",
			'data' : data
		}
		res.json(info);
	});
});

app.post('/updateproduct', function (req, res){
	models.Products.findBypk(
		req.body.idproducto
		).then(function(product) {
			if (product) {
				models.Products.uptdate({
					nombre_producto: req.body.nombre_producto,
					cantidad_existencia: req.body.cantidad_existecia,
					precio: req.body.precio
				}, {
					where: { idproducto: req.body.idproducto}
				}).then(function(data){
					var info = {
						'status': 'success',
						'message': "producto modificado correctamente",
						'data' : data
					}
					res.json(info);
				}, function(error){
					res.json(error);
				});
				
			}else{
				res.json("producto no encontrado");
			}
		});
});


app.listen(3000, function(){
    console.log('localhost:3000');
})