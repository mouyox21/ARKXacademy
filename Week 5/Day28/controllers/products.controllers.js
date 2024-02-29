const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ price: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { name, price, description, inStock } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      inStock,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaginatedProducts = async (req, res) => {
  const pageNumber = 1;
  const pageSize = 5;
  try {
    const paginatedProducts = await Product.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.countProductsInStock = async (req, res) => {
  try {
    const count = await Product.countDocuments({ inStock: true });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.calculateAveragePrice = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $group: { _id: null, avgPrice: { $avg: "$price" } } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sortProductsByNameAscending = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sortProductsByPriceDescending = async (req, res) => {
  try {
    const sortedProducts = await Product.find().sort({ price: -1 });
    res.json(sortedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.groupProductsByCategory = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $group: { _id: "$category", products: { $push: "$$ROOT" } } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
