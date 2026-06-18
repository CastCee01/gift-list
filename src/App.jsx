import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateList from './pages/CreateList'
import ListDetails from './pages/ListDetails'
import PublicList from './pages/PublicList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lists/new" element={<CreateList />} />
        <Route path="/lists/:id" element={<ListDetails />} />
        <Route path="/share/:slug" element={<PublicList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
