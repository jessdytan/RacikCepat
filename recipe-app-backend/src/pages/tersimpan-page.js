const TersimpanPage = {
  render() {
    return `
      <section class="tersimpan-section">
        <h2>Resep Tersimpan</h2>
        <div id="tersimpanResepContainer" class="resep-container"></div>
      </section>

      <!-- Modal untuk detail resep -->
      <div id="modalDetail" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3 id="modalTitle">Detail Resep</h3>
            <button class="modal-close" id="closeModal" aria-label="Tutup Modal">&times;</button>
          </div>
          <div class="modal-body" id="modalBody"></div>
        </div>
      </div>
    `;
  },

  afterRender() {
    const container = document.getElementById('tersimpanResepContainer');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      container.innerHTML = `
        <div class="not-logged-in">
          <p>Anda harus login untuk melihat resep yang disimpan.</p>
          <a href="#/login" class="btn-login-redirect">Login Sekarang</a>
        </div>
      `;
      return;
    }

    const getTersimpan = () => {
      try {
        const data = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        return Array.isArray(data) ? data : [];
      } catch {
        return [];
      }
    };

    const saveTersimpan = (data) => {
      localStorage.setItem('savedRecipes', JSON.stringify(data));
    };

    const renderList = () => {
      const tersimpan = getTersimpan();
      container.innerHTML = '';

      if (tersimpan.length === 0) {
        container.innerHTML = '<p>Belum ada resep yang disimpan.</p>';
        return;
      }

      tersimpan.forEach((resep, index) => {
        const card = document.createElement('div');
        card.className = 'resep-card';
        card.innerHTML = `
          <img src="${resep.gambar || resep.foto}" alt="${resep.nama || resep.judul}" 
               onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'; this.onerror=null;">
          <h3>${resep.nama || resep.judul}</h3>
          <p>Kategori: ${resep.kategori || '-'}</p>
          <div class="btn-group">
            <button class="btn-detail" data-id="${resep.id || resep._id}">Lihat Detail</button>
            <button class="btn-hapus" data-index="${index}" aria-label="Hapus Resep">🗑️</button>
          </div>
        `;
        container.appendChild(card);
      });

      document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = e.target.dataset.id;
          const resep = tersimpan.find(r => (r.id || r._id) == id);
          if (resep) this.showModal(resep);
        });
      });

      document.querySelectorAll('.btn-hapus').forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const index = parseInt(e.target.dataset.index);
          const konfirmasi = confirm('Hapus resep ini dari daftar tersimpan?');
          if (!konfirmasi) return;

          const tersimpan = getTersimpan();
          tersimpan.splice(index, 1);
          saveTersimpan(tersimpan);
          renderList();
        });
      });
    };

    document.getElementById('closeModal')?.addEventListener('click', () => {
      document.getElementById('modalDetail').style.display = 'none';
    });

    renderList();
  },

  showModal(resep) {
    const modalOverlay = document.getElementById('modalDetail');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');

    let youtubeSection = '';
    if (resep.linkYoutube) {
      const videoId = this.getYouTubeVideoId(resep.linkYoutube);
      if (videoId) {
        youtubeSection = `
          <div class="youtube-section">
            <h2 class="youtube-title"><i class="fab fa-youtube"></i> Video Tutorial</h2>
            <div class="youtube-video">
              <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>`;
      } else {
        youtubeSection = `
          <div class="youtube-section">
            <h2 class="youtube-title"><i class="fab fa-youtube"></i> Video Tutorial</h2>
            <div class="youtube-link">
              <a href="${resep.linkYoutube}" target="_blank" rel="noopener noreferrer" class="youtube-link-btn">
                <i class="fab fa-youtube"></i> Lihat Video Tutorial
              </a>
            </div>
          </div>`;
      }
    }

    const groupedIngredients = {};
    (resep.bahan || []).forEach(item => {
      if (typeof item === 'string') {
        if (!groupedIngredients['Bahan']) groupedIngredients['Bahan'] = [];
        groupedIngredients['Bahan'].push({ jumlah: '', bahan: item });
      } else {
        if (!groupedIngredients[item.grup]) groupedIngredients[item.grup] = [];
        groupedIngredients[item.grup].push(item);
      }
    });

    const ingredientsHTML = Object.keys(groupedIngredients).map(grup => `
      <div class="ingredient-group-display">
        <h3 class="ingredient-group-title">
          <i class="fas fa-tag"></i>
          ${grup}
        </h3>
        <div class="ingredients-grid">
          ${groupedIngredients[grup].map(b => `
            <div class="ingredient-item">
              <div class="ingredient-amount">${b.jumlah || ''}</div>
              <div class="ingredient-name">${b.bahan}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    const tagsHTML = resep.tag?.length ? `
      <div class="recipe-tags-display">
        ${resep.tag.map(tag => `<span class="tag">#${tag}</span>`).join('')}
      </div>
    ` : '';

    let tanggal = resep.tanggal;
    if (!tanggal && resep.createdAt) {
      tanggal = new Date(resep.createdAt).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    }

    const imageSource = resep.foto || resep.gambar || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

    modalTitle.textContent = resep.judul || resep.nama || 'Detail Resep';
    modalBody.innerHTML = `
      <div class="recipe-detail">
        <div class="detail-header">
          <div class="detail-image">
            <img src="${imageSource}" alt="${resep.judul || resep.nama}" class="detail-recipe-img" />
          </div>
          <div class="detail-info">
            <h1 class="detail-title">${resep.judul || resep.nama}</h1>
            <p class="detail-author">Oleh: <strong>${resep.penulis || '-'}</strong></p>
            <div class="detail-meta">
              <div class="meta-item"><i class="fas fa-users"></i> <span>${resep.porsi || '-'}</span></div>
              <div class="meta-item"><i class="fas fa-clock"></i> <span>${resep.durasi || resep.waktu || '-'}</span></div>
              <div class="meta-item"><i class="fas fa-calendar"></i> <span>${tanggal || '-'}</span></div>
            </div>
            ${tagsHTML}
            ${resep.url ? `
              <div class="original-url">
                <a href="${resep.url}" target="_blank" rel="noopener noreferrer" class="original-url-link">
                  <i class="fas fa-external-link-alt"></i> Lihat Resep Asli
                </a>
              </div>` : ''}
          </div>
        </div>
        ${youtubeSection}
        <div class="detail-content-wrapper">
          <div class="ingredients-section">
            <h2 class="section-title"><i class="fas fa-list"></i> Bahan-bahan</h2>
            ${ingredientsHTML}
          </div>
          <div class="steps-section">
            <h2 class="section-title"><i class="fas fa-utensils"></i> Langkah-langkah</h2>
            <div class="steps-container">
              ${(resep.langkah || []).map((langkah, index) => `
                <div class="step-item">
                  <div class="step-number">${index + 1}</div>
                  <div class="step-content"><p>${langkah}</p></div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    modalOverlay.style.display = 'flex';
  },

  getYouTubeVideoId(link) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  }
};

export default TersimpanPage;
