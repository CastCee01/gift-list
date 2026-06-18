const sampleGifts = [
  {
    id: 1,
    name: 'Wireless headphones',
    price: '2,500 MZN',
    priority: 'High',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Black backpack',
    price: '1,800 MZN',
    priority: 'Medium',
    status: 'Reserved',
  },
]

export default function PublicList() {
  return (
    <section className="space-y-8 py-6">
      <div className="rounded-3xl bg-purple-700 p-6 text-white">
        <p className="text-sm font-medium text-purple-100">Shared gift list</p>
        <h1 className="mt-2 text-3xl font-bold">My wishlist</h1>
        <p className="mt-2 max-w-2xl text-purple-100">
          Choose a gift and reserve it so nobody else buys the same thing.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sampleGifts.map((gift) => {
          const isReserved = gift.status === 'Reserved'

          return (
            <article
              key={gift.id}
              className={
                isReserved
                  ? 'rounded-3xl border border-gray-200 bg-gray-100 p-5 opacity-70'
                  : 'rounded-3xl border border-gray-200 bg-white p-5 shadow-sm'
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-950">{gift.name}</h2>
                  <p className="mt-1 text-sm text-gray-600">{gift.price}</p>
                </div>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  {gift.priority}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span
                  className={
                    isReserved
                      ? 'rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700'
                      : 'rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
                  }
                >
                  {gift.status}
                </span>

                <button
                  type="button"
                  disabled={isReserved}
                  className={
                    isReserved
                      ? 'rounded-full bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-500'
                      : 'rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800'
                  }
                >
                  {isReserved ? 'Already reserved' : 'Reserve gift'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
