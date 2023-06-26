const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    discpition : {
        type : String,
        required : true
    },
    avtar : {
        type : String,
        required : true
    }
});

const crud = mongoose.model('crud',crudScema);
module.exports = crud;