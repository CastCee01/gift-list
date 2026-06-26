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
    <header className="border-b border-[#EADDD2] bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to={user ? '/dashboard' : '/'}
          className="text-lg font-bold text-[#8F6A46]"
        >
          Gift List
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-[#2A1F1A]">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-[#EADDD2] px-3 py-2 hover:border-[#8F6A46] hover:text-[#8F6A46]"
          >
            {language === 'en' ? 'PT' : 'EN'}
          </button>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-[#EADDD2] px-4 py-2 hover:border-[#8F6A46] hover:text-[#8F6A46]"
            >
              {t('navLogout')}
            </button>
          ) : (
            <>
              <Link to="/" className="hover:text-[#8F6A46]">
                {t('navHome')}
              </Link>

              <Link to="/login" className="hover:text-[#8F6A46]">
                {t('navLogin')}
              </Link>

              <Link
                to="/signup"
                className="rounded-full bg-[#8F6A46] px-4 py-2 text-white hover:bg-[#7A5637]"
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