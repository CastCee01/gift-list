import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { getCurrentUser, signOut } from '../services/authService'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch {
        setUser(null)
      }
    }

    loadUser()
  }, [location.pathname])

  async function handleLogout() {
    await signOut()
    setUser(null)
    navigate('/login')
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to={user ? '/dashboard' : '/'}
          className="text-lg font-bold text-purple-700"
        >
          {t('appName')}
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-gray-300 px-3 py-2 hover:border-purple-700 hover:text-purple-700"
          >
            {language === 'en' ? 'PT' : 'EN'}
          </button>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-gray-300 px-4 py-2 hover:border-purple-700 hover:text-purple-700"
            >
              {t('navLogout')}
            </button>
          ) : (
            <>
              <Link to="/" className="hover:text-purple-700">
                {t('navHome')}
              </Link>

              <Link to="/login" className="hover:text-purple-700">
                {t('navLogin')}
              </Link>

              <Link
                to="/signup"
                className="rounded-full bg-purple-700 px-4 py-2 text-white hover:bg-purple-800"
              >
                {t('navSignup')}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}