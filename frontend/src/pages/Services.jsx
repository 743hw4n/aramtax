function Services() {
    return (
        <div>
            {/* Header Section - 페이지 제목 */}
            <header className="py-5 bg-dark">
                <div className="container px-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-xxl-6">
                            <div className="text-center my-5">
                                <h1 className="fw-bolder mb-3 text-white">
                                    전문 세무 서비스
                                </h1>
                                <p className="lead fw-normal text-white-50 mb-4">
                                    고객 맞춤형 세무 솔루션으로 성공적인 사업을 지원합니다
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Services Grid - 주요 서비스 */}
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder">주요 서비스</h2>
                        <p className="lead fw-normal text-muted">
                            전문성과 경험을 바탕으로 최고의 세무 서비스를 제공합니다
                        </p>
                    </div>

                    <div className="row gx-5 row-cols-1 row-cols-md-2">
                        {/* 서비스 1: 법인세 */}
                        <div className="col mb-5">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body p-4">
                                    <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-building"></i>
                                    </div>
                                    <h3 className="card-title mb-3">법인세 신고 대행</h3>
                                    <p className="card-text text-muted mb-3">
                                        법인의 결산 및 세무조정을 통한 정확한 법인세 신고를 대행합니다.
                                    </p>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            법인 결산 및 재무제표 작성
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            세무조정 계산서 작성
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            법인세 신고 및 납부
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            중간예납 신고
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 서비스 2: 소득세 */}
                        <div className="col mb-5">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body p-4">
                                    <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-person-check"></i>
                                    </div>
                                    <h3 className="card-title mb-3">소득세 신고 대행</h3>
                                    <p className="card-text text-muted mb-3">
                                        개인사업자 및 프리랜서를 위한 종합소득세 신고 서비스를 제공합니다.
                                    </p>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            종합소득세 신고
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            필요경비 검토 및 최적화
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            근로소득 연말정산
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            양도소득세 신고
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 서비스 3: 부가가치세 */}
                        <div className="col mb-5">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body p-4">
                                    <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-receipt"></i>
                                    </div>
                                    <h3 className="card-title mb-3">부가가치세 신고</h3>
                                    <p className="card-text text-muted mb-3">
                                        정기 및 수시 부가가치세 신고를 정확하게 처리합니다.
                                    </p>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            정기 신고 (1월, 7월)
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            예정 신고 (4월, 10월)
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            간이과세자 신고
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            매입매출 전표 검토
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 서비스 4: 세무 컨설팅 */}
                        <div className="col mb-5">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body p-4">
                                    <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-graph-up"></i>
                                    </div>
                                    <h3 className="card-title mb-3">세무 컨설팅</h3>
                                    <p className="card-text text-muted mb-3">
                                        전략적 절세 방안 수립 및 세무 리스크 관리를 지원합니다.
                                    </p>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            절세 전략 수립
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            세무 리스크 진단
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            사업 구조 개편 자문
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            M&A 세무 자문
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 서비스 5: 기장 대리 */}
                        <div className="col mb-5 mb-md-0">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body p-4">
                                    <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-journal-text"></i>
                                    </div>
                                    <h3 className="card-title mb-3">기장 대리</h3>
                                    <p className="card-text text-muted mb-3">
                                        월별 장부 작성 및 재무제표 작성을 대행합니다.
                                    </p>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            월별 회계장부 작성
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            재무제표 작성
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            경영 분석 자료 제공
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            증빙 서류 관리
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 서비스 6: 세무조사 대응 */}
                        <div className="col mb-5 mb-md-0">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body p-4">
                                    <div className="feature bg-dark bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-shield-shaded"></i>
                                    </div>
                                    <h3 className="card-title mb-3">세무조사 대응</h3>
                                    <p className="card-text text-muted mb-3">
                                        세무조사 대응 전략 수립 및 불복청구를 지원합니다.
                                    </p>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            세무조사 사전 준비
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            조사 현장 입회 및 대응
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            불복청구 대리
                                        </li>
                                        <li>
                                            <i className="bi bi-check-circle-fill text-dark me-2"></i>
                                            과세전적부심사 청구
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section - 서비스 프로세스 */}
            <section className="py-5 bg-light">
                <div className="container px-5 my-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder">서비스 진행 프로세스</h2>
                        <p className="lead fw-normal text-muted">
                            체계적이고 전문적인 프로세스로 진행됩니다
                        </p>
                    </div>

                    <div className="row gx-5">
                        {/* 단계 1 */}
                        <div className="col-lg-2 col-md-4 mb-5 text-center">
                            <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{width: '4rem', height: '4rem'}}>
                                <strong className="fs-4">1</strong>
                            </div>
                            <h5 className="fw-bold">상담 신청</h5>
                            <p className="text-muted small">
                                온라인 또는 전화로<br/>무료 상담 신청
                            </p>
                        </div>

                        {/* 단계 2 */}
                        <div className="col-lg-2 col-md-4 mb-5 text-center">
                            <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{width: '4rem', height: '4rem'}}>
                                <strong className="fs-4">2</strong>
                            </div>
                            <h5 className="fw-bold">자료 검토</h5>
                            <p className="text-muted small">
                                제공하신 자료를<br/>전문가가 검토
                            </p>
                        </div>

                        {/* 단계 3 */}
                        <div className="col-lg-2 col-md-4 mb-5 text-center">
                            <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{width: '4rem', height: '4rem'}}>
                                <strong className="fs-4">3</strong>
                            </div>
                            <h5 className="fw-bold">견적 제시</h5>
                            <p className="text-muted small">
                                합리적인 비용으로<br/>견적 제시
                            </p>
                        </div>

                        {/* 단계 4 */}
                        <div className="col-lg-2 col-md-4 mb-5 text-center">
                            <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{width: '4rem', height: '4rem'}}>
                                <strong className="fs-4">4</strong>
                            </div>
                            <h5 className="fw-bold">계약 체결</h5>
                            <p className="text-muted small">
                                서비스 계약<br/>체결
                            </p>
                        </div>

                        {/* 단계 5 */}
                        <div className="col-lg-2 col-md-4 mb-5 text-center">
                            <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{width: '4rem', height: '4rem'}}>
                                <strong className="fs-4">5</strong>
                            </div>
                            <h5 className="fw-bold">서비스 진행</h5>
                            <p className="text-muted small">
                                전문 세무사가<br/>업무 진행
                            </p>
                        </div>

                        {/* 단계 6 */}
                        <div className="col-lg-2 col-md-4 mb-5 text-center">
                            <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                style={{width: '4rem', height: '4rem'}}>
                                <strong className="fs-4">6</strong>
                            </div>
                            <h5 className="fw-bold">완료 보고</h5>
                            <p className="text-muted small">
                                결과 보고 및<br/>사후 관리
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - 상담 유도 */}
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="bg-dark bg-gradient rounded-3 p-5 text-center">
                        <div className="mb-4">
                            <h2 className="fw-bold text-white">서비스가 필요하신가요?</h2>
                            <p className="lead text-white-50 mb-0">
                                지금 바로 무료 상담을 신청하세요
                            </p>
                        </div>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                            <a className="btn btn-outline-light btn-lg px-5" href="/consultation">
                                상담 신청하기
                            </a>
                            <a className="btn btn-light btn-lg px-5" href="/about">
                                회사 소개 보기
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services