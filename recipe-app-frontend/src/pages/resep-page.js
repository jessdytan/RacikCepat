const ResepPage = {
  render() {
    return `
      <div class="resep-page-container">
        <!-- Header Section -->
        <div class="page-header">
          <h1>Koleksi Resep Saya</h1>
          <p>Kelola dan bagikan resep masakan favoritmu</p>
        </div>
        <!-- Main Content dengan Icon Cards -->
        <div class="main-content">
          <!-- Icon Card 1: Tambah Resep -->
          <div class="icon-card form-icon-card" id="tambahResepIcon">
            <div class="card-icon">
              <i class="fas fa-plus"></i>
            </div>
            <h2 class="card-title">Tambah Resep Baru</h2>
            <p class="card-description">Bagikan kreasi masakanmu dengan mudah</p>
          </div>
          <!-- Icon Card 2: Resep Saya -->
          <div class="icon-card list-icon-card" id="resepSayaIcon">
            <div class="card-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h2 class="card-title">Resep Saya</h2>
            <p class="card-description">Koleksi resep yang telah diupload</p>
          </div>
        </div>
        <!-- Form Section (Hidden Modal) -->
        <div class="content-section" id="formSection">
          <div class="content-wrapper">
            <button class="close-btn" id="closeFormBtn">&times;</button>
            <div class="form-content">
              <div class="form-header">
                <h2>Tambah Resep Baru</h2>
                <p>Bagikan kreasi masakanmu dengan mudah</p>
              </div>
              <form class="recipe-form" id="formTambahResep">
                <div class="form-group">
                  <label for="judul">Judul Resep</label>
                  <input type="text" id="judul" placeholder="Masukkan judul resep..." required>
                </div>
                <div class="form-group">
                  <label for="penulis">Nama Penulis</label>
                  <input type="text" id="penulis" placeholder="Nama pembuat resep..." required>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="porsi">Porsi</label>
                    <input type="text" id="porsi" placeholder="2 Orang" required>
                  </div>
                  <div class="form-group">
                    <label for="durasi">Durasi Memasak</label>
                    <input type="text" id="durasi" placeholder="20 Menit" required>
                  </div>
                </div>
                <!-- Bahan-bahan Section dengan Grup -->
                <div class="form-group">
                  <label>Bahan-bahan</label>
                  <div id="grupBahan">
                    <!-- Grup Bahan Utama (default) -->
                    <div class="ingredient-group" data-group="Bahan Utama">
                      <div class="group-header">
                        <input type="text" class="group-name" value="Bahan Utama" placeholder="Nama grup bahan...">
                        <button type="button" class="remove-group-btn">×</button>
                      </div>
                      <div class="group-ingredients">
                        <div class="ingredient-item">
                          <input type="text" class="ingredient-quantity" placeholder="200 gr" required>
                          <input type="text" class="ingredient-name" placeholder="Nama bahan..." required>
                          <button type="button" class="remove-ingredient-btn">×</button>
                        </div>
                      </div>
                      <button type="button" class="add-ingredient-btn">
                        <i class="fas fa-plus"></i>Tambah Bahan
                      </button>
                    </div>
                  </div>
                  <button type="button" class="add-group-btn" id="tambahGrupBahan">
                    <i class="fas fa-plus"></i>Tambah Grup Bahan
                  </button>
                </div>
                <!-- Langkah-langkah Section -->
                <div class="form-group">
                  <label>Langkah-langkah</label>
                  <div class="dynamic-list" id="daftarLangkah">
                    <div class="list-item">
                      <span class="step-number">1</span>
                      <textarea class="input-langkah" placeholder="Tulis langkah memasak..." required rows="2"></textarea>
                      <button type="button" class="remove-btn">×</button>
                    </div>
                  </div>
                  <button type="button" class="add-btn" id="tambahLangkah">
                    <i class="fas fa-plus"></i>Tambah Langkah
                  </button>
                </div>
                <div class="form-group">
                  <label for="url">URL Resep Asli (Opsional)</label>
                  <input type="url" id="url" placeholder="https://cookpad.com/id/resep/...">
                  <small class="form-help">Link ke resep asli jika ada</small>
                </div>
                <div class="form-group">
                  <label for="tag">Tag</label>
                  <input type="text" id="tag" placeholder="ayam, suwir, daun (pisahkan dengan koma)">
                  <small class="form-help">Pisahkan tag dengan koma</small>
                </div>
                <!-- Fixed Image Input Section -->
                <div class="form-group">
                  <label>Foto Resep</label>
                  <div class="image-input-section">
                    <div class="image-input-option">
                      <label for="foto" class="image-input-label">
                        <i class="fas fa-upload"></i> Upload Gambar
                      </label>
                      <input type="file" id="foto" accept="image/*" style="display: none;">
                      <small class="form-help">Pilih file gambar dari perangkat Anda</small>
                    </div>
                    <div class="input-divider">
                      <span>ATAU</span>
                    </div>
                    <div class="image-input-option">
                      <input type="url" id="fotoUrl" placeholder="https://example.com/image.jpg">
                      <small class="form-help">Masukkan URL gambar dari internet</small>
                    </div>
                  </div>
                  <div class="image-preview" id="imagePreview" style="display: none;">
                    <img id="previewImg" src="" alt="Preview" style="max-width: 200px; max-height: 150px; border-radius: 8px;">
                    <button type="button" id="removeImage" class="remove-preview-btn">×</button>
                  </div>
                </div>
                <button type="submit" class="submit-btn">
                  <i class="fas fa-upload"></i>Unggah Resep
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- List Section (Hidden Modal) -->
        <div class="content-section" id="listSection">
          <div class="content-wrapper">
            <button class="close-btn" id="closeListBtn">&times;</button>
            <div class="list-content">
              <div class="list-header">
                <h2>Resep Saya</h2>
                <p>Koleksi resep yang telah diupload</p>
              </div>
              <div class="recipe-grid" id="daftarResepUpload"></div>
              <!-- Empty State -->
              <div class="empty-state" id="emptyState" style="display: none;">
                <i class="fas fa-utensils"></i>
                <h3>Belum Ada Resep</h3>
                <p>Mulai tambahkan resep pertamamu!</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Recipe Detail Modal -->
        <div class="content-section" id="detailSection">
          <div class="content-wrapper">
            <button class="close-btn" id="closeDetailBtn">&times;</button>
            <div class="detail-content" id="detailContent">
              <!-- Content will be populated dynamically -->
            </div>
          </div>
        </div>
        <!-- Notification -->
        <div class="notification" id="notification">
          <span id="notificationText"></span>
        </div>
      </div>
    `;
  },
  afterRender() {
    const tambahResepIcon = document.getElementById('tambahResepIcon');
    const resepSayaIcon = document.getElementById('resepSayaIcon');
    const formSection = document.getElementById('formSection');
    const listSection = document.getElementById('listSection');
    const detailSection = document.getElementById('detailSection');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const closeListBtn = document.getElementById('closeListBtn');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const form = document.getElementById('formTambahResep');
    const grupBahan = document.getElementById('grupBahan');
    const daftarLangkah = document.getElementById('daftarLangkah');
    const tambahGrupBahanBtn = document.getElementById('tambahGrupBahan');
    const tambahLangkahBtn = document.getElementById('tambahLangkah');
    const fileInput = document.getElementById('foto');
    const urlInput = document.getElementById('fotoUrl');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      const mainContent = document.querySelector('.main-content');
      mainContent.innerHTML = `
        <div class="login-required">
          <p>Silakan login terlebih dahulu untuk melihat dan mengelola resep Anda</p>
          <a href="#/login" class="login-btn">
            <i class="fas fa-sign-in-alt"></i> Login Sekarang
          </a>
        </div>
      `;
      return;
    }

    tambahResepIcon.addEventListener('click', () => {
      formSection.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    resepSayaIcon.addEventListener('click', () => {
      listSection.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.tampilkanDaftar();
    });
    const closeModal = (section) => {
      section.classList.remove('active');
      document.body.style.overflow = 'auto';
    };
    closeFormBtn.addEventListener('click', () => closeModal(formSection));
    closeListBtn.addEventListener('click', () => closeModal(listSection));
    closeDetailBtn.addEventListener('click', () => closeModal(detailSection));
    [formSection, listSection, detailSection].forEach(section => {
      section.addEventListener('click', (e) => {
        if (e.target === section) {
          closeModal(section);
        }
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(formSection);
        closeModal(listSection);
        closeModal(detailSection);
      }
    });
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        urlInput.value = '';
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImg.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
    urlInput.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (url) {
        fileInput.value = '';
        const img = new Image();
        img.onload = () => {
          previewImg.src = url;
          imagePreview.style.display = 'block';
        };
        img.onerror = () => {
          imagePreview.style.display = 'none';
        };
        img.src = url;
      } else {
        imagePreview.style.display = 'none';
      }
    });
    removeImageBtn.addEventListener('click', () => {
      fileInput.value = '';
      urlInput.value = '';
      imagePreview.style.display = 'none';
    });
    tambahGrupBahanBtn.addEventListener('click', () => {
      this.tambahGrupBahan();
    });
    tambahLangkahBtn.addEventListener('click', () => {
      const currentSteps = daftarLangkah.querySelectorAll('.list-item').length;
      const stepNumber = currentSteps;
      const item = document.createElement('div');
      item.className = 'list-item';
      item.innerHTML = `
        <span class="step-number">${stepNumber}</span>
        <textarea class="input-langkah" placeholder="Tulis langkah memasak..." required rows="2"></textarea>
        <button type="button" class="remove-btn">×</button>
      `;
      daftarLangkah.appendChild(item);
      updateStepNumbers();
    });
    const updateStepNumbers = () => {
      const stepItems = daftarLangkah.querySelectorAll('.list-item');
      stepItems.forEach((item, index) => {
        const numberSpan = item.querySelector('.step-number');
        if (numberSpan) numberSpan.textContent = index + 1;
      });
    };
    grupBahan.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-ingredient-btn') || e.target.parentElement.classList.contains('add-ingredient-btn')) {
        const group = e.target.closest('.ingredient-group');
        this.tambahBahanKeGrup(group);
      }
      if (e.target.classList.contains('remove-ingredient-btn')) {
        const group = e.target.closest('.ingredient-group');
        const ingredients = group.querySelectorAll('.ingredient-item');
        if (ingredients.length > 1) {
          e.target.parentElement.remove();
        } else {
          this.showNotification('Minimal harus ada 1 bahan per grup!', 'error');
        }
      }
      if (e.target.classList.contains('remove-group-btn')) {
        const groups = grupBahan.querySelectorAll('.ingredient-group');
        if (groups.length > 1) {
          e.target.closest('.ingredient-group').remove();
        } else {
          this.showNotification('Minimal harus ada 1 grup bahan!', 'error');
        }
      }
    });
    daftarLangkah.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        if (daftarLangkah.children.length > 1) {
          e.target.parentElement.remove();
          updateStepNumbers();
        } else {
          this.showNotification('Minimal harus ada 1 langkah!', 'error');
        }
      }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const file = fileInput.files[0];
      const fotoUrl = urlInput.value.trim();
      if (!file && !fotoUrl) {
        this.showNotification('Harap pilih gambar atau masukkan URL gambar!', 'error');
        return;
      }
      const processForm = (imageData) => {
        const bahan = [];
        const ingredientGroups = grupBahan.querySelectorAll('.ingredient-group');
        ingredientGroups.forEach(group => {
          const groupName = group.querySelector('.group-name').value.trim();
          const ingredients = group.querySelectorAll('.ingredient-item');
          ingredients.forEach(item => {
            const quantity = item.querySelector('.ingredient-quantity').value.trim();
            const name = item.querySelector('.ingredient-name').value.trim();
            if (quantity && name) {
              bahan.push({
                grup: groupName,
                jumlah: quantity,
                bahan: name
              });
            }
          });
        });
        const langkahInputs = document.querySelectorAll('.input-langkah');
        const langkah = Array.from(langkahInputs)
          .map(i => i.value.trim())
          .filter(l => l !== '');
        if (bahan.length === 0) {
          this.showNotification('Harap tambahkan minimal satu bahan!', 'error');
          return;
        }
        if (langkah.length === 0) {
          this.showNotification('Harap tambahkan minimal satu langkah!', 'error');
          return;
        }
        const tagInput = document.getElementById('tag').value.trim();
        const tag = tagInput ? tagInput.split(',').map(t => t.trim().toLowerCase()).filter(t => t !== '') : [];
        const data = {
          judul: document.getElementById('judul').value.trim(),
          penulis: document.getElementById('penulis').value.trim(),
          porsi: document.getElementById('porsi').value.trim(),
          durasi: document.getElementById('durasi').value.trim(),
          bahan,
          langkah,
          tag,
          url: document.getElementById('url').value.trim() || null,
          foto: imageData,
        };
        fetch('http://localhost:5001/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Gagal menambah resep');
          }
          return res.json();
        })
        .then((result) => {
          this.showNotification('Resep berhasil ditambahkan!', 'success');
          form.reset();
          this.resetForm();
          closeModal(formSection);
        })
        .catch((err) => {
          this.showNotification(err.message, 'error');
        });
      };
      if (file) {
        const reader = new FileReader();
        reader.onload = () => processForm(reader.result);
        reader.readAsDataURL(file);
      } else if (fotoUrl) {
        processForm(fotoUrl);
      }
    });
  },
  
  async fetchMyRecipes() {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const username = user?.username || '';

      const response = await fetch(`http://localhost:5001/api/recipes?penulis=${encodeURIComponent(username)}`);
      // const response = await fetch(`http://localhost:5001/api/recipes?penulis=${encodeURIComponent(this.current.username)}`);
      if (!response.ok) throw new Error('Gagal mengambil data resep');
      return await response.json();
    } catch (err) {
      this.showNotification(err.message, 'error');
      return [];
    }
  },

  async fetchRecipeDetail(id) {
    try {
      const response = await fetch(`http://localhost:5001/api/recipes/${id}`);
      if (!response.ok) throw new Error('Gagal mengambil detail resep');
      return await response.json();
    } catch (err) {
      this.showNotification(err.message, 'error');
      return null;
    }
  },
  tambahGrupBahan() {
    const grupBahan = document.getElementById('grupBahan');
    const newGroup = document.createElement('div');
    newGroup.className = 'ingredient-group';
    newGroup.innerHTML = `
      <div class="group-header">
        <input type="text" class="group-name" placeholder="Nama grup bahan..." required>
        <button type="button" class="remove-group-btn">×</button>
      </div>
      <div class="group-ingredients">
        <div class="ingredient-item">
          <input type="text" class="ingredient-quantity" placeholder="200 gr" required>
          <input type="text" class="ingredient-name" placeholder="Nama bahan..." required>
          <button type="button" class="remove-ingredient-btn">×</button>
        </div>
      </div>
      <button type="button" class="add-ingredient-btn">
        <i class="fas fa-plus"></i>Tambah Bahan
      </button>
    `;
    grupBahan.appendChild(newGroup);
  },
  tambahBahanKeGrup(group) {
    const groupIngredients = group.querySelector('.group-ingredients');
    const newIngredient = document.createElement('div');
    newIngredient.className = 'ingredient-item';
    newIngredient.innerHTML = `
      <input type="text" class="ingredient-quantity" placeholder="200 gr" required>
      <input type="text" class="ingredient-name" placeholder="Nama bahan..." required>
      <button type="button" class="remove-ingredient-btn">×</button>
    `;
    groupIngredients.appendChild(newIngredient);
  },
  resetForm() {
    const grupBahan = document.getElementById('grupBahan');
    grupBahan.innerHTML = `
      <div class="ingredient-group" data-group="Bahan Utama">
        <div class="group-header">
          <input type="text" class="group-name" value="Bahan Utama" placeholder="Nama grup bahan...">
          <button type="button" class="remove-group-btn">×</button>
        </div>
        <div class="group-ingredients">
          <div class="ingredient-item">
            <input type="text" class="ingredient-quantity" placeholder="200 gr" required>
            <input type="text" class="ingredient-name" placeholder="Nama bahan..." required>
            <button type="button" class="remove-ingredient-btn">×</button>
          </div>
        </div>
        <button type="button" class="add-ingredient-btn">
          <i class="fas fa-plus"></i>Tambah Bahan
        </button>
      </div>
    `;
    const daftarLangkah = document.getElementById('daftarLangkah');
    daftarLangkah.innerHTML = `
      <div class="list-item">
        <span class="step-number">1</span>
        <textarea class="input-langkah" placeholder="Tulis langkah memasak..." required rows="2"></textarea>
        <button type="button" class="remove-btn">×</button>
      </div>
    `;
    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) {
      imagePreview.style.display = 'none';
    }
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-upload"></i>Unggah Resep';
  },
  async tampilkanDaftar() {
    const daftarResepUpload = document.getElementById('daftarResepUpload');
    const emptyState = document.getElementById('emptyState');
    const daftar = await this.fetchMyRecipes(); 
    daftarResepUpload.innerHTML = '';
    if (!daftar || daftar.length === 0) {
      daftarResepUpload.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      daftarResepUpload.style.display = 'grid';
      emptyState.style.display = 'none';
      daftar.forEach(resep => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.dataset.id = resep._id || resep.id;
        const tags = resep.tag && resep.tag.length > 0 ? resep.tag.slice(0, 3).join(', ') : '';
        const imageSource = resep.foto || '/api/placeholder/300/200';
        let tanggal = resep.tanggal;
        if (!tanggal && resep.createdAt) {
          const dateObj = new Date(resep.createdAt);
          tanggal = dateObj.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        card.innerHTML = `
          <div class="recipe-image">
            <img src="${imageSource}" alt="${resep.judul}" 
                 onerror="this.src='/api/placeholder/300/200'; this.onerror=null;" 
                 loading="lazy" />
            <div class="recipe-actions">
              <button class="action-btn view-btn" title="Lihat Detail"><i class="fas fa-eye"></i></button>
              <button class="action-btn edit-btn" title="Edit Resep"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete-btn" title="Hapus Resep"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <div class="recipe-info">
            <h3>${resep.judul}</h3>
            <p class="recipe-author">By ${resep.penulis || '-'}</p>
            <div class="recipe-meta">
              <span><i class="fas fa-users"></i> ${resep.porsi || '-'}</span>
              <span><i class="fas fa-clock"></i> ${resep.durasi || '-'}</span>
            </div>
            ${tags ? `<div class="recipe-tags">${tags}</div>` : ''}
            <div class="recipe-footer">
              <span class="recipe-date">${tanggal || '-'}</span>
            </div>
          </div>
        `;
        card.querySelector('.view-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.lihatDetail(resep._id || resep.id);
        });
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.editResep(resep._id || resep.id);
        });
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.hapusResep(resep._id || resep.id);
        });
        daftarResepUpload.appendChild(card);
      });
    }
  },
  async lihatDetail(id) {
    const resep = await this.fetchRecipeDetail(id);
    if (!resep) return;
    const detailSection = document.getElementById('detailSection');
    const detailContent = document.getElementById('detailContent');
    const groupedIngredients = {};
    (resep.bahan || []).forEach(item => {
      if (!groupedIngredients[item.grup]) {
        groupedIngredients[item.grup] = [];
      }
      groupedIngredients[item.grup].push(item);
    });
    const ingredientsHTML = Object.keys(groupedIngredients).map(grupName => `
      <div class="ingredient-group-display">
        <h3>${grupName}</h3>
        <ul>
          ${groupedIngredients[grupName].map(item => `
            <li><strong>${item.jumlah}</strong> ${item.bahan}</li>
          `).join('')}
        </ul>
      </div>
    `).join('');
    const tagsHTML = resep.tag && resep.tag.length > 0 ? `
      <div class="recipe-tags-display">
        ${resep.tag.map(tag => `<span class="tag">#${tag}</span>`).join('')}
      </div>
    ` : '';
    let tanggal = resep.tanggal;
    if (!tanggal && resep.createdAt) {
      const dateObj = new Date(resep.createdAt);
      tanggal = dateObj.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    const imageSource = resep.foto || '/api/placeholder/400/300';
    detailContent.innerHTML = `
      <div class="recipe-detail">
        <div class="detail-header">
          <div class="detail-image">
            <img src="${imageSource}" alt="${resep.judul}" />
          </div>
          <div class="detail-info">
            <h1>${resep.judul}</h1>
            <p class="detail-author">Oleh: <strong>${resep.penulis}</strong></p>
            <div class="detail-meta">
              <div class="meta-item">
                <i class="fas fa-users"></i>
                <span>${resep.porsi}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-clock"></i>
                <span>${resep.durasi}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-calendar"></i>
                <span>${tanggal || '-'}</span>
              </div>
            </div>
            ${tagsHTML}
            ${resep.url ? `
              <div class="original-url">
                <a href="${resep.url}" target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-external-link-alt"></i> Lihat Resep Asli
                </a>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="detail-content-wrapper">
          <div class="ingredients-section">
            <h2><i class="fas fa-list"></i> Bahan-bahan</h2>
            ${ingredientsHTML}
          </div>
          <div class="steps-section">
            <h2><i class="fas fa-utensils"></i> Langkah-langkah</h2>
            <ol class="steps-list">
              ${(resep.langkah || []).map(langkah => `<li>${langkah}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;
    detailSection.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  async editResep(id) {
    const resep = await this.fetchRecipeDetail(id);
    if (!resep) return;
    
    document.getElementById('listSection').classList.remove('active');
    const formSection = document.getElementById('formSection');
    formSection.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('judul').value = resep.judul || '';
    document.getElementById('penulis').value = resep.penulis || '';
    document.getElementById('porsi').value = resep.porsi || '';
    document.getElementById('durasi').value = resep.durasi || '';
    document.getElementById('url').value = resep.url || '';
    document.getElementById('tag').value = resep.tag ? resep.tag.join(', ') : '';

    const grupBahan = document.getElementById('grupBahan');
    const groupedIngredients = {};
    (resep.bahan || []).forEach(item => {
      if (!groupedIngredients[item.grup]) {
        groupedIngredients[item.grup] = [];
      }
      groupedIngredients[item.grup].push(item);
    });

    grupBahan.innerHTML = Object.keys(groupedIngredients).map(grupName => `
      <div class="ingredient-group" data-group="${grupName}">
        <div class="group-header">
          <input type="text" class="group-name" value="${grupName}" placeholder="Nama grup bahan..." required>
          <button type="button" class="remove-group-btn">×</button>
        </div>
        <div class="group-ingredients">
          ${groupedIngredients[grupName].map(item => `
            <div class="ingredient-item">
              <input type="text" class="ingredient-quantity" value="${item.jumlah}" placeholder="200 gr" required>
              <input type="text" class="ingredient-name" value="${item.bahan}" placeholder="Nama bahan..." required>
              <button type="button" class="remove-ingredient-btn">×</button>
            </div>
          `).join('')}
        </div>
        <button type="button" class="add-ingredient-btn">
          <i class="fas fa-plus"></i>Tambah Bahan
        </button>
      </div>
    `).join('');

    const daftarLangkah = document.getElementById('daftarLangkah');
    daftarLangkah.innerHTML = (resep.langkah || []).map((langkah, index) => `
      <div class="list-item">
        <span class="step-number">${index + 1}</span>
        <textarea class="input-langkah" placeholder="Tulis langkah memasak..." required rows="2">${langkah}</textarea>
        <button type="button" class="remove-btn">×</button>
      </div>
    `).join('');

    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    if (resep.foto) {
      previewImg.src = resep.foto;
      imagePreview.style.display = 'block';
    } else {
      imagePreview.style.display = 'none';
    }

    const form = document.getElementById('formTambahResep');
    form.dataset.editId = id;
    
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-save"></i>Update Resep';

    form.onsubmit = null;
    
    form.onsubmit = async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('foto');
      const urlInput = document.getElementById('fotoUrl');
      const file = fileInput.files[0];
      const fotoUrl = urlInput.value.trim();

      if (!file && !fotoUrl && !previewImg.src) {
        this.showNotification('Harap pilih gambar atau masukkan URL gambar!', 'error');
        return;
      }

      const processForm = (imageData) => {
        const bahan = [];
        const ingredientGroups = grupBahan.querySelectorAll('.ingredient-group');
        ingredientGroups.forEach(group => {
          const groupName = group.querySelector('.group-name').value.trim();
          const ingredients = group.querySelectorAll('.ingredient-item');
          ingredients.forEach(item => {
            const quantity = item.querySelector('.ingredient-quantity').value.trim();
            const name = item.querySelector('.ingredient-name').value.trim();
            if (quantity && name) {
              bahan.push({
                grup: groupName,
                jumlah: quantity,
                bahan: name
              });
            }
          });
        });

        const langkahInputs = document.querySelectorAll('.input-langkah');
        const langkah = Array.from(langkahInputs)
          .map(i => i.value.trim())
          .filter(l => l !== '');

        if (bahan.length === 0) {
          this.showNotification('Harap tambahkan minimal satu bahan!', 'error');
          return;
        }
        if (langkah.length === 0) {
          this.showNotification('Harap tambahkan minimal satu langkah!', 'error');
          return;
        }

        const tagInput = document.getElementById('tag').value.trim();
        const tag = tagInput ? tagInput.split(',').map(t => t.trim().toLowerCase()).filter(t => t !== '') : [];

        const data = {
          judul: document.getElementById('judul').value.trim(),
          penulis: document.getElementById('penulis').value.trim(),
          porsi: document.getElementById('porsi').value.trim(),
          durasi: document.getElementById('durasi').value.trim(),
          bahan,
          langkah,
          tag,
          url: document.getElementById('url').value.trim() || null,
          foto: imageData || previewImg.src || null,
        };

        fetch(`http://localhost:5001/api/recipes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Gagal mengupdate resep');
          }
          return res.json();
        })
        .then((result) => {
          this.showNotification('Resep berhasil diupdate!', 'success');
          this.resetForm();
          closeModal(formSection);
          this.tampilkanDaftar();
        })
        .catch((err) => {
          this.showNotification(err.message, 'error');
        });
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = () => processForm(reader.result);
        reader.readAsDataURL(file);
      } else if (fotoUrl) {
        processForm(fotoUrl);
      } else {
        processForm(previewImg.src);
      }
    };
  },
  async hapusResep(id) {
    if (confirm('Apakah Anda yakin ingin menghapus resep ini?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/recipes/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || 'Gagal menghapus resep');
        }
        this.showNotification('Resep berhasil dihapus!', 'success');
        this.tampilkanDaftar();
      } catch (err) {
        this.showNotification(err.message, 'error');
      }
    }
  },
  showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
};
export default ResepPage;