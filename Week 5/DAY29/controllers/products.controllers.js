const Product = require("../models/product.model");

exports.softDeletedProduct = async (req, res) => {
  const name = req.body.name;
  try {

    let product = await Product.findOneAndUpdate(
      { name: name }, 
      { $set: { isDeleted : true } }
      );
      
      
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (e) {
    console.error(e); 
    res.status(500).send({ err: 'Error in updating the product' });
  }}

exports.getsoftDeletedProduct = async (req, res)=> {
  try {
    const products = await Product.find({isDeleted :true})
    res.json(products);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.hardDeleteExpiredProducts = async (req, res) => {
  try {
    const currentDate = new Date();
    const deletedProducts = await Product.deleteMany({
      expirationDate: { $lt: currentDate }
    });
    res.json({ deletedCount: deletedProducts.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bulkUpdateProducts = async (req, res) => {
  const des = req.body.description
  try {
    const updatedProducts = await Product.updateMany(
      { inStock: true },
      {$set:{ description: des }}
    );
    res.json({ updatedCount: updatedProducts.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.bulkDeleteOutOfStockProducts = async (req, res) => {
  try {
    const deletedProducts = await Product.deleteMany({ inStock: false });
    res.json({ deletedCount: deletedProducts.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











exports.UpdateProduct = async(req, res) => {
  const { name, price } = req.body; 

  try {

    let product = await Product.findOneAndUpdate(
      { name: name }, 
      { $set: { price: price } }
      );
      
      
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (e) {
    console.error(e); // Log the actual error for debugging
    res.status(500).send({ err: 'Error in updating the product' });
  }
}



exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ price: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { name, price, description, inStock,expirationDate } = req.body;
 

  try {
    const product = new Product({
      name,
      price,
      description,
      inStock,
      expirationDate
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
