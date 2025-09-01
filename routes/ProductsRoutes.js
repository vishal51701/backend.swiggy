const express = require('express');
const productcontroller = require('../controllers/Productcontroller');

const router = express.Router();


router.post('/add-product/:firmId', productcontroller.addproduct);

router.get('/:firmId/products', productcontroller.getproductByfirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:productId',productcontroller.deleteproductByid)

module.exports = router;
