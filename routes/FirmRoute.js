const express = require('express');
const Firmcontroller = require('../controllers/Firmcontroller');
const verifytoken = require('../middleware/verifytoken');

const router = express.Router();

router.post('/add-firm', verifytoken, Firmcontroller.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:FirmId',Firmcontroller.deleteFirmByid)


module.exports = router;
