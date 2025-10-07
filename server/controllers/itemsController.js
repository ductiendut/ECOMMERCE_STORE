const Item = require("../models/itemsModel")

/* GET request handler */
const getItem = async (req, res) => {
    try {
        const filter = {};
        if(req.query.category){
            filter.category = req.query.category;
        }
        // optional limit for future use
        const limit = parseInt(req.query.limit || '0', 10);
        const query = Item.find(filter).sort({ createdAt: -1 });
        if(limit > 0) query.limit(limit);
        const items = await query;
        res.json(items);
    } catch (e){
        res.status(500).json({ message: 'Server error' });
    }
}

/* GET single item */
const getSingleItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if(!item) return res.status(404).json({message: 'Item not found'})
        res.json(item)
    } catch (e) {
        res.status(400).json({message: 'Invalid item id'})
    }
}

/* POST Request handler */
const addItem = async (req, res) => {
    const highlights = req.body.highlights.split(",")
    const size = req.body.size.split(",")

    /* The request.body must have all these values */
    const item = {
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        image: req.files,
        size: size,
        highlights: highlights,
        detail: req.body.detail
    }

    if(item){
        await Item.create(item)
        res.status(201).json({message: "Items Add Success"})
        res.redirect("/shop")
    } 
    else {
        res.status(400).json({message: "Unable to add item"})
    }
}

/* PUT Request handler */
const updateItem = (req, res) => {
    res.json({message: "update Item"})
}

/* DELETE Request handler */
const deleteItem = (req, res) => {
    res.json({message: "delete Item"})
}

module.exports = {
    getItem,
    getSingleItem,
    addItem,
    updateItem,
    deleteItem
}