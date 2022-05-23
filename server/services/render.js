const axios = require('axios');

exports.homeRoutes = (req, res) => {
    //Make a GET request to the api
    axios.get("http://localhost:3000/api/users")
    .then(function(response){
        console.log(response.data)
        res.render('index', { items: response.data });
    })
    .catch(err => {
        res.send(err);
    })

    
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', {params: {id:req.query.id}})
        .then(function(itemdata) {
            res.render("update_user", {item : itemdata.data})
        })
        .catch(err => {
            res.send(err);
        })
}