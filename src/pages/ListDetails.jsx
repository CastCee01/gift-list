import { Link } from 'react-router-dom'

import Button from '../components/Button'

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
          <Button variant="secondary">Copy share link</Button>

          <Link to="/lists/test/gifts/new">
            <Button>Add gift</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-950">No gifts yet</h2>
        <p className="mx-auto mt-2 max-w-md text-gray-600">
          Add the first gift to this list. Guests will only see gifts after you add them.
        </p>

        <Link to="/lists/test/gifts/new" className="mt-6 inline-flex">
          <Button>Add first gift</Button>
        </Link>
      </div>
    </section>
  )
}