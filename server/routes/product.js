

// * Rutas para el producto
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// * api/productos
router.post('/', productController.createProduct );
router.get('/', productController.obtainProducts );
router.put('/:id', productController.updateProduct );
router.get('/:id', productController.obtainProduct );
router.delete('/:id', productController.deleteProduct );

module.exports = router;