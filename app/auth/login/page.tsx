"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ShoppingCart, Package } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submit çalıştı')
    setIsLoading(true)

    try {
      console.log('API isteği gönderiliyor...')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      console.log('API yanıtı alındı:', response.status)
      const data = await response.json()
      console.log('API data:', data)

      if (response.ok) {
        toast.success('Giriş başarılı!')
        router.push('/')
        router.refresh()
      } else {
        toast.error(data.error || 'Giriş başarısız')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleButtonClick = () => {
    console.log('Button tıklandı')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
              <ShoppingCart className="w-32 h-32 mx-auto text-orange-500 mb-4" />
              <div className="flex justify-center space-x-4 mb-6">
                <div className="w-12 h-8 bg-orange-400 rounded transform rotate-12"></div>
                <div className="w-12 h-8 bg-blue-400 rounded transform -rotate-12"></div>
                <div className="w-12 h-8 bg-green-400 rounded transform rotate-6"></div>
              </div>
              <div className="flex justify-center space-x-2">
                <Package className="w-6 h-6 text-orange-500" />
                <Package className="w-6 h-6 text-blue-500" />
                <Package className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">eS</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Tekrar Hoş Geldiniz!</CardTitle>
              <CardDescription className="text-gray-600">Hesabınıza giriş yapın</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Şifre
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 pr-10"
                      required
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Beni Hatırla
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Şifremi Unuttum?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleButtonClick}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-medium"
                >
                  {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </button>
              </form>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Hesabınız yok mu?{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Kayıt Ol
                  </Link>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
