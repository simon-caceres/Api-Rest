"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.singUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 8400
    });
}
exports.singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'porfavor envia correo y contraseña' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        return res.status(400).json({ msg: 'usuario ya existe' });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: 'porfavor envia correo y contraseña' });
        }
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: 'usuario no existe' });
        }
        console.log(req.body);
        const isMatch = yield user.validPassword(req.body.password);
        if (isMatch) {
            return res.status(200).json({ token: createToken(user) });
        }
        return res.status(400).json({
            msg: 'correo o contraseña invalidos'
        });
    }
    catch (error) {
        console.log(error);
    }
});
