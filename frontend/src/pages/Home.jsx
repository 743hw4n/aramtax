function Home() {
      return (
          <div>
              {/* Hero Section - 메인 배너 */}
              <header className="bg-dark py-5">
                  <div className="container px-5">
                      <div className="row gx-5 align-items-center justify-content-center">
                          <div className="col-lg-8 col-xl-7 col-xxl-6">
                              <div className="my-5 text-center text-xl-start">
                                  <h1 className="display-5 fw-bolder text-white mb-2">
                                      신뢰할 수 있는 세무 파트너
                                  </h1>
                                  <p className="lead fw-normal text-white-50 mb-4">
                                      세무법인 아람은 전문적이고 체계적인 세무 서비스를 제공합니다.
                                      법인세, 소득세, 부가가치세 등 모든 세무 문제를 해결해드립니다.
                                  </p>
                                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                      <a className="btn btn-outline-light btn-lg px-4 me-sm-3" href="#services">
                                          서비스 보기
                                      </a>
                                      <a className="btn btn-outline-light btn-lg px-4" href="/consultation">
                                          상담 신청
                                      </a>
                                  </div>
                              </div>
                          </div>
                          <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                              <img 
                                  className="img-fluid rounded-3 my-5" 
                                  src="https://dummyimage.com/600x400/343a40/6c757d" 
                                  alt="세무법인 아람" 
                              />
                          </div>
                      </div>
                  </div>
              </header>

              {/* Features Section - 주요 서비스 */}
              <section className="py-5" id="services">
                  <div className="container px-5 my-5">
                      <div className="row gx-5">
                          <div className="col-lg-4 mb-5 mb-lg-0">
                              <h2 className="fw-bolder mb-0">
                                  전문적이고 신뢰할 수 있는 세무 서비스
                              </h2>
                          </div>
                          <div className="col-lg-8">
                              <div className="row gx-5 row-cols-1 row-cols-md-2">
                                  {/* 서비스 1 */}
                                  <div className="col mb-5 h-100">
                                      <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                          <i className="bi bi-building"></i>
                                      </div>
                                      <h2 className="h5">법인세 신고</h2>
                                      <p className="mb-0">
                                          법인의 결산 및 세무조정을 통한 정확한 법인세 신고 대행
                                      </p>
                                  </div>

                                  {/* 서비스 2 */}
                                  <div className="col mb-5 h-100">
                                      <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                          <i className="bi bi-person-check"></i>
                                      </div>
                                      <h2 className="h5">소득세 신고</h2>
                                      <p className="mb-0">
                                          개인 사업자 및 프리랜서를 위한 종합소득세 신고 서비스
                                      </p>
                                  </div>

                                  {/* 서비스 3 */}
                                  <div className="col mb-5 mb-md-0 h-100">
                                      <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                          <i className="bi bi-receipt"></i>
                                      </div>
                                      <h2 className="h5">부가가치세 신고</h2>
                                      <p className="mb-0">
                                          정기 및 수시 부가가치세 신고 대행 및 컨설팅
                                      </p>
                                  </div>

                                  {/* 서비스 4 */}
                                  <div className="col h-100">
                                      <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                          <i className="bi bi-graph-up"></i>
                                      </div>
                                      <h2 className="h5">세무 컨설팅</h2>
                                      <p className="mb-0">
                                          절세 전략 수립 및 세무 리스크 관리 컨설팅
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Testimonial Section - 고객 후기 */}
              <div className="py-5 bg-light">
                  <div className="container px-5 my-5">
                      <div className="row gx-5 justify-content-center">
                          <div className="col-lg-10 col-xl-7">
                              <div className="text-center">
                                  <div className="fs-4 mb-4 fst-italic">
                                      "세무법인 아람 덕분에 복잡한 세무 문제를 쉽게 해결할 수 있었습니다.
                                      전문적이고 친절한 상담에 매우 만족합니다."
                                  </div>
                                  <div className="d-flex align-items-center justify-content-center">
                                      <img 
                                          className="rounded-circle me-3" 
                                          src="https://dummyimage.com/40x40/ced4da/6c757d" 
                                          alt="..." 
                                      />
                                      <div className="fw-bold">
                                          김대표
                                          <span className="fw-bold text-primary mx-1">/</span>
                                          (주)테크스타트
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* CTA Section - 상담 신청 유도 */}
              <section className="py-5">
                  <div className="container px-5 my-5">
                      <aside className="bg-dark bg-gradient rounded-3 p-4 p-sm-5 mt-5">
                          <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
                              <div className="mb-4 mb-xl-0">
                                  <div className="fs-3 fw-bold text-white">
                                      세무 관련 궁금한 점이 있으신가요?
                                  </div>
                                  <div className="text-white-50">
                                      전문 세무사가 친절하게 상담해 드립니다.
                                  </div>
                              </div>
                              <div className="ms-xl-4">
                                  <a className="btn btn-outline-light btn-lg px-4" href="/consultation">
                                      무료 상담 신청
                                  </a>
                              </div>
                          </div>
                      </aside>
                  </div>
              </section>
          </div>
      )
  }

  export default Home