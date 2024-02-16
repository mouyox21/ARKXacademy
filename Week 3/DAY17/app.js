const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = require('./products.json');

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    // Find index of product with given ID
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        // Product not found
        return res.status(404).send('Product not found');
    }

    // Remove the product from the array
    products.splice(productIndex, 1);

    // Write updated products array back to JSON file
    fs.writeFile('products.json', JSON.stringify(products, null, 2), err => {
        if (err) {
            console.error('Error writing products to file:', err);
            return res.status(500).send('Internal Server Error');
        }

        console.log('Product deleted:', productId);
        
        res.status(204).send(); // No content
    });
});

app.get('/products', (req, res) => {
    let tableHTML = '<table><tr><th>ID</th><th>Name</th><th>Price</th></tr>';

    products.forEach(product => {
        tableHTML += `<tr><td>${product.id}</td><td>${product.name}</td><td>${product.price}</td></tr>`;
    });

    tableHTML += '</table>';

    res.send(tableHTML);
});

app.get('/products/search', (req, res) => {
    const minPrice = req.query.min;
    const maxPrice = req.query.max;
    const q = req.query.q.toLowerCase();

    const found = products.filter(p =>
        p.price >= parseInt(minPrice) &&
        p.price <= parseInt(maxPrice) &&
        p.name.toLowerCase().includes(q)
    );

    let tableHTML = '<table><tr><th>ID</th><th>Name</th><th>Price</th></tr>';

    found.forEach(product => {
        tableHTML += `<tr><td>${product.id}</td><td>${product.name}</td><td>${product.price}</td></tr>`;
    });

    tableHTML += '</table>';

    res.send(tableHTML);
});

app.get('/products/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const found = products.find(product => product.id === userId);

    if (found) {
        let tableHTML = '<table><tr><th>ID</th><th>Name</th><th>Price</th></tr>';
        tableHTML += `<tr><td>${found.id}</td><td>${found.name}</td><td>${found.price}</td></tr>`;
        tableHTML += '</table>';
        res.send(tableHTML);
    } else {
        res.status(404).send('Product not found');
    }
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    const id = products.length + 1;
    const name = newProduct.name;
    const price = newProduct.price;

    if (!name || !price) {
        return res.status(400).send("Missing fields: Name and Price are required!");
    }

    products.push({ id, name, price });

    fs.writeFile('products.json', JSON.stringify(products, null, 2), err => {
        if (err) {
            console.error('Error writing products to file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Product added:', id, name, price);
            res.status(201).json(newProduct);
        }
    });
});
