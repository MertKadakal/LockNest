
---

## **EcoStyle - Kapsamlı Depo Özeti**

### 📋 **Depo Metaveri**

| Özellik | Değer |
|----------|-------|
| **Sahibi** | MertKadakal (Bireysel Geliştirici) |
| **Depo Adı** | EcoStyle |
| **Oluşturulma Tarihi** | 11 Nisan 2026 |
| **Görünürlük** | Herkese Açık |
| **Depo Boyutu** | 14.063 KB (~14 MB) |

---

### 💻 **Teknoloji Yığını - Detaylı Dökümü**

**Dil Bileşimi (bayt cinsinden):**
```
JavaScript:  89.030 bayt (%69,9)
CSS:         32.508 bayt (%25,5)
Swift:        3.762 bayt (%3)
HTML:           802 bayt (%0,6)
Java:         1.298 bayt (%1)
```

**Temel Bağımlılıklar:**
- **Ön Uç Çerçevesi:** React 19.2.4 ve React DOM
- **Derleme Aracı:** Vite 8.0.4 ve React eklenti desteği
- **Durum Yönetimi:** React Context API (yerleşik, Redux/Zustand gerekmez)
- **Arka Uç/Veritabanı:** Firebase 12.12.0 (Firestore & Kimlik Doğrulaması)
- **Arka Uç Sunucusu:** Node.js ve Express.js 5.2.1
- **E-posta Hizmeti:** EmailJS 4.4.1 (iletişim/bildirim e-postaları için)
- **Mobil Çerçevesi:** Capacitor 8.3.0 (iOS & Android desteği) + Expo 55.0.13
- **Kullanıcı Arayüzü Bildirileri:** SweetAlert2 11.26.24
- **Sunucu Araçları:** CORS 2.8.6 (köken arası istekler için)

**Geliştirme Araçları:**
- ESLint 9.39.4 kod kalitesi için
- React hook'ları ve yenileme desenleri için ESLint eklentileri
- React/React DOM için tür tanımları
- Optimize edilmiş üretim derlemeleri için Vite derleme konfigürasyonu

---

### 📁 **Proje Yapısı**

**Kök Dizinleri:**
- `.expo/` - Expo konfigürasyon metaveri (sürüm kontrolünden hariç)
- `.github/` - GitHub'a özgü konfigürasyon (iş akışları, şablonlar)
- `android/` - Android platform dosyaları (Capacitor entegrasyonu)
- `ios/` - iOS platform dosyaları (Capacitor/SPM bağımlılıkları)
- `src/` - Ana kaynak kod dizini
- `public/` - İstemciye sunulan statik varlıklar
- `assets/` - Ek varlıklar (görseller, simgeler, vb.)
- `icons/` - Uygulama simge dosyaları

**Kök Konfigürasyon Dosyaları:**
- `package.json` - Node.js bağımlılıkları ve betikleri
- `package-lock.json` - 548 KB kilitli bağımlılık sürümleri
- `vite.config.js` - Vite derleme konfigürasyonu
- `capacitor.config.json` - Capacitor uygulama konfigürasyonu
- `eslint.config.js` - ESLint kuralları (758 bayt)
- `.gitignore` - Git hariç tutma kuralları (253 bayt)
- `index.html` - Tek sayfalık uygulama giriş noktası (802 bayt)

---

### 🔧 **Derleme ve Çalışma Zamanı Konfigürasyonu**

**NPM Betikleri:**
```json
{
  "dev": "vite",                           // Yerel geliştirme sunucusu
  "build": "vite build",                   // Üretim derlemesi
  "lint": "eslint .",                      // Kod kalitesi kontrolü
  "preview": "vite preview",               // Üretim derlemesini önizle
  "cap:build": "vite build && npx cap sync", // Mobil derleme ve senkronizasyon
  "cap:ios": "npx cap open ios",          // iOS projesini aç
  "cap:android": "npx cap open android",  // Android projesini aç
  "start": "node server/sunucu.js"        // Node.js sunucusunu başlat
}
```

**Vite Konfigürasyonu:**
- React eklentisi JSX dönüşümü için etkinleştirildi
- Temel yol `/EcoStyle/` (GitHub Pages dağıtımı için)
- ES modülleri desteği

---

### 📱 **Temel Özellikler - Teknik Uygulama**

**Kullanıcı Paneli Özellikleri:**
- **Kimlik Doğrulaması:** Firebase Auth güvenli kimlik bilgisi yönetimi
- **Gerçek Zamanlı Kiralama Takibi:** Kiralama süresi ve birikmiş ücretleri gösteren canlı sayaç bileşeni
- **Konum Tabanlı Seçim:** Firestore'dan kullanılabilir çantaları alan dinamik konum seçici
- **Dinamik Fiyatlandırma:** Otomatik hesaplama motoru (dakika başına ₺15) otomatik güncelleme mantığı ile
- **Dijital Cüzdan:** Firestore destekli bakiye sistemi kiralama tamamlanmasında otomatik kesinti ile

