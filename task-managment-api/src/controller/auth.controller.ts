import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import JwtService from "../utils/jwtServices.js";
import { AppError } from "../middleware/errorHandler.js";
import users from "../db/schema/users.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const { name, email, password } = validatedData;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        throw new AppError("User already exists", 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] = await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
        })
        .returning();

      const token = JwtService.sign({
        id: newUser.id,
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },


  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { email, password } = validatedData;

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        throw new AppError("Invalid email or password", 401);
      }

      const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordMatched) {
        throw new AppError("Invalid email or password", 401);
      }

      const token = JwtService.sign({
        id: user.id,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;