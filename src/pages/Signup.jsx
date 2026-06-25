import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import { useLanguage } from '../i18n/LanguageContext'
import { getCurrentUser, signUp } from '../services/authService'

export default function Signup() {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
      setErrorMessage(error.message || t('signupErrorFallback'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-3xl border border-[#EADDD2] bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-[#2A1F1A]">
            {t('signupTitle')}
          </h1>
          <p className="text-sm text-[#6F6258]">{t('signupDescription')}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="name"
            label={t('nameLabel')}
            type="text"
            placeholder={t('namePlaceholder')}
            value={form.name}
            onChange={handleChange}
            required
          />

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
            placeholder={t('signupPasswordPlaceholder')}
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
            {isLoading ? t('signupSubmitting') : t('signupSubmit')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6F6258]">
          {t('signupHasAccount')}{' '}
          <Link to="/login" className="font-semibold text-[#8F6A46] hover:text-[#7A5637]">
            {t('signupLoginLink')}
          </Link>
        </p>
      </div>
    </section>
  )
}