**Yönetici Paneli Özellikleri:**
- **Gerçek Zamanlı Kontrol Paneli:** Etkin, gecikmiş ve beklemede olan kiralamaları gösteren Firestore sorguları
- **Kullanıcı Yönetimi:** Kullanıcı hesapları ve bakiye değişiklikleri için CRUD işlemleri
- **Envanter Sistemi:** Firestore belge oluşturma ile çanta ve konum yönetimi
- **Gelişmiş Filtreleme:** Tarih aralığı tabanlı kiralama geçmişi sorguları
- **Gelir Raporlaması:** Toplam gelir hesaplamaları ve analitiği

---

### 🔄 **Geliştirme Faaliyeti ve Commit Geçmişi**

**Commit Desenleri:**
- Çoğu commit MertKadakal (mert.kadakal1629@gmail.com) tarafından yazıldı
- 14-17 Nisan tarihlerinde yüksek aktivite (özellik düzeltmeleri ve entegrasyon)
- Odak alanları: Sayaç/fiyatlandırma mantığı, EmailJS entegrasyonu, ön uç iyileştirmeleri, yönetici paneli düzeltmeleri
- Kütük hatalarının çözüldüğünü gösteren "counter fixed" commit'leri ile son stabilizasyon fazı

**Not:** Daha fazla commit mevcuttur. [GitHub'da tam commit geçmişini görüntüle](https://github.com/MertKadakal/EcoStyle/commits/main)

---

### ⚙️ **Derleme ve Dağıtım Konfigürasyonu**

**Capacitor Kurulumu:**
- Platform desteği: iOS ve Android
- React web uygulamasının yerel mobil uygulamalar olarak çalışmasını sağlar
- Capacitor konfigürasyon dosyası uygulama metaveri ve izinlerini yönetir

**GitHub Pages Desteği:**
- Depo GitHub Pages'in etkin (`has_pages: true`)
- Vite, GitHub Pages yönlendirmesi için `/EcoStyle/` temel yolu ile yapılandırıldı
- `npm run build` aracılığıyla statik site üretimi hazır

**Sunucu Konfigürasyonu:**
- Node.js Express sunucusu `server/sunucu.js` adresinde kullanılabilir
- Köken arası API istekleri için CORS etkinleştirildi
- Üretim sunucusu `npm start` ile başlatılabilir

---

### 📊 **Depo İstatistikleri**

- **Toplam Depo Boyutu:** 14 MB
- **Ana Bağımlılık Boyutu:** Yalnızca package-lock.json 548 KB
- **Belgeleme:** README.md (3.150 bayt)
- **Konfigürasyon Dosyaları:** Çoklu (ESLint, Capacitor, Vite, .gitignore)

---

### 📝 **Dikkate Değer Proje Özellikleri**

1. **İki Dilli Belgeleme:** Kod yorumları ve commit'leri Türkçe ve İngilizcedir, Türk geliştiriciyi gösterir
2. **Çoklu Platform Odağı:** Capacitor aracılığıyla Web (React/Vite), iOS (Swift), Android (Java) desteği
3. **Arka Uç Entegrasyonu:** Sunucu tarafı Express bileşeni gerçek API arka ucunu önerir
4. **E-posta Bildirimleri:** Kullanıcı iletişimi için EmailJS entegrasyonu
5. **Yakın Zamanlı Aktif Geliştirme:** Son 6 gündeki çoğu commit etkin devam eden çalışmayı gösterir
6. **Hata Düzeltme Fazı:** Son "counter fixed" commit'leri hata ayıklama ve stabilizasyon fazını gösterir
7. **Önceki Özellik Kaldırma:** QR kod işlevi kaldırıldı (16 Nisan), özellik iterasyonunu gösterir

---

### 🚀 **Geliştirme Hızı**

- **Commit Sıklığı:** 15 gün içinde ~30 commit (~günde 2 commit)
- **Etkin Günler:** 12-17 Nisan en yüksek aktiviteyi gösterir
- **Geliştirme Durumu:** Son zamanlarda stabilite ve düzeltmelere odaklanan aktif devam eden geliştirme

Bu, ön uç, arka uç, mobil platformlar ve bulut hizmetleri entegrasyonunu kapsayan tam bir teknoloji yığınına sahip etkin geliştirilen, modern bir web/mobil hibrit uygulamadır.
