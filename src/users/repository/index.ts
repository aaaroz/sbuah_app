import prisma from "@db/index";

const findUsers = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  });
  return users;
};

const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export { findUsers, findUserById, deleteUser };
