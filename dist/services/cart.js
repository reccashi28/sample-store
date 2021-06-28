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
const Product_1 = __importDefault(require("../models/Product"));
const Cart_1 = __importDefault(require("../models/Cart"));
function addToCart(cart) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield getProduct(cart);
        return Cart_1.default.findOne({ purchasedBy: cart.purchasedBy })
            .exec()
            .then((data) => {
            const stockQuantity = product.quantity;
            const buyQuantity = cart.items[0].quantity;
            const productId = cart.items[0].productId;
            //if data user doesnt have cart yet, create one
            if (!data) {
                //check if buy quantity lower than stock quantity
                if (stockQuantity >= buyQuantity) {
                    cart.totalAmount += product.price * buyQuantity;
                    return cart.save();
                }
                else {
                    throw new Error('Not enopugh inventory');
                }
            }
            //if user already has cart, check if product exist and stock is higher or equal to buy quantity
            if (product) {
                if (stockQuantity >= buyQuantity) {
                    //check if product already in cart
                    const productExistInCart = data.items.findIndex((product) => {
                        return (new String(product.productId).trim() ===
                            new String(productId).trim());
                    });
                    //check if product is already in cart 
                    if (productExistInCart >= 0) {
                        //increment quantity
                        data.items[productExistInCart].quantity += buyQuantity;
                    }
                    else {
                        //add new item to cart
                        const insertNewItem = {
                            productId: productId,
                            quantity: buyQuantity,
                        };
                        data.items.push(insertNewItem);
                    }
                }
                else {
                    throw new Error('Not enopugh inventory');
                }
            }
            else {
                throw new Error(`Product ${productId} not found`);
            }
            // just for showing the returned total amount for res.json
            cart.totalAmount += product.price * buyQuantity;
            data.totalAmount += product.price * buyQuantity;
            return data.save();
        });
    });
}
function getProduct(cart) {
    return Product_1.default.findOne({ _id: cart.items[0].productId })
        .exec()
        .then((product) => {
        if (product) {
            let stockQuantity = product.quantity;
            let buyQuantity = cart.items[0].quantity;
            if (stockQuantity >= buyQuantity) {
                stockQuantity -= Number(buyQuantity);
                product.save();
            }
            else {
                throw new Error('Not enopugh inventory');
            }
        }
        else {
            throw new Error(`Product ${cart.items[0].productId} not found`);
        }
        return product;
    });
}
function updateStock(productId, quantity) {
    return Product_1.default.findOne({ _id: productId })
        .exec()
        .then((p) => {
        if (p) {
            p.quantity = Number(p.quantity) - Number(quantity);
            return p.save();
        }
        else {
            throw new Error(`Product ${productId} not found`);
        }
    });
}
function getItemsInCart(userId) {
    //.populate('purchasedBy') add this later
    return Cart_1.default.findOne({ purchasedBy: userId })
        .populate('items.productId')
        .exec()
        .then((cart) => {
        console.log(cart, "fetched cart");
        if (!cart) {
            throw new Error(`User ${userId} doesnt have cart yet`);
        }
        return cart;
    });
}
function findAll() {
    return Cart_1.default.find().populate('purchasedBy').exec(); // Return a Promise
}
exports.default = { addToCart, getItemsInCart, findAll, updateStock };
//# sourceMappingURL=cart.js.map