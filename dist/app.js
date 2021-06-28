"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
const movie_1 = __importDefault(require("./routers/movie"));
const product_1 = __importDefault(require("./routers/product"));
const user_1 = __importDefault(require("./routers/user"));
const cart_1 = __importDefault(require("./routers/cart"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config({ path: '.env' });
const app = express_1.default();
const cors = require("cors");
const cookieParser = require('cookie-parser');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
// Express configuration
app.set('port', process.env.PORT || 5000);
// Use common 3rd-party middlewares
app.use(compression_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
// Use movie router
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/movies', movie_1.default);
app.use('/api/v1/products', product_1.default);
app.use('/api/v1/cart', cart_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map