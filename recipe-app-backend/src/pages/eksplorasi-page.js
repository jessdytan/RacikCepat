const EksplorasiPage = {
  render() {
    return `
      <section class="eksplorasi-section">
        <h2>Cari Resep Berdasarkan Bahan</h2>
        <div class="search-container">
          <div class="add-ingredient-row">
            <input type="text" id="ingredientInput" placeholder="Contoh: telur, tomat, bawang">
            <button id="addIngredientButton" class="add-btn">+ TAMBAH</button>
            <button id="uploadButton" class="upload-icon-btn" aria-label="Upload Gambar">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="none"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>

          <ul id="ingredientList" class="ingredient-list"></ul>

          <div class="button-group">
            <button id="searchButton">Cari Resep</button>
            <button id="clearButton" class="clear-btn">Hapus Semua</button>
          </div>
        </div>

        <!-- Hidden file input -->
        <input type="file" id="imageInput" accept="image/*" style="display: none;">

        <!-- Upload Modal -->
        <div id="uploadModal" class="upload-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3>📷 Upload Gambar Bahan Makanan</h3>
              <button id="closeUploadModal" class="close-btn" aria-label="Tutup Modal">&times;</button>
            </div>
            
            <div class="upload-container">
              <div class="image-preview-container" id="imagePreviewContainer" style="display: none;">
                <img id="imagePreview" src="" alt="Preview gambar" />
              </div>
              
              <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📁</div>
                <p>Pilih gambar atau drag & drop di sini</p>
                <p class="upload-hint">Mendukung format: JPG, PNG, GIF (Max: 5MB)</p>
                <button id="selectImageButton" class="select-btn">Pilih Gambar</button>
              </div>
              
              <!-- Loading indicator -->
              <div id="analyzingIndicator" class="analyzing-indicator" style="display: none;">
                <div class="spinner"></div>
                <p>🔍 Menganalisis gambar...</p>
              </div>
            </div>
            
            <div class="upload-controls" id="uploadControls" style="display: none;">
              <button id="analyzeButton">🔍 Analisis Gambar</button>
              <button id="changeImageButton">🔄 Ganti Gambar</button>
            </div>
            
            <div id="analysisResult" class="analysis-result" style="display: none;">
              <h4>✅ Bahan yang terdeteksi:</h4>
              <div id="detectedIngredients" class="detected-ingredients"></div>
              <div class="result-actions">
                <button id="useAllDetectedButton">🎯 Gunakan Semua</button>
                <button id="uploadAgainButton">📷 Upload Lagi</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Results Modal -->
        <div id="searchResultModal" class="upload-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3>🍽️ Hasil Pencarian Resep</h3>
              <button id="closeSearchModal" class="close-btn" aria-label="Tutup Modal">&times;</button>
            </div>
            
            <div id="searchResultContent" class="search-result-content">
              <!-- Search results will be populated here -->
            </div>
          </div>
        </div>

        <style>
          .upload-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .modal-content {
            background: white;
            border-radius: 12px;
            padding: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }

          .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
          }

          .upload-container {
            position: relative;
            margin-bottom: 20px;
          }

          .upload-area {
            border: 2px dashed #ddd;
            border-radius: 8px;
            padding: 40px 20px;
            text-align: center;
            background: #f9f9f9;
            transition: all 0.3s ease;
          }

          .upload-area:hover {
            border-color: #4CAF50;
            background: #f0f8f0;
          }

          .upload-area.dragover {
            border-color: #4CAF50;
            background: #e8f5e8;
          }

          .upload-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }

          .upload-hint {
            color: #666;
            font-size: 14px;
            margin: 10px 0;
          }

          .select-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          }

          .image-preview-container {
            text-align: center;
            margin-bottom: 20px;
          }

          #imagePreview {
            max-width: 100%;
            max-height: 300px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .analyzing-indicator {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4CAF50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .upload-controls {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          .upload-controls button {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
          }

          #analyzeButton {
            background: #4CAF50;
            color: white;
          }

          #changeImageButton {
            background: #2196F3;
            color: white;
          }

          .analysis-result {
            background: #e8f5e8;
            padding: 20px;
            border-radius: 8px;
          }

          .detected-ingredients {
            margin: 15px 0;
          }

          .ingredient-tag {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 6px 12px;
            margin: 4px;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .ingredient-tag:hover {
            background: #45a049;
          }

          .ingredient-tag.selected {
            background: #2196F3;
          }

          .result-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
          }

          .result-actions button {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          }

          #useAllDetectedButton {
            background: #4CAF50;
            color: white;
          }

          #uploadAgainButton {
            background: #2196F3;
            color: white;
          }

          .search-result-content {
            padding: 20px 0;
          }

          .recipe-item {
            background: #f9f9f9;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            border-left: 4px solid #4CAF50;
          }

          .recipe-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }

          .recipe-ingredients {
            color: #666;
            margin-bottom: 10px;
          }

          .recipe-instructions {
            color: #555;
            line-height: 1.5;
          }

          .loading-text {
            text-align: center;
            padding: 40px;
            color: #666;
          }

          .error-message {
            background: #ffebee;
            color: #c62828;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
          }
        </style>
      </section>
    `;
  },

  afterRender() {
    const ingredientInput = document.getElementById('ingredientInput');
    const ingredientList = document.getElementById('ingredientList');
    const imageInput = document.getElementById('imageInput');

    // API CONFIG
    this.API_BASE_URL = 'https://racikcepat-machinelearning-production.up.railway.app';

    // Fungsi untuk menyimpan bahan ke dalam memori
    let savedIngredients = [];
    
    const saveIngredientsToMemory = () => {
      savedIngredients = Array.from(document.querySelectorAll('.ingredient-text')).map(el => el.textContent.trim());
    };

    const loadIngredientsFromMemory = () => {
      savedIngredients.forEach(ingredient => {
        this.addIngredientToList(ingredient);
      });
    };

    const clearAllIngredients = () => {
      ingredientList.innerHTML = '';
      savedIngredients = [];
    };

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
            <path d="M19 6l-1 14a2 2 0 0 1-2-2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      `;
      li.querySelector('.remove-btn').addEventListener('click', () => {
        li.remove();
        saveIngredientsToMemory();
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
      
      saveIngredientsToMemory();
    };

    // Load saved ingredients
    loadIngredientsFromMemory();

    // Event listeners
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

    document.getElementById('clearButton').addEventListener('click', clearAllIngredients);

    document.getElementById('searchButton').addEventListener('click', async () => {
      const items = Array.from(document.querySelectorAll('.ingredient-text')).map(el => el.textContent.trim());
      if (items.length === 0) {
        alert('Tambahkan setidaknya satu bahan.');
        return;
      }
      
      await this.searchRecipes(items);
    });

    // Upload functionality
    document.getElementById('uploadButton').addEventListener('click', () => {
      // Simulasi pengecekan premium
      const isPremium = false;
      let uploadCount = parseInt(window.uploadUsage || '0', 10);

      if (!isPremium && uploadCount >= 3) {
        alert('Masa gratis upload gambar sudah habis. Silakan upgrade ke versi premium untuk melanjutkan.');
        return;
      }

      if (!isPremium) {
        window.uploadUsage = uploadCount + 1;
      }

      this.openUploadModal();
    });

    // Image input change event
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        this.handleImageUpload(file);
      }
    });

    // Upload modal event listeners
    document.getElementById('selectImageButton').addEventListener('click', () => {
      imageInput.click();
    });

    document.getElementById('closeUploadModal').addEventListener('click', () => this.closeUploadModal());
    document.getElementById('closeSearchModal').addEventListener('click', () => this.closeSearchModal());
    document.getElementById('changeImageButton').addEventListener('click', () => this.resetUploadModal());
    document.getElementById('analyzeButton').addEventListener('click', () => this.analyzeUploadedImage());
    document.getElementById('uploadAgainButton').addEventListener('click', () => this.resetUploadModal());

    document.getElementById('useAllDetectedButton').addEventListener('click', () => {
      const selectedIngredients = Array.from(document.querySelectorAll('.ingredient-tag.selected, .ingredient-tag:not(.selected)'))
        .map(tag => tag.textContent.trim());
      
      selectedIngredients.forEach(ingredient => {
        addIngredient(ingredient);
      });
      
      this.closeUploadModal();
    });

    document.getElementById('uploadModal').addEventListener('click', (e) => {
      if (e.target.id === 'uploadModal') {
        this.closeUploadModal();
      }
    });

    document.getElementById('searchResultModal').addEventListener('click', (e) => {
      if (e.target.id === 'searchResultModal') {
        this.closeSearchModal();
      }
    });

    // Drag and drop functionality
    const uploadArea = document.getElementById('uploadArea');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, this.preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
    });

    uploadArea.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleImageUpload(files[0]);
      }
    });
  },

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  openUploadModal() {
    const modal = document.getElementById('uploadModal');
    this.resetUploadModal();
    modal.style.display = 'flex';
  },

  closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'none';
    this.resetUploadModal();
  },

  closeSearchModal() {
    const modal = document.getElementById('searchResultModal');
    modal.style.display = 'none';
  },

  resetUploadModal() {
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('uploadControls').style.display = 'none';
    document.getElementById('analysisResult').style.display = 'none';
    document.getElementById('analyzingIndicator').style.display = 'none';
    document.getElementById('imageInput').value = '';
  },

  validateImage(file) {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Format file tidak didukung. Gunakan JPG, PNG, atau GIF.');
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('Ukuran file terlalu besar. Maksimal 5MB.');
    }

    return true;
  },

  handleImageUpload(file) {
    try {
      this.validateImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result;
        
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('imagePreviewContainer').style.display = 'block';
        document.getElementById('uploadControls').style.display = 'flex';
        
        // Store the file for analysis
        this.uploadedImageFile = file;
        this.uploadedImageData = e.target.result;
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      alert(error.message);
    }
  },

  async analyzeUploadedImage() {
    const analyzingIndicator = document.getElementById('analyzingIndicator');
    const uploadControls = document.getElementById('uploadControls');
    
    // Show loading
    analyzingIndicator.style.display = 'block';
    uploadControls.style.display = 'none';
    
    try {
      // Analyze the uploaded image
      const detectedIngredients = await this.analyzeImage(this.uploadedImageFile);
      this.showAnalysisResult(detectedIngredients);
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Gagal menganalisis gambar: ' + error.message);
      uploadControls.style.display = 'flex';
    } finally {
      analyzingIndicator.style.display = 'none';
    }
  },

  async analyzeImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch(`${this.API_BASE_URL}/ocr`, {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type header when sending FormData
          // Browser will set it automatically with boundary
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.text();
      
      // Parse the result - assuming it returns comma-separated ingredients
      const ingredients = result.split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);
      
      return ingredients.length > 0 ? ingredients : ['Tidak ada bahan yang terdeteksi'];
      
    } catch (error) {
      console.error('Error calling OCR API:', error);
      throw new Error('Gagal menganalisis gambar. ' + error.message);
    }
  },

  showAnalysisResult(ingredients) {
    const analysisResult = document.getElementById('analysisResult');
    const detectedIngredients = document.getElementById('detectedIngredients');
    
    // Clear previous results
    detectedIngredients.innerHTML = '';
    
    // Create ingredient tags
    ingredients.forEach(ingredient => {
      const tag = document.createElement('span');
      tag.className = 'ingredient-tag';
      tag.textContent = ingredient;
      
      // Add click event to toggle selection
      tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
      });
      
      detectedIngredients.appendChild(tag);
    });
    
    analysisResult.style.display = 'block';
  },

  async searchRecipes(ingredients) {
    const modal = document.getElementById('searchResultModal');
    const content = document.getElementById('searchResultContent');
    
    // Show modal with loading
    content.innerHTML = '<div class="loading-text">🔍 Mencari resep yang cocok...</div>';
    modal.style.display = 'flex';
    
    try {
      const response = await fetch(`${this.API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredients
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.text();
      
      // Display the recipe result
      this.displaySearchResults(result);
      
      // Clear ingredients after successful search
      document.getElementById('ingredientList').innerHTML = '';
      
    } catch (error) {
      console.error('Error searching recipes:', error);
      this.displaySearchError(error.message);
    }
  },

  displaySearchResults(recipeText) {
    const content = document.getElementById('searchResultContent');
    
    content.innerHTML = `
      <div class="recipe-item">
        <div class="recipe-title">🍽️ Rekomendasi Resep</div>
        <div class="recipe-instructions">${recipeText}</div>
      </div>
    `;
  },

  displaySearchError(errorMessage) {
    const content = document.getElementById('searchResultContent');
    
    content.innerHTML = `
      <div class="error-message">
        <strong>❌ Terjadi kesalahan:</strong><br>
        ${errorMessage}<br><br>
        Silakan coba lagi atau periksa koneksi internet Anda.
      </div>
    `;
  }
};

export default EksplorasiPage;