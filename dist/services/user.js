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
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require('bcrypt');
function create(newUser) {
    return User_1.default.findOne({ email: newUser.email })
        .exec()
        .then((user) => {
        if (user) {
            throw new Error(`User slready exist`);
        }
        return newUser.save();
    });
}
function existingUser(email, password) {
    return User_1.default.findOne({ email: email }).exec()
        .then((user) => __awaiter(this, void 0, void 0, function* () {
        if (!user) {
            throw new Error('User does not exist');
        }
        const passwordCorrect = yield bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            throw new Error('Password incorrect');
        }
        return user;
    }));
}
function findUserById(userId) {
    return User_1.default.findById(userId)
        .exec()
        .then((user) => {
        if (!user) {
            throw new Error(`User ${userId} not found`);
        }
        return user;
    });
}
function findAllUsers() {
    return User_1.default.find().sort({ firstName: 1 }).exec();
}
function update(userId, update) {
    return User_1.default.findById(userId)
        .exec()
        .then((user) => {
        if (!user) {
            throw new Error(`User ${userId} not found`);
        }
        if (update.firstName) {
            user.firstName = update.firstName;
        }
        if (update.lastName) {
            user.lastName = update.lastName;
        }
        if (update.role) {
            user.role = update.role;
        }
        return user.save();
    });
}
function deleteUser(userId) {
    return User_1.default.findByIdAndDelete(userId).exec();
}
exports.default = {
    create,
    existingUser,
    findUserById,
    findAllUsers,
    update,
    deleteUser,
};
//# sourceMappingURL=user.js.map