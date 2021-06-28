"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
function create(product) {
    console.log(product, "product services ");
    return product.save();
}
function findProductById(productId) {
    return Product_1.default.findById(productId)
        .exec()
        .then((product) => {
        if (!product) {
            throw new Error(`Product ${productId} not found`);
        }
        return product;
    });
}
function findAllProducts() {
    return Product_1.default.find().sort({ name: 1 }).exec();
}
function update(productId, update) {
    return Product_1.default.findById(productId)
        .exec()
        .then((product) => {
        if (!product) {
            throw new Error(`Product ${productId} not found`);
        }
        if (update.name) {
            product.name = update.name;
        }
        if (update.description) {
            product.description = update.description;
        }
        if (update.categories) {
            product.categories = update.categories;
        }
        if (update.variants) {
            product.variants = update.variants;
        }
        if (update.sizes) {
            product.sizes = update.sizes;
        }
        if (update.price) {
            product.price = update.price;
        }
        if (update.quantity) {
            product.quantity = update.quantity;
        }
        return product.save();
    });
}
function deleteProduct(productId) {
    return Product_1.default.findByIdAndDelete(productId).exec();
}
exports.default = {
    create,
    findProductById,
    findAllProducts,
    update,
    deleteProduct,
};
//# sourceMappingURL=product.js.map