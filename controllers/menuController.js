const {Menu} = require('../models');

class MenuController {
    async store(req, res){ //insert item to the menu
        const {name, description, price, category} = req.body;

        const allowedCategories = ['starter', 'main_course', 'dessert', 'drink']; //I decided to make the categories lock in the code

        if(!name || !description || !price || !category){
            return res.status(400).json({message:"all fields must be filled"});
        }

        if(!allowedCategories.includes(category)){
            return res.status(400).json({message:`category ${category} is not allowed`, allowedCategories: allowedCategories});
        }

        const createdDish = await Menu.create({name, description, price, category});

        return res.status(200).json(createdDish);
    }

    async getMenu(req, res) { //list menu items (category is optional)
        const { category, page = 1, limit = 10 } = req.query;
        const allowedCategories = ['starter', 'main_course', 'dessert', 'drink']; //same categories lock from above

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const offset = (pageNumber - 1) * limitNumber; //postgres offset starts with 0, that's why I used pageNumber - 1

        if (category && !allowedCategories.includes(category)) {
            return res.status(400).json({ message: `Invalid category: ${category}`, allowedCategories: allowedCategories});
        }

        const whereClause = category ? { category } : {}; //verifying if category was passed on the query

        const { count, rows } = await Menu.findAndCountAll({
            where: whereClause,
            offset,
            limit: limitNumber
        });

        return res.status(200).json({
            category: category || 'all', //if none category sent, show to the user that all are being showed
            page: pageNumber,
            limit: limitNumber,
            totalItems: count,
            items: rows //should be an array of dishes saved on the menu
        });
    }

}

module.exports = new MenuController();