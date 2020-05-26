"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controller_1 = require("../controllers/user.controller");
router.post('/singup', user_controller_1.singUp);
router.post('/singin', user_controller_1.singIn);
exports.default = router;
