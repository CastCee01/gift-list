import Button from './Button'

export default function GiftCard({
  gift,
  mode = 'owner',
  onReserve,
  onEdit,
  onDelete,
}) {
  const isReserved = gift.status === 'Reserved'

  return (
    <article
      className={
        isReserved && mode === 'public'
          ? 'rounded-3xl border border-[#EADDD2] bg-[#F4E7D8] p-5 opacity-70'
          : 'rounded-3xl border border-[#EADDD2] bg-white p-5 shadow-sm'
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#2A1F1A]">{gift.name}</h2>
          {gift.price && <p className="mt-1 text-sm text-[#6F6258]">{gift.price}</p>}
        </div>

        {gift.priority && (
          <span className="rounded-full bg-[#F4E7D8] px-3 py-1 text-xs font-semibold text-[#8F6A46]">
            {gift.priority}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span
          className={
            isReserved
              ? 'rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700'
              : 'rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
          }
        >
          {gift.status}
        </span>

        {mode === 'public' ? (
          <Button
            disabled={isReserved}
            variant={isReserved ? 'disabled' : 'primary'}
            className="px-4 py-2 text-sm"
            onClick={onReserve}
          >
            {isReserved ? 'Already reserved' : 'Reserve gift'}
          </Button>
        ) : (
          <div className="flex gap-3 text-sm font-semibold">
            <button type="button" onClick={onEdit} className="text-[#6F6258] hover:text-[#8F6A46]">
              Edit
            </button>
            <button type="button" onClick={onDelete} className="text-red-600 hover:text-red-700">
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  )
}