const dbConfig = require("../../config/db");
const mongoose = require("mongoose");

mongoose.promise = global.Promise;

const db = {}