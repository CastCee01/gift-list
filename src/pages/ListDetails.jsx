import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Button from '../components/Button'
import { getCurrentUser } from '../services/authService'
import { getGiftsByListId } from '../services/giftService'
import { getListById } from '../services/listService'

export default function ListDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [list, setList] = useState(null)
  const [gifts, setGifts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadList() {
      try {
        const user = await getCurrentUser()

        if (!user) {
          navigate('/login')
          return
        }

        const listData = await getListById(id)
        const giftData = await getGiftsByListId(id)

        setList(listData)
        setGifts(giftData)
      } catch (error) {
        setErrorMessage(error.message || 'Could not load this gift list.')
      } finally {
        setIsLoading(false)
      }
    }

    loadList()
  }, [id, navigate])

  if (isLoading) {
    return (
      <section className="py-6">
        <p className="text-gray-600">Loading gift list...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className="py-6">
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-8 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium text-purple-700">
            {list?.purpose || 'Gift list'}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-950">{list?.title}</h1>
          {list?.description && (
            <p className="mt-2 max-w-2xl text-gray-600">{list.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary">Copy share link</Button>

          <Link to={`/lists/${id}/gifts/new`}>
            <Button>Add gift</Button>
          </Link>
        </div>
      </div>

      {gifts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-950">No gifts yet</h2>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            Add the first gift to this list. Guests will only see gifts after you add them.
          </p>

          <Link to={`/lists/${id}/gifts/new`} className="mt-6 inline-flex">
            <Button>Add first gift</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {gifts.map((gift) => (
            <article
              key={gift.id}
              className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-950">{gift.name}</h2>

              {gift.description && (
                <p className="mt-2 text-sm text-gray-600">{gift.description}</p>
              )}

              {gift.price && (
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {gift.price} {gift.currency}
                </p>
              )}

              <p className="mt-4 text-xs font-semibold uppercase text-purple-700">
                {gift.priority}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}