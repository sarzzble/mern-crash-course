// const express = require("express"); bu eski bir kullanım tarzı
import express from "express";
import dotenv from "dotenv"; // env'nin içindeki bilgileri kullanabilmemizi sağlar.
import path from "path";

import { connectDB } from "./config/db.js"; // dosyanın sonuna eklentisini (.js) koymazsan crash veriyor.

import productRoutes from "./routes/product.route.js";

// Projenin kök dizininde bulunan .env dosyasını okuyarak içinde tanımlanmış çevresel değişkenleri process.env nesnesine ekler.
dotenv.config();

const app = express(); // gelen HTTP isteklerini dinlemek, yanıt vermek ve HTTP rotalarını tanımlamak gibi işlemleri yürütmek için kullanılır.

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Bu kod, Express.js uygulamalarında bir middleware olarak kullanılır. Bu ifade, gelen isteklerin gövdesini(request body) JSON formatında işleyip parse etmek için kullanılır(GET, POST, PUT, DELETE). Middleware, gelen istekleri sunucuya geçmeden önce işler.
app.use(express.json());

// belirli bir URL yolu için belirli yönlendirici modüllerini kullanır.
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// listen() metodu, Express sunucusunu başlatır ve 5000 numaralı port üzerinden gelen HTTP isteklerini dinler.
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
