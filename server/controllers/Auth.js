const psql = require("../database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4 } = require("uuid");
dotenv.config();
const bcrypt = require("bcrypt");

const parseCookies = (cookie) =>{
    // console.log(cookie);
    const cookies = {};
    const parts = cookie.split('; ');
    parts.forEach(part => {
        const [name, value] = part.split('=');
        cookies[name] = value;
    });
    // console.log(cookies);
    return cookies;
}
const retrieveToken = (user_id) => {
    psql.query("select access_token from user_dimension where user_id=$1", [user_id],
        (err, response) => {
            // console.log(response);
            verify_token(response.rows[0])
        })
} 
const getProfile = async(username) => {
    const response = await psql.query("select display_picture from user_dimension where username=$1", [username])
    return response;
}

const createJWT = (user_id, username, email) =>{
    const token = jwt.sign(
        {
            user_id: user_id,
            username: username,
            email: email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "100d"
        }
    );
    return token;
}

const verify_token = (token) => {
    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        return decoded_token
    } catch (error) {
        return error.message
    }
}

const checkUsername = async (req, res) => {
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
}

const login =async (req, res) => {
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
}

const register =  async (req, res) => {
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
}

const logout = async (req, res) => {
    res.clearCookie('cookie', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
}
module.exports = { verify_token, createJWT, retrieveToken, parseCookies, getProfile,checkUsername,login,register ,logout}