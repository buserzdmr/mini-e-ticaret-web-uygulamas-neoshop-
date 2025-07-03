"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid, List, Star, Heart, Truck, RotateCcw, Shield } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/CartContext"
import { toast } from "sonner"

export default function ProductsPage() {
  const { addItem } = useCart()
  
  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(`${product.name} sepete eklendi`)
  }

  const products = [
    {
      id: 1,
      name: "Kadın Trençkot",
      price: 899,
      originalPrice: 1299,
      image: "/images/products/trenchcoat.jpg",
      category: "Giyim",
      brand: "NeoStyle",
      rating: 4.5,
      reviews: 128,
      discount: 31,
      isNew: false,
      isFavorite: false,
      colors: ["Bej", "Siyah", "Lacivert"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 45999,
      originalPrice: null,
      image: "/images/products/iphone.jpg",
      category: "Elektronik",
      brand: "Apple",
      rating: 4.8,
      reviews: 89,
      discount: 0,
      isNew: true,
      isFavorite: true,
      colors: ["Mavi", "Siyah"],
      sizes: ["128GB", "256GB", "512GB", "1TB"],
    },
    {
      id: 3,
      name: "Nike Air Max",
      price: 2499,
      originalPrice: 2999,
      image: "/images/products/nike-shoes.jpg",
      category: "Spor",
      brand: "Nike",
      rating: 4.3,
      reviews: 256,
      discount: 17,
      isNew: false,
      isFavorite: false,
      colors: ["Kırmızı", "Siyah", "Beyaz"],
      sizes: ["40", "41", "42", "43"],
    },
    {
      id: 4,
      name: "Erkek Polo T-Shirt",
      price: 199,
      originalPrice: null,
      image: "/images/products/polo-shirt.jpg",
      category: "Giyim",
      brand: "SportLine",
      rating: 4.7,
      reviews: 45,
      discount: 0,
      isNew: false,
      isFavorite: true,
      colors: ["Beyaz", "Lacivert", "Gri"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 5,
      name: "MacBook Air M2",
      price: 32999,
      originalPrice: 35999,
      image: "/images/products/macbook.jpg",
      category: "Elektronik",
      brand: "Apple",
      rating: 4.4,
      reviews: 167,
      discount: 8,
      isNew: false,
      isFavorite: false,
      colors: ["Gümüş", "Uzay Grisi", "Altın"],
      sizes: ["256GB", "512GB", "1TB"],
    },
    {
      id: 6,
      name: "Yoga Matı",
      price: 299,
      originalPrice: null,
      image: "/images/products/yoga-mat.jpg",
      category: "Spor",
      brand: "FitLife",
      rating: 4.6,
      reviews: 203,
      discount: 0,
      isNew: true,
      isFavorite: false,
      colors: ["Mor", "Mavi", "Pembe"],
      sizes: ["Standart"],
    },
    {
      id: 7,
      name: "Kadın Elbise",
      price: 449,
      originalPrice: 599,
      image: "/images/products/dress.jpg",
      category: "Giyim",
      brand: "ChicWear",
      rating: 4.2,
      reviews: 89,
      discount: 25,
      isNew: false,
      isFavorite: false,
      colors: ["Siyah", "Lacivert", "Bordo"],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      id: 8,
      name: "Bluetooth Kulaklık",
      price: 899,
      originalPrice: 1199,
      image: "/images/products/headphones.jpg",
      category: "Elektronik",
      brand: "Sony",
      rating: 4.5,
      reviews: 312,
      discount: 25,
      isNew: false,
      isFavorite: true,
      colors: ["Siyah", "Beyaz", "Gümüş"],
      sizes: ["Standart"],
    },
  ]

  const categories = ["Tümü", "Giyim", "Elektronik", "Spor", "Ev & Yaşam", "Aksesuar"]
  const brands = ["Tümü", "NeoStyle", "Apple", "Nike", "SportLine", "ChicWear", "Sony", "FitLife"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-pink-600">
            Ana Sayfa
          </a>
          <span>/</span>
          <span className="text-gray-900">Ürünler</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tüm Ürünler</h1>
          <p className="text-gray-600">En trend moda parçalarını keşfedin</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input placeholder="Ürün, marka veya kategori ara..." className="pl-10" />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="all-brands">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Marka" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">En Yeni</SelectItem>
                  <SelectItem value="price-low">Fiyat (Düşük-Yüksek)</SelectItem>
                  <SelectItem value="price-high">Fiyat (Yüksek-Düşük)</SelectItem>
                  <SelectItem value="rating">En Çok Beğenilen</SelectItem>
                  <SelectItem value="discount">En Çok İndirimli</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
              <div className="flex border rounded-md">
                <Button variant="ghost" size="sm" className="border-r">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={true}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white font-medium">YENİ</Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white font-medium">
                      %{product.discount} İNDİRİM
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm ${
                    product.isFavorite
                      ? "bg-red-100/90 text-red-500 hover:bg-red-200/90"
                      : "bg-white/90 text-gray-600 hover:bg-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${product.isFavorite ? "fill-current" : ""}`} />
                </Button>

                {/* Quick Actions */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium"
                    onClick={() => handleAddToCart(product)}
                  >
                    Sepete Ekle
                  </Button>
                </div>

                {/* Quick View */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-5">
                  <Button variant="secondary" size="sm" className="backdrop-blur-sm">
                    Hızlı Görüntüle
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">Ücretsiz Kargo</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>

                {/* Colors */}
                <div className="flex items-center gap-1 mb-2">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{
                        backgroundColor:
                          color === "Siyah"
                            ? "#000"
                            : color === "Beyaz"
                              ? "#fff"
                              : color === "Kırmızı"
                                ? "#ef4444"
                                : color === "Mavi"
                                  ? "#3b82f6"
                                  : color === "Lacivert"
                                    ? "#1e3a8a"
                                    : color === "Bej"
                                      ? "#d4b896"
                                      : color === "Gri"
                                        ? "#6b7280"
                                        : color === "Haki"
                                          ? "#84cc16"
                                          : color === "Mor"
                                            ? "#8b5cf6"
                                            : color === "Pembe"
                                              ? "#ec4899"
                                              : color === "Bordo"
                                                ? "#991b1b"
                                                : color === "Gümüş"
                                                  ? "#d1d5db"
                                                  : color === "Altın"
                                                    ? "#fbbf24"
                                                    : "#e5e7eb",
                      }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">₺{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₺{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <RotateCcw className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-600">30 Gün İade</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium"
                  onClick={() => handleAddToCart(product)}
                >
                  Sepete Ekle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Daha Fazla Ürün Yükle
          </Button>
        </div>

        {/* Features Banner */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-12 h-12 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Ücretsiz Kargo</h3>
              <p className="text-sm text-gray-600">150₺ ve üzeri alışverişlerde</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-12 h-12 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Kolay İade</h3>
              <p className="text-sm text-gray-600">30 gün içinde ücretsiz iade</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Güvenli Alışveriş</h3>
              <p className="text-sm text-gray-600">SSL sertifikası ile korumalı</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
