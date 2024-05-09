import type { NextFunction, Request, Response } from "express";
import { deleteUserById, getAllUsers } from "..";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      message: "Success get all users!",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    await deleteUserById(userId);

    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export { getUsers, removeUser };
