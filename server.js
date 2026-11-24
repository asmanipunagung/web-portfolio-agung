const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3008;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const GALLERY_FILE = path.join(__dirname, 'gallery.json');
const UPLOAD_DIR = path.join(__dirname, 'assets', 'gallery');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}_${safeBase}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Hanya berkas gambar yang diizinkan'));
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function getGallery() {
  if (!fs.existsSync(GALLERY_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveGallery(items) {
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(items, null, 2), 'utf8');
}

// API: Get all gallery items
app.get('/api/gallery', (req, res) => {
  res.json(getGallery());
});

// API: Add new gallery photo
app.post('/api/gallery', upload.single('photo'), (req, res) => {
  const { password, title, subtitle, specs } = req.body;

  if (password !== ADMIN_PASSWORD) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(403).json({ error: 'Password pengawas/admin salah!' });
  }

  if (!title) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Judul foto wajib diisi.' });
  }

  const specsArray = specs
    ? specs.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const newItem = {
    id: String(Date.now()),
    title: title.trim(),
    subtitle: (subtitle || '').trim(),
    specs: specsArray,
    image: req.file ? `assets/gallery/${req.file.filename}` : ''
  };

  const gallery = getGallery();
  gallery.unshift(newItem); // Newest first
  saveGallery(gallery);

  res.json({ success: true, item: newItem });
});

// API: Delete gallery item
app.delete('/api/gallery/:id', (req, res) => {
  const password = req.headers['x-admin-password'] || req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Password admin salah!' });
  }

  const id = req.params.id;
  let gallery = getGallery();
  const target = gallery.find(item => item.id === id);

  if (!target) {
    return res.status(404).json({ error: 'Item tidak ditemukan.' });
  }

  if (target.image && fs.existsSync(path.join(__dirname, target.image))) {
    try {
      fs.unlinkSync(path.join(__dirname, target.image));
    } catch (e) {
      console.error('Gagal menghapus file foto:', e);
    }
  }

  gallery = gallery.filter(item => item.id !== id);
  saveGallery(gallery);

  res.json({ success: true, message: 'Item berhasil dihapus.' });
});

// Route for admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[GALLERY SERVER] Aktif di http://localhost:${PORT}`);
    console.log(`[ADMIN DASHBOARD] http://localhost:${PORT}/admin`);
  });
}

module.exports = app;
