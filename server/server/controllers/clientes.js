const axios = require('axios');

let clientController = {};

//Function top Map user repos
const mapValues = (obj, fn) => Object
    .keys(obj)
    .reduce((acc, k) => {
        acc[k] = fn(obj[k], k, obj);
        return acc;
    }, {});
clientController.allUsers = (req, res) => {

    //Here I will need to implement pagination
    axios
        .get('https://api.github.com/users')
        .then((response) => {
            res.json({status: 200, response: response.data})
        })
        .catch((e) => {
            console.log(e);
            res.json({status: 400, e})
        })
};

clientController.oneUser = (req, res) => {

    axios
        .get(`https://api.github.com/users/${req.query.name}`)
        .then((response) => {

            var user = response.data
            res.json({
                status: 200,
                res: {
                    login: user.login,
                    name: user.name,
                    bio: user.bio,
                    avatar: user.avatar_url,
                    profile: user.html_url
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
