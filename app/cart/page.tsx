"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/CartContext"
import { toast } from "sonner"

export default function CartPage() {
  const { state: cartState, removeItem, updateQuantity, clearCart } = useCart()

  const handleRemoveItem = (id: number) => {
    removeItem(id)
    toast.success('Ürün sepetten kaldırıldı')
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleCheckout = () => {
    if (cartState.items.length === 0) {
      toast.error('Sepetiniz boş')
      return
    }
    // Checkout sayfasına yönlendir
    window.location.href = '/checkout'
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-8">
              Alışverişe başlamak için ürünlerimizi keşfedin
            </p>
            <Button size="lg" asChild>
              <Link href="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Alışverişe Başla
              </Link>
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-pink-600">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-gray-900">Sepetim</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sepetim</h1>
            <p className="text-gray-600">
              {cartState.itemCount} ürün • Toplam: ₺{cartState.total.toLocaleString()}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Sepet Ürünleri</CardTitle>
                    <Button variant="outline" size="sm" onClick={clearCart}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Sepeti Temizle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartState.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600">₺{item.price.toLocaleString()}</p>
                          {item.size && (
                            <Badge variant="outline" className="text-xs mt-1">
                              Beden: {item.size}
                            </Badge>
                          )}
                          {item.color && (
                            <Badge variant="outline" className="text-xs mt-1 ml-1">
                              Renk: {item.color}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₺{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ara Toplam</span>
                      <span className="font-medium">₺{cartState.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kargo</span>
                      <span className="text-green-600 font-medium">Ücretsiz</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam</span>
                      <span>₺{cartState.total.toLocaleString()}</span>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      asChild
                    >
                      <Link href={cartState.items.length === 0 ? "#" : "/checkout"} tabIndex={cartState.items.length === 0 ? -1 : 0} aria-disabled={cartState.items.length === 0}>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Ödemeye Geç
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/products">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Alışverişe Devam Et
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 