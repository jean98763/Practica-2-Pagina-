'use strict';
module.exports = (sequelize, DataTypes) => {
	const Products = sequelize.define('Products',{
		idproducto:{
			type: DataTypes.INTEGER,
			autoIncrement : true,
			primaryKey: true
		},
		nombre_producto: DataTypes.STRING,
		cantidad_existencia: DataTypes.INTEGER,
		precio : DataTypes.DOUBLE
	}, {
	timestamps: false,
	tableName: 'productos'
	});
	Products.assoaciate = function(models){
	
	};
	return Products;
	};