import Navbar from './Navbar'
import PageContainer from './PageContainer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#FFF8F1] text-[#2A1F1A]">
      <Navbar />
      <PageContainer>{children}</PageContainer>
    </div>
  )
}