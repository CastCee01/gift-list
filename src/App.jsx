import React, { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'gifts:v1'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [items, setItems] = useLocalStorage(STORAGE_KEY, [])
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({ title: '', url: '', note: '' })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.note.toLowerCase().includes(q)
    )
  }, [items, query])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const title = form.title.trim()
    if (!title) return

    const url = form.url.trim()
    const note = form.note.trim()

    const newItem = {
      id: crypto.randomUUID(),
      title,
      url:
        url && /^(https?:\/\/)/i.test(url)
          ? url
          : url
          ? `https://${url}`
          : '',
      note,
      createdAt: Date.now(),
    }

    setItems((prev) => [newItem, ...prev])
    setForm({ title: '', url: '', note: '' })
  }

  function remove(id) {
    setItems((prev) => prev.filter((g) => g.id !== id))
  }

  function clearAll() {
    if (confirm('Delete ALL items? This cannot be undone.')) setItems([])
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function hostFrom(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-4 md:p-6">
      <div className="mx-auto max-w-2xl text-[15px] md:text-base space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between bg-gray-800/80 backdrop-blur rounded-xl px-4 py-3 shadow-md border border-gray-700">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-400">🎁 Gift List</h1>
          <button
            type="button"
            className="rounded-xl border border-red-500 px-3 py-1 text-sm md:text-base text-red-400 hover:bg-red-500/20 disabled:opacity-40 transition"
            onClick={clearAll}
            disabled={!items.length}
          >
            Clear all
          </button>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-2xl border border-gray-700 bg-gray-800 p-4 md:p-6 shadow-md"
        >
          <div className="space-y-1">
            <label className="text-sm md:text-base text-gray-300" htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g., Wireless headphones"
              className="rounded-xl border border-gray-600 bg-gray-900 px-3 py-2 text-base text-gray-100 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm md:text-base text-gray-300" htmlFor="url">Link (optional)</label>
            <input
              type="url"
              pattern="https?://.*"
              title="Please enter a valid URL starting with http:// or https://"
              id="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="e.g., https://store.com/item"
              className="rounded-xl border border-gray-600 bg-gray-900 px-3 py-2 text-base text-gray-100 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm md:text-base text-gray-300" htmlFor="note">Note (optional)</label>
            <textarea
              id="note"
              name="note"
              rows={3}
              value={form.note}
              onChange={handleChange}
              placeholder="Color, size, why it’s cool…"
              className="rounded-xl border border-gray-600 bg-gray-900 px-3 py-2 text-base text-gray-100 placeholder-gray-500 outline-none leading-relaxed focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <button
              className="rounded-2xl bg-indigo-600 px-4 py-2 text-white text-sm md:text-base hover:bg-indigo-700 disabled:opacity-40 transition"
              disabled={!form.title.trim()}
            >
              ➕ Add item
            </button>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="rounded-xl border border-gray-600 bg-gray-900 px-3 py-2 text-base text-gray-100 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 md:ml-auto md:w-64"
            />
          </div>
        </form>

        {/* List */}
        {!filtered.length ? (
          <p className="text-center text-sm md:text-base text-gray-400">
            No gifts yet 🎁 Add your first one above!
          </p>
        ) : (
          <ul className="grid gap-3">
            {filtered.map((g) => (
              <li
                key={g.id}
                className="rounded-2xl border border-gray-700 bg-gray-800 p-4 md:p-5 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-base md:text-lg text-gray-100">{g.title}</span>
                      {g.url && (
                        <a
                          href={g.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-indigo-400/50 px-2 py-1 text-xs md:text-sm text-indigo-300 hover:bg-indigo-500/20 transition"
                          title={g.url}
                        >
                          🔗 {hostFrom(g.url) || 'View'}
                        </a>
                      )}
                    </div>

                    {g.note && (
                      <p className="mt-1 text-sm md:text-[15px] text-gray-300 leading-relaxed">
                        {g.note}
                      </p>
                    )}

                    <p className="mt-2 text-xs md:text-sm text-gray-500">
                      📅 added {formatDate(g.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete "${g.title}"?`)) {
                        remove(g.id)
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded-xl border border-red-500 px-3 py-1 text-sm md:text-base text-red-400 hover:bg-red-500/20 transition"
                    title="Remove"
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
