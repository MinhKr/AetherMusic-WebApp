'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim() || ''
  const password = (formData.get('password') as string) || ''

  console.log("LOGIN ATTEMPT:", email)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    let msg = error.message
    if (msg.includes("Invalid login credentials")) {
        msg = "Email không tồn tại hoặc sai mật khẩu!"
    }
    redirect('/login?message=' + encodeURIComponent(msg))
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim() || ''
  const password = (formData.get('password') as string) || ''
  const confirmPassword = (formData.get('confirmPassword') as string) || ''

  if (password !== confirmPassword) {
    redirect('/login?type=signup&message=' + encodeURIComponent("Mật khẩu xác nhận không khớp!"))
  }

  console.log("SIGNUP ATTEMPT:", email)

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password
  })
  
  if (error) {
    let msg = error.message
    if (msg.includes("invalid")) {
        msg = "Định dạng Email không hợp lệ hoặc mật khẩu quá yếu."
    }
    redirect('/login?type=signup&message=' + encodeURIComponent(msg))
  }

  if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
    redirect('/login?type=signup&message=' + encodeURIComponent("Email đã được sử dụng. Vui lòng đăng nhập."))
  }

  if (!authData.session) {
    redirect('/login?type=signup&message=' + encodeURIComponent("Vui lòng kiểm tra hộp thư email (và thư rác) để xác nhận tài khoản!"))
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
