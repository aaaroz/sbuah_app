import * as bun from "bun";
import type { TLoginRequest, TLoginResponse, TRegisterRequest } from "@/types";
import { getUserByUsername } from "@/utils";
import type { NextFunction, Request, Response } from "express";
import { addUser } from "../services";
import jwt, { type JwtPayload } from "jsonwebtoken";

const { JWT_SECRET } = process.env;
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, confirm_password }: TRegisterRequest = req.body;

    // VSRegister.parse(req.body);

    const existUser = await getUserByUsername(username);

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        message: "Password not match",
      });
    }

    const encryptedPassword = await bun.password.hash(password, "bcrypt");

    const user = await addUser(username, encryptedPassword);

    res.status(201).json({
      message: `User created successfully!`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response<TLoginResponse>,
  next: NextFunction
) => {
  try {
    const { username, password }: TLoginRequest = req.body;
    // VSLogin.parse(req.body);

    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(400).json({
        message: "username or password invalid",
      });
    }

    const decryptedPassword = await bun.password.verify(
      password,
      user.password,
      "bcrypt"
    );

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      JWT_SECRET as string,
      {
        expiresIn: "30m",
      }
    );

    if (!decryptedPassword) {
      return res.status(400).json({
        message: "username or password invalid",
      });
    }

    res.status(200).json({
      message: "Login successfully",
      data: {
        user: {
          id: user.id,
          username: user.username,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
