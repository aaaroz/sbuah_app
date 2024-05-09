import prisma from "@db/index";

export const getUserByUsername = async (username: string) => {
  if (!username) {
    throw new Error("username is required");
  }

  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};
