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

      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-950">No gifts available yet</h2>
        <p className="mx-auto mt-2 max-w-md text-gray-600">
          This shared list does not have visible gifts yet. Check again later.
        </p>
      </div>
    </section>
  )
}