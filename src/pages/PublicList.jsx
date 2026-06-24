import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { getGiftsByListId } from '../services/giftService'
import { reserveGift } from '../services/reservationService'
import { getPublicListBySlug } from '../services/listService'

export default function PublicList() {
  const { slug } = useParams()
  const [list, setList] = useState(null)
  const [gifts, setGifts] = useState([])
  const [selectedGift, setSelectedGift] = useState(null)
  const [form, setForm] = useState({
    guestName: '',
    guestEmail: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isReserving, setIsReserving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function loadPublicList() {
    try {
      const listData = await getPublicListBySlug(slug)
      const giftData = await getGiftsByListId(listData.id)

      setList(listData)
      setGifts(giftData)
    } catch (error) {
      setErrorMessage(error.message || 'Could not load this shared list.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPublicList()
  }, [slug])

  function handleChange(event) {
    const { id, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [id]: value,
    }))
  }

  async function handleReserve(event) {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsReserving(true)

    try {
      await reserveGift({
        giftItemId: selectedGift.id,
        listId: list.id,
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        message: form.message,
      })

      setSuccessMessage('Gift reserved successfully.')
      setSelectedGift(null)
      setForm({
        guestName: '',
        guestEmail: '',
        message: '',
      })

      await loadPublicList()
    } catch (error) {
      setErrorMessage(error.message || 'Could not reserve this gift.')
    } finally {
      setIsReserving(false)
    }
  }

  if (isLoading) {
    return (
      <section className="py-6">
        <p className="text-gray-600">Loading shared list...</p>
      </section>
    )
  }

  if (errorMessage && !list) {
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
      <div className="rounded-3xl bg-purple-700 p-6 text-white">
        <p className="text-sm font-medium text-purple-100">Shared gift list</p>
        <h1 className="mt-2 text-3xl font-bold">{list?.title}</h1>

        {list?.description && (
          <p className="mt-2 max-w-2xl text-purple-100">{list.description}</p>
        )}
      </div>

      {successMessage && (
        <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      {gifts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-950">No gifts available yet</h2>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            This shared list does not have visible gifts yet. Check again later.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {gifts.map((gift) => {
            const isReserved = gift.status === 'reserved'

            return (
              <article
                key={gift.id}
                className={
                  isReserved
                    ? 'rounded-3xl border border-gray-200 bg-gray-100 p-5 opacity-70'
                    : 'rounded-3xl border border-gray-200 bg-white p-5 shadow-sm'
                }
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

                <div className="mt-5 flex items-center justify-between gap-4">
                  <span
                    className={
                      isReserved
                        ? 'rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700'
                        : 'rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
                    }
                  >
                    {isReserved ? 'Reserved' : 'Available'}
                  </span>

                  <Button
                    disabled={isReserved}
                    variant={isReserved ? 'disabled' : 'primary'}
                    className="px-4 py-2 text-sm"
                    onClick={() => setSelectedGift(gift)}
                  >
                    {isReserved ? 'Already reserved' : 'Reserve gift'}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {selectedGift && (
        <form
          className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
          onSubmit={handleReserve}
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-950">
              Reserve: {selectedGift.name}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Add your name so the owner knows who reserved it.
            </p>
          </div>

          <Input
            id="guestName"
            label="Your name"
            type="text"
            placeholder="Your name"
            value={form.guestName}
            onChange={handleChange}
            required
          />

          <Input
            id="guestEmail"
            label="Email optional"
            type="email"
            placeholder="you@example.com"
            value={form.guestEmail}
            onChange={handleChange}
          />

          <Textarea
            id="message"
            label="Message optional"
            rows="3"
            placeholder="Add a short message..."
            value={form.message}
            onChange={handleChange}
          />

          <div className="flex gap-3">
            <Button type="submit" disabled={isReserving}>
              {isReserving ? 'Reserving...' : 'Confirm reservation'}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => setSelectedGift(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </section>
  )
}