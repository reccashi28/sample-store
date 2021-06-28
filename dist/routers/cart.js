"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/', auth_1.userAuth, cart_1.addItemToCart);
router.get('/:userId', auth_1.userAuth, cart_1.findAllItemsOfUser);
// router.get('/', userAuth, findAllItemsInCart)
exports.default = router;
//# sourceMappingURL=cart.js.map