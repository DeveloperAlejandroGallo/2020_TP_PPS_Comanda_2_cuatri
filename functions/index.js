const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const app = express();
app.use(cors({origin: true}));

app.post("/", (req, res) => {
    const {body} = req;
    const isValidMessage = body.message && body.to && body.subject;

    if(!isValidMessage) {
        return res.status(400).send({ message: "Invalid request" });
    }

    const transporter = nodemailer.createTransport( {
        service: "gmail",
        auth: {
            user: "encuarentenadospps@gmail.com",
            pass: "encuarentenados"
        }
    })

    const mailOptions = {
        from: "encuarentenadospps@gmail.com",
        to: body.to,
        subject: body.subject,
        text: body.message
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(500).send({ message: "error: " + err.message });
        }
        return res.send({ message: "email sent" });
    });
});

module.exports.mailer = functions.https.onRequest(app);