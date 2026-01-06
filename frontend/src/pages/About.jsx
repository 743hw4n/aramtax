function About() {
      return (
          <div>
              {/* Header Section - 페이지 제목 */}
              <header className="py-5 bg-dark">
                  <div className="container px-5">
                      <div className="row justify-content-center">
                          <div className="col-lg-8 col-xxl-6">
                              <div className="text-center my-5">
                                  <h1 className="fw-bolder mb-3 text-white">
                                      세무법인 아람을 소개합니다
                                  </h1>
                                  <p className="lead fw-normal text-white-50 mb-4">
                                      20년 경력의 전문 세무사가 여러분의 세무 파트너가 되어드립니다
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </header>

              {/* About Section - 회사 소개 */}
              <section className="py-5">
                  <div className="container px-5 my-5">
                      <div className="row gx-5 align-items-center">
                          <div className="col-lg-6">
                              <img 
                                  className="img-fluid rounded mb-5 mb-lg-0" 
                                  src="https://dummyimage.com/600x400/343a40/6c757d" 
                                  alt="세무법인 아람 사무실" 
                              />
                          </div>
                          <div className="col-lg-6">
                              <h2 className="fw-bolder">신뢰와 전문성의 세무 파트너</h2>
                              <p className="lead fw-normal text-muted mb-0">
                                  세무법인 아람은 2005년 설립 이래 기업과 개인 고객에게
                                  최고의 세무 서비스를 제공해왔습니다.
                              </p>
                              <p className="text-muted mt-3">
                                  우리는 단순한 세무 신고를 넘어, 고객의 사업 성장과
                                  재무 건전성을 위한 전략적 파트너로서 함께합니다.
                                  복잡한 세법을 쉽게 풀어드리고, 합법적인 절세 방안을
                                  제시하여 고객의 가치를 극대화합니다.
                              </p>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Core Values - 핵심 가치 */}
              <section className="py-5 bg-light">
                  <div className="container px-5 my-5">
                      <div className="text-center mb-5">
                          <h2 className="fw-bolder">우리의 핵심 가치</h2>
                          <p className="lead fw-normal text-muted">
                              아람을 선택해야 하는 이유
                          </p>
                      </div>
                      <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4">
                          {/* 가치 1: 전문성 */}
                          <div className="col mb-5 mb-xl-0">
                              <div className="text-center">
                                  <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                      <i className="bi bi-award"></i>
                                  </div>
                                  <h3 className="h4 fw-bold">전문성</h3>
                                  <p className="text-muted mb-0">
                                      20년 이상의 세무 경험을 바탕으로
                                      정확하고 전문적인 서비스를 제공합니다
                                  </p>
                              </div>
                          </div>

                          {/* 가치 2: 신뢰성 */}
                          <div className="col mb-5 mb-xl-0">
                              <div className="text-center">
                                  <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                      <i className="bi bi-shield-check"></i>
                                  </div>
                                  <h3 className="h4 fw-bold">신뢰성</h3>
                                  <p className="text-muted mb-0">
                                      고객 만족도 95% 이상,
                                      오랜 신뢰 관계를 통해 검증된 서비스
                                  </p>
                              </div>
                          </div>

                          {/* 가치 3: 정확성 */}
                          <div className="col mb-5 mb-sm-0">
                              <div className="text-center">
                                  <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                      <i className="bi bi-check-circle"></i>
                                  </div>
                                  <h3 className="h4 fw-bold">정확성</h3>
                                  <p className="text-muted mb-0">
                                      철저한 검토 시스템으로
                                      오류 없는 완벽한 세무 신고
                                  </p>
                              </div>
                          </div>

                          {/* 가치 4: 소통 */}
                          <div className="col">
                              <div className="text-center">
                                  <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                      <i className="bi bi-chat-dots"></i>
                                  </div>
                                  <h3 className="h4 fw-bold">소통</h3>
                                  <p className="text-muted mb-0">
                                      고객과의 원활한 소통으로
                                      맞춤형 세무 솔루션 제공
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Team Section - 팀 소개 */}
              <section className="py-5">
                  <div className="container px-5 my-5">
                      <div className="text-center">
                          <h2 className="fw-bolder">전문 세무사 팀</h2>
                          <p className="lead fw-normal text-muted mb-5">
                              풍부한 경험과 전문성을 갖춘 세무사들이 함께합니다
                          </p>
                      </div>
                      <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-3">
                          {/* 팀원 1 */}
                          <div className="col mb-5 mb-xl-0">
                              <div className="text-center">
                                  <img 
                                      className="img-fluid rounded-circle mb-4 px-4" 
                                      src="https://dummyimage.com/150x150/ced4da/6c757d" 
                                      alt="대표 세무사" 
                                  />
                                  <h5 className="fw-bolder">김세무</h5>
                                  <div className="fst-italic text-muted">
                                      대표 세무사
                                  </div>
                                  <p className="text-muted small mt-2">
                                      세무사 경력 25년<br/>
                                      법인세 및 국제조세 전문
                                  </p>
                              </div>
                          </div>

                          {/* 팀원 2 */}
                          <div className="col mb-5 mb-xl-0">
                              <div className="text-center">
                                  <img 
                                      className="img-fluid rounded-circle mb-4 px-4" 
                                      src="https://dummyimage.com/150x150/ced4da/6c757d" 
                                      alt="세무사" 
                                  />
                                  <h5 className="fw-bolder">이회계</h5>
                                  <div className="fst-italic text-muted">
                                      수석 세무사
                                  </div>
                                  <p className="text-muted small mt-2">
                                      세무사 경력 15년<br/>
                                      소득세 및 부가가치세 전문
                                  </p>
                              </div>
                          </div>

                          {/* 팀원 3 */}
                          <div className="col mb-5">
                              <div className="text-center">
                                  <img 
                                      className="img-fluid rounded-circle mb-4 px-4" 
                                      src="https://dummyimage.com/150x150/ced4da/6c757d" 
                                      alt="세무사" 
                                  />
                                  <h5 className="fw-bolder">박신고</h5>
                                  <div className="fst-italic text-muted">
                                      세무사
                                  </div>
                                  <p className="text-muted small mt-2">
                                      세무사 경력 10년<br/>
                                      종합소득세 및 상속세 전문
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* CTA Section - 상담 유도 */}
              <section className="py-5 bg-light">
                  <div className="container px-5 my-5">
                      <div className="text-center">
                          <h2 className="fw-bolder">세무 고민, 함께 해결해요</h2>
                          <p className="lead fw-normal text-muted mb-4">
                              전문 세무사가 친절하게 상담해드립니다
                          </p>
                          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                              <a className="btn btn-dark btn-lg px-5 py-3" href="/consultation">
                                  상담 신청하기
                              </a>
                              <a className="btn btn-outline-dark btn-lg px-5 py-3" href="/services">
                                  서비스 보기
                              </a>
                          </div>
                      </div>
                  </div>
              </section>
          </div>
      )
  }

  export default About