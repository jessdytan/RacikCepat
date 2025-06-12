const RegisterPage = {
  render() {
    return `
      <section class="register-section">
        <div class="register-container">
          <div class="register-card">
            <div class="register-image">
              <img src="https://img.freepik.com/vector-gratis/ilustracion-mujer-irani-dibujada-mano_23-2149857688.jpg">
            </div>
            <div class="register-form-container">
              <div class="register-header">
                <img src="images/logo.png" alt="Logo" class="register-logo" />
                <h2>Daftar sekarang!</h2>
              </div>
              
              <form id="registerForm" class="register-form">
                <div class="form-group">
                  <input type="text" id="fullName" placeholder="Nama Lengkap" required />
                </div>
                <div class="form-group">
                  <input type="email" id="email" placeholder="Alamat Email" required />
                </div>
                <div class="form-group">
                  <input type="password" id="password" placeholder="Password" required />
                </div>
                <div class="form-group">
                  <input type="password" id="confirmPassword" placeholder="Konfirmasi Password" required />
                </div>
                <button type="submit" class="btn-daftar">Daftar</button>
              </form>
              
              <p class="auth-switch">Sudah punya akun? <a href="#/login" id="loginLink">Masuk</a></p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {
    const form = document.getElementById('registerForm');
    const loginLink = document.getElementById('loginLink');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (!fullName || !email || !password || !confirmPassword) {
        this.showNotification('Semua field harus diisi!', 'error');
        return;
      }

      if (password.length < 6) {
        this.showNotification('Password minimal 6 karakter!', 'error');
        return;
      }

      if (password !== confirmPassword) {
        this.showNotification('Password dan konfirmasi tidak cocok!', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.showNotification('Format email tidak valid!', 'error');
        return;
      }

      const newUser = { 
        username: fullName, 
        email,
        password,
        registeredAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('userProfile', JSON.stringify(newUser));
        localStorage.setItem('currentUser', JSON.stringify(newUser)); 
        localStorage.setItem('isLoggedIn', 'true'); 

        this.showNotification('Pendaftaran berhasil! Anda sekarang masuk.', 'success');
        setTimeout(() => {
          window.location.hash = '#/profile'; 
        }, 1500);
      } catch (error) {
        this.showNotification('Terjadi kesalahan saat mendaftar. Coba lagi.', 'error');
      }
    });

    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/login';
    });

    const inputs = document.querySelectorAll('.register-form input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  },

  showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
};

export default RegisterPage;
