const {Menu} = require('../models');

class MenuController {
    async store(req, res){
        const {name, description, price, category} = req.body;

        const allowedCategories = ['starter', 'main_course', 'dessert', 'drink'];

        if(!name || !description || !price || !category){
            return res.status(400).json({message:"all fields must be filled"});
        }

        if(!allowedCategories.includes(category)){
            return res.status(400).json({message:`category ${category} is not allowed`});
        }

        const createdDish = await Menu.create({name, description, price, category});

        return res.status(200).json(createdDish);
    }
}

module.exports = new MenuController();