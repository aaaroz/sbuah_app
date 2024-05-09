import type { Product } from "@prisma/client";
import {
  deleteProduct,
  editProduct,
  findProductById,
  findProducts,
  insertProduct,
} from "..";
import cloudinary from "@/utils/cloudinary";

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

const getProductById = async (id: string) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData: Product) => {
  newProductData.price = parseInt(newProductData.price.toString());
  newProductData.stock = parseInt(newProductData.stock.toString());

  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (id: string) => {
  const product = await getProductById(id);
  const imageId = product.image_url?.split("/").pop()?.split(".")[0];
  const publicId = "images/" + imageId;

  await cloudinary.uploader.destroy(publicId!);

  await deleteProduct(id);
};

const editProductById = async (id: string, productData: Product) => {
  productData.price = parseInt(productData.price.toString());
  productData.stock = parseInt(productData.stock.toString());

  const product = await editProduct(id, productData);

  return product;
};

export {
  createProduct,
  deleteProductById,
  editProductById,
  getAllProducts,
  getProductById,
};
