const assert = require('assert');
const http = require('http');
const app = require('./server');

const PORT = 3099;
const server = app.listen(PORT, async () => {
  console.log(`[TEST] Testing gallery API on port ${PORT}...`);
  try {
    // 1. GET /api/gallery
    const res1 = await fetch(`http://localhost:${PORT}/api/gallery`);
    assert.strictEqual(res1.status, 200, 'GET /api/gallery status 200');
    const items1 = await res1.json();
    assert.ok(Array.isArray(items1), 'Gallery returns array');
    console.log('✓ Test 1: GET /api/gallery berhasil');

    // 2. POST with wrong password
    const formBad = new FormData();
    formBad.append('title', 'Test Model');
    formBad.append('password', 'wrong-pass');
    const resBad = await fetch(`http://localhost:${PORT}/api/gallery`, { method: 'POST', body: formBad });
    assert.strictEqual(resBad.status, 403, 'Wrong password returns 403');
    console.log('✓ Test 2: Proteksi password salah berhasil (403)');

    // 3. POST with correct password
    const formGood = new FormData();
    formGood.append('title', 'Automated Test Gunpla');
    formGood.append('subtitle', 'RG Test Unit');
    formGood.append('specs', 'Macro 50mm, LED');
    formGood.append('password', 'admin');
    const resGood = await fetch(`http://localhost:${PORT}/api/gallery`, { method: 'POST', body: formGood });
    assert.strictEqual(resGood.status, 200, 'POST success 200');
    const dataGood = await resGood.json();
    assert.strictEqual(dataGood.success, true);
    assert.strictEqual(dataGood.item.title, 'Automated Test Gunpla');
    const createdId = dataGood.item.id;
    console.log('✓ Test 3: Upload item baru berhasil (200)');

    // 4. DELETE created item
    const resDel = await fetch(`http://localhost:${PORT}/api/gallery/${createdId}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': 'admin' }
    });
    assert.strictEqual(resDel.status, 200, 'DELETE success 200');
    console.log('✓ Test 4: Hapus item berhasil (200)');

    console.log('\n======================================');
    console.log('✓ SEMUA UJI BACKEND GALERI LOLOS 100%!');
    console.log('======================================');
    server.close(() => process.exit(0));
  } catch (err) {
    console.error('Test gagal:', err);
    server.close(() => process.exit(1));
  }
});
