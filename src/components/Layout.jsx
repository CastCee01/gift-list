import Navbar from './Navbar'
import PageContainer from './PageContainer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <PageContainer>{children}</PageContainer>
    </div>
  )
}
