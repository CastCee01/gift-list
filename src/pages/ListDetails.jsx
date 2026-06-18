import { Link } from 'react-router-dom'

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

export default function ListDetails() {
  return (
    <section className="space-y-8 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium text-purple-700">Gift list</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-950">My wishlist</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Manage gifts, update details, and copy the share link when the list is ready.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-full border border-gray-300 px-5 py-3 font-semibold text-gray-800 hover:border-purple-700 hover:text-purple-700"
          >
            Copy share link
          </button>

          <Link
            to="/lists/new"
            className="rounded-full bg-purple-700 px-5 py-3 text-center font-semibold text-white hover:bg-purple-800"
          >
            Add gift
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sampleGifts.map((gift) => (
          <article
            key={gift.id}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
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
                  gift.status === 'Available'
                    ? 'rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
                    : 'rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700'
                }
              >
                {gift.status}
              </span>

              <div className="flex gap-3 text-sm font-semibold">
                <button type="button" className="text-gray-600 hover:text-purple-700">
                  Edit
                </button>
                <button type="button" className="text-red-600 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
