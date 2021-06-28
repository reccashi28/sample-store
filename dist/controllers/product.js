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
exports.findAllProducts = exports.findProductById = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const product_1 = __importDefault(require("../services/product"));
const apiError_1 = require("../helpers/apiError");
exports.createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.cookies.token, "creating product");
        const product = new Product_1.default(Object.assign({}, req.body));
        yield product_1.default.create(product);
        console.log("product created");
        res.json(product);
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
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const productId = req.params.productId;
        const updatedProduct = yield product_1.default.update(productId, update);
        console.log("product updated");
        res.json(updatedProduct);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Product not found', error));
    }
});
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.default.deleteProduct(req.params.productId);
        res.status(204).end();
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Product not found', error));
    }
});
exports.findProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findProductById(req.params.productId));
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Product not found', error));
    }
});
exports.findAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findAllProducts());
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Product not found', error));
    }
});
//# sourceMappingURL=product.js.map