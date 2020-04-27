const {mongoose} = require('../db/mongoose.js');

var UserSchema = new mongoose.Schema({//store the schema of the user. we can add method to 'schema' but not to 'model'
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    memberId: {
        type: String,
        required: true,
        unique: true //no duplicate string in exist in db  
    }
    
});

//INSTANCE methods


//MODEL methods


var User = mongoose.model('User', UserSchema);

module.exports = {User};