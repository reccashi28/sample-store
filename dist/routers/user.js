"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
router.get('/isloggedin', user_1.isLoggedIn);
router.get('/logout', user_1.logOutUser);
router.get('/', auth_1.userAuth, auth_1.adminAuth, user_1.findAllUsers);
router.get('/:userId', auth_1.userAuth, auth_1.adminAuth, user_1.findUserById);
router.put('/:userId', auth_1.userAuth, user_1.updateUser);
router.delete('/:userId', auth_1.userAuth, auth_1.adminAuth, user_1.deleteUser);
router.post('/', user_1.createUser);
router.post('/login', user_1.logInUser);
exports.default = router;
//# sourceMappingURL=user.js.map