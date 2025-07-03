'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleRegister = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) router.push('/login')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kayıt Ol</h1>
      <input id="name" name="name" placeholder="Ad Soyad" autoComplete="name" onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="border p-2 w-full mb-2" />
      <input id="email" name="email" placeholder="Email" autoComplete="email" onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="border p-2 w-full mb-2" />
      <input id="password" name="password" type="password" placeholder="Şifre" autoComplete="new-password" onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} className="border p-2 w-full mb-2" />
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded">Kayıt Ol</button>
    </div>
  )
}
