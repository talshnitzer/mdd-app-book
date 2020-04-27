require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const {createValidationCode, sendEmail} = require('./service');
const {User} = require('./models/user');


const app = express();
const port = process.env.PORT ;
app.use(bodyParser.json()); //convert the request body from json to an object

app.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const user = new User(body);
        console.log('user', user);
        
        const newUser = await user.save();
        console.log('newUser',newUser);
        //await func to send email with code
        const validationCode = createValidationCode()
        await sendEmail(newUser.email, validationCode, newUser.name);
        res.send({status: 'OK', validationCode});
    } catch (e) {
        res.status(400).send(e)
        console.log('e', {e});
        
    }
    
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};