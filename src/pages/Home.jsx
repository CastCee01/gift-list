import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="space-y-6">
        <div className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
          Simple gift planning
        </div>

        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
            Create and share gift lists without duplicate gifts.
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-gray-600">
            Gift List helps you organize what you want, share it with friends and family,
            and let guests reserve gifts before someone buys the same thing twice.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="rounded-full bg-purple-700 px-6 py-3 text-center font-semibold text-white hover:bg-purple-800"
          >
            Create your gift list
          </Link>

          <Link
            to="/login"
            className="rounded-full border border-gray-300 px-6 py-3 text-center font-semibold text-gray-800 hover:border-purple-700 hover:text-purple-700"
          >
            Log in
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-500">Step 1</p>
            <p className="mt-1 font-semibold text-gray-950">Create a list</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-500">Step 2</p>
            <p className="mt-1 font-semibold text-gray-950">Add gift ideas</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-500">Step 3</p>
            <p className="mt-1 font-semibold text-gray-950">Share the link</p>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4">
            <p className="text-sm font-semibold text-purple-700">Step 4</p>
            <p className="mt-1 font-semibold text-purple-950">Guests reserve gifts</p>
          </div>
        </div>
      </div>
    </section>
  )
}
