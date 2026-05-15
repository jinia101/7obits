'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { createServerClient } from '@7obits/db'

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function signUp(formData: FormData) {
  const parsed = SignupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })
  if (!parsed.success) {
    console.error('Invalid email or password')
    return
  }
  const supabase = await createServerClient()
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
    }
  })
  if (error) {
    console.error('Signup error:', error.message)
    return
  }
  redirect('/auth/check-email')
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    console.error('Signin error:', error.message)
    return
  }
  redirect('/')
}

export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}
