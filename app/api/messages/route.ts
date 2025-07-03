import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

// GET - Kullanıcının mesajlarını getir
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { error: 'Oturum bulunamadı' },
        { status: 401 }
      )
    }

    const session = JSON.parse(sessionCookie.value)
    
    // Kullanıcının gönderdiği ve aldığı mesajları getir
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.id },
          { receiverId: session.id }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ messages })

  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

// POST - Yeni mesaj gönder
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { error: 'Oturum bulunamadı' },
        { status: 401 }
      )
    }

    const session = JSON.parse(sessionCookie.value)
    const { content, receiverId } = await request.json()

    if (!content || !receiverId) {
      return NextResponse.json(
        { error: 'Mesaj içeriği ve alıcı gerekli' },
        { status: 400 }
      )
    }

    // Alıcının var olup olmadığını kontrol et
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId }
    })

    if (!receiver) {
      return NextResponse.json(
        { error: 'Alıcı bulunamadı' },
        { status: 404 }
      )
    }

    // Mesaj oluştur
    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.id,
        receiverId
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ 
      message: 'Mesaj başarıyla gönderildi',
      data: message 
    }, { status: 201 })

  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 