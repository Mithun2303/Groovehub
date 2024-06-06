const router = require("express").Router();
const mongoose = require("mongoose");
const UserModel = require("../models/Users");
const SongModel = require("../models/Songs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { v4 } = require("uuid");
const psql = require("../database");
const { createJWT, verify_token } = require("../crud/Auth");

dotenv.config();

router.get("/checkusername/:username", async (req, res) => {
    const username = req.params.username;
    console.log(username);
    try {
        const user = (await psql.query(`select username from user_dimension where username='${username}'`)).rows;
        console.log(user, username);
        if (user.length != 0) {
            throw ("Username already exists");
        }
        else {
            res.status(200).json({ meassage: "Ok" });
        }
    } catch (error) {
        console.log(error)
        res.status(302).json({ message: error });
    }
})
router.post("/login", async (req, res) => {
    const obj = req.body;
    try {
        psql.query("select username,email,user_id,password,access_token,display_picture from user_dimension where username=$1",
            [obj.username],
            (err, response) => {
                if (err) { throw err }
                if (response.rowCount == 0) {
                    res.status(404).jsonp("User not found");
                }
                else {
                    const password = response.rows[0].password;
                    const user_id = response.rows[0].user_id;
                    const email = response.rows[0].email;
                    const access_token = response.rows[0].access_token;
                    const dp = response.rows[0].display_picture
                    bcrypt.compare(obj.password, password, async (error, password_equality) => {
                        if (error) { throw error }
                        if (!password_equality) {
                            res.status(404).json({ message: "Incorrect password" });
                        }
                        else {
                            const result = await verify_token(access_token);
                            if (result === "jwt expired") {
                                console.log("hello");
                                const token = await createJWT(user_id, obj.username, email);
                                await psql.query("update user_dimension set access_token=$1 where user_id=$2", [token, user_id]);
                                res.cookie("cookie", token, {
                                    httpOnly: true,
                                    // secure: process.env.JWT_SECRET,
                                    secure: true,
                                    maxAge: 24 * 60 * 60 * 1000,
                                    path: "/"
                                }).status(200).json({
                                    message: "Access granted",
                                    dp:dp
                                })
                            }
                            else if (result == "invalid signature") {
                                throw result
                            }
                            else {
                                res.cookie("cookie", access_token, {
                                    httpOnly: true,
                                    secure: process.env.JWT_SECRET,
                                    maxAge: 864000000
                                }).status(200).json({
                                    message: "Access granted",
                                    dp:dp
                                })
                            }
                        }
                    })
                }
            })
    } catch (error) {
        res.status(401)
    }
})

router.post("/logout", async (req, res) => {
    res.clearCookie('cookie', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
})
router.post("/logain", async (req, res) => {
    let obj = req.body;
    try {
        if (obj.username != null) {
            // console.log(obj.username);
            psql.query("select user_id,password from user_dimension where username=$1",
                [obj.username],
                (err, result) => {
                    if (err) {
                        console.log(err)
                        throw (err.message);
                    }
                    if (result.rowCount > 0) {
                        const hash = result.rows[0].password;
                        const user_id = result.rows[0].user_id;
                        console.log(hash, obj.password);
                        bcrypt.compare(obj.password, hash, (error, pwd_result) => {
                            console.log(pwd_result, obj.password, hash);
                            if (error) {
                                throw (error);
                            }
                            if (pwd_result == true) {
                                psql.query(
                                    "select user_id,username,email,display_picture from user_dimension where user_id=$1",
                                    [user_id],
                                    (err, response) => {
                                        if (err) { throw (err); }
                                        if (response) {
                                            const token = jwt.sign(
                                                {
                                                    user_id: user_id,
                                                    username: response.rows[0].username,
                                                    email: response.rows[0].email
                                                },
                                                process.env.JWT_SECRET,
                                                {
                                                    expiresIn: "100d"
                                                }
                                            );

                                            res.cookie("cookie", token, {
                                                httpOnly: true,
                                                secure: process.env.JWT_SECRET,
                                                maxAge: 864000000
                                            }).status(200).json({
                                                message: "Access granted"
                                            })
                                        }
                                    }
                                )
                            }
                            else {
                                res.status(400).json({ message: "Incorrect username or password" })
                            }
                        })
                    }
                    else {
                        res.status(400).json({ message: "Incorrect username or password" })
                    }
                })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })
    }
})

router.post("/register", async (req, res) => {
    const obj = req.body;
    console.log("register");
    console.log(process.env.JWT_SECRET);
    try {
        bcrypt.hash(obj.password, 12, async (err, hashed_password) => {
            if (err) { throw (err) }
            if (hashed_password) {
                const user_id = v4();
                const token = await createJWT(user_id, obj.username, obj.email);
                console.log(token)
                psql.query(
                    "insert into user_dimension(user_id,username,email,password,access_token,display_picture) VALUES($1,$2,$3,$4,$5,$6)",
                    [user_id, obj.username, obj.email, hashed_password, token, obj.displaypic],
                    (error, response) => {
                        if (error) {
                            if (error.message == 'duplicate key value violates unique constraint "user_dimension_pkey"') {
                                res.status(400).jsonp("Username already exists");
                            }
                            return
                        }
                        res.cookie("cookie", token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 24 * 60 * 60 * 1000,
                            path: "/"
                        }).status(201).json({ message: "Access granted" });
                    })
            }
        })
    } catch (error) {
        console.log(error.message);

        // res.status(400).json({ message: error })
    }
})
module.exports = router;