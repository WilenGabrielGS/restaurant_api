const {Customer} = require("../models");

class CustomerController {
    async store(req, res){
        const {name, email, phone} = req.body;

        const customerAlreadyExists = await Customer.findOne({where: {email}});

        if(customerAlreadyExists){
            return res.status(400).json({message:"this customer already exists"});
        }

        if(!name || !email || !phone){
            return res.status(400).json({message:"all fields are mandatory"});
        }

        const createdCustomer = await Customer.create({name, email, phone});

        return res.status(200).json({createdCustomer});
    }
}

module.exports = new CustomerController();
