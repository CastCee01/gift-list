import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getCurrentUser } from '../services/authService'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home() {
  const navigate = useNavigate()
  const [isCheckingUser, setIsCheckingUser] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    let isMounted = true

    async function redirectLoggedInUser() {
      try {
        const user = await getCurrentUser()

        if (user) {
          navigate('/dashboard')
          return
        }
      } catch {
        // If auth check fails, still show the public home page
      } finally {
        if (isMounted) {
          setIsCheckingUser(false)
        }
      }
    }

    redirectLoggedInUser()

    return () => {
      isMounted = false
    }
  }, [navigate])

  if (isCheckingUser) {
    return (
      <section className="py-10">
        <p className="text-[#6F6258]">{t('loading')}</p>
      </section>
    )
  }

  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="space-y-6">
        <div className="inline-flex rounded-full bg-[#F4E7D8] px-4 py-2 text-sm font-medium text-[#8F6A46]">
          {t('homeBadge')}
        </div>

        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#2A1F1A] sm:text-5xl">
            {t('homeTitle')}
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-[#6F6258]">
            {t('homeDescription')}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="rounded-full bg-[#8F6A46] px-6 py-3 text-center font-semibold text-white hover:bg-[#7A5637]"
          >
            {t('homeCreateButton')}
          </Link>

          <Link
            to="/login"
            className="rounded-full border border-[#EADDD2] px-6 py-3 text-center font-semibold text-[#2A1F1A] hover:border-[#8F6A46] hover:text-[#8F6A46]"
          >
            {t('homeLoginButton')}
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-[#EADDD2] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#EADDD2] p-4">
            <p className="text-sm font-semibold text-[#8F6A46]">
              {t('homeStep1Label')}
            </p>
            <p className="mt-1 font-semibold text-[#2A1F1A]">
              {t('homeStep1Title')}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EADDD2] p-4">
            <p className="text-sm font-semibold text-[#8F6A46]">
              {t('homeStep2Label')}
            </p>
            <p className="mt-1 font-semibold text-[#2A1F1A]">
              {t('homeStep2Title')}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EADDD2] p-4">
            <p className="text-sm font-semibold text-[#8F6A46]">
              {t('homeStep3Label')}
            </p>
            <p className="mt-1 font-semibold text-[#2A1F1A]">
              {t('homeStep3Title')}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EADDD2] bg-[#F4E7D8] p-4">
            <p className="text-sm font-semibold text-[#8F6A46]">
              {t('homeStep4Label')}
            </p>
            <p className="mt-1 font-semibold text-[#2A1F1A]">
              {t('homeStep4Title')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}