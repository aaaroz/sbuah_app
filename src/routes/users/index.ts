import { Router } from "express";
import { authenticate } from "@/middlewares/auth";
import { getUsers, removeUser } from "@users/controllers";

const users = Router();

users.get("/", getUsers);
users.delete("/:id", authenticate, removeUser);

export default users;
