const nodemailer = require('nodemailer');
const config = require('./../config/config');

exports.sendMail = (to, subject, body) => {  
    return new Promise((resolve, reject)=>{         
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailConfig.email,
                pass: config.emailConfig.password
            }
        });
        
        const message = {
            from: config.emailConfig.email,
            to: to,
            subject: subject,
            html: body,
            // attachments: [
            //     { 
            //         filename: '1.jpg',
            //         path: 'https://www.gstatic.com/webp/gallery/1.jpg'
            //     }
            // ]
        };
        
        transporter.sendMail(message, function(err, info) {
            if (err) {
                console.log(err);
                return reject({
                    status: 400,
                    message: 'Email error',
                    data: err              
                });    
            } else {
                console.log('Mail Info : ', info);  
                return resolve(info);          
            }
        });
    });
};
