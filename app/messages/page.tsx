"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Send, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { toast } from "sonner"

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          setCurrentUser(userData.user)
          fetchMessages()
          fetchUsers()
        } else {
          window.location.href = '/auth/login'
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        window.location.href = '/auth/login'
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Fetch messages error:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      }
    } catch (error) {
      console.error('Fetch users error:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!selectedUser || !newMessage.trim()) {
      toast.error('Lütfen bir kullanıcı seçin ve mesaj yazın')
      return
    }

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          receiverId: selectedUser.id,
        }),
      })

      if (response.ok) {
        toast.success('Mesaj gönderildi')
        setNewMessage("")
        fetchMessages()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Mesaj gönderilemedi')
      }
    } catch (error) {
      console.error('Send message error:', error)
      toast.error('Bir hata oluştu')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
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
            <span className="text-gray-900">Mesajlar</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mesajlar</h1>
            <p className="text-gray-600">Diğer kullanıcılarla mesajlaşın</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Users List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Kullanıcılar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {users
                      .filter(user => user.id !== currentUser?.id)
                      .map((user) => (
                        <div
                          key={user.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedUser?.id === user.id
                              ? 'bg-blue-50 border border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedUser(user)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Messages */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedUser ? `Mesajlar - ${selectedUser.name}` : 'Mesaj Seçin'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedUser ? (
                    <>
                      {/* Messages List */}
                      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {messages
                          .filter(
                            (msg) =>
                              (msg.sender.id === currentUser?.id && msg.receiver.id === selectedUser.id) ||
                              (msg.sender.id === selectedUser.id && msg.receiver.id === currentUser?.id)
                          )
                          .map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender.id === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs p-3 rounded-lg ${
                                  message.sender.id === currentUser?.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                  message.sender.id === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {new Date(message.createdAt).toLocaleString('tr-TR')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Send Message */}
                      <div className="flex gap-2">
                        <Textarea
                          id="messageInput"
                          placeholder="Mesajınızı yazın..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                          rows={3}
                        />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Mesajlaşmak için bir kullanıcı seçin</p>
                    </div>
                  )}
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
