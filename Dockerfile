# Gunakan image Node.js resmi (alpine untuk ringan)
FROM node:20-alpine

# Install dependencies dasar jika perlu (biasanya tidak wajib untuk Next.js)
RUN apk add --no-cache bash

# Buat direktori kerja
WORKDIR /app

# Salin package.json dan yarn.lock dulu untuk caching layer install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Salin seluruh source code
COPY . .

# Build Next.js app (output di .next)
RUN yarn build

# Expose port default Next.js
EXPOSE 3000

# Jalankan Next.js dalam mode production
CMD ["yarn", "start"]
