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
exports.logoutController = exports.loginController = exports.registerController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//file import
const config_1 = require("../../config/config");
//db import 
const user_1 = __importDefault(require("../../model/user"));
//register
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, email } = req.body;
    try {
        const userExist = yield user_1.default.findOne({ email });
        if (userExist) {
            res.json("user with this email  already exists");
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.default({
            userName,
            email,
            password: hashedPassword
        });
        yield newUser.save();
        res.status(200).json({
            success: true,
            message: "user registerd successfully",
            username: userName,
            email: email
        });
    }
    catch (e) {
        console.log("error in register controller", e.message);
        res.status(400).json("Internal server error");
    }
});
exports.registerController = registerController;
//login
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const userExist = yield user_1.default.findOne({ email });
        if (!userExist) {
            res.status(400).json("user with this email doesnt exist");
        }
        const verifyPassword = yield bcryptjs_1.default.compare(password, userExist === null || userExist === void 0 ? void 0 : userExist.password);
        if (!verifyPassword) {
            res.json("incorrrect password");
        }
        if (!config_1.jwtKey) {
            console.error("JWT_SECRET missing from login controller.");
            res.status(500).json("Internal server error.");
        }
        const token = jsonwebtoken_1.default.sign({ id: userExist === null || userExist === void 0 ? void 0 : userExist._id, email: userExist === null || userExist === void 0 ? void 0 : userExist.email, role: userExist === null || userExist === void 0 ? void 0 : userExist.role }, config_1.jwtKey, { expiresIn: "15d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        }).json({
            success: true,
            message: "successfully logged in ",
            user: {
                id: userExist === null || userExist === void 0 ? void 0 : userExist._id,
                email: userExist === null || userExist === void 0 ? void 0 : userExist.email,
                role: userExist === null || userExist === void 0 ? void 0 : userExist.role
            }
        });
    }
    catch (e) {
        console.log("error in login controller", e.message);
        res.status(400).json("Internal server error");
    }
});
exports.loginController = loginController;
//logout 
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logoutController = logoutController;
