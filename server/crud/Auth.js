const psql = require("../database");
// const verify_token = require("../verify_jwt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function parseCookies(cookie) {
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
async function retrieveToken(user_id) {
    psql.query("select access_token from user_dimension where user_id=$1", [user_id],
        (err, response) => {
            // console.log(response);
            verify_token(response.rows[0])
        })
} 
async function getProfile(username) {
    const response = await psql.query("select display_picture from user_dimension where username=$1", [username])
    return response;
}

async function createJWT(user_id, username, email) {
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

async function verify_token(token) {
    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        return decoded_token
    } catch (error) {
        return error.message
    }
}

module.exports = { verify_token, createJWT, retrieveToken, parseCookies, getProfile }