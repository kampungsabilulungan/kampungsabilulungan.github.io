(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      try {
        sendToWhatsApp(thisForm);
      } catch (error) {
        displayError(thisForm, error);
      }
    });
  });

  function sendToWhatsApp(form) {
    localStorage.removeItem("sewa_tempat");
    const phoneNumber = "62895389564627"; // ✅ Ganti dengan nomor tujuan kamu

    // Ambil data input dari form
    const name = form.querySelector('input[name="name"]')?.value || "";
    const company = form.querySelector('input[name="company"]')?.value || "";
    const subject = form.querySelector('input[name="subject"]')?.value || "";
    const message = form.querySelector('textarea[name="message"]')?.value || "";

    // Validasi sederhana (opsional)
    if (!name || !company || !message) {
      throw "Mohon lengkapi semua isian wajib (nama, instansi/komunitas, pesan)";
    }

    // Format pesan
    const waMessage =
      `Halo, saya ${name}\n` +
      `Istansi: ${company}\n` +
      `Acara: ${subject}\n` +
      `Pesan: ${message}`;

    // Buat URL WhatsApp
    const waURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      waMessage
    )}`;

    // Redirect ke WhatsApp
    window.open(waURL, "_blank");

    // Reset form dan tampilkan pesan berhasil
    form.querySelector(".loading").classList.remove("d-block");
    form.querySelector(".sent-message").classList.add("d-block");
    form.reset();
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();

window.addEventListener("DOMContentLoaded", () => {
  const tempat = localStorage.getItem("sewa_tempat");
  if (tempat) {
    const subjectInput = document.querySelector('textarea[name="message"]');
    if (subjectInput) subjectInput.value = "sewa tempat: " + tempat;
  }
});

document.querySelectorAll(".btn-get-started").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const tempat = this.getAttribute("data-tempat");
    if (tempat) {
      localStorage.setItem("sewa_tempat", tempat);
    }
    window.location.href = window.location.origin + "/#contact";
  });
});
