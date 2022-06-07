const express = require("express");
const router = express.Router();

const { create_profile } = require("../controllers/users");

router.route("/").post(create_profile);

module.exports = router;