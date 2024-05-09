import type { NextFunction, Request, Response } from "express";
import {
  createProduct,
  deleteProductById,
  editProductById,
  getAllProducts,
  getProductById,
} from "..";
import type { Product } from "@prisma/client";
import { VSProducts } from "@/libs";
import cloudinary from "@/utils/cloudinary";

const getProducts = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json({
      message: "Success get all products!",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    res.status(200).json({
      message: "Success get one product by id!",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    VSProducts.parse(req.body);

    const newProductData: Product = req.body;
    const filePath = req.file?.path!;

    await cloudinary.uploader.upload(
      filePath,
      {
        folder: "images",
        resource_type: "image",
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Product image is required!",
            errorMessage: err.message,
          });
        }
        newProductData.image_url = result?.secure_url!;
      }
    );
    const product = createProduct(newProductData);

    return res.status(200).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    await deleteProductById(productId);
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    VSProducts.parse(req.body);

    const productData: Product = req.body;
    const productId = req.params.id;
    const filePath = req.file?.path!;

    if (filePath) {
      const product = await getProductById(productId);
      const imageId = product?.image_url?.split("/").pop()?.split(".")[0];
      const publicId = "images/" + imageId;

      await cloudinary.uploader.destroy(publicId!);
      await cloudinary.uploader.upload(
        filePath!,
        {
          folder: "images",
          resource_type: "image",
        },
        (err, result) => {
          if (err) {
            return res.status(400).json({
              message: "Product image upload failed!",
              errorMessage: err.message,
            });
          }
          productData.image_url = result?.secure_url!;
        }
      );
    }

    const result = await editProductById(productId, productData);
    return res.status(200).json({
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProduct,
  removeProduct,
  updateProduct,
  createNewProduct,
};
