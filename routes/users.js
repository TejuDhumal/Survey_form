var express = require("express");
// const{ route } = require("express/lib/application.js");
const userModel = require("../models/user");
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { response } = require("express");
const jwt = require('jsonwebtoken');

router.post("/signup", async function (req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    userModel.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                if (password !== confirmPassword) {
                    res.json({
                        message: "Password not matched",
                    });
                }

                else {
                    bcrypt.hash(password, 10, async function (err, hash) {
                        if (err) {
                            return res.json({
                                message: "Something went wrong!",
                                error: err
                            });
                        }
                        else {
                            var userDetails = await userModel.create({
                                _id: mongoose.Types.ObjectId(),
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                password: hash,
                                confirmPassword: hash
                            });
                            userDetails.save()
                                // response.send(doc)
                                // })
                                .then(doc => {
                                    res.status(201).json({
                                        message: "User registered Succesfully",
                                        results: doc
                                    });
                                })
                                .catch(err => {
                                    res.json(err);
                                });

                        }
                    });


                }
            }
            else {
                return res.status(401).json({ message: 'user already exist' })

            }



        });
});

router.post('/login', (req, res, next) => {
    userModel.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ message: 'user not exist' })
            }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (!result) {
                        return res.status(401).json({ message: 'password is invalid' })
                    }
                    if (result) {
                        // const token = jwt.sign({
                        //     email: user[0].email,
                        //     firstname: user[0].firstname,
                        //     lastname: user[0].lastname
                        // },
                        //     'this is dummy text',
                        //     {
                        //         expiresIn: "24h"
                        //     }
                        // );
                        res.status(200).json({
                            email: user[0].email,
                            firstname: user[0].firstname,
                            // token: token
                        })

                    }

                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })
})


//     else {
//         var userDetails = await userModel.create({
//             // _id: mongoose.Types.ObjectId(),
//             email: email,
//             password: password,
//             confirmPassword: password
//         });
//         userDetails.save((err, doc) => {
//             res.send(doc)

//         })


//     }
// });
mongoose.set('strictQuery', false);
module.exports = router;




/*router.get("/",async (req,res) => {
    try{
       const usersinfo = await User.find()
       res.json(usersinfo)
    }catch(err)
    {
        res.json(err);
    }


});

router.get("/:userId", async (req,res) => {
    const userId=req.params.userId

    try{
        const u = await User.findById(userId)
        res.json(u)
    }catch(error){
        res.json(error);
    }
});

router.post("/", async (req,res) =>{
    const usercreate = await User.create(req.body)
    res.json(usercreate)
          
})



module.exports=router;
*/
