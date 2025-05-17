const {Router} = require('express');
const CustomerController = require('../controllers/customerController');
const MenuController = require('../controllers/menuController');
const OrderController = require('../controllers/orderController');

const routes = Router();

routes.get('/testServer', (req, res) => {
    return res.status(200).json({message:"server is on"})
});

routes.post('/customer', CustomerController.store); //insert new customer

routes.post('/menu', MenuController.store); //insert new menu item

routes.post('/order', OrderController.store); //make a new order

routes.get('/menu', MenuController.getMenu); //list menu items (category is optional)

routes.get('/customer/orders/:customer_id', OrderController.getOrderByCustomer); //list orders by customer id

routes.patch('/order/:order_id', OrderController.update); //update order's satus

routes.patch('/order/modify/:order_id', OrderController.modifyOrder); //modify order items (only when pending or preparing)

module.exports = routes;