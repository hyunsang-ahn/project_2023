


const passport = require('passport');
const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리
const mongoose = require('mongoose')
const client = require('../db')
const crypto = require('crypto');
const multer = require('multer');
const _ = require('lodash');
const { ObjectId } = require('mongodb');
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

    const createSalt = () =>
        new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                if (err) reject(err);
                resolve(buf.toString('base64'));
            });
        });
    const createHashedPassword = (plainPassword) =>
        new Promise(async (resolve, reject) => {
            const salt = await createSalt();
            console.log('salt==========================', salt)
            crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
                if (err) reject(err);
                resolve({ crypto_pw: key.toString('base64'), salt });
            });
        });
    const { crypto_pw, salt } = await createHashedPassword(password);
    console.log('crypto_pw===================', crypto_pw)
    console.log('salt===================', salt)

    const result = await client.db('project').collection('users').insertOne({
        email: email,
        name: name,
        password: crypto_pw,
        salt: salt,
        createdAt: new Date(),
        updatedAt: new Date(),
        login_method: 'own'

    })

    console.log('result=========================', result)
    res.send('success')

});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/study/react-passport/uploads'); // 업로드할 파일의 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // 업로드할 파일의 원래 이름으로 저장
    }
});

const upload = multer({ storage: storage });
router.post('/uploadImage', upload.single('multipartFiles'), async (req, res) => {
    const result = await client.db('project').collection('uploadfiles').insertOne({
        fieldname: _.get(req.file, 'fieldname'),
        originalname: _.get(req.file, 'originalname'),
        encoding: _.get(req.file, 'encoding'),
        mimetype: _.get(req.file, 'mimetype'),
        destination: _.get(req.file, 'destination'),
        filename: _.get(req.file, 'filename'),
        path: _.get(req.file, 'path'),
        size: _.get(req.file, 'size'),

    })
    console.log('result==========================', result)

    res.send(result)

});



router.post('/BoardWrite', async (req, res) => {
    try {
        console.log('req.body===============', req.body)

        const result = await client.db('project').collection('Board').insertOne({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),

        })
        console.log('result==========================', result)

        // res.send(result)
        res.status(200).send({
            message: "sucess",
            result,
        }); //send success response
    } catch (e) {
        res.status(500).send({
            message: e.message,
        }); //send error response
    }


});



router.get('/Board', async (req, res) => {
    try {

        const result = await client.db('project').collection('Board')
            .aggregate([
                {
                    $addFields: {
                        "upload_img_ids": {
                            $map: {
                                input: "$upload_img_id",
                                as: "image_id",
                                in: { $toObjectId: "$$image_id" }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "uploadfiles",
                        localField: "upload_img_ids",
                        foreignField: "_id",
                        as: "uploadfiles"
                    }
                }
            ]).toArray()
        console.log('result==========================', result)

        // res.send(result)
        res.status(200).send({
            message: "sucess",
            result,
        }); //send success response
    } catch (e) {
        res.status(500).send({
            message: e.message,
        }); //send error response
    }


});


router.get('/getBoard', async (req, res) => {
    try {
        const id = _.get(req, 'query.id')
        const result = await client.db('project').collection('Board')
            .aggregate([
                {
                    $match: {
                        _id: new ObjectId(id)
                    }
                },
                {
                    $addFields: {
                        "upload_img_ids": {
                            $map: {
                                input: "$upload_img_id",
                                as: "image_id",
                                in: { $toObjectId: "$$image_id" }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "uploadfiles",
                        localField: "upload_img_ids",
                        foreignField: "_id",
                        as: "uploadfiles"
                    }
                }
            ]).toArray()
        console.log('result==========================', result)

        // res.send(result)
        res.status(200).send({
            message: "sucess",
            result,
        }); //send success response
    } catch (e) {
        res.status(500).send({
            message: e.message,
        }); //send error response
    }


});

router.get('/PlayerSearch', async (req, res) => {
    try {
        const text = _.get(req, 'query.text')
        const result = await client.db('project').collection('fifa_player')
            .aggregate([
                {
                    $match: {
                        name: new RegExp(text)
                    }
                },
                {
                    $project: {
                        _id: 0,
                        id: 1,
                        name: 1,
                        season_id_prefix: { $toInt: { $substr: ["$id", 0, 3] } }
                    }
                },
                {
                    $lookup: {
                        from: "fifa_season",
                        localField: "season_id_prefix",
                        foreignField: "seasonId",
                        as: "seasons"
                    }
                },
                {
                    $unwind: "$seasons"
                },
            ])
            .toArray()
        console.log('result==========================', result)

        // res.send(result)
        res.status(200).send({
            message: "sucess",
            result,
        }); //send success response
    } catch (e) {
        res.status(500).send({
            message: e.message,
        }); //send error response
    }


});




module.exports = router; // 모듈로 만드는 부분