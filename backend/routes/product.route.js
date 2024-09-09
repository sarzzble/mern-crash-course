import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

// Router() metodu, belirli yollar ve HTTP istekleri için ayrı modüller oluşturarak daha modüler ve yönetilebilir bir uygulama yapısı sağlar.
const router = express.Router();

// get() metodu, Express.js framework'unde bir GET isteği için rota tanımlar. "req" gelen isteği, "res" verilecek yanıtı temsil eder.
router.get("/", getProducts);

// post() metodu, database'e veri göndermek için kullanılır.
router.post("/", createProduct);

// put() metodu, database'deki veriyi güncellemek için kullanılır.
router.put("/:id", updateProduct);

// delete() metodu, database'den veri silmek için kullanılır. ":id" kısmındaki iki nokta dinamik olarak kullanıcıdan alınacak veriyi temsil eder.
router.delete("/:id", deleteProduct);

export default router;
