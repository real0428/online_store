const { expressjwt } = require("express-jwt");
require('dotenv').config();
module.exports = expressjwt({ secret: process.env.JWTSECRETKEY, algorithms: ["HS256"] })