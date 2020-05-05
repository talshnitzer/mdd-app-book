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
        required: true
    } 
});

//INSTANCE methods


//MODEL methods
UserSchema.statics.addOrUpdateUser = async function (body) {
    const User = this;
    const updatedUser = await User.findOneAndUpdate({memberId: body.memberId},{$set: body}, {new: true});
        if (!updatedUser){
            const user = new User(body);
            console.log('user', user);
            const newUser = await user.save();
            console.log('newUser',newUser);
        }
}


var User = mongoose.model('User', UserSchema);

module.exports = {User};