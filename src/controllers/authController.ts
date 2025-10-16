import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const COOKIE_NAME = "token";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development", 
  sameSite: "strict" as const,
  maxAge: 24 * 60 * 60 * 1000,
};


export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, email, password, image } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName:"",
      email,
      password: hashedPassword,
      image,
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie(COOKIE_NAME, token, cookieOptions);


    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie(COOKIE_NAME, token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
