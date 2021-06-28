"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/', product_1.findAllProducts);
router.get('/:productId', product_1.findProductById);
router.put('/:productId', auth_1.userAuth, auth_1.adminAuth, product_1.updateProduct);
router.delete('/:productId', auth_1.userAuth, auth_1.adminAuth, product_1.deleteProduct);
router.post('/', auth_1.userAuth, auth_1.adminAuth, product_1.createProduct);
exports.default = router;
//# sourceMappingURL=product.js.map