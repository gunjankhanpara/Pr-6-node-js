const express = require('express');

const port = 9000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());
const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/',require('./routes'));
 
const db = require('./config/mongoose');



app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("server start on port :-"+port);
});