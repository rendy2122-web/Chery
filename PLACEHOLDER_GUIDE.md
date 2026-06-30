# Chery Website — Placeholder Guide

Panduan ini menjelaskan semua placeholder yang ada di website dan cara menggantinya dengan konten asli.

---

## 📸 1. VEHICLE IMAGES

### Location
```
public/images/vehicles/
```

### Required Images (6 models)
| Model | Filename | Dimensions | Format |
|-------|----------|------------|--------|
| Omoda 5 | `omoda-5.jpg` | 1920x1080 | JPG/WebP |
| Tiggo 5x | `tiggo-5x.jpg` | 1920x1080 | JPG/WebP |
| Tiggo 7 Pro | `tiggo-7-pro.jpg` | 1920x1080 | JPG/WebP |
| Tiggo 8 Pro | `tiggo-8-pro.jpg` | 1920x1080 | JPG/WebP |
| Tiggo 8 Pro Hybrid | `tiggo-8-pro-hybrid.jpg` | 1920x1080 | JPG/WebP |
| eQ1 | `eq1.jpg` | 1920x1080 | JPG/WebP |

### Gallery Images (optional, 2-3 per model)
```
omoda-5-1.jpg, omoda-5-2.jpg, omoda-5-3.jpg
tiggo-5x-1.jpg, tiggo-5x-2.jpg
tiggo-7-pro-1.jpg, tiggo-7-pro-2.jpg, tiggo-7-pro-3.jpg
tiggo-8-pro-1.jpg, tiggo-8-pro-2.jpg, tiggo-8-pro-3.jpg
tiggo-8-pro-hybrid-1.jpg, tiggo-8-pro-hybrid-2.jpg
eq1-1.jpg, eq1-2.jpg
```

### Sumber Gambar
1. **Official Chery Indonesia** — product page, brochure
2. **Chery Global** — media assets
3. **Dealer showroom** — foto sendiri
4. **Stock photo** — hanya untuk lifestyle, bukan untuk klaim produk

### Catatan
- Jangan pakai gambar dari Google tanpa izin
- Jangan pakai foto ber-watermark
- Jangan pakai foto dari media lain tanpa lisensi

---

## 🏢 2. BRANCH PHOTOS

### Location
```
public/images/branches/
├── cibubur/
│   ├── exterior.jpg
│   ├── interior.jpg
│   ├── showroom.jpg
│   └── team.jpg
├── makassar/
│   ├── exterior.jpg
│   ├── interior.jpg
│   ├── showroom.jpg
│   └── team.jpg
└── pare-pare/
    ├── exterior.jpg
    ├── interior.jpg
    ├── showroom.jpg
    └── team.jpg
```

### Sumber
- Foto showroom sendiri
- Foto event/test drive/dealer
- Jangan pakai stock photo untuk cabang

---

## 🎨 3. LIFESTYLE IMAGES

### Location
```
public/images/lifestyle/
├── family-driving.jpg
├── city-commute.jpg
├── adventure.jpg
├── business.jpg
└── ev-daily.jpg
```

### Catatan
- Boleh pakai licensed stock photo
- Jangan klaim produk spesifik di foto lifestyle
- Gunakan untuk mood/atmosphere saja

---

## 📝 4. CONTENT PLACEHOLDERS

### Phone Numbers
| File | Current Placeholder | Replace With |
|------|---------------------|--------------|
| `src/app/contact/page.tsx` | `+62 21 1234 5678` | Real phone number |
| `src/app/cibubur/page.tsx` | `+62 21 1234 5678` | Real phone number |
| `src/app/makassar/page.tsx` | `+62 411 1234 567` | Real phone number |
| `src/app/pare-pare/page.tsx` | `+62 421 1234 567` | Real phone number |

### Email Addresses
| File | Current Placeholder | Replace With |
|------|---------------------|--------------|
| `src/app/contact/page.tsx` | `info@chery.co.id` | Real email |
| `src/app/cibubur/page.tsx` | `cibubur@chery.co.id` | Real email |
| `src/app/makassar/page.tsx` | `makassar@chery.co.id` | Real email |
| `src/app/pare-pare/page.tsx` | `parepare@chery.co.id` | Real email |

### Addresses
| File | Current Placeholder | Replace With |
|------|---------------------|--------------|
| `src/app/cibubur/page.tsx` | Jl. Alternatif Cibubur No. 123 | Real address |
| `src/app/makassar/page.tsx` | Jl. Perintis Kemerdekaan No. 78 | Real address |
| `src/app/pare-pare/page.tsx` | Jl. Hasanuddin No. 45 | Real address |

### WhatsApp Links
| File | Current Placeholder | Replace With |
|------|---------------------|--------------|
| `src/app/layout.tsx` | `6281234567890` | Real WhatsApp number |
| Homepage Final CTA | `https://wa.me/6281234567890` | Real WhatsApp link |

### Google Maps
| File | Current Coordinates | Replace With |
|------|---------------------|--------------|
| `src/app/cibubur/page.tsx` | `-6.3264,106.9156` | Real coordinates |
| `src/app/makassar/page.tsx` | `-5.1476,119.4327` | Real coordinates |
| `src/app/pare-pare/page.tsx` | `-4.0139,119.6254` | Real coordinates |

---

## 📄 5. TEXT PLACEHOLDERS

### Testimonials (3 dummy reviews)
**File:** `src/app/page.tsx` (lines ~250-300)

Current:
- Budi Santoso — Jakarta — Tiggo 7 Pro
- Siti Nurhaliza — Surabaya — Omoda 5
- Ahmad Hidayat — Bandung — Tiggo 8 Pro

