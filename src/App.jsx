import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateList from './pages/CreateList'
import ListDetails from './pages/ListDetails'
import AddGift from './pages/AddGift'
import PublicList from './pages/PublicList'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lists/new" element={<CreateList />} />
          <Route path="/lists/:id" element={<ListDetails />} />
          <Route path="/lists/:id/gifts/new" element={<AddGift />} />
          <Route path="/share/:slug" element={<PublicList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App