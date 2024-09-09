import { create } from "zustand";

// Bu bir "Global State"
// "({})" bu kullanımda curly braces'a yazılacack kod bir nesnedir.
// create() metodu, bir state oluşturmak için kullanılır.
// "set" fonksiyonu state'i güncellemeye yarar.
export const useProductStore = create((set) => ({
  products: [], // başlangıçta products dizisi boş.
  setProducts: (products) => set({ products }), // yeni products listesi alınır ve setlenir.
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST", // HTTP POST isteği yapar, bu da sunucuya yeni veri göndermek anlamına gelir.
      headers: {
        "Content-Type": "application/json", //  İstek gövdesinin JSON formatında olduğunu belirtir.
      },
      body: JSON.stringify(newProduct), // newProduct verisini JSON formatına dönüştürüp isteğin gövdesine ekler.
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] })); // state.products dizisinin bir kopyası oluşturulup sonuna yeni data eklenir.
    return { success: true, message: "Product created successfully." };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    } else {
      // parametre olarak girilen "state", şu anki ürünler listesini temsil eder.
      // update the ui immediately, without needing a refresh.
      set((state) => ({
        // state.products mevcut ürünler listesini temsil eder.
        // filter() metodu, dizinin elemanlarını bir koşula göre filtreler ve yeni bir dizi döndürür.
        // Burada, (product._id !== pid) koşulu kullanılarak, ürünlerin _id değeri pid'e eşit olmayanlar filtrelenir.
        // Yani, pid'e eşit olan ürün diziden çıkarılır.
        // Sonuç olarak, _id değeri pid ile eşleşen ürün diziden çıkarılmış olur ve sadece diğer ürünler yeni dizide kalır.
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    } else {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: data.message };
    }
  },
}));
