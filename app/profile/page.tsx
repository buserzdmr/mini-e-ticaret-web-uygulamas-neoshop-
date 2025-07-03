"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, MessageSquare, Settings, Camera, Save } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{
    id: number
    name: string
    email: string
    role: string
  } | null>(null)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    joinDate: "",
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
          
          // Kullanıcı adını ad ve soyad olarak ayır
          const nameParts = userData.user.name.split(' ')
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1).join(' ') || ''
          
          setProfileData({
            firstName,
            lastName,
            email: userData.user.email,
            phone: "",
            address: "",
            joinDate: "Yeni üye",
          })
        } else {
          // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [recentMessages, setRecentMessages] = useState<any[]>([])

  // Siparişleri getir
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setRecentOrders(data.orders || [])
        }
      } catch (error) {
        console.error('Fetch orders error:', error)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  // Mesajları getir
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages')
        if (response.ok) {
          const data = await response.json()
          setRecentMessages(data.messages || [])
        }
      } catch (error) {
        console.error('Fetch messages error:', error)
      }
    }

    if (user) {
      fetchMessages()
    }
  }, [user])

  const handleSave = async () => {
    setIsEditing(false)
    
    try {
      // Burada profil güncelleme API'si çağrılacak
      // Şimdilik sadece başarı mesajı gösteriyoruz
      toast.success('Profil bilgileri güncellendi')
    } catch (error) {
      console.error('Profile update failed:', error)
      toast.error('Profil güncellenirken hata oluştu')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null // Router zaten yönlendirme yapacak
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-2xl">
                      {profileData.firstName[0] || user.name[0]}
                      {profileData.lastName[0] || ''}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-gray-600 mb-2">{profileData.email}</p>
                  <p className="text-sm text-gray-500 mb-2">Rol: {user.role === 'ADMIN' ? 'Yönetici' : 'Kullanıcı'}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      Üye: {profileData.joinDate}
                    </Badge>
                    <Badge variant="outline">
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      12 Sipariş
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Kaydet
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        İptal
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Düzenle
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil Bilgileri</TabsTrigger>
              <TabsTrigger value="orders">Siparişlerim</TabsTrigger>
              <TabsTrigger value="messages">Mesajlarım</TabsTrigger>
            </TabsList>

            {/* Profile Information */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Kişisel Bilgiler</CardTitle>
                  <CardDescription>Profil bilgilerinizi görüntüleyin ve güncelleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Adres</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Siparişlerim</CardTitle>
                  <CardDescription>Geçmiş siparişlerinizi görüntüleyin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Henüz siparişiniz bulunmuyor</p>
                        <Button className="mt-4" asChild>
                          <Link href="/products">Alışverişe Başla</Link>
                        </Button>
                      </div>
                    ) : (
                      recentOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Sipariş #{order.id}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.items.length} ürün
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ₺{order.totalPrice.toLocaleString()}
                                </p>
                                <Badge variant="secondary">
                                  Yeni Sipariş
                                </Badge>
                              </div>
                              <Button variant="outline" size="sm">
                                Detaylar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Mesajlarım</CardTitle>
                  <CardDescription>Destek ekibi ile mesajlaşma geçmişiniz</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Henüz mesajınız bulunmuyor</p>
                        <Button className="mt-4" asChild>
                          <Link href="/messages">Mesajlar Sayfasına Git</Link>
                        </Button>
                      </div>
                    ) : (
                      recentMessages.map((message) => (
                        <div key={message.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {message.sender.id === user?.id ? 'Gönderdiğiniz' : 'Aldığınız'} Mesaj
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                                </p>
                                <p className="text-sm text-gray-600 truncate max-w-xs">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">
                                {message.sender.id === user?.id ? 'Gönderildi' : 'Alındı'}
                              </Badge>
                              <Button variant="outline" size="sm">
                                Yanıtla
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <Button>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Yeni Mesaj Gönder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
