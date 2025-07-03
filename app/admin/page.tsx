import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ShoppingBag, TrendingUp, MessageSquare, Package, CreditCard, Eye, Plus } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Toplam Kullanıcı",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Toplam Sipariş",
      value: "856",
      change: "+8%",
      changeType: "positive" as const,
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      title: "Aylık Gelir",
      value: "₺124,500",
      change: "+23%",
      changeType: "positive" as const,
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Aktif Ürün",
      value: "342",
      change: "+5%",
      changeType: "positive" as const,
      icon: <Package className="w-5 h-5" />,
    },
  ]

  const recentOrders = [
    {
      id: "#12345",
      customer: "Ahmet Yılmaz",
      amount: "₺1,299",
      status: "Tamamlandı",
      date: "2 saat önce",
    },
    {
      id: "#12344",
      customer: "Ayşe Demir",
      amount: "₺899",
      status: "Kargoda",
      date: "4 saat önce",
    },
    {
      id: "#12343",
      customer: "Mehmet Kaya",
      amount: "₺2,150",
      status: "Hazırlanıyor",
      date: "6 saat önce",
    },
  ]

  const recentMessages = [
    {
      from: "Fatma Özkan",
      subject: "Ürün iade talebi",
      time: "10 dk önce",
      unread: true,
    },
    {
      from: "Ali Çelik",
      subject: "Kargo durumu sorgusu",
      time: "1 saat önce",
      unread: true,
    },
    {
      from: "Zeynep Arslan",
      subject: "Ürün hakkında soru",
      time: "3 saat önce",
      unread: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
              <p className="text-gray-600">Hoş geldiniz, sistem yöneticisi</p>
            </div>
            <div className="flex items-center gap-4">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Ürün Ekle
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                    {stat.change}
                  </Badge>
                  <span className="text-sm text-gray-600 ml-2">son 30 gün</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Son Siparişler</CardTitle>
                    <CardDescription>En son gelen siparişler</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/orders">
                      <Eye className="w-4 h-4 mr-2" />
                      Tümünü Gör
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-600">
                            {order.id} • {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{order.amount}</p>
                        <Badge
                          variant={
                            order.status === "Tamamlandı"
                              ? "default"
                              : order.status === "Kargoda"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Messages */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Son Mesajlar</CardTitle>
                    <CardDescription>Kullanıcı mesajları</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/messages">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Tümünü Gör
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">{message.from}</p>
                          {message.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
              <CardDescription>Sık kullanılan admin işlemleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/users">
                    <Users className="w-6 h-6" />
                    <span>Kullanıcı Yönetimi</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/products">
                    <Package className="w-6 h-6" />
                    <span>Ürün Yönetimi</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/orders">
                    <CreditCard className="w-6 h-6" />
                    <span>Sipariş Yönetimi</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/messages">
                    <MessageSquare className="w-6 h-6" />
                    <span>Mesaj Yönetimi</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
