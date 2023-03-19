


const passport = require('passport');
const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리



router.post('/login', passport.authenticate('local', {
    successRedirect: '/custom-api/success',

    failureRedirect: '/custom-api/fail'
}), (req, res) => {
    console.log('req====================', req)
});


router.get('/success', (req, res) => {

    console.log('success')
    return res.send('success')

})
router.get('/fail', (req, res) => {

    console.log('fail')
    return res.send('fail')
})

router.get('/loginChk', (req, res) => {

    console.log('login/chk')
    res.send(req.user)
})
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


module.exports = router; // 모듈로 만드는 부분