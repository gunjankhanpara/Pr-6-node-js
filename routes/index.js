const express = require('express');

const routes = express.Router();

const fileupload = require('../config/fileupload');

const crudcontroller = require('../controllers/homeController');

routes.get('/',crudcontroller.gunjan);
routes.post('/insertData',fileupload,crudcontroller.addrecord);
routes.get('/deletedata',crudcontroller.deletdata);
routes.get('/edit',crudcontroller.edit);



module.exports = routes;