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
            text: 'Bonjour,\n' +
            '\n' +
            'Votre commande n° ' + mail.orderRef + ' vient d\'être validée.\n' +
            'Nos services d\'expéditions se chargent de préparer votre colis.\n' +
            'Vous pouvez dès à présent suivre l\'avancement de votre commande depuis votre espace client.\n' +
            '\n' +
            'Bien cordialement,\n' +
            'L\'équipe ImprimShirt'
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
