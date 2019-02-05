const chai = require('chai');
const app = require('./config/express');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const urlBase = "http://localhost:5050/api"
describe('API', () => {

    it('USERS - GET /api', (done) => {});

    it('USER INFO - GET /api/RyanGostosaum', (done) => {});

});