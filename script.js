
const filterButtons = document.querySelectorAll(".filter");
const products = [...document.querySelectorAll(".product")];
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

let activeCategory = "Semua";
let toastTimer;

// ===============================
// 1. FUNGSI MENAMPILKAN NOTIFIKASI
// ===============================
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ===============================
// 2. FUNGSI FILTER DAN PENCARIAN
// ===============================
function filterProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  products.forEach(product => {
    const categoryMatches =
      activeCategory === "Semua" ||
      product.dataset.category === activeCategory;

    const nameMatches =
      product.dataset.name.toLowerCase().includes(keyword);

    const visible = categoryMatches && nameMatches;

    product.style.display = visible ? "" : "none";

    if (visible) {
      visibleCount++;
    }
  });

  emptyState.style.display = visibleCount ? "none" : "block";
}

// ===============================
// 3. EVENT TOMBOL KATEGORI
// ===============================
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    filterProducts();
  });
});

// ===============================
// 4. EVENT PENCARIAN PRODUK
// ===============================
searchInput.addEventListener("input", filterProducts);

// ===============================
// 5. NOMOR WHATSAPP TOKO
// ===============================
const nomorWhatsApp = "6287749440702";
// Nomor 087749440702 dengan kode negara Indonesia

// ===============================
// 6. EVENT TOMBOL PESAN PRODUK
// ===============================
document.querySelectorAll(".add").forEach(button => {
  button.addEventListener("click", () => {

    const namaProduk = button.dataset.product;

    // Konfirmasi sebelum memesan produk
    const yakin = confirm(
      "Apakah Anda yakin ingin memesan produk " +
      namaProduk + "?"
    );

    // Jika pengunjung memilih OK
    if (yakin) {

      const pesan =
        "Halo, saya tertarik memesan " +
        namaProduk +
        ". Apakah produk masih tersedia?";

      window.open(
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(pesan),
        "_blank"
      );

    } else {

      // Jika pengunjung memilih Cancel
      showToast("Pemesanan produk dibatalkan.");

    }
  });
});

// ===============================
// 7. FORMULIR KONTAK KE WHATSAPP
// ===============================
document.getElementById("contactForm").addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();

  const isiPesan =
    "Halo UMKM Lokal!%0A" +
    "Nama: " + encodeURIComponent(name) + "%0A" +
    "Email: " + encodeURIComponent(email) + "%0A" +
    "Pesan: " + encodeURIComponent(message);

  window.open(
    "https://wa.me/" + nomorWhatsApp + "?text=" + isiPesan,
    "_blank"
  );

  // Mengosongkan formulir setelah dikirim
  event.target.reset();
});
