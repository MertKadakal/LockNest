# 🌱 LockNest - Doğa Dostu Çanta Kiralama Sistemi

LockNest, çevre bilincini artırmak ve plastik poşet kullanımını azaltmak amacıyla geliştirilmiş, lokasyon bazlı, gerçek zamanlı bir doğa dostu çanta kiralama ve yönetim platformudur. Sistem; son kullanıcılar (müşteriler), operasyon yöneticileri (admin) ve üst düzey yöneticiler (manager) için özel olarak tasarlanmış üç farklı arayüzden oluşmaktadır.

---

## 🚀 Projenin Amacı ve Vizyonu
Kullanıcıların belirli lokasyonlardan doğa dostu, dayanıklı bez çantaları kiralayabilmesini sağlayan uçtan uca bir sistemdir. Kullanıcılar çantayı kiraladıkları süre boyunca ücretlendirilir, dijital cüzdanları üzerinden ödeme yapar ve çantayı teslim ettiklerinde süreç tamamlanır. Bu döngü sayesinde çevreye duyarlı bir tüketim alışkanlığı teşvik edilmektedir.

---

## 📱 Temel Özellikler ve Kullanıcı Rolleri

Sistemde **3 farklı rol** bulunmaktadır ve her rolün kendine ait bir arayüzü vardır:

### 1. 👤 Son Kullanıcı (Müşteri) Uygulaması
Mobil odaklı (Capacitor ile iOS/Android uyumlu) tasarlanmıştır.
* **Kayıt/Giriş Sistemi:** Firebase Auth destekli güvenli kullanıcı oturum yönetimi.
* **Lokasyon ve Çanta Görüntüleme:** Kullanıcılar harita/liste üzerinden aktif lokasyonları ve bu lokasyonlardaki müsait çantaları (kapasite, boyut, özellik vb.) görebilir.
* **Dijital Cüzdan:** Kiralama yapabilmek için kullanıcının bakiyesinin pozitif olması gerekir. Ücretler cüzdandan otomatik düşülür.
* **Canlı Kiralama Takibi:** Kiralama başlatıldığında, aktif süre ve güncel ücreti saniye saniye gösteren canlı bir zamanlayıcı devreye girer.
* **Teslimat ve İade İşlemi:** Kullanıcı uygulamadan iade talebi oluşturur ve işlem yöneticinin onayına düşer.

### 2. 🛡️ Admin Paneli (Operasyon Yönetimi)
`admin@beykoz.com` adresiyle giriş yapıldığında erişilen, sahadaki operasyonun yönetildiği kapsamlı masaüstü/web paneli.
* **Canlı Operasyon Kontrol Paneli:** Aktif, teslim bekleyen ve gecikmiş (2 saati aşan) kiralamaların anlık takibi.
* **Kiralama Onay/İptal İşlemleri:** Kullanıcının iade ettiği çantaları onaylama veya sorunlu kiralamaları iptal etme.
* **Cezai İşlem Yönetimi:** Çantanın hasar görmesi durumunda tek tıkla kullanıcıya **500 TL Hasar Cezası (Fine)** kesme yetkisi.
* **Lokasyon ve Envanter Yönetimi:** Yeni şube/lokasyon ekleme ve bu lokasyonlara yeni çantalar (standart, yıkanabilir vb.) tanımlama.
* **Kullanıcı Yönetimi (CRM):** Sistemdeki kullanıcıları listeleme, bakiye durumlarını görme, kiralama geçmişlerini inceleme ve gerektiğinde kullanıcı silme.
* **Detaylı Raporlama:** Tarihe göre filtreleme, toplam gelir, ortalama kiralama süresi, yoğun saatler (Peak Hours) ve lokasyon bazlı gelir dağılımı grafikleri.

### 3. 📊 Yönetici (Manager) Paneli
`manager@locknest.com` adresiyle giriş yapıldığında erişilen (LockNest Paneli olarak da adlandırılır), üst düzey stratejik kararlar için tasarlanmış özet raporlama paneli.
* **Genel Bakış (Overview):** Toplam envanter kullanımı, aktif kiralama oranları ve ortalama kullanım süreleri.
* **Lokasyon Bazlı Performans:** Hangi lokasyonda kaç çanta var, doluluk oranı nedir, ne kadar gelir elde edilmiş? (Düşük stok durumunda uyarı verir).
* **CSV Dışa Aktarım:** Operasyon verilerini Excel/CSV formatında indirip dış sistemlerde analiz etme imkanı.
* **7 Günlük Trend Analizi:** Son bir hafta içindeki kiralama trendlerini gösteren mini grafikler (MiniBars).

