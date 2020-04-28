const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

const createValidationCode = () => randomstring.generate({
    length: 6,
    capitalization: 'lowercase'
  });

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
  });



const  sendEmail = async (email, validationCode, userName ) => {
  try{
    let mailOptions = {
      from: '"MDDAppBook" <' + process.env.EMAIL_USER + '>', 
      to: email, 
      subject: 'Welcome to MDDAppBook', 
      text: 'Verify Email', 
      html: 
      `Hi ${userName} <br><br> Thanks for registering to MDDAppBook.<br><br>`+
      `Your validation code is <b>${validationCode}</b><br><br>`  +
      `Please enter it as is in the app.<br><br>` +
      `Thanks<br><br>MDDermatics`
  };

  await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log('error froms sent mail', e);
    
  }
    
}

  module.exports = {createValidationCode, sendEmail}