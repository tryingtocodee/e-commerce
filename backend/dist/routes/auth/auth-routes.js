"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth/auth-controller");
const auth_controller_2 = require("../../controllers/auth/auth-controller");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.registerController);
router.post("/login", auth_controller_2.loginController);
router.post("/logout", auth_controller_1.logoutController);
exports.default = router;
