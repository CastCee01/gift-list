import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import { useLanguage } from '../i18n/LanguageContext'
import { getCurrentUser, signIn } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [form, setForm] = useState({
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
      await signIn(form)
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.message || t('loginErrorFallback'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-950">{t('loginTitle')}</h1>
          <p className="text-sm text-gray-600">{t('loginDescription')}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            label={t('emailLabel')}
            type="email"
            placeholder={t('emailPlaceholder')}
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            id="password"
            label={t('passwordLabel')}
            type="password"
            placeholder={t('passwordPlaceholder')}
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
            {isLoading ? t('loginSubmitting') : t('loginSubmit')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t('loginNoAccount')}{' '}
          <Link to="/signup" className="font-semibold text-purple-700 hover:text-purple-800">
            {t('loginSignupLink')}
          </Link>
        </p>
      </div>
    </section>
  )
}