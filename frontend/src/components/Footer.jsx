import { Link } from 'react-router-dom'

  function Footer() {
      const currentYear = new Date().getFullYear()

      return (
          <footer className="bg-dark text-white mt-auto">
              <div className="container px-5 py-5">
                  <div className="row">
                      {/* 회사 정보 */}
                      <div className="col-lg-4 mb-4">
                          <h3 className="h5 mb-3">세무법인 아람</h3>
                          <p className="text-white-50">
                              전문적이고 신뢰할 수 있는 세무 서비스를 제공합니다.
                          </p>
                      </div>

                      {/* 연락처 */}
                      <div className="col-lg-4 mb-4">
                          <h4 className="h6 mb-3">연락처</h4>
                          <p className="text-white-50 mb-1">이메일: info@aram-tax.com</p>
                          <p className="text-white-50 mb-1">전화: 02-1234-5678</p>
                          <p className="text-white-50">주소: 서울특별시 강남구</p>
                      </div>

                      {/* 빠른 링크 */}
                      <div className="col-lg-4 mb-4">
                          <h4 className="h6 mb-3">빠른 링크</h4>
                          <ul className="list-unstyled">
                              <li className="mb-2">
                                  <Link to="/about" className="text-white-50 text-decoration-none">
                                      아람 소개
                                  </Link>
                              </li>
                              <li className="mb-2">
                                  <Link to="/services" className="text-white-50 text-decoration-none">
                                      서비스 소개
                                  </Link>
                              </li>
                              <li className="mb-2">
                                  <Link to="/consultation" className="text-white-50 text-decoration-none">
                                      상담 신청
                                  </Link>
                              </li>
                          </ul>
                      </div>
                  </div>

                  {/* 하단 카피라이트 */}
                  <div className="border-top border-secondary pt-4 mt-4 text-center">
                      <p className="text-white-50 mb-0">
                          &copy; {currentYear} 세무법인 아람. All rights reserved.
                      </p>
                  </div>
              </div>
          </footer>
      )
  }

  export default Footer