const EksplorasiPage = {
  render() {
    return `
      <section class="eksplorasi-section">
        <h2>Cari Resep Berdasarkan Bahan</h2>
        <div class="search-container">
          <div class="add-ingredient-row">
            <input type="text" id="ingredientInput" placeholder="Contoh: telur, tomat, bawang">
            <button id="addIngredientButton" class="add-btn">+ TAMBAH</button>
            <button id="uploadReceiptButton" class="upload-btn" title="Upload Struk Belanja">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <span class="upload-text">Upload Struk</span>
            </button>
          </div>

          <ul id="ingredientList" class="ingredient-list"></ul>

          <div class="button-group">
            <button id="searchButton">Cari Resep</button>
            <button id="clearButton" class="clear-btn">Hapus Semua</button>
          </div>
        </div>

        <!-- Upload Receipt Modal -->
        <div id="uploadModal" class="upload-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3>🧾 Upload Struk Belanja</h3>
              <button id="closeUploadModal" class="close-btn" aria-label="Tutup Modal">&times;</button>
            </div>
            
            <div class="upload-container">
              <div class="upload-area" id="uploadArea">
                <div class="upload-icon"></div>
                <p class="upload-text">Klik atau seret file struk belanja di sini</p>
                <p class="upload-subtext">Format yang didukung: JPG, PNG</p>
                <input type="file" id="receiptFileInput" accept="image/*,application/pdf" style="display: none;">
              </div>
              
              <!-- Preview area -->
              <div id="previewArea" class="preview-area" style="display: none;">
                <img id="previewImage" src="" alt="Preview struk" style="max-width: 100%; max-height: 300px;">
                <p id="fileName" class="file-name"></p>
              </div>
              
              <!-- Processing indicator -->
              <div id="processingIndicator" class="processing-indicator" style="display: none;">
                <div class="spinner"></div>
                <p>🔍 Memproses struk belanja...</p>
              </div>
            </div>
            
            <div class="upload-controls">
              <button id="processReceiptButton" class="process-btn" style="display: none;">✨ Proses Struk</button>
              <button id="cancelUploadButton" class="cancel-btn">❌ Batal</button>
            </div>
            
            <div id="extractResult" class="extract-result" style="display: none;">
              <h4>🛍️ Bahan yang ditemukan:</h4>
              <div id="extractedIngredients" class="extracted-ingredients"></div>
              <div class="extract-actions">
                <button id="useExtractedButton" class="use-btn">🎯 Gunakan Semua Bahan</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Hidden file input -->
        <input type="file" id="hiddenFileInput" accept="image/*,application/pdf" style="display: none;">
      </section>
    `;
  },

  afterRender() {
    const ingredientInput = document.getElementById('ingredientInput');
    const ingredientList = document.getElementById('ingredientList');

    // API CONFIG
    this.API_BASE_URL = 'https://racikcepat-machinelearning-staging.up.railway.app';

    // LocalStorage functions
    const saveIngredientsToLocalStorage = () => {
      const ingredients = Array.from(document.querySelectorAll('.ingredient-text')).map(el => el.textContent.trim());
      localStorage.setItem('savedIngredients', JSON.stringify(ingredients));
    };

    const loadIngredientsFromLocalStorage = () => {
      const savedIngredients = JSON.parse(localStorage.getItem('savedIngredients')) || [];
      savedIngredients.forEach(ingredient => {
        this.addIngredientToList(ingredient);
      });
    };

    const clearAllIngredients = () => {
      ingredientList.innerHTML = '';
      localStorage.removeItem('savedIngredients');
    };

    // Add ingredient to list
    this.addIngredientToList = (ingredient) => {
      const li = document.createElement('li');
      li.className = 'ingredient-item';
      li.innerHTML = `
        <span class="drag-icon">☰</span>
        <span class="ingredient-text">${ingredient}</span>
        <button class="remove-btn" title="Hapus bahan" aria-label="Hapus bahan">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      `;
      li.querySelector('.remove-btn').addEventListener('click', () => {
        li.remove();
        saveIngredientsToLocalStorage();
      });
      ingredientList.appendChild(li);
    };

    const getExistingIngredients = () =>
      Array.from(document.querySelectorAll('.ingredient-text')).map(el => el.textContent.toLowerCase());

    const addIngredient = (value) => {
      const existingIngredients = getExistingIngredients();

      const ingredients = value
        .split(',')
        .map(i => i.trim().toLowerCase())
        .filter(i => i && !existingIngredients.includes(i));

      ingredients.forEach(ingredient => {
        this.addIngredientToList(ingredient);
      });
      
      saveIngredientsToLocalStorage();
    };

    // Load existing ingredients
    loadIngredientsFromLocalStorage();

    // Add ingredient button event
    document.getElementById('addIngredientButton').addEventListener('click', () => {
      const value = ingredientInput.value.trim();
      if (value) {
        addIngredient(value);
        ingredientInput.value = '';
      }
    });

    ingredientInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const value = ingredientInput.value.trim();
        if (value) {
          addIngredient(value);
          ingredientInput.value = '';
        }
      }
    });

    // Clear button event
    document.getElementById('clearButton').addEventListener('click', clearAllIngredients);

    // Search button event
    document.getElementById('searchButton').addEventListener('click', async () => {
      const items = Array.from(document.querySelectorAll('.ingredient-text')).map(el => el.textContent.trim());
      if (items.length === 0) {
        alert('Tambahkan setidaknya satu bahan.');
        return;
      }
      
      try {
        const predictResponse = await fetch(`${this.API_BASE_URL}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients: items })
        });

        if (!predictResponse.ok) {
            const errorData = await predictResponse.json();
            throw new Error(errorData.message || 'Gagal mencari resep dari API rekomendasi.');
        }

        const predictResult = await predictResponse.json();
        const recipeTitles = predictResult.recommendations || []; 

        const detailResponse = await fetch(
          "http://localhost:5001/api/recipe/search", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recommendations: recipeTitles }), 
          }
        );

        if (!detailResponse.ok) {
            const errorData = await detailResponse.json();
            throw new Error(errorData.message || 'Gagal mengambil detail resep.');
        }

        const finalResult = await detailResponse.json();

        sessionStorage.setItem('searchResult', JSON.stringify(finalResult));
      
        clearAllIngredients();
      
        window.location.hash = '#/rekomendasi';
      } catch (err) {
        alert('Gagal memproses pencarian: ' + err.message);
      }
    });

    // Upload receipt functionality
    document.getElementById('uploadReceiptButton').addEventListener('click', () => {
      const isPremium = localStorage.getItem('isPremiumUser') === 'true';
      const uploadCount = parseInt(localStorage.getItem('uploadUsage') || '0', 10);

      if (!isPremium && uploadCount >= 3) {
        alert('Masa gratis upload struk sudah habis. Silakan upgrade ke versi premium untuk melanjutkan.');
        window.location.hash = '#/premium';
        return;
      }

      if (!isPremium) {
        localStorage.setItem('uploadUsage', uploadCount + 1);
      }

      this.openUploadModal();
    });

    // Upload modal functions
    this.openUploadModal = () => {
      document.getElementById('uploadModal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    this.closeUploadModal = () => {
      document.getElementById('uploadModal').style.display = 'none';
      document.body.style.overflow = 'auto';
      this.resetUploadModal();
    };

    this.resetUploadModal = () => {
      document.getElementById('previewArea').style.display = 'none';
      document.getElementById('processingIndicator').style.display = 'none';
      document.getElementById('extractResult').style.display = 'none';
      document.getElementById('processReceiptButton').style.display = 'none';
      document.getElementById('uploadArea').style.display = 'block';
      document.getElementById('receiptFileInput').value = '';
    };

    // File upload handlers
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('receiptFileInput');

    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileSelect(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleFileSelect(e.target.files[0]);
      }
    });

    this.handleFileSelect = (file) => {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 10MB.');
        return;
      }

      this.previewFile(file);
    };

    this.previewFile = (file) => {
      document.getElementById('uploadArea').style.display = 'none';
      document.getElementById('previewArea').style.display = 'block';
      document.getElementById('processReceiptButton').style.display = 'inline-block';
      document.getElementById('fileName').textContent = file.name;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById('previewImage').src = e.target.result;
          document.getElementById('previewImage').style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        document.getElementById('previewImage').style.display = 'none';
      }

      this.currentFile = file;
    };

    this.processReceipt = async () => {
      if (!this.currentFile) return;

      document.getElementById('processingIndicator').style.display = 'block';
      document.getElementById('processReceiptButton').style.display = 'none';

      const formData = new FormData(); 
      formData.append('image', this.currentFile);

      try {
        const response = await fetch(`${this.API_BASE_URL}/ocr`, {
          method: 'POST',
          body: formData, 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal memproses struk dari API.');
        }

        const result = await response.json();
        const extractedIngredients = result.ingredients || [];
        
        this.displayExtractedIngredients(extractedIngredients);
      } catch (error) {
        alert('Gagal memproses struk: ' + error.message);
        document.getElementById('processingIndicator').style.display = 'none';
        document.getElementById('processReceiptButton').style.display = 'inline-block';
      }
    };

    this.displayExtractedIngredients = (ingredients) => {
      document.getElementById('processingIndicator').style.display = 'none';
      document.getElementById('extractResult').style.display = 'block';

      const container = document.getElementById('extractedIngredients');
      container.innerHTML = '';

      ingredients.forEach(ingredient => {
        const item = document.createElement('div');
        item.className = 'extracted-item';
        item.innerHTML = `
          <input type="checkbox" id="ingredient-${ingredient}" checked>
          <label for="ingredient-${ingredient}">${ingredient}</label>
        `;
        container.appendChild(item);
      });
    };

    // Modal event listeners
    document.getElementById('closeUploadModal').addEventListener('click', () => this.closeUploadModal());
    document.getElementById('cancelUploadButton').addEventListener('click', () => this.closeUploadModal());
    document.getElementById('processReceiptButton').addEventListener('click', () => this.processReceipt());

    document.getElementById('useExtractedButton').addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('#extractedIngredients input[type="checkbox"]:checked');
      const selectedIngredients = Array.from(checkboxes).map(cb => cb.nextElementSibling.textContent);
      
      selectedIngredients.forEach(ingredient => {
        addIngredient(ingredient);
      });
      
      this.closeUploadModal();
    });

    // Close modal when clicking outside
    document.getElementById('uploadModal').addEventListener('click', (e) => {
      if (e.target.id === 'uploadModal') {
        this.closeUploadModal();
      }
    });
  }
};

export default EksplorasiPage;