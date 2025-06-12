const PremiumPage = {
  render() {
    return `
      <section class="premium-section" style="padding: 2rem; text-align: center;">
        <div class="premium-container">
          <h2>Upgrade ke Premium</h2>
          <p>Anda telah mencapai batas maksimal pemindaian gratis (3 kali).</p>
          <p>Dengan menjadi pengguna premium, Anda dapat melakukan pemindaian bahan tanpa batas, menyimpan resep favorit, dan menikmati fitur eksklusif lainnya.</p>
          
          <div class="premium-benefits" style="margin: 1.5rem 0;">
            <ul style="list-style: none; padding: 0;">
              <li>✅ Pemindaian bahan tak terbatas</li>
              <li>✅ Akses ke semua fitur premium</li>
              <li>✅ Rekomendasi resep eksklusif</li>
            </ul>
          </div>

          <div class="payment-methods" style="margin-bottom: 1.5rem;">
            <h3>Pilih Metode Pembayaran</h3>
            <button id="payWithQR" class="pay-btn" style="margin: 0.5rem; padding: 0.7rem 1.5rem;">Bayar dengan QRIS</button>
            <button id="payWithTransfer" class="pay-btn" style="margin: 0.5rem; padding: 0.7rem 1.5rem;">Bayar via Transfer</button>
          </div>

          <div id="paymentSuccess" style="display: none; color: green; font-weight: bold;">
            ✅ Pembayaran berhasil! Akun Anda sekarang sudah Premium.
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {
    const paymentSuccess = document.getElementById('paymentSuccess');

    const handlePayment = () => {
      setTimeout(() => {
        localStorage.setItem('isPremiumUser', 'true'); 
        paymentSuccess.style.display = 'block';
      }, 1000);
    };

    document.getElementById('payWithQR').addEventListener('click', handlePayment);
    document.getElementById('payWithTransfer').addEventListener('click', handlePayment);
  }
};

export default PremiumPage;
