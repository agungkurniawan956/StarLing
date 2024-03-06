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

// form validation
const btnCheckout = document.querySelector('.checkout-button');
btnCheckout.disabled = true;

const form = document.querySelector('#checkout-form');

form.addEventListener('keyup', function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      btnCheckout.classList.remove('disabled');
      btnCheckout.classList.add('disabled');
    } else {
      return false;
    }
  }
  btnCheckout.disabled = false;
  btnCheckout.classList.remove('disabled');
});

// kirim data ketika tombol di klik
btnCheckout.addEventListener('click', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open('http://wa.me/6281281687802?text=' + encodeURIComponent(message));
});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Pesanan
  Nama: ${obj.nama}
  Email: ${obj.email}
  No Tlp: ${obj.phone}
  Alamat : ${obj.alamat}
Data Item
  ${JSON.parse(obj.items).map(
    (item) =>
      `${item.name} (${item.quantity} X ${rupiah(item.price)}) = ${rupiah(
        item.total
      )} \n`
  )}
  TOTAL: ${rupiah(obj.total)}
  Teriam Kasih, Sudah Berbelanja di Kami.`;
};

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
