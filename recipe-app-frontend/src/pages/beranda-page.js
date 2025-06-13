const BerandaPage = {
  render() {
    return `
      <section class="hero-section">
        <div class="hero-content">
          <h2>Selamat Datang di RacikCepat</h2>
          <p class="hero-subtitle">Temukan dan bagikan resep makanan favoritmu!</p>
          <p class="hero-description">Platform terlengkap untuk menemukan inspirasi kuliner, berbagi resep keluarga, dan mengeksplorasi cita rasa nusantara dalam satu tempat.</p>
          <button id="eksplorasiButton" class="hero-button">
            <span>Mulai Eksplorasi Resep</span>
            <i class="arrow">→</i>
          </button>
        </div>
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Delicious Food" />
        </div>
      </section>

      <section class="features-section">
        <h3>Mengapa Pilih RacikCepat?</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🍳</div>
            <h4>Ribuan Resep</h4>
            <p>Koleksi resep lengkap dari berbagai daerah dan negara</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⭐</div>
            <h4>Rating & Review</h4>
            <p>Sistem penilaian dari komunitas untuk resep terbaik</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h4>Mudah Digunakan</h4>
            <p>Interface yang intuitif dan ramah pengguna di semua device</p>
          </div>
        </div>
      </section>

      <section class="popular-recipes">
        <h3>Resep Terbaru</h3>
        <div class="recipe-preview-grid" id="recipePreviewGrid">
          <!-- Loading placeholder -->
          <div class="loading-placeholder">
            <div class="loading-card">
              <div class="loading-image"></div>
              <div class="loading-content">
                <div class="loading-title"></div>
              </div>
            </div>
            <div class="loading-card">
              <div class="loading-image"></div>
              <div class="loading-content">
                <div class="loading-title"></div>
              </div>
            </div>
            <div class="loading-card">
              <div class="loading-image"></div>
              <div class="loading-content">
                <div class="loading-title"></div>
              </div>
            </div>
            <div class="loading-card">
              <div class="loading-image"></div>
              <div class="loading-content">
                <div class="loading-title"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="preview-cta">
          <button id="lihatSemuaButton" class="secondary-button">Lihat Semua Resep</button>
        </div>
      </section>

      <!-- CTA Section - akan disembunyikan jika user sudah login -->
      <section class="cta-section" id="ctaSection">
        <div class="cta-content">
          <h3>Siap Memulai Petualangan Kuliner?</h3>
          <p>Bergabunglah dengan ribuan chef rumahan dan temukan resep impianmu sekarang!</p>
          <div class="cta-buttons">
            <button id="daftarButton" class="primary-button">Daftar Sekarang</button>
            <button id="loginButton" class="outline-button">Masuk</button>
          </div>
        </div>
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

  async afterRender() {
   
    this.toggleCTASection();

   
    await this.loadPopularRecipes();

   
    document.getElementById('eksplorasiButton').addEventListener('click', () => {
      window.location.hash = '#/eksplorasi';
    });

  
    document.getElementById('lihatSemuaButton').addEventListener('click', () => {
      window.location.hash = '#/eksplorasi';
    });

  
    const daftarButton = document.getElementById('daftarButton');
    if (daftarButton) {
      daftarButton.addEventListener('click', () => {
        window.location.hash = '#/register';
      });
    }

    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        window.location.hash = '#/login';
      });
    }

   
    document.getElementById('closeModal')?.addEventListener('click', () => {
      document.getElementById('modalDetail').style.display = 'none';
    });

  
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

   
    const sections = document.querySelectorAll('.features-section, .popular-recipes, .cta-section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });

   
    window.addEventListener('userLoginStatusChanged', () => {
      this.toggleCTASection();
    });
  },


  toggleCTASection() {
    const ctaSection = document.getElementById('ctaSection');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (ctaSection) {
      if (isLoggedIn) {
       
        ctaSection.style.display = 'none';
      } else {
      
        ctaSection.style.display = 'block';
      }
    }
  },


  async fetchRecipes() {
    try {
      const response = await fetch('http://localhost:5001/api/recipes');
      if (!response.ok) {
        throw new Error('Gagal mengambil data resep');
      }
      return await response.json();
    } catch (err) {
      console.error('Error fetching recipes:', err);
      return [];
    }
  },

  async loadPopularRecipes() {
    const recipePreviewGrid = document.getElementById('recipePreviewGrid');
    
    try {
      const recipes = await this.fetchRecipes();
      
      
      const loadingPlaceholder = recipePreviewGrid.querySelector('.loading-placeholder');
      if (loadingPlaceholder) {
        loadingPlaceholder.remove();
      }

      if (recipes.length === 0) {
       
        recipePreviewGrid.innerHTML = `
          <div class="empty-state-preview">
            <div class="empty-icon">🍽️</div>
            <p>Belum ada resep tersedia</p>
            <button onclick="window.location.hash='#/resep'" class="empty-cta-btn">
              Tambah Resep Pertama
            </button>
          </div>
        `;
        return;
      }

      
      const sortedRecipes = recipes.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.tanggal || 0);
        const dateB = new Date(b.createdAt || b.tanggal || 0);
        return dateB - dateA;
      }).slice(0, 4);

     
      recipePreviewGrid.innerHTML = sortedRecipes.map(recipe => {
        const imageSource = recipe.foto || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
        
        return `
          <div class="recipe-preview-card" data-recipe-id="${recipe._id || recipe.id}">
            <img src="${imageSource}" alt="${recipe.judul}" 
                 onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'; this.onerror=null;" 
                 loading="lazy" />
            <div class="recipe-preview-content">
              <h5>${recipe.judul}</h5>
              <div class="recipe-preview-meta">
                <span class="recipe-author">By ${recipe.penulis || 'Anonymous'}</span>
                <div class="recipe-info">
                  <span><i class="fas fa-users"></i> ${recipe.porsi || '-'}</span>
                  <span><i class="fas fa-clock"></i> ${recipe.durasi || '-'}</span>
                </div>
              </div>
              ${recipe.tag && recipe.tag.length > 0 ? `
                <div class="recipe-preview-tags">
                  ${recipe.tag.slice(0, 2).map(tag => `<span class="preview-tag">#${tag}</span>`).join('')}
                </div>
              ` : ''}
              <div class="btn-group">
                <button class="btn-detail" data-id="${recipe._id || recipe.id}">Lihat Selengkapnya →</button>
                <button class="btn-bookmark" data-id="${recipe._id || recipe.id}" aria-label="Simpan Resep">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-7-5-7 5V4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      
      setTimeout(() => {
      
        document.querySelectorAll('.btn-detail').forEach(button => {
          button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const id = e.currentTarget.dataset.id;
            const resep = sortedRecipes.find(r => (r.id || r._id) == id);
            if (resep) this.showModal(resep);
          });
        });

       
        document.querySelectorAll('.btn-bookmark').forEach(button => {
          button.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.currentTarget.dataset.id;
            let tersimpan = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
            const index = tersimpan.findIndex(r => (r.id || r._id) == id);
            const svg = e.currentTarget.querySelector('svg');

            if (index === -1) {
              const resep = sortedRecipes.find(r => (r.id || r._id) == id);
              tersimpan.push(resep);
              svg.setAttribute('fill', 'orangered');
              alert('Resep berhasil disimpan.');
            } else {
              tersimpan.splice(index, 1);
              svg.setAttribute('fill', 'orange');
              alert('Resep dihapus dari tersimpan.');
            }
            localStorage.setItem('savedRecipes', JSON.stringify(tersimpan));
          });
        });

      
        const previewCards = document.querySelectorAll('.recipe-preview-card');
        previewCards.forEach(card => {
          card.addEventListener('click', (e) => {
            
            if (e.target.closest('.btn-detail, .btn-bookmark')) {
              return;
            }

            const recipeId = card.dataset.recipeId;
           
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (!isLoggedIn) {
             
              if (confirm('Anda perlu login untuk melihat detail resep. Login sekarang?')) {
                window.location.hash = '#/login';
              }
              return;
            }

           
            window.location.hash = '#/resep';
            
        
            setTimeout(() => {
            
              this.showRecipeDetailInResepPage(recipeId);
            }, 100);
          });

          
          card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
          });

          card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          });
        });
      }, 0);

    } catch (err) {
      console.error('Error loading popular recipes:', err);
      recipePreviewGrid.innerHTML = `
        <div class="error-state-preview">
          <div class="error-icon">⚠️</div>
          <p>Gagal memuat resep populer</p>
          <button onclick="window.location.reload()" class="retry-btn">
            Coba Lagi
          </button>
        </div>
      `;
    }
  },

  showRecipeDetailInResepPage(recipeId) {
    
    sessionStorage.setItem('showRecipeDetail', recipeId);
    
   
    window.dispatchEvent(new CustomEvent('showRecipeDetail', { 
      detail: { recipeId } 
    }));
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
              <div class="ingredient-amount">
                ${b.jumlah || ''}
              </div>
              <div class="ingredient-name">
                ${b.bahan}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    const tagsHTML = resep.tag?.length ? `
      <div class="recipe-tags-display">
        ${resep.tag.map(tag => `
          <span class="tag">#${tag}</span>
        `).join('')}
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
            <img src="${imageSource}" alt="${resep.judul || resep.nama}" class="detail-recipe-img" />
          </div>
          <div class="detail-info">
            <h1 class="detail-title">${resep.judul || resep.nama}</h1>
            <p class="detail-author">Oleh: <strong>${resep.penulis || '-'}</strong></p>
            <div class="detail-meta">
              <div class="meta-item">
                <i class="fas fa-users"></i> 
                <span>${resep.porsi || '-'}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-clock"></i> 
                <span>${resep.durasi || resep.waktu || '-'}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-calendar"></i> 
                <span>${tanggal || '-'}</span>
              </div>
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
                  <div class="step-number">
                    ${index + 1}
                  </div>
                  <div class="step-content">
                    <p>${langkah}</p>
                  </div>
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

export default BerandaPage;