const ProfilePage = {
  get userProfile() {
    return JSON.parse(localStorage.getItem('currentUser')) || {
      username: '',
      email: '',
      password: ''
    };
  },

  set userProfile(newProfile) {
    localStorage.setItem('currentUser', JSON.stringify(newProfile));
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  },

  isEditing: false,

  render() {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #ff6b6b, #ff8e53); padding: 30px; border-radius: 15px;">
          <h1 style="color: white; text-align: center;">Profil Pengguna</h1>

          <form id="profileForm" style="background: white; padding: 30px; border-radius: 10px;">
            <div style="margin-bottom: 15px;">
              <label for="username">Nama Pengguna</label>
              <input type="text" id="username" name="username" style="width: 100%" readonly />
            </div>

            <div style="margin-bottom: 15px;">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" style="width: 100%" readonly />
            </div>

            <div style="margin-bottom: 25px;">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" style="width: 100%" readonly />
            </div>

            <button type="button" id="editButton" style="width: 100%; padding: 10px; background: orange; border: none; border-radius: 20px; color: white; font-weight: bold;">EDIT PROFIL</button>
            
            <div id="editActions" style="display:none; margin-top: 10px;">
              <button type="submit" style="width: 48%; margin-right: 4%; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 10px;">Simpan</button>
              <button type="button" id="cancelButton" style="width: 48%; padding: 10px; background: gray; color: white; border: none; border-radius: 10px;">Batal</button>
            </div>
          </form>

          <div style="margin-top: 20px;">
            <button id="logoutButton" style="padding: 10px 20px; background: #d32f2f; border: none; color: white; border-radius: 10px;">LOGOUT</button>
          </div>
        </div>

        <div id="successMessage" style="display:none; margin-top:10px; color:green;">Berhasil disimpan!</div>
        <div id="errorMessage" style="display:none; margin-top:10px; color:red;"></div>
      </div>
    `;
  },

  afterRender() {
    if (!localStorage.getItem('isLoggedIn')) {
      window.location.hash = '#/login';
      return;
    }

    const current = this.userProfile;

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const editButton = document.getElementById('editButton');
    const editActions = document.getElementById('editActions');
    const cancelButton = document.getElementById('cancelButton');
    const form = document.getElementById('profileForm');

    usernameInput.value = current.username;
    emailInput.value = current.email;
    passwordInput.value = current.password;

    const showSuccess = msg => {
      const el = document.getElementById('successMessage');
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => el.style.display = 'none', 3000);
    };

    const showError = msg => {
      const el = document.getElementById('errorMessage');
      el.textContent = msg;
      el.style.display = 'block';
      setTimeout(() => el.style.display = 'none', 3000);
    };

    editButton.addEventListener('click', () => {
      this.isEditing = true;
      usernameInput.removeAttribute('readonly');
      emailInput.removeAttribute('readonly');
      passwordInput.removeAttribute('readonly');
      editButton.style.display = 'none';
      editActions.style.display = 'flex';
      editActions.style.justifyContent = 'space-between';
    });

    cancelButton.addEventListener('click', () => {
      this.isEditing = false;
      usernameInput.value = current.username;
      emailInput.value = current.email;
      passwordInput.value = current.password;
      usernameInput.setAttribute('readonly', true);
      emailInput.setAttribute('readonly', true);
      passwordInput.setAttribute('readonly', true);
      editButton.style.display = 'block';
      editActions.style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.isEditing) return;

      const updatedProfile = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
      };

      if (!updatedProfile.username || !updatedProfile.email || !updatedProfile.password) {
        showError('Semua kolom harus diisi!');
        return;
      }

     
      this.userProfile = updatedProfile;

      usernameInput.setAttribute('readonly', true);
      emailInput.setAttribute('readonly', true);
      passwordInput.setAttribute('readonly', true);
      editButton.style.display = 'block';
      editActions.style.display = 'none';
      this.isEditing = false;
      showSuccess('Profil berhasil diperbarui!');
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      window.location.hash = '#/login';
    });
  }
};

export default ProfilePage;
