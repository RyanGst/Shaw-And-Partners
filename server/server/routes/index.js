const routes = require('express').Router()
const clientController = require('../controllers/clientes');

const bodyParser = require('body-parser');

//const upload = multer({ dest: '../../uploads' });
const checkAuth = require('../middleware/check-auth')

//? BP stuff parse various different custom JSON types as JSON
routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({extended: false}));
// parse various different custom JSON types as JSON
routes.use(bodyParser.json({type: 'application/json'}))

// parse some custom thing into a Buffer
routes.use(bodyParser.raw({type: 'application/vnd.custom-type'}))

// parse an HTML body into a string
routes.use(bodyParser.text({type: 'text/html'}))

// ? Routes to Client Post, Get, Delete and Put methods

routes
    .route('/api/users/')
    .get(clientController.allUsers)

routes
    .route('/api/user/details')
    .get(clientController.oneUser)

routes
    .route('/api/user/repos')
    .get(clientController.userRepos)

module.exports = routes