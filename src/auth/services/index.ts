import { createUsers } from "../repository";

const addUser = async (username: string, password: string) => {
  const user = await createUsers(username, password);
  return user;
};

export { addUser };
