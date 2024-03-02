document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Coffe Beans', img: 'beans coffe.jpg', price: 20000 },
      { id: 2, name: 'Serenada 1L', img: 'serenada.jpg', price: 30000 },
      { id: 3, name: 'Arabika Toraja', img: 'torajacoffe.jpg', price: 25000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama didalam cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // console.log(cartItem);

      // jika barang masih kosong/beda
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada maka lakukan sebagai berikut
        // telusuri, pakah barang yang berada di cart sama atau beda
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barangnya sama
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item.id yg mau di remove
      const cartItem = this.items.find((item) => item.id === id);
      // console.log(item.id);

      // jika  item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri satu persatu
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            //jika barang yang di klik
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //  jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