---

## ⚙️ İş Mantığı ve Ücretlendirme (Business Logic)

* **Dinamik Fiyatlandırma:** Kiralama ücreti her **30 dakikada bir 15 TL** olarak hesaplanır (`Math.ceil(gecen_sure / 30 dk) * 15`). Süre canlı olarak işler.
* **Ön Şartlar:** Bakiye eksiye düştüğünde sistem yeni kiralamaya izin vermez.
* **Gecikme Kontrolü:** Kiralama 2 saati (`2 * 3600 sn`) aşarsa durumu otomatik olarak `overdue` (gecikmiş) statüsüne geçer.
* **Hasar Politikası:** İade sırasında çanta hasarlıysa normal kiralama ücretine ek olarak (veya yerine) `fines` koleksiyonuna **500 TL** tutarında bir ceza kaydı düşülür ve bakiye etkilenir.

---

## 💻 Kullanılan Teknolojiler (Tech Stack)

**Frontend:**
* **React 19 & Vite 8:** Yüksek performanslı, modern frontend mimarisi ve hızlı build aracı.
* **SweetAlert2:** Modern, kullanıcı dostu popup ve bildirim sistemi.
* **Vanilla CSS:** Özelleştirilmiş, modern ve duyarlı (responsive) UI/UX tasarımı.

**Backend & Database:**
* **Firebase (Firestore):** Gerçek zamanlı veritabanı. Kiralama sayacı, bakiye, envanter durumu anında tüm cihazlarda güncellenir.
* **Firebase Auth:** Güvenli kullanıcı kimlik doğrulama altyapısı (kredi kartı/bakiye güvenliği için kritik).
* **Node.js & Express (Opsiyonel API):** `server/sunucu.js` ile desteklenen, harici entegrasyonlar için hazır REST API altyapısı.

---

## 🗄️ Veritabanı Şeması (Firestore Collections)

Sistem NoSQL yapısında 5 temel koleksiyon üzerinden çalışır:
1. **`users`**: Kullanıcı profilleri, anlık bakiye (`balance`), kiralama geçmişleri ve yetki bilgileri.
2. **`locations`**: İstasyon/Şube bilgileri, adresleri ve anlık müsait çanta durumları.
3. **`bags`**: Çanta özellikleri (tip, boyut, kapasite), ait olduğu lokasyon (`locationId`) ve müsaitlik (`available`) durumu.
4. **`rentals`**: Başlangıç-bitiş zamanı, hesaplanan anlık ücret (`fee`), statü (`active`, `pending_return`, `completed`, `overdue`, `cancelled`), kiralayan kullanıcı ve çanta referansları.
5. **`fines`**: Hasar gören çantalar için oluşturulan mali ceza kayıtları (`amount: 500`).

---

## 🛠️ Kurulum ve Geliştirme Ortamı (Setup)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
* Node.js (v18 veya üzeri önerilir)
* npm veya yarn paket yöneticisi

### Adımlar

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/MertKadakal/EcoStyle.git
   cd EcoStyle
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme Sunucusunu Başlatın (Web):**
   ```bash
   npm run dev
   ```
   *Uygulama `http://localhost:5173` adresinde çalışacaktır.*

4. **Test Hesapları:**
   * **Admin:** `admin@beykoz.com` (Giriş yaparak Admin panelini test edebilirsiniz)
   * **Manager:** `manager@locknest.com` (Şifre: `manager123`)

---

## 🎨 Arayüzden Kareler

*Uygulamanın arayüzü, mobile-first mantığıyla "Phone Shell" içerisinde tasarlanmış olup, admin ve manager panelleri geniş ekran (Masaüstü) dashboard deneyimi sunar. UI'da doğayı temsil eden yeşil tonları (`var(--green-dark)`, `var(--green-accent)`) ağırlıklı olarak kullanılmıştır.*

---
**Geliştirici:** Mert Kadakal  
**Oluşturulma Tarihi:** Nisan 2026
