"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reqString = {
    type: [String],
    required: true,
};
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true
    },
    variants: reqString,
    sizes: reqString,
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
});
exports.default = mongoose_1.default.model('Product', productSchema);
//# sourceMappingURL=Product.js.map