import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'

export default function Signup() {
  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-950">Create your account</h1>
          <p className="text-sm text-gray-600">
            Start your first gift list and share it with guests.
          </p>
        </div>

        <form className="space-y-4">
          <Input id="name" label="Name" type="text" placeholder="Your name" />

          <Input id="email" label="Email" type="email" placeholder="you@example.com" />

          <Input id="password" label="Password" type="password" placeholder="Create a password" />

          <Button className="w-full">Create account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-purple-700 hover:text-purple-800">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}