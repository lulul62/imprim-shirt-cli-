let nodemailer = require('nodemailer');
let Q = require('q');
let mailOptions = {};

/**
 * Send mail to customer
 */
function sendMail(mail, mailType) {
    let defer = Q.defer();
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'contact.imprimshirt@gmail.com',
            pass: 'contact634'
        }
    });


    if(mailType === "demands") {
         mailOptions = {
            from: '"[ImprimShirt] Support contact et réclamation"',
            to: mail.demands.from,
            subject: '[ImprimShirt] Réclamation commande : ' + mail.demands.orderReference,
            html: 'Rappel de votre message : ' + mail.demands.message + '<br><br><br><br>' +
            'Réponse du vendeur : ' + mail.message
        };
    }

    else {
        mailOptions = {
            from: '"[ImprimShirt] Support contact et réclamation"',
            to: mail.clientEmail,
            subject: '[ImprimShirt] Validation commande  : ' + mail.orderRef,
            text: 'Nous vous confirmons la validation de votre commande numéro ' + mail.orderRef + ' Vous pouvez suivre son avancée sur votre interface de suivi de commande.'
        };
    }


    transporter.sendMail(mailOptions, (error, info) => {
        defer.resolve(info);
    });

    return defer.promise;
}

module.exports = {
    sendMail: sendMail
};