**Replace with:** Real customer testimonials

### News Articles (6 dummy articles)
**File:** `src/app/news/page.tsx`

Current:
- "Chery Catat Penjualan Tertinggi..."
- "Teknologi SHS Safety..."
- "Tips Merawat SUV Hybrid..."
- "Chery Resmi Luncurkan Tiggo 8 Pro..."
- "Perbandingan: Tiggo 7 Pro vs Omoda 5..."
- "Event Test Drive Nasional..."

**Replace with:** Real news/articles

### Promotions (6 dummy promos)
**File:** `src/app/promotions/page.tsx`

Current:
- DP Mulai 10%
- Bonus Service 3 Tahun
- Trade-In Bonus
- Diskon Lebaran
- Referral Program
- Kredit Ringan

**Replace with:** Real promotions

### Service Centers (3 dummy centers)
**File:** `src/app/ownership/page.tsx`

Current:
- Jakarta — Jl. Sudirman No. 123
- Surabaya — Jl. Ahmad Yani No. 45
- Makassar — Jl. Perintis Kemerdekaan No. 78

**Replace with:** Real service centers

---

## 🦸 5. HERO IMAGE

### Location
```
public/images/hero/
└── chery-hero.jpg
```

### Requirements
- **Dimensions:** 1920x1080 (Full HD) atau 2560x1440 (2K)
- **Format:** JPG atau WebP
- **File size:** < 1MB (compress untuk web)
- **Content:** Image yang user share (4 mobil Chery dengan lighting cinematic)

### Cara Menambahkan:
1. Save gambar yang user share ke `public/images/hero/chery-hero.jpg`
2. Atau rename gambar asli menjadi `chery-hero.jpg`
3. Code sudah otomatis load dari path ini

### Catatan:
- Hero image akan ditampilkan dengan overlay gradient
- Pastikan gambar tidak terlalu gelap agar text tetap terbaca
- Rekomendasi: cinematic shot dengan lighting dramatis

---

## 🖼️ 6. SEO PLACEHOLDERS

### OG Image
**Path:** `public/images/og-image.jpg`
**Size:** 1200x630 pixels
**Format:** JPG/WebP
**Current:** Missing (will show fallback)

### Favicon
**Path:** `public/images/favicon.ico`
**Size:** 32x32 or 16x16
**Format:** ICO

---

## 🔧 7. HOW TO REPLACE

### Step 1: Images
```bash
# Copy images to public folder
public/images/
├── vehicles/
│   ├── omoda-5.jpg
│   ├── tiggo-5x.jpg
│   └── ...
├── branches/
│   ├── cibubur/
│   └── ...
└── og-image.jpg
```

### Step 2: Update Vehicle Data
**File:** `src/lib/data/vehicles.ts`

```typescript
{
  id: '1',
  name: 'Chery Omoda 5',
  slug: 'omoda-5',
  category: 'suv',
  price: 389000000, // Update with real price
  image: '/images/vehicles/omoda-5.jpg', // Update path
  // ... update other fields
}
```

### Step 3: Update Contact Info
**File:** `src/app/contact/page.tsx`

```typescript
// Line ~60
<a href="tel:+622112345678" className="...">
  +62 21 1234 5678 // Replace with real number
</a>
```

### Step 4: Update Branch Info
**Files:** 
- `src/app/cibubur/page.tsx`
- `src/app/makassar/page.tsx`
- `src/app/pare-pare/page.tsx`

Update:
- Address
- Phone
- Email
- Operating hours
- Google Maps link

### Step 5: Update Testimonials
**File:** `src/app/page.tsx`

```typescript
{
  name: 'Budi Santoso', // Real customer name
  location: 'Jakarta', // Real location
  car: 'Tiggo 7 Pro', // Real model
  text: 'The best decision...', // Real testimonial
  rating: 5,
}
```

### Step 6: Update News
**File:** `src/app/news/page.tsx`

```typescript
{
  title: 'Real news title',
  excerpt: 'Real news excerpt...',
  date: '15 Juni 2026',
  category: 'Press Release',
  author: 'Chery Indonesia',
  readTime: '3 min',
}
```

### Step 7: Update Promotions
**File:** `src/app/promotions/page.tsx`

```typescript
{
  title: 'Real Promo Title',
  subtitle: 'Real Subtitle',
  description: 'Real description...',
  validUntil: '30 Juni 2026',
  terms: 'Real terms & conditions',
}
```

---

## ✅ CHECKLIST

### Before Launch:
- [ ] All vehicle images added (6 models)
- [ ] All branch photos added (3 locations)
- [ ] Phone numbers updated (4 locations)
- [ ] Email addresses updated (4 locations)
- [ ] Addresses updated (3 branches)
- [ ] Google Maps links updated (3 branches)
- [ ] WhatsApp number updated
- [ ] Testimonials replaced with real ones (3)
- [ ] News articles replaced with real ones (6)
- [ ] Promotions replaced with real ones (6)
- [ ] Service centers updated (3)
- [ ] OG image added (1200x630)
- [ ] Favicon added
- [ ] Prices updated in `vehicles.ts`

### After Launch:
- [ ] Test all CTAs
- [ ] Test contact form
- [ ] Test phone links
- [ ] Test WhatsApp links
- [ ] Test Google Maps links
- [ ] Check all images load correctly
- [ ] Check mobile responsiveness

---

## 📞 CONTACT

Untuk pertanyaan tentang placeholder:
- Email: info@chery.co.id
- Phone: +62 21 1234 5678

---

**Last Updated:** June 2026
**Version:** 1.0