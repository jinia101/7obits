import { signIn } from '@/lib/actions/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form action={signIn} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Sign in</button>
        <div className="text-center">
          <a href="/signup" className="text-sm text-blue-600 hover:underline">Don't have an account?</a>
        </div>
      </form>
    </div>
  )
}
