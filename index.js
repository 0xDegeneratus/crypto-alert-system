const nodemailer = require('nodemailer');
const detective = require('crypto-hacker-detective');

class AlertSystem {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your@gmail.com',
                pass: 'yourpassword'
            }
        });
    }

    setupAlerts() {
        detective.on('suspiciousTransaction', (tx) => {
            this.sendAlert(tx);
        });
    }

    sendAlert(transaction) {
        const mailOptions = {
            from: 'your@gmail.com',
            to: 'recipient@gmail.com',
            subject: 'Suspicious Transaction Alert',
            text: `A suspicious transaction was detected: ${transaction}`
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = new AlertSystem();