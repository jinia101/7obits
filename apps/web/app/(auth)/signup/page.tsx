import { signUp } from '@/lib/actions/auth'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form action={signUp} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-medium">Create an account</h1>
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Sign up</button>
        <div className="text-center">
          <a href="/login" className="text-sm text-blue-600 hover:underline">Already have an account?</a>
        </div>
      </form>
    </div>
  )
}
