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
exports.isLoggedIn = exports.findAllUsers = exports.findUserById = exports.deleteUser = exports.updateUser = exports.logOutUser = exports.logInUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const token = jwt.sign( {
// })
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, role } = req.body;
        const password = req.body.password;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = new User_1.default({
            firstName, lastName, email, password: hashedPassword, role
        });
        const savedUser = yield user_1.default.create(user);
        res.json(savedUser);
    }
    catch (error) {
        res.status(500).send({ message: "User Already Exist" });
    }
});
exports.logInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //validate
        const userExist = yield user_1.default.existingUser(email, password);
        const userName = userExist.firstName;
        const token = jwt.sign({
            user: userExist._id,
            role: userExist.role,
            name: userExist.firstName
        }, process.env.JWT_SECRET);
        console.log('login success', token);
        if (userExist.role === "admin") {
            res.cookie('token', token, {
                httpOnly: true
            }).send({ role: "admin", name: userName, userId: userExist._id });
        }
        else {
            res.cookie('token', token, {
                httpOnly: true
            }).send({ role: "user", name: userName, userId: userExist._id });
        }
    }
    catch (error) {
        res.status(404).send({ errorMessage: "Password or Email Incorrect" });
    }
});
exports.logOutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logout sucessfully");
    res.status(202).clearCookie('token').send();
});
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const userId = req.params.userId;
        const updateUser = yield user_1.default.update(userId, update);
        res.json(updateUser);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.deleteUser(req.params.userId);
        res.status(204).end();
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Product not found', error));
    }
});
exports.findUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.findUserById(req.params.userId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Product not found', error));
    }
});
exports.findAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.findAllUsers());
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Product not found', error));
    }
});
exports.isLoggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req)
        const token = req.cookies.token;
        console.log(token, "still signedin");
        if (!token) {
            return res.json(false);
        }
        else {
            console.log("still signedin");
            jwt.verify(token, process.env.JWT_SECRET);
            const decodedJwt = jwt.decode(token, { complete: true });
            const userId = decodedJwt.payload.user;
            const role = decodedJwt.payload.role;
            const userName = decodedJwt.payload.name;
            // req.user = verified.user;
            if (role === "admin") {
                res.json({ signedin: true, role: "admin", name: userName, userId: userId });
            }
            else {
                res.json({ signedin: true, role: "user", name: userName, userId: userId });
            }
            //.send({role: "user", name: userName})  
        }
    }
    catch (err) {
        console.log(err);
        res.send(false);
    }
});
//# sourceMappingURL=user.js.map