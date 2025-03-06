"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const dbStr = 'mongodb+srv://test:197346285qwer@cluster.20cyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const app = (0, express_1.default)();
app.use(express_1.default.json());
// CORS allows all urls
app.use((0, cors_1.default)());
const MONGO_URL = dbStr;
mongoose_1.default.connect(MONGO_URL, {
    dbName: 'twa'
}).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error(err);
});
app.use("/", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map