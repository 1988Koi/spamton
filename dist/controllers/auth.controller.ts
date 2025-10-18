import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "username and password required" });

  const userRepo = AppDataSource.getRepository(User);
  const existing = await userRepo.findOneBy({ username });
  if (existing) return res.status(400).json({ message: "username already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = userRepo.create({ username, password: hashed });
  await userRepo.save(user);

  res.status(201).json({ message: "User created", username: user.username });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "username and password required" });

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ username });
  if (!user) return res.status(401).json({ message: "invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "invalid credentials" });

  const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
};
