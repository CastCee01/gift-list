import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import { useLanguage } from '../i18n/LanguageContext'
import { getCurrentUser } from '../services/authService'
import { getLists } from '../services/listService'

export default function Dashboard() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [lists, setLists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadLists() {
      try {
        const user = await getCurrentUser()

        if (!user) {
          navigate('/login')
          return
        }

        const userLists = await getLists(user.id)
        setLists(userLists)
      } catch (error) {
        setErrorMessage(error.message || t('dashboardErrorFallback'))
      } finally {
        setIsLoading(false)
      }
    }

    loadLists()
  }, [navigate, t])

  if (isLoading) {
    return (
      <section className="py-6">
        <p className="text-[#6F6258]">{t('dashboardLoading')}</p>
      </section>
    )
  }

  return (
    <section className="space-y-8 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2A1F1A]">
            {t('dashboardTitle')}
          </h1>
          <p className="mt-2 text-[#6F6258]">
            {t('dashboardDescription')}
          </p>
        </div>

        <Link to="/lists/new">
          <Button>{t('dashboardCreateNew')}</Button>
        </Link>
      </div>

      {errorMessage && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      {lists.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#EADDD2] bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-[#2A1F1A]">
            {t('dashboardEmptyTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[#6F6258]">
            {t('dashboardEmptyDescription')}
          </p>

          <Link to="/lists/new" className="mt-6 inline-flex">
            <Button>{t('dashboardCreateFirst')}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {lists.map((list) => (
            <Link
              key={list.id}
              to={`/lists/${list.id}`}
              className="rounded-3xl border border-[#EADDD2] bg-white p-5 shadow-sm transition hover:border-[#8F6A46]"
            >
              <p className="text-sm font-medium text-[#8F6A46]">
                {list.purpose || t('dashboardGiftListFallback')}
              </p>

              <h2 className="mt-2 text-xl font-semibold text-[#2A1F1A]">
                {list.title}
              </h2>

              {list.description && (
                <p className="mt-2 line-clamp-2 text-sm text-[#6F6258]">
                  {list.description}
                </p>
              )}

              <p className="mt-4 text-sm font-semibold text-[#6F6258]">
                {t('dashboardOpenList')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}