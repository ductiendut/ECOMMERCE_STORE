const express = require("express")
const router = express.Router()
const cors = require("cors")
const uploadPhoto = require("../middlewares/upload")
const { getItem, getSingleItem, addItem, updateItem, deleteItem } = require("../controllers/itemsController")

router.get('/', cors(), getItem)
router.get('/:id', cors(), getSingleItem)

/* The post request must have a body elemnt with name images */
router.post('/', uploadPhoto.array('images'), addItem)

router.put('/:id', updateItem)

router.delete('/:id', deleteItem)

module.exports = router