"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const createUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "username and password required" });
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const existing = await userRepo.findOneBy({ username });
    if (existing)
        return res.status(400).json({ message: "username already exists" });
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = userRepo.create({ username, password: hashed });
    await userRepo.save(user);
    res.status(201).json({ message: "User created", username: user.username });
};
exports.createUser = createUser;
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "username and password required" });
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const user = await userRepo.findOneBy({ username });
    if (!user)
        return res.status(401).json({ message: "invalid credentials" });
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ message: "invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ sub: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
    res.json({ token });
};
exports.login = login;
