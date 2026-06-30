# Cara Menambahkan Gambar ke Website Chery

## Langkah 1: Setup Folder
Double-click file `setup-folders.bat` untuk membuat folder structure.

Atau manual via terminal:
```bash
mkdir public\images\vehicles
mkdir public\images\branches\cibubur
mkdir public\images\branches\makassar
mkdir public\images\branches\pare-pare
mkdir public\images\lifestyle
```

---

## Langkah 2: Tambahkan Gambar

### Vehicle Images (6 models)
Copy gambar mobil ke folder ini:
```
public/images/vehicles/
├── omoda-5.jpg
├── tiggo-5x.jpg
├── tiggo-7-pro.jpg
├── tiggo-8-pro.jpg
├── tiggo-8-pro-hybrid.jpg
└── eq1.jpg
```

**Cara copy:**
1. Buka folder `public/images/vehicles/` di Windows Explorer
2. Copy-paste gambar dari folder asli
3. Pastikan nama file sesuai (contoh: `omoda-5.jpg`)

### Branch Photos (3 locations)
```
public/images/branches/cibubur/
├── exterior.jpg
├── interior.jpg
└── showroom.jpg

public/images/branches/makassar/
├── exterior.jpg
├── interior.jpg
└── showroom.jpg

public/images/branches/pare-pare/
├── exterior.jpg
├── interior.jpg
└── showroom.jpg
```

### Lifestyle Images (optional)
```
public/images/lifestyle/
├── family-driving.jpg
├── city-commute.jpg
└── adventure.jpg
```

---

## Langkah 3: Test Website
```bash
npm run dev
# Buka http://localhost:3000
# Cek apakah gambar muncul dengan benar
```

---

## Tips:

✅ **Format gambar:** JPG atau WebP  
✅ **Ukuran:** 1920x1080 (atau minimal 1280x720)  
✅ **Ukuran file:** Kompres hingga < 500KB per gambar  
✅ **Nama file:** Gunakan huruf kecil, tanpa spasi (contoh: `omoda-5.jpg`)  

❌ **Jangan pakai:** 
- Gambar dari Google tanpa izin
- Foto ber-watermark
- Foto dari media lain tanpa lisensi

---

## Jika Gambar Tidak Muncul:

1. **Cek nama file** — harus exact match (case-sensitive)
2. **Cek path di code** — di `src/lib/data/vehicles.ts`
3. **Clear cache** — restart `npm run dev`
4. **Cek console** — ada error message?

---

## Quick Test:

Setelah tambah gambar, test dengan buka:
- http://localhost:3000/models — cek vehicle cards
- http://localhost:3000/cibubur — cek branch page
- http://localhost:3000/ — cek homepage

---

**Butuh bantuan?** Cek `PLACEHOLDER_GUIDE.md` untuk panduan lengkap.