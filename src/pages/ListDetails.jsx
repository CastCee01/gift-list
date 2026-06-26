import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Button from '../components/Button'
import { useLanguage } from '../i18n/LanguageContext'
import { getCurrentUser } from '../services/authService'
import { deleteGift, getGiftsByListId } from '../services/giftService'
import { getListById } from '../services/listService'
import { getReservationsByListId } from '../services/reservationService'

export default function ListDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [list, setList] = useState(null)
  const [gifts, setGifts] = useState([])
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [copyMessage, setCopyMessage] = useState('')
  const [deletingGiftId, setDeletingGiftId] = useState(null)

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
        const reservationData = await getReservationsByListId(id)

        setList(listData)
        setGifts(giftData)
        setReservations(reservationData)
      } catch (error) {
        setErrorMessage(error.message || t('listDetailsErrorFallback'))
      } finally {
        setIsLoading(false)
      }
    }

    loadList()
  }, [id, navigate, t])

  function getReservationForGift(giftId) {
    return reservations.find((reservation) => reservation.gift_item_id === giftId)
  }

  async function copyShareLink() {
    const shareUrl = window.location.origin + '/share/' + list.slug

    await navigator.clipboard.writeText(shareUrl)

    setCopyMessage(t('copied'))

    setTimeout(() => {
      setCopyMessage('')
    }, 2500)
  }

  async function handleDeleteGift(giftId) {
    const shouldDelete = window.confirm('Delete this gift?')

    if (!shouldDelete) return

    try {
      setDeletingGiftId(giftId)

      await deleteGift(giftId)

      setGifts((currentGifts) =>
        currentGifts.filter((gift) => gift.id !== giftId)
      )

      setReservations((currentReservations) =>
        currentReservations.filter(
          (reservation) => reservation.gift_item_id !== giftId
        )
      )
    } catch (error) {
      setErrorMessage(error.message || 'Could not delete gift.')
    } finally {
      setDeletingGiftId(null)
    }
  }

  if (isLoading) {
    return (
      <section className="py-6">
        <p className="text-[#6F6258]">{t('listDetailsLoading')}</p>
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
          <p className="text-sm font-medium text-[#8F6A46]">
            {list?.purpose || t('listDetailsGiftListFallback')}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-[#2A1F1A]">
            {list?.title}
          </h1>

          {list?.description && (
            <p className="mt-2 max-w-2xl text-[#6F6258]">
              {list.description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={copyShareLink}>
            {copyMessage || t('copyShareLink')}
          </Button>

          <Link to={`/lists/${id}/gifts/new`}>
            <Button>{t('addGift')}</Button>
          </Link>
        </div>
      </div>

      {gifts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#EADDD2] bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-[#2A1F1A]">
            {t('noGiftsTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[#6F6258]">
            {t('noGiftsDescription')}
          </p>

          <Link to={`/lists/${id}/gifts/new`} className="mt-6 inline-flex">
            <Button>{t('addFirstGift')}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {gifts.map((gift) => {
            const reservation = getReservationForGift(gift.id)
            const isReserved = gift.status === 'reserved'
            const isDeleting = deletingGiftId === gift.id

            return (
              <article
                key={gift.id}
                className="rounded-3xl border border-[#EADDD2] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-[#2A1F1A]">
                    {gift.name}
                  </h2>

                  <span
                    className={
                      isReserved
                        ? 'rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700'
                        : 'rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
                    }
                  >
                    {isReserved ? t('reserved') : t('available')}
                  </span>
                </div>

                {gift.description && (
                  <p className="mt-2 text-sm text-[#6F6258]">
                    {gift.description}
                  </p>
                )}

                {gift.price && (
                  <p className="mt-3 text-sm font-semibold text-[#2A1F1A]">
                    {gift.price} {gift.currency}
                  </p>
                )}

                <p className="mt-4 text-xs font-semibold uppercase text-[#8F6A46]">
                  {gift.priority}
                </p>

                {reservation && (
                  <div className="mt-4 rounded-2xl bg-[#FFF8F1] p-4 text-sm text-[#6F6258]">
                    <p>
                      <span className="font-semibold text-[#2A1F1A]">
                        {t('reservedBy')}
                      </span>{' '}
                      {reservation.guest_name}
                    </p>

                    {reservation.guest_email && (
                      <p className="mt-1">
                        <span className="font-semibold text-[#2A1F1A]">
                          {t('emailText')}
                        </span>{' '}
                        {reservation.guest_email}
                      </p>
                    )}

                    {reservation.message && (
                      <p className="mt-1">
                        <span className="font-semibold text-[#2A1F1A]">
                          {t('messageText')}
                        </span>{' '}
                        {reservation.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteGift(gift.id)}
                    disabled={isDeleting}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}