const axios = require('axios');

let clientController = {};

//Function to Map user repos
const mapValues = (obj, fn) => Object
    .keys(obj)
    .reduce((acc, k) => {
        acc[k] = fn(obj[k], k, obj);
        return acc;
    }, {});
clientController.allUsers = (req, res) => {

    //Here I will need to implement pagination
    axios
        .get(`https://api.github.com/users?per_page=${req.query.per_page}&since=${req.query.since}`)
        .then((response) => {

            //A drowning man will clutch at a straw
            var link = response.headers.link
            var slice = link.slice(1)
            var result = slice.split('>', 1)
            res.json({status: 200, response: response.data, nextPage: result})
        })
        .catch((e) => {
            console.log(e);
            res.json({status: 400, e})
        });
};

clientController.oneUser = (req, res) => {

    axios
        .get(`https://api.github.com/users/${req.query.name}`)
        .then((response) => {

            var user = response.data
            res.json({
                status: 200,
                res: {
                    id: user.id,
                    login: user.login,
                    name: user.name,
                    bio: user.bio,
                    avatar: user.avatar_url,
                    profile: user.html_url, 
                    date: user.created_at
                }
            })
        })
        .catch((e) => {
            console.log(e);
            res.json({status: 400, e})
        })
};

clientController.userRepos = (req, res) => {
    axios
        .get(`https://api.github.com/users/${req.query.name}/repos`)
        .then((response) => {
            var repos = response.data

            const index = mapValues(repos, u => u.name)
            console.log(index);
            res.json({status: 200, res: {
                    index
                }})
        })
        .catch((e) => {
            //console.log(e);
            res.json({status: 400, e})
        })
};

// ! Crud básico termina aqui

module.exports = clientController;
