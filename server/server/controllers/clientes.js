const axios = require('axios');

let clientController = {};

const token = 'a5ac39d1258a73c3416f780c3e58ebc3fadd3d4a'
//Function to Map user repos
clientController.allUsers = (req, res) => {

    //Here I will need to implement pagination
    axios
        .get(`https://api.github.com/users?per_page=${req.query.per_page}&since=${req.query.since}&access_token=${token}`)
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
        .get(`https://api.github.com/users/${req.query.name}?access_token=${token}`)
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
    
    const mapValues = (obj, fn) => Object
    .keys(obj)
    .reduce((acc, k) => {
        acc[k] = fn(obj[k], k, obj);
        return acc;
    }, {});

    axios
        .get(`https://api.github.com/users/${req.query.name}/repos?access_token=${token}`)
        .then((response) => {

            var repos = response.data

            const names = mapValues(repos, u => u.name)
            const id = mapValues(repos, u => u.id)
            const url = mapValues(repos, u => u.url)
            
            res.json({status: 200, res: {
                    names, id, url
                }})
        })
        .catch((e) => {
            //console.log(e);
            res.json({status: 400, e})
        })
};

// ! Crud básico termina aqui

module.exports = clientController;
