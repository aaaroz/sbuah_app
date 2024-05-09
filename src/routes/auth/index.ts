import { login, register } from "@auth/controllers";
import { Router } from "express";

const auth = Router();

auth.post("/register", register);
auth.post("/login", login);

export default auth;
