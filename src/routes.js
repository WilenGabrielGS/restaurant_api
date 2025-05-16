const {Router} = require('express');
const CustomerController = require('../controllers/customerController');
const MenuController = require('../controllers/menuController');
const OrderController = require('../controllers/orderController');

const routes = Router();

routes.get('/testServer', (req, res) => {
    return res.status(200).json({message:"server is on"})
});

routes.post('/customer', CustomerController.store);

routes.post('/menu', MenuController.store);

routes.post('/order', OrderController.store);

module.exports = routes;