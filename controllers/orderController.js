const { isEmpty } = require("validator");
const {Orders, Customer, Menu} = require("../models");

class OrderController{
    async store(req, res){
        const {customer_id, items} = req.body;

        if(!customer_id || !items){
            return res.status(400).json({message:"all parameters must be passed"});
        }

        const existingCustomer = await Customer.findOne({where: {id: customer_id}});

        if(!existingCustomer){
            return res.status(400).json({message: "customer not found"});
        }

        if(Object.keys(items).length === 0){
            return res.status(400).json({message: "the object items cannot be empty"});
        }

        for(const item of items){
            const {item_id, quantity} = item;
            const existingItem = await Menu.findOne({where: {id: item_id}});
            
            if(!existingItem){
                return res.status(400).json({message: `item with id ${item_id} not found`});
            }   

            if(!Number.isInteger(quantity) || quantity <= 0){
                return res.status(400).json({message: `invalid quantity of item with id ${item_id}`});
            }
        }

        const createdOrder = await Orders.create({customer_id, items});

        return res.status(200).json(createdOrder);
    }
}

module.exports = new OrderController();