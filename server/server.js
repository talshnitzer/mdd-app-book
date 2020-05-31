require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {createValidationCode, sendEmail} = require('./service');
const {User} = require('./models/user');


const app = express();
app.use(cors());
const port = process.env.PORT ;
app.use(bodyParser.json()); //convert the request body from json to an object

app.post('/register', async (req, res) => {
    try {
        const body = req.body;
        //await func to send email with code
        const validationCode = createValidationCode()
        await sendEmail(body.email, validationCode, body.name);
        await User.addOrUpdateUser(body)
        res.send({status: 'OK', validationCode});
    } catch (e) {
        res.status(200).send({error: e.message})
        console.log('e', e);
    }
    
});


app.listen(port, () => {  
    console.log(`Started up at port ${port}`);
});

module.exports = {app};