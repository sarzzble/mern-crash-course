import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // bütün products'ı getirir.
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // kullanıcının oluştuduğu body(data) kısmını products'a gönderecek(post).

  // eğer name, price, image bilgilerinden biri boş bırakılırsa gelen cevap(response) "status 400" döndürür.
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" }); // bu kullanıcıya bağlı bir error.
  }

  const newProduct = new Product(product); // yeni bir product objesi oluşturuyoruz. parametre olarak da database'e gidecek veriyi giriyoruz.

  try {
    await newProduct.save(); // MongoDB'de Mongoose modeli kullanılarak yeni bir belgeyi veritabanına kaydeder.
    res.status(201).json({ success: true, data: newProduct }); // eğer products başarılı bir şekilde alınırsa dönecek cevap(response) ayarlanır.
  } catch (error) {
    console.error(
      "An error occurred while creating the product: ",
      error.message
    );
    res.status(500).json({ success: false, message: "Server Error" }); // bu server'a bağlı bir error.
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body; // gönderilecek veri(body)

  // gönderilen id geçerli değilse hata mesajı döndür.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    // güncelleme işlemi burada yapılır.
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id); // id'ye göre silme işlemini gerçekleştirir.
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
