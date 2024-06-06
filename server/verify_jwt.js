const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verify_token(token) {
    try {
        const decoded_token = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded_token);
    } catch (error) {
        console.log(error.message)
    }
}
verify_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWl0aHVuIiwiaWF0IjoxNzE2MDE5OTUzLCJleHAiOjE3MTYwMTk5NjN9.CyjMJrTz7RWzR6pEzpKsCwaKDnWjVGDOB4oVAowRNjc")
// module.exports = verify_token;

console.log(jwt.sign({name:"mithun"},process.env.JWT_SECRET,{expiresIn:'10s'}))