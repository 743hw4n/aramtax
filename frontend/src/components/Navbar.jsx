import { Link } from 'react-router-dom'

  function Navbar() {
      return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container px-5">
                  <Link className="navbar-brand" to="/">세무법인 아람</Link>
                  <button 
                      className="navbar-toggler" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#navbarSupportedContent" 
                      aria-controls="navbarSupportedContent" 
                      aria-expanded="false" 
                      aria-label="Toggle navigation"
                  >
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <Link className="nav-link" to="/">홈</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/about">아람 소개</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/services">서비스 소개</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/consultation">상담 신청</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/lookup">상담 조회</Link>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      )
  }

  export default Navbar