# Gunakan image Node.js resmi
FROM node:18

# Buat folder kerja di container
WORKDIR /recipe-app-backend

# Salin package.json dan package-lock.json terlebih dahulu (agar cache lebih efisien)
COPY package*.json ./

# Jalankan npm install
RUN npm install

# Salin seluruh project ke dalam container
COPY . .

# Tentukan port yang akan digunakan di container
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
