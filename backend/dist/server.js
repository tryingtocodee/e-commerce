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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
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
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// app.use(cors({
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//     allowedHeaders: [
//         "Content-Type",
//         "Authorization",
//         "Expires",
//         "Cache-Control",
//         "Pragma"
//     ]
// }))
app.listen(PORT, () => console.log(`server is runing on port ${PORT}`));
