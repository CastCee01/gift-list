import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'

export default function Login() {
  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-950">Log in</h1>
          <p className="text-sm text-gray-600">
            Access your gift lists and manage your shared links.
          </p>
        </div>

        <form className="space-y-4">
          <Input id="email" label="Email" type="email" placeholder="you@example.com" />

          <Input id="password" label="Password" type="password" placeholder="Your password" />

          <Button className="w-full">Log in</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          No account yet?{' '}
          <Link to="/signup" className="font-semibold text-purple-700 hover:text-purple-800">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  )
}