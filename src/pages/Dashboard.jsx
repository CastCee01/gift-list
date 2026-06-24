import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import { getCurrentUser } from '../services/authService'
import { getLists } from '../services/listService'

export default function Dashboard() {
  const navigate = useNavigate()
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
        setErrorMessage(error.message || 'Could not load your gift lists.')
      } finally {
        setIsLoading(false)
      }
    }

    loadLists()
  }, [navigate])

  if (isLoading) {
    return (
      <section className="py-6">
        <p className="text-gray-600">Loading your gift lists...</p>
      </section>
    )
  }

  return (
    <section className="space-y-8 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Your gift lists</h1>
          <p className="mt-2 text-gray-600">
            Create, manage, and share your gift lists.
          </p>
        </div>

        <Link to="/lists/new">
          <Button>Create new list</Button>
        </Link>
      </div>

      {errorMessage && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      {lists.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-950">No lists yet</h2>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            Create your first gift list and start adding gifts.
          </p>

          <Link to="/lists/new" className="mt-6 inline-flex">
            <Button>Create first list</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {lists.map((list) => (
            <Link
              key={list.id}
              to={`/lists/${list.id}`}
              className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-purple-700"
            >
              <p className="text-sm font-medium text-purple-700">
                {list.purpose || 'Gift list'}
              </p>

              <h2 className="mt-2 text-xl font-semibold text-gray-950">
                {list.title}
              </h2>

              {list.description && (
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {list.description}
                </p>
              )}

              <p className="mt-4 text-sm font-semibold text-gray-700">
                Open list →
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}