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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth/auth-routes"));
//file imports 
const config_1 = require("./config/config");
//db connect 
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://mohdmubeen5042:MubeeN11@cluster0.k4ogs.mongodb.net/");
        console.log("connect to mongodb");
    }
    catch (e) {
        console.log(e.message);
    }
});
connect();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Expires",
        "Cache-Control",
        "Pragma"
    ]
}));
app.use("/api/auth", auth_routes_1.default);
app.listen(config_1.PORT, () => console.log(`server is runing on port ${config_1.PORT}`));
