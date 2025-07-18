# 🛒 NeoShop - Modern E-Ticaret Platformu

## 📌 Proje Hakkında

**NeoShop**, kullanıcı dostu arayüzü, güvenli alışveriş deneyimi ve kapsamlı ürün yönetimiyle öne çıkan modern bir e-ticaret platformudur. Kullanıcılar arası mesajlaşma, rol tabanlı erişim, admin paneli, sepet ve sipariş yönetimi gibi tüm temel e-ticaret işlevlerini içerir. Proje, İnternet Programcılığı II dersi kapsamında geliştirilmiştir.

## 🚀 Kullanılan Teknolojiler

- **Next.js** (Fullstack React Framework)
- **Prisma ORM** (Veritabanı işlemleri)
- **SQLite** (Geliştirme için dosya tabanlı veritabanı)
- **TailwindCSS** (Modern ve responsive tasarım)
- **NextAuth.js** (Kimlik doğrulama)
- **TypeScript** (Tip güvenliği)
- **React Context API** (Global state/sepet yönetimi)

## ⚙️ Temel Özellikler

- Kullanıcı kayıt ve giriş sistemi
- Rol tabanlı erişim (Kullanıcı & Admin)
- Ürün listeleme ve detay sayfaları
- Sepete ürün ekleme/çıkarma
- Gerçek sipariş oluşturma ve sipariş geçmişi
- Kullanıcılar arası mesajlaşma (API ve arayüz)
- Admin paneli ile ürün ve sipariş yönetimi
- Erişilebilir ve modern arayüz
- LCP (Largest Contentful Paint) optimizasyonları

## 📦 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için:

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/kullanici-adi/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   # veya
   pnpm install
   ```

3. **Veritabanını hazırlayın:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   # veya
   pnpm dev
   ```

5. **Uygulamayı açın:**
   - [http://localhost:3000](http://localhost:3000)

## 👤 Kullanıcı Rolleri

- **Kullanıcı:** Ürünleri görüntüleyebilir, sepete ekleyebilir, sipariş verebilir, mesaj gönderebilir.
- **Admin:** Ürün ve sipariş yönetimi yapabilir, tüm kullanıcıların sipariş ve mesajlarını görebilir.

## 📂 Önemli Dosya ve Klasörler

- `app/` : Next.js sayfaları ve API route'ları
- `components/` : UI bileşenleri
- `lib/` : Yardımcı fonksiyonlar ve Prisma ayarları
- `prisma/` : Veritabanı şeması ve seed dosyası
- `public/` : Statik dosyalar ve görseller

## 📝 Notlar

- Tüm formlarda erişilebilirlik için `id`, `name` ve `autocomplete` özellikleri eksiksizdir.
- LCP uyarılarını önlemek için ana ürün görsellerine `priority` özelliği atanmıştır.
- Sepet ve ödeme akışı Next.js Link ve form submit ile optimize edilmiştir.
- Mesajlaşma ve sipariş API'leri gerçek verilerle çalışmaktadır.


## 📫 Katkı ve İletişim

Geliştirmeye katkı sağlamak veya sorun bildirmek için lütfen GitHub Issues bölümünü kullanın.
https://github.com/buserzdmr/mini-e-ticaret-web-uygulamas-neoshop-/tree/main

---

 
