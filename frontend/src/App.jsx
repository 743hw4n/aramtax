import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'
  import Consultation from './pages/Consultation'

  function App() {
      return (
          <BrowserRouter>
              <div className="d-flex flex-column min-vh-100">
                  <Navbar />
                  <main className="flex-grow-1">
                      <Routes>
                          <Route path="/" element={<div>홈 페이지</div>} />
                          <Route path="/about" element={<div>아람 소개</div>} />
                          <Route path="/services" element={<div>서비스 소개</div>} />
                          <Route path="/consultation" element={<Consultation />} />
                          <Route path="/lookup" element={<div>상담 조회</div>} />
                      </Routes>
                  </main>
                  <Footer />
              </div>
          </BrowserRouter>
      )
  }

  export default App