import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Consultation from './pages/Consultation'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Lookup from './pages/Lookup'

  function App() {
      return (
          <BrowserRouter>
              <div className="d-flex flex-column min-vh-100">
                  <Navbar />
                  <main className="flex-grow-1">
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/consultation" element={<Consultation />} />
                          <Route path="/lookup" element={<Lookup />} />
                      </Routes>
                  </main>
                  <Footer />
              </div>
          </BrowserRouter>
      )
  }

  export default App