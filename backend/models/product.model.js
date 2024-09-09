import mongoose from "mongoose";

// mongoose kullanarak MongoDB veritabanı için bir şema(schema) oluşturur.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    // mongoose'a, her belgenin(veri) oluşturulma ve güncellenme tarihlerini otomatik olarak takip etmesini söyler ve her belgeye iki alan ekler. Bu alanlar; createdAt: belgenin veritabanında ilk kez kaydedildiği tarih, updateAt: belge her güncellendiğinde tarih değişir.
    timestamps: true,
  }
);

// Model, Mongoose'un şemaya dayalı bir şekilde veritabanına veri ekleme, güncelleme, silme ve sorgulama işlemlerini yapmanızı sağlar.
// MongoDB Collections ile bağlantı kurmak için bir model oluşturur. İlk parametre, modelin adını belirtir ve büyük harfle başlayıp tekil olarak yazılmalı. İkinci parametre, modelin kullanacağı şemayı belirtir.
const Product = mongoose.model("Product", productSchema);

export default Product;
