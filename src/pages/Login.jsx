import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import { signIn } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event) {
    const { id, value } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [id]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      await signIn(form)
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.message || 'Could not log in.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-950">Log in</h1>
          <p className="text-sm text-gray-600">
            Access your gift lists and manage your shared links.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
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