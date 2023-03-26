


const passport = require('passport');
const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
const mongoose = require('mongoose')
const client = require('../db')

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


router.post('/register', async (req, res, next) => {
    console.log('req========================', req.body)

    const { email, name, password } = req.body
    const result = await client.db('project').collection('users').insertOne({
        email: email,
        name: name,
        password: password,
    })

    console.log('result=========================', result)
    res.send(result)

});

module.exports = router; // 모듈로 만드는 부분