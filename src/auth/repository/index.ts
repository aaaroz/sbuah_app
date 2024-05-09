import prisma from "@db/index";

const createUsers = async (username: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
    select: {
      id: true,
      username: true,
    },
  });
  return user;
};

export { createUsers };
