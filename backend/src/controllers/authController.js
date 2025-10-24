import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtHelper.js";
import * as userModel from "../models/userModel.js";

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // if (!name || !email || !password) {
        //     return res.status(400).json({ error: "These fields are required" });
        // }

        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.createUser({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "Registration successful",
            user: { id: user.id, name: user.name, email: user.email },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during registration" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)

        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during login" });
    }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during logout" });
  }
};