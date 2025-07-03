"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Phone, ShoppingCart, User, Zap, MessageCircle, LogOut } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ id: number; name: string; email: string; role: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { state: cartState } = useCart()

  useEffect(() => {
    // Check if user is logged in by looking for session cookie
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-800 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>🎉 Yeni Sezon Koleksiyonu %50'ye Varan İndirimlerle!</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>0850 255 18 39</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Sizi Arayalım</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-pink-600" />
              <span className="text-2xl font-bold text-gray-900">neoshop</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Giyim</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link href="/giyim/kadin" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Kadın Giyim</div>
                          <div className="text-sm text-gray-500">Elbise, bluz, pantolon, etek</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/giyim/erkek" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Erkek Giyim</div>
                          <div className="text-sm text-gray-500">Gömlek, pantolon, ceket, t-shirt</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/giyim/cocuk" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Çocuk Giyim</div>
                          <div className="text-sm text-gray-500">Kız ve erkek çocuk kıyafetleri</div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Elektronik</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link href="/elektronik/telefon" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Telefon & Tablet</div>
                          <div className="text-sm text-gray-500">iPhone, Samsung, iPad</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/elektronik/bilgisayar" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Bilgisayar</div>
                          <div className="text-sm text-gray-500">Laptop, masaüstü, aksesuar</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/elektronik/ses" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Ses & Görüntü</div>
                          <div className="text-sm text-gray-500">Kulaklık, hoparlör, TV</div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Spor</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link href="/spor/ayakkabi" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Spor Ayakkabı</div>
                          <div className="text-sm text-gray-500">Koşu, basketbol, fitness</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/spor/giyim" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Spor Giyim</div>
                          <div className="text-sm text-gray-500">Eşofman, t-shirt, şort</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/spor/ekipman" className="block p-3 rounded-md hover:bg-gray-50">
                          <div className="font-medium">Spor Ekipmanları</div>
                          <div className="text-sm text-gray-500">Fitness, yoga, outdoor</div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/ev-yasam" className="px-4 py-2 hover:text-pink-600">
                      Ev & Yaşam
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/aksesuar" className="px-4 py-2 hover:text-pink-600">
                      Aksesuar
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/sale" className="px-4 py-2 hover:text-red-600 text-red-600 font-medium">
                      İndirim
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden lg:flex" asChild>
                <Link href="/messages">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mesajlar
                </Link>
              </Button>

              {user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/profile">
                      <User className="w-4 h-4 mr-2" />
                      {user.name}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="hidden lg:flex" asChild>
                  <Link href="/auth/login">
                    <User className="w-4 h-4 mr-2" />
                    Giriş Yap
                  </Link>
                </Button>
              )}

              <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white hidden lg:flex" asChild>
                <Link href="/products">Alışverişe Başla</Link>
              </Button>

              <Button variant="ghost" size="sm" asChild>
                <Link href="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  {cartState.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartState.itemCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetTitle className="sr-only">Menü</SheetTitle>
                  <div className="flex flex-col gap-4 mt-8">
                    <Link href="/giyim" className="text-lg font-medium py-2">
                      Giyim
                    </Link>
                    <Link href="/elektronik" className="text-lg font-medium py-2">
                      Elektronik
                    </Link>
                    <Link href="/spor" className="text-lg font-medium py-2">
                      Spor
                    </Link>
                    <Link href="/ev-yasam" className="text-lg font-medium py-2">
                      Ev & Yaşam
                    </Link>
                    <Link href="/aksesuar" className="text-lg font-medium py-2">
                      Aksesuar
                    </Link>
                    <Link href="/sale" className="text-lg font-medium py-2 text-red-600">
                      İndirim
                    </Link>
                    <div className="border-t pt-4 mt-4">
                      <Button variant="ghost" className="w-full justify-start mb-2" asChild>
                        <Link href="/messages">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Mesajlar
                        </Link>
                      </Button>
                      {user ? (
                        <>
                          <Button variant="ghost" className="w-full justify-start mb-2" asChild>
                            <Link href="/profile">
                              <User className="w-4 h-4 mr-2" />
                              {user.name}
                            </Link>
                          </Button>
                          <Button variant="ghost" className="w-full justify-start mb-2" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Çıkış
                          </Button>
                        </>
                      ) : (
                        <Button variant="ghost" className="w-full justify-start mb-2" asChild>
                          <Link href="/auth/login">
                            <User className="w-4 h-4 mr-2" />
                            Giriş Yap
                          </Link>
                        </Button>
                      )}
                      <Button className="w-full bg-gray-900 hover:bg-gray-800" asChild>
                        <Link href="/products">Alışverişe Başla</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
