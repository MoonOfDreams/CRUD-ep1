const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", {
      products,
    });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let detail = products.find((producto) => {
      return producto.id == req.params.id;
    });
    res.render("detail", {
      product: detail,
    });
  },
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    let productoNuevo = req.body;
    products.push({
      id: products[products.length - 1].id + 1,
      name: productoNuevo.name,
      price: productoNuevo.price,
      discount: productoNuevo.discount,
      category: productoNuevo.category,
      description: productoNuevo.description,
      image: req.file ? req.file.filename : "default-image.png",
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");
    res.redirect("/products");
  },

  // Update - Form to edit
  edit: (req, res) => {
    let producto = products.find((producto) => {
      return producto.id == req.params.id;
    });
    res.render("product-edit-form", { producto });
  },
  // Update - Method to update
  update: (req, res) => {
    let cambios = req.body;
    let nuevaLista = products.map((producto) => {
      if (producto.id === Number(req.params.id)) {
        return {
          id: producto.id,
          name: cambios.name || producto.name,
          price: cambios.price || producto.price,
          discount: cambios.discount || producto.discount,
          category: cambios.category || producto.category,
          description: cambios.description || producto.description,
          image: req.file ? req.file.filename : producto.image,
        };
      }
      return {
        id: producto.id,
        name: producto.name,
        price: producto.price,
        discount: producto.discount,
        category: producto.category,
        description: producto.description,
        image: producto.image,
      };
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(nuevaLista), "utf-8");
    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
  let id=req.params.id;
  let actual=products.filter(producto=>{
	return producto.id != id;
  })
  fs.writeFileSync(productsFilePath, JSON.stringify(actual), "utf-8");
  res.redirect("/");
  },
};

module.exports = controller;
