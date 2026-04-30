require('dotenv').config();
const app = require('./src/app');
const db = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Test database connection (Log saja, jangan membunuh proses)
db.query('SELECT NOW()')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    // Jangan gunakan process.exit(1) di sini agar function tetap hidup
  });

// Jalankan listen HANYA jika di lokal (bukan di Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// WAJIB ADA: Agar Vercel bisa mengenali aplikasi Express kamu
module.exports = app;