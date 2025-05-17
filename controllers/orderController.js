const { isEmpty } = require("validator");
const { Orders, Customer, Menu } = require("../models");

class OrderController {
    async store(req, res) {//make a new order
        const { customer_id, items } = req.body;

        if (!customer_id || !items) {
            return res.status(400).json({ message: "all parameters must be passed" });
        }

        const existingCustomer = await Customer.findOne({ where: { id: customer_id } });

        if (!existingCustomer) {
            return res.status(400).json({ message: "customer not found" });
        }

        if (Object.keys(items).length === 0) {
            return res.status(400).json({ message: "the object items cannot be empty" });
        }

        for (const item of items) {
            const { item_id, quantity } = item;
            const existingItem = await Menu.findOne({ where: { id: item_id } });

            if (!existingItem) {
                return res.status(400).json({ message: `item with id ${item_id} not found` });
            }

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({ message: `invalid quantity of item with id ${item_id}` });
            }
        }

        const createdOrder = await Orders.create({ customer_id, items, status: 'pending' }); //letting "pending" as default status because I think it's the best fit for a initializer

        return res.status(200).json(createdOrder);
    }

    async getOrderByCustomer(req, res) { //list orders by customer id
        const { customer_id } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const offset = (pageNumber - 1) * limitNumber;

        if (!customer_id) {
            return res.status(400).json({ message: "User ID must be provided" });
        }

        //finding all orders made by the customer
        const { count, rows: orders } = await Orders.findAndCountAll({
            where: { customer_id },
            offset,
            limit: limitNumber
        });

        //processing each order calculating the price and showing the dishes 
        const result = [];

        for (const order of orders) {
            let total = 0;
            const orderedDishes = [];

            for (const item of order.items) {
                const foundItem = await Menu.findByPk(item.item_id);

                if (foundItem) {
                    total += foundItem.price * item.quantity; //fixing the total value by multiplying the unit price by the quantity
                    orderedDishes.push({
                        name: foundItem.name,
                        price: foundItem.price,
                        quantity: item.quantity ?? 1
                    });
                }
            }

            result.push({
                order_id: order.id,
                ordered_dishes: orderedDishes,
                total_value: total,
                status: order.status
            });
        }

        return res.status(200).json({
            page: pageNumber, 
            limit: limitNumber,
            totalOrders: count,
            orders: result //must be an object of the orders
        });
    }

    async update(req, res){ //update order's status
        const {order_id} = req.params; 
        const {new_status} = req.body; //it's not specified on the PDF how to send the new status, so I decided to send it on the body

        if(!order_id || !new_status){
            return res.status(200).json({message:"order id and new status must be provided"});
        }

        const foundOrder = await Orders.findOne({where: {id: order_id}});

        if(!foundOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        foundOrder.status = new_status;
        await foundOrder.save();

        return res.status(200).json({ message: "Order updated successfully", order: foundOrder });
    }

    async modifyOrder(req, res) { //modify order's items
        const { order_id } = req.params;
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items must be a non-empty array" });
        }

        const order = await Orders.findOne({ where: { id: order_id } });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (!['pending', 'preparing'].includes(order.status)) {
            return res.status(400).json({ message: "Order can only be modified if status is 'pending' or 'preparing'" });
        }

        for (const item of items) {
            if (!item.item_id || !item.quantity) {
                return res.status(400).json({ message: "item_id and quantity must be provided" });
            }

            if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
                return res.status(400).json({ message: "Quantity must be an integer greather than zero" });
            }

            const menuItem = await Menu.findOne({ where: { id: item.item_id } });
            if (!menuItem) {
                return res.status(400).json({ message: `Menu item with id ${item.item_id} not found` });
            }
        }

        order.items = items;
        await order.save();

        return res.status(200).json({
            message: "Order updated successfully",
            order
        });
    }
}

module.exports = new OrderController();