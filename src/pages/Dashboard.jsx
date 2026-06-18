import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <section className="space-y-8 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your gift lists and create new ones to share with guests.
          </p>
        </div>

        <Link
          to="/lists/new"
          className="rounded-full bg-purple-700 px-5 py-3 text-center font-semibold text-white hover:bg-purple-800"
        >
          Create new list
        </Link>
      </div>

      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-950">No gift lists yet</h2>
        <p className="mx-auto mt-2 max-w-md text-gray-600">
          Create your first list, add gift ideas, and share it with friends or family.
        </p>

        <Link
          to="/lists/new"
          className="mt-6 inline-flex rounded-full bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800"
        >
          Create your first list
        </Link>
      </div>
    </section>
  )
}
