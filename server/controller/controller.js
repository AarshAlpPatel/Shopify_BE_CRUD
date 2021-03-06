var object = require('../model/model');
var Userdb = object.Userdb;
var Warehousedb = object.Warehousedb;
//var Warehousedb = require('../model/model');

//create and save new item
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    // create new item
    console.log(req.body);
    const item = new Userdb({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        warehouse: req.body.warehouse,
        stock: req.body.stock
    })

    // save item in database
    item
        .save(item)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating an item"
            });
        });
}


exports.createWarehouse = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    console.log(req.body)
    const warehouse = new Warehousedb({
        name: req.body.name,
        location: req.body.location
    })

    warehouse
        .save(warehouse)
        .then(data => {
            res.redirect('/add-warehouse')
        })
        .catch(err => {
            res.status(500).send({
                message: err.essage || "Some error occured while creating a warehouse"
            });
        });
}

//retrieve and return all items/single item
exports.find = (req, res) => {

    //get single item based on id
    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found item with id" + id})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ 
                    message: "Error retrieving item with id" + id
                })
            })
    //get all items
    } else {
        Userdb.find()
            .then(item => {
                res.send(item)
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error occurred while retrieving item information"})
            })
    }
}

exports.findWarehouse = (req, res) => {
    Warehousedb.find()
        .then(warehouse => {
            res.send(warehouse)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieving warehouse information"})
        })
}

//update a new identified item by item id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty"
        })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update item with ${id}. Maybe item could not be found!`})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update iten information"})
        })

}

//delete a item with specified item id
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot Delete with id ${id}. Pass in a valid id.`})
            } else {
                res.send({
                    message: "Item was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
}