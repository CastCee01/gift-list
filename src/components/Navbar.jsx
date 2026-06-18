import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold text-purple-700">
          Gift List
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-purple-700">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-purple-700">
            Dashboard
          </Link>
          <Link to="/login" className="hover:text-purple-700">
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-purple-700 px-4 py-2 text-white hover:bg-purple-800"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  )
}
