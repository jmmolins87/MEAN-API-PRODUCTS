
const Product = require('../models/Product');

exports.createProduct = async ( req, res ) => {
    
    try {
        let product;
        // Creamos nuestro producto
        product = new Product(req.body);
        await product.save();
        res.send(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

exports.obtainProducts = async ( req, res ) => {

    try {
        const product = await Product.find();
        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

exports.updateProduct = async ( req, res ) => {

    try {
        const { name, category, location, price } = req.body;
        let product = await Product.findById(req.params.id);

        if(!product) {
            res.status(404).json({ msg: 'Product not found'});
        }

        product.name = name;
        product.category = category;
        product.location = location;
        product.price = price;

        product = await Product.findOneAndUpdate({ _id: req.params.id }, product, { new: true });
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');    
    }
}

exports.obtainProduct = async ( req, res ) => {

    try {
        let product = await Product.findById(req.params.id);

        if(!product) {
            res.status(404).json({ msg: 'Product not found'});
        }

        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');    
    }
}

exports.deleteProduct = async ( req, res ) => {

    try {
        let product = await Product.findById(req.params.id);

        if(!product) {
            res.status(404).json({ msg: 'Product not found'});
        }
        
        await Product.deleteOne({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');    
    }
}