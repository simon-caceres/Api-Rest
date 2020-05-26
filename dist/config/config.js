"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://simonC:QDbzTtClbKbcCem8@cluster0-jeeoi.mongodb.net/test?retryWrites=true&w=majority',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PSW || ''
    }
};
