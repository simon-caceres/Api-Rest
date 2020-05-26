"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
//propiedad de typescript que sirve para indicarle para que se va a utilizar este objeto por eso se utiliza :
const DBoptions = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
mongoose_1.default.connect(config_1.default.DB.URI, DBoptions);
const connect = mongoose_1.default.connection;
connect.once('open', () => {
    console.log('Mongodb its OnFire!!');
});
connect.on('error', err => {
    console.log(err);
    process.exit(0);
});
