import prisma from "@db/index";
import type { Product } from "@prisma/client";

const findProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const findProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const insertProduct = async (productData: Product) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      desc: productData.desc,
      image_url: productData.image_url,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
    },
    select: {
      name: true,
      desc: true,
      image_url: true,
      category: true,
      stock: true,
      price: true,
    },
  });

  return product;
};

const deleteProduct = async (id: string) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const editProduct = async (id: string, productData: Product) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      desc: productData.desc,
      image_url: productData.image_url,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
    },
  });

  return product;
};

export {
  deleteProduct,
  editProduct,
  findProductById,
  findProducts,
  insertProduct,
};
