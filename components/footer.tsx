import Link from "next/link"
import { Zap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const footerSections = [
    {
      title: "Kategoriler",
      links: [
        { name: "Kadın Giyim", href: "/kadin" },
        { name: "Erkek Giyim", href: "/erkek" },
        { name: "Çocuk Giyim", href: "/cocuk" },
        { name: "Ayakkabı", href: "/ayakkabi" },
        { name: "Çanta", href: "/canta" },
        { name: "Aksesuar", href: "/aksesuar" },
        { name: "İç Giyim", href: "/ic-giyim" },
        { name: "Spor Giyim", href: "/spor" },
      ],
    },
    {
      title: "Markalar",
      links: [
        { name: "NeoStyle", href: "/marka/neostyle" },
        { name: "UrbanFit", href: "/marka/urbanfit" },
        { name: "ChicWear", href: "/marka/chicwear" },
        { name: "SportLine", href: "/marka/sportline" },
        { name: "ElegantLook", href: "/marka/elegantlook" },
        { name: "CasualWear", href: "/marka/casualwear" },
      ],
    },
    {
      title: "Müşteri Hizmetleri",
      links: [
        { name: "Sipariş Takibi", href: "/siparis-takip" },
        { name: "İade ve Değişim", href: "/iade-degisim" },
        { name: "Beden Rehberi", href: "/beden-rehberi" },
        { name: "Kargo Bilgileri", href: "/kargo" },
        { name: "Ödeme Seçenekleri", href: "/odeme" },
        { name: "SSS", href: "/sss" },
      ],
    },
    {
      title: "Kurumsal",
      links: [
        { name: "Hakkımızda", href: "/hakkimizda" },
        { name: "Kariyer", href: "/kariyer" },
        { name: "Basın", href: "/basin" },
        { name: "İletişim", href: "/iletisim" },
        { name: "Mağazalarımız", href: "/magazalar" },
        { name: "Franchise", href: "/franchise" },
      ],
    },
    {
      title: "Sosyal Medya",
      links: [
        { name: "Instagram", href: "/instagram" },
        { name: "Facebook", href: "/facebook" },
        { name: "Twitter", href: "/twitter" },
        { name: "Pinterest", href: "/pinterest" },
        { name: "YouTube", href: "/youtube" },
        { name: "TikTok", href: "/tiktok", badge: "YENİ" },
      ],
    },
  ]

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12 pb-8 border-b">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">Google</span>
            <span>4,8 / 5</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">Şikayetvar</span>
            <span>96 / 100</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">Capterra</span>
            <span>4,7 / 5</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">Trustpilot</span>
            <span>4,8 / 5</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2"
                    >
                      {link.name}
                      {link.badge && (
                        <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">{link.badge}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Zap className="w-6 h-6 text-pink-600" />
            <span className="text-xl font-bold text-gray-900">neoshop</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">© 2025 ekas. Tüm hakları saklıdır.</div>
      </div>
    </footer>
  )
}
