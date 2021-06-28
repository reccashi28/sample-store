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
exports.findAllItemsInCart = exports.findAllItemsOfUser = exports.addItemToCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const cart_1 = __importDefault(require("../services/cart"));
const apiError_1 = require("../helpers/apiError");
//post
exports.addItemToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        const { productId, quantity } = items[0];
        const cart = new Cart_1.default(Object.assign({}, req.body));
        yield cart_1.default.addToCart(cart);
        yield cart_1.default.updateStock(productId, quantity);
        console.log('added to cart');
        res.json(cart);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(new apiError_1.InternalServerError('Internal Server Error', error));
        }
    }
});
exports.findAllItemsOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        console.log(userId, "from full stack userid");
        const cart = yield cart_1.default.getItemsInCart(userId);
        console.log("from cart in backend");
        if (cart) {
            res.status(200).send(cart);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        res.send(null);
    }
});
exports.findAllItemsInCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield cart_1.default.findAll());
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Movies not found', error));
    }
});
//# sourceMappingURL=cart.js.map