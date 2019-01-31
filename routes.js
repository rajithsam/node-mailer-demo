var express = require('express');

var router = express.Router();

var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json"));
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.user, 
      pass: config.pass 
    },
    tls : {
        rejectUnauthorized : false
    }

});

router.get('/', function(req, res, next) 
{
    res.render('index');
});

router.post('/sendMail', function(req, res) 
{
    var emails = req.body.recipient_emails;
    var subj = req.body.subject;
    var body =  req.body.body;

    let HelperOptions = {
        from: "Rajith Sam <rajithsam.r@gmail.com>",
        bcc: emails,
        subject: subj,
        //text: body,
        html: body
    }

    transporter.sendMail(HelperOptions,(error,info) => {
        if(error)
        {
            res.render('index', {failed: true});
        }
        // console.log("Mail Sent");
        res.render('index', {success: true});
    })

});

module.exports = router;