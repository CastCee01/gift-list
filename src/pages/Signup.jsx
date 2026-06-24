import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import { getCurrentUser, signUp } from '../services/authService'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function redirectLoggedInUser() {
      const user = await getCurrentUser()

      if (user) {
        navigate('/dashboard')
      }
    }

    redirectLoggedInUser()
  }, [navigate])

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
      await signUp(form)
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.message || 'Could not create account.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-950">Create your account</h1>
          <p className="text-sm text-gray-600">
            Start your first gift list and share it with guests.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
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
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
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