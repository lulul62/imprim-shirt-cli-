let express = require('express');
let router = express.Router();
let mailService = require('../services/sendMail')


/* GET home page. */
router.post('/', (req, res, next) => {
    let emailType = req.body.type;
    return mailService.sendMail(req.body, emailType).then(success => {
        res.sendStatus(200)
    }, (err) => {
        res.sendStatus(500)
    });
});

module.exports = router;
