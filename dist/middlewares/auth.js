"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.userAuth = void 0;
const jwt = require("jsonwebtoken");
exports.userAuth = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if (!token)
            return res.redirect('/');
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified, "verified user");
        req.user = verified;
        console.log(req.user, "user in auth");
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ errorMessage: "Unauthorized access" });
    }
};
exports.adminAuth = (req, res, next) => {
    try {
        // const admin = req.user.isAdmin
        // console.log(admin, "user")
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        // req.user.isAdmin === false;
        console.log(token, "admin token");
        const decodedJwt = jwt.decode(token, { complete: true });
        const role = decodedJwt.payload.role;
        if (role !== "admin")
            return res.status(401).json({ errorMessage: "Unauthorized access" });
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ errorMessage: "Unauthorized access" });
    }
};
//# sourceMappingURL=auth.js.map