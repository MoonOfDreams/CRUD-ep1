const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {
		products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let detail=products.find(producto=>{
			return producto.id==req.params.id
		})
		res.render("detail",{
			product: detail
		})
	},
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.send("Producto guardado con exito")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let producto=products.find(producto=>{
			return producto.id==req.params.id
		})
		res.render("product-edit-form",{ producto})
	},
	// Update - Method to update
	update: (req, res) => {
		res.send("producto editado con éxito")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.send("producto eliminado con éxito")
	}
};

module.exports = controller;