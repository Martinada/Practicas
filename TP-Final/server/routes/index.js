var express = require('express');
var router = express.Router();
var control = require('../controllers/control');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/items', control.search);

router.get('/items/:id', control.productDetail);


module.exports = router;
