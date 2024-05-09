import { authenticate } from "@/middlewares/auth";
import upload from "@/middlewares/multer";
import {
  createNewProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "@products/controllers";
import { Router } from "express";

const products = Router();

products.get("/", authenticate, getProducts);
products.get("/:id", authenticate, getProduct);
products.post("/", upload.single("image"), authenticate, createNewProduct);
products.put("/:id", upload.single("image"), authenticate, updateProduct);
products.delete("/:id", authenticate, removeProduct);

export default products;
