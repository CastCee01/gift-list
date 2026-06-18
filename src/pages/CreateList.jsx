export default function CreateList() {
  return (
    <section className="mx-auto max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-950">Create new list</h1>
        <p className="mt-2 text-gray-600">
          Add the basic details. You can use Gift List for birthdays, weddings, personal wishlists, holidays, home needs, or anything else.
        </p>
      </div>

      <form className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="title">
            List title
          </label>
          <input
            id="title"
            type="text"
            placeholder="My wishlist"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="purpose">
              Purpose
            </label>
            <input
              id="purpose"
              type="text"
              placeholder="Birthday, home, wedding, personal..."
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="targetDate">
              Target date optional
            </label>
            <input
              id="targetDate"
              type="date"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            placeholder="Tell people what this list is for..."
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
          />
        </div>

        <button
          type="button"
          className="rounded-full bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
        >
          Create list
        </button>
      </form>
    </section>
  )
}
