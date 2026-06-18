import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-950">Create your account</h1>
          <p className="text-sm text-gray-600">
            Start your first gift list and share it with guests.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-purple-700 hover:text-purple-800">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}
