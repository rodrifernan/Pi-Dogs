const express = require("express");
const router = express.Router();
const {Dog, Temperamento} = require('../db')
const axios = require ("axios")




module.exports = router