import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Users, Star, Truck, Shield, Headphones } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-pink-600" />,
      title: "Trend Koleksiyonlar",
      description: "Her sezon en yeni moda trendlerini keşfedin",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Kişisel Stil Danışmanlığı",
      description: "Size özel stil önerileri ve kombinler",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Hızlı Teslimat",
      description: "Aynı gün kargo, ücretsiz iade imkanı",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Güvenli Alışveriş",
      description: "256-bit SSL şifreleme ile güvenli ödeme",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Kadın Trençkot",
      price: 899,
      originalPrice: 1299,
      image: "/images/products/trenchcoat.jpg",
      category: "Giyim",
      brand: "NeoStyle",
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 45999,
      originalPrice: null,
      image: "/images/products/iphone.jpg",
      category: "Elektronik",
      brand: "Apple",
    },
    {
      id: 3,
      name: "Nike Air Max",
      price: 2499,
      originalPrice: 2999,
      image: "/images/products/nike-shoes.jpg",
      category: "Spor",
      brand: "Nike",
    },
    {
      id: 4,
      name: "Erkek Polo T-Shirt",
      price: 199,
      originalPrice: null,
      image: "/images/products/polo-shirt.jpg",
      category: "Giyim",
      brand: "SportLine",
    },
    {
      id: 5,
      name: "MacBook Air M2",
      price: 32999,
      originalPrice: 35999,
      image: "/images/products/macbook.jpg",
      category: "Elektronik",
      brand: "Apple",
    },
    {
      id: 6,
      name: "Yoga Matı",
      price: 299,
      originalPrice: null,
      image: "/images/products/yoga-mat.jpg",
      category: "Spor",
      brand: "FitLife",
    },
    {
      id: 7,
      name: "Kadın Elbise",
      price: 449,
      originalPrice: 599,
      image: "/images/products/dress.jpg",
      category: "Giyim",
      brand: "ChicWear",
    },
    {
      id: 8,
      name: "Bluetooth Kulaklık",
      price: 899,
      originalPrice: 1199,
      image: "/images/products/headphones.jpg",
      category: "Elektronik",
      brand: "Sony",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm text-gray-600">9000'den fazla aktif mağaza</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Moda Dünyasına Hoş Geldiniz!</h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                En trend giyim ürünleri, en uygun fiyatlarla. Kadın, erkek ve çocuk koleksiyonlarımızı keşfedin!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" asChild>
                  <Link href="/products">Alışverişe Başla</Link>
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative">
                <Image
                  src="/images/hero-fashion.jpg"
                  alt="Fashion Hero"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">NeoShop Hakkında</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                <strong>NeoShop</strong>, modern giyim dünyasının en trend parçalarını sizlerle buluşturan yenilikçi bir
                e-ticaret platformudur. Projemiz, kullanıcı dostu arayüzü, güvenli alışveriş deneyimi ve geniş ürün
                yelpazesi ile moda severlerin vazgeçilmez adresi olmayı hedeflemektedir.
              </p>
              <p className="mb-4">
                Kadın, erkek ve çocuk kategorilerinde binlerce ürün seçeneği sunan platformumuz, kullanıcı yönetimi, rol
                tabanlı erişim kontrolü ve gelişmiş mesajlaşma sistemi gibi modern web teknolojileri ile
                desteklenmektedir.
              </p>
              <p>
                Next.js, Prisma ORM ve Tailwind CSS teknolojileri kullanılarak geliştirilen NeoShop, hem kullanıcılar
                hem de yöneticiler için optimize edilmiş bir deneyim sunmaktadır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Neden NeoShop?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Size en iyi alışveriş deneyimini sunmak için buradayız
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600">Tüm kategorilerden en popüler ürünlerimizi keşfedin</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority={true}
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-600">{product.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-blue-600">₺{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₺{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button size="sm">Sepete Ekle</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">Tüm Ürünleri Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">6 Ay Kargo Bizden</h2>
          <p className="text-xl text-blue-100 mb-8">₺60.000'ye kadar ilk 6 ay kargonuz bizden</p>
          <Button size="lg" variant="secondary" className="px-8 py-3" asChild>
            <Link href="/products">Alışverişe Başla</Link>
          </Button>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">Google</span>
              <span className="text-sm">4,8 / 5</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Şikayetvar</span>
              <span className="text-sm">96 / 100</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
              <span className="font-semibold">Capterra</span>
              <span className="text-sm">4,7 / 5</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">Trustpilot</span>
              <span className="text-sm">4,8 / 5</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
