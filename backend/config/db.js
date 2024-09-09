// MongoDB veritabanına bağlanmak için mongoose kütüphanesi kullanılır.
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // connect() metodu, MongoDB'ye bağlanmak için kullanılır. Buradaki URI MongoDB'nin hangi sunucuda ve hangi veritabanında çalıştığını belirler.
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Node.js uygulamasını manuel olarak sonlandırmak için kullanılır.
  }
};
