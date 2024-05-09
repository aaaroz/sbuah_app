import { deleteUser, findUserById, findUsers } from "..";

const getAllUsers = async () => {
  const users = await findUsers();
  return users;
};

const getUserById = async (id: string) => {
  const user = findUserById(id);

  if (!user) {
    throw Error("User not found!");
  }
  return user;
};

const deleteUserById = async (id: string) => {
  await getUserById(id);
  await deleteUser(id);
};

export { getAllUsers, getUserById, deleteUserById };
