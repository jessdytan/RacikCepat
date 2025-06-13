const RekomendasiPage = {
  eventListeners: [],

  render() {
    return `
      <section class="rekomendasi-section">
        <h2>Hasil Rekomendasi Resep</h2>
        <div id="hasilResep" class="resep-container"></div>

        <div id="modalDetail" class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modalTitle">Detail Resep</h3>
              <button class="modal-close" id="closeModal" aria-label="Tutup Modal">&times;</button>
            </div>
            <div class="modal-body" id="modalBody"></div>
          </div>
        </div>
      </section>
    `;
  },

  afterRender() {
    this.cleanup();

    const searchResultData = JSON.parse(sessionStorage.getItem('searchResult') || '[]'); 

    const hasilResepContainer = document.getElementById('hasilResep');
    if (!hasilResepContainer) {
        console.error('Elemen #hasilResep tidak ditemukan di DOM!');
        return;
    }

    hasilResepContainer.innerHTML = ''; 

    // 2. Cek apakah searchResultData adalah array dan tidak kosong
    if (!Array.isArray(searchResultData) || searchResultData.length === 0) {
        hasilResepContainer.innerHTML = '<p>Tidak ditemukan resep dengan bahan tersebut.</p>';
        console.log('Tidak ada resep atau format data tidak sesuai (bukan array atau array kosong).');
    } else {
        const heading = document.createElement('h3');
        heading.textContent = 'Rekomendasi Resep Ditemukan:'; 

        hasilResepContainer.appendChild(heading);

        searchResultData.forEach(resep => { 
            if (!resep) {
                console.warn('Ada item resep yang undefined atau null di array resep.');
                return;
            }

            const matched = resep.matchedIngredients
                ? `<p>Bahan cocok: ${resep.matchedIngredients.join(', ')}</p>` 
                : ''; 

            const card = document.createElement('div');
            card.className = 'resep-card';
            const resepId = resep.id || resep._id; 

            const imageUrl = resep.foto || resep.gambar || '';
            const title = resep.judul || resep.nama || 'Resep Tanpa Judul';
            const author = resep.penulis || '-';
            const servings = resep.porsi || '-';
            const duration = resep.durasi || resep.waktu || '-';

            card.innerHTML = `
                <img src="${imageUrl}" alt="${title}">
                <h3>${title}</h3>
                <p>Penulis: ${author}</p>
                <p>Porsi: ${servings}</p>
                <p>Durasi: ${duration}</p>
                ${matched}
                <div class="btn-group">
                    <button class="btn-detail" data-id="${resepId}">Lihat Selengkapnya →</button>
                    <button class="btn-bookmark" data-id="${resepId}" aria-label="Simpan Resep">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-7-5-7 5V4z"/>
                        </svg>
                    </button>
                </div>
            `;
            hasilResepContainer.appendChild(card);
        });

        this.setupEventListeners(searchResultData); 
    }

    this.setupModalEvents(); 
  },

  setupEventListeners(searchResult) {
    const detailButtons = document.querySelectorAll('.btn-detail');
    detailButtons.forEach(button => {
      const handler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const id = e.currentTarget.dataset.id;
        const resep = searchResult.find(r => (r.id || r._id) == id);
        if (resep) this.showModal(resep);
      };

      button.addEventListener('click', handler);
      this.eventListeners.push({ element: button, event: 'click', handler });
    });

    const bookmarkButtons = document.querySelectorAll('.btn-bookmark');
    bookmarkButtons.forEach(button => {
      const handler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const id = e.currentTarget.dataset.id;
        let tersimpan = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const index = tersimpan.findIndex(r => (r.id || r._id) == id);
        const svg = e.currentTarget.querySelector('svg');

        if (index === -1) {
          const resep = searchResult.recipes.find(r => (r.id || r._id) == id);
          if (resep) {
            tersimpan.push(resep);
            svg.setAttribute('fill', 'orangered');
            this.showToast('Resep berhasil disimpan.');
          }
        } else {
          tersimpan.splice(index, 1);
          svg.setAttribute('fill', 'orange');
          this.showToast('Resep dihapus dari tersimpan.');
        }
        localStorage.setItem('savedRecipes', JSON.stringify(tersimpan));
      };

      button.addEventListener('click', handler);
      this.eventListeners.push({ element: button, event: 'click', handler });
    });
  },

  setupModalEvents() {
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalDetail');

    if (closeModalBtn) {
      const closeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalOverlay.style.display = 'none';
      };

      closeModalBtn.addEventListener('click', closeHandler);
      this.eventListeners.push({ element: closeModalBtn, event: 'click', handler: closeHandler });
    }

    if (modalOverlay) {
      const overlayHandler = (e) => {
        if (e.target === modalOverlay) {
          e.preventDefault();
          e.stopPropagation();
          modalOverlay.style.display = 'none';
        }
      };

      modalOverlay.addEventListener('click', overlayHandler);
      this.eventListeners.push({ element: modalOverlay, event: 'click', handler: overlayHandler });
    }

    const escHandler = (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
        e.preventDefault();
        modalOverlay.style.display = 'none';
      }
    };

    document.addEventListener('keydown', escHandler);
    this.eventListeners.push({ element: document, event: 'keydown', handler: escHandler });
  },

  showModal(resep) {
    const modalOverlay = document.getElementById('modalDetail');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');

    if (!modalOverlay || !modalBody || !modalTitle) return;

    let youtubeSection = '';
    if (resep.linkYoutube) {
      const videoId = this.getYouTubeVideoId(resep.linkYoutube);
      if (videoId) {
        youtubeSection = `
          <div class="youtube-section">
            <h2><i class="fab fa-youtube"></i> Video Tutorial</h2>
            <div class="youtube-video">
              <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>`;
      } else {
        youtubeSection = `
          <div class="youtube-section">
            <h2><i class="fab fa-youtube"></i> Video Tutorial</h2>
            <div class="youtube-link">
              <a href="${resep.linkYoutube}" target="_blank" rel="noopener noreferrer">
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
        <h3><i class="fas fa-tag"></i> ${grup}</h3>
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

    const imageSource = resep.foto || resep.gambar || '/api/placeholder/400/300';

    modalTitle.textContent = resep.judul || resep.nama || 'Detail Resep';
    modalBody.innerHTML = `
      <div class="recipe-detail">
        <div class="detail-header">
          <div class="detail-image">
            <img src="${imageSource}" alt="${resep.judul || resep.nama}" />
          </div>
          <div class="detail-info">
            <h1>${resep.judul || resep.nama}</h1>
            <p class="detail-author">Oleh: <strong>${resep.penulis || '-'}</strong></p>
            <div class="detail-meta">
              <div class="meta-item"><i class="fas fa-users"></i> <span>${resep.porsi || '-'}</span></div>
              <div class="meta-item"><i class="fas fa-clock"></i> <span>${resep.durasi || resep.waktu || '-'}</span></div>
              <div class="meta-item"><i class="fas fa-calendar"></i> <span>${tanggal || '-'}</span></div>
            </div>
            ${tagsHTML}
            ${resep.url ? `<div class="original-url"><a href="${resep.url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Lihat Resep Asli</a></div>` : ''}
          </div>
        </div>
        ${youtubeSection}
        <div class="detail-content-wrapper">
          <div class="ingredients-section">
            <h2><i class="fas fa-list"></i> Bahan-bahan</h2>
            ${ingredientsHTML}
          </div>
          <div class="steps-section">
            <h2><i class="fas fa-utensils"></i> Langkah-langkah</h2>
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

  getYouTubeVideoId(url) {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  },

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  },

  cleanup() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      if (element && handler) {
        element.removeEventListener(event, handler);
      }
    });
    this.eventListeners = [];
  },

  beforeDestroy() {
    this.cleanup();
    const modalOverlay = document.getElementById('modalDetail');
    if (modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  }
};

export default RekomendasiPage;
