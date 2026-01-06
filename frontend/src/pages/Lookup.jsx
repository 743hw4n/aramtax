import { useState } from 'react'
  import axios from 'axios'

  function Lookup() {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [consultations, setConsultations] = useState([])
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const [searched, setSearched] = useState(false)

      // 상담 유형 한글 변환
      const getConsultationTypeLabel = (type) => {
          const types = {
              'corporate_tax': '법인세',
              'income_tax': '소득세',
              'vat': '부가가치세',
              'comprehensive_income': '종합소득세',
              'other': '기타'
          }
          return types[type] || type
      }
      // 상태 뱃지 색상 함수
      const getStatusBadge = (status) => {
        const statusMap = {
            'pending' : { text: '접수대기', className: 'bg-warning text-dark' },
            'in_progress': { text: '진행중', className: 'bg-primary' },
            'completed' : { text: '완료', className: 'bg-success'}
        }
        const statusInfo = statusMap[status] || statusMap['pending']

        return (
            <span className={`badge ${statusInfo.className}`}>
                {statusInfo.text}
            </span>
        )
      }

      // 날짜 포맷팅
      const formatDate = (dateString) => {
          const date = new Date(dateString)
          return date.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
          })
      }

      // 조회 처리
      const handleSubmit = async (e) => {
          e.preventDefault()
          setLoading(true)
          setError(null)
          setSearched(true)

          try {
              const response = await axios.post(
                  'http://localhost:8000/api/consultations/lookup/',
                  { email, password }
              )
              setConsultations(response.data)
          } catch (err) {
              if (err.response && err.response.status === 404) {
                  setError('이메일 또는 비밀번호가 일치하지 않습니다.')
              } else {
                  setError('조회 중 오류가 발생했습니다. 다시 시도해주세요.')
              }
              setConsultations([])
          } finally {
              setLoading(false)
          }
      }

      return (
          <div>
              {/* Header Section */}
              <header className="py-5 bg-dark">
                  <div className="container px-5">
                      <div className="row justify-content-center">
                          <div className="col-lg-8 col-xxl-6">
                              <div className="text-center my-5">
                                  <h1 className="fw-bolder mb-3 text-white">
                                      상담 내역 조회
                                  </h1>
                                  <p className="lead fw-normal text-white-50 mb-4">
                                      상담 신청 시 입력하신 이메일과 비밀번호로 상담 내역을 확인하세요
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </header>

              {/* Lookup Form Section */}
              <section className="py-5">
                  <div className="container px-5">
                      <div className="row justify-content-center">
                          <div className="col-lg-6">
                              <div className="card shadow-sm border-0 mb-5">
                                  <div className="card-body p-5">
                                      <h3 className="card-title mb-4">상담 내역 조회</h3>

                                      <form onSubmit={handleSubmit}>
                                          {/* 이메일 입력 */}
                                          <div className="mb-4">
                                              <label htmlFor="email" className="form-label fw-bold">
                                                  이메일 <span className="text-danger">*</span>
                                              </label>
                                              <input
                                                  type="email"
                                                  id="email"
                                                  className="form-control"
                                                  placeholder="example@email.com"
                                                  value={email}
                                                  onChange={(e) => setEmail(e.target.value)}
                                                  required
                                              />
                                          </div>

                                          {/* 비밀번호 입력 */}
                                          <div className="mb-4">
                                              <label htmlFor="password" className="form-label fw-bold">
                                                  비밀번호 <span className="text-danger">*</span>
                                              </label>
                                              <input
                                                  type="password"
                                                  id="password"
                                                  className="form-control"
                                                  placeholder="상담 신청 시 입력한 비밀번호"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  required
                                              />
                                              <div className="form-text">
                                                  상담 신청 시 설정하신 비밀번호를 입력하세요
                                              </div>
                                          </div>

                                          {/* 조회 버튼 */}
                                          <div className="d-grid">
                                              <button
                                                  type="submit"
                                                  className="btn btn-dark btn-lg"
                                                  disabled={loading}
                                              >
                                                  {loading ? (
                                                      <>
                                                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                          조회 중...
                                                      </>
                                                  ) : (
                                                      '조회하기'
                                                  )}
                                              </button>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* 에러 메시지 */}
                      {error && (
                          <div className="row justify-content-center">
                              <div className="col-lg-8">
                                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                      <div>{error}</div>
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* 조회 결과 없음 */}
                      {searched && !loading && !error && consultations.length === 0 && (
                          <div className="row justify-content-center">
                              <div className="col-lg-8">
                                  <div className="alert alert-info text-center">
                                      <i className="bi bi-info-circle me-2"></i>
                                      조회된 상담 내역이 없습니다
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* 조회 결과 표시 */}
                      {consultations.length > 0 && (
                          <div className="row justify-content-center">
                              <div className="col-lg-8">
                                  <h3 className="mb-4">조회 결과 ({consultations.length}건)</h3>

                                  {consultations.map((consultation) => (
                                      <div key={consultation.id} className="card shadow-sm border-0 mb-4">
                                          {/* 카드 헤더 */}
                                          <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                              <div>
                                                  <span className="badge bg-dark me-2">
                                                      {getConsultationTypeLabel(consultation.consultation_type)}
                                                  </span>
                                                  <span className="text-muted small">
                                                      신청일: {formatDate(consultation.created_at)}
                                                  </span>
                                              </div>
                                              {getStatusBadge(consultation.status)}
                                          </div>

                                          {/* 카드 본문 */}
                                          <div className="card-body">
                                              <div className="row mb-3">
                                                  <div className="col-md-6">
                                                      <strong>이름:</strong> {consultation.name}
                                                  </div>
                                                  <div className="col-md-6">
                                                      <strong>연락처:</strong> {consultation.phone}
                                                  </div>
                                              </div>

                                              {consultation.message && (
                                                  <div className="mb-3">
                                                      <strong className="d-block mb-2">상담 내용:</strong>
                                                      <div className="bg-light p-3 rounded">
                                                          {consultation.message}
                                                      </div>
                                                  </div>
                                              )}

                                              {/* 첨부 파일 */}
                                              {consultation.files && consultation.files.length > 0 && (
                                                  <div>
                                                      <strong className="d-block mb-2">첨부 파일:</strong>
                                                      <ul className="list-group list-group-flush">
                                                          {consultation.files.map((file, index) => (
                                                              <li key={index} className="list-group-item px-0">
                                                                  <i className="bi bi-file-earmark-text me-2"></i>
                                                                  <a 
                                                                      href={`http://localhost:8000${file.file}`}
                                                                      target="_blank"
                                                                      rel="noopener noreferrer"
                                                                      className="text-decoration-none"
                                                                  >
                                                                      파일 {index + 1}
                                                                  </a>
                                                                  <small className="text-muted ms-2">
                                                                      ({formatDate(file.uploaded_at)})
                                                                  </small>
                                                              </li>
                                                          ))}
                                                      </ul>
                                                  </div>
                                              )}
                                          </div>

                                          {/* 카드 푸터 */}
                                          <div className="card-footer bg-white border-top-0">
                                              <small className="text-muted">
                                                  <i className="bi bi-info-circle me-1"></i>
                                                  담당 세무사가 검토 후 빠른 시일 내에 연락드리겠습니다
                                              </small>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              </section>

              {/* 추가 안내 섹션 */}
              <section className="py-5 bg-light">
                  <div className="container px-5">
                      <div className="row justify-content-center">
                          <div className="col-lg-8">
                              <div className="card border-0 shadow-sm">
                                  <div className="card-body p-4">
                                      <h5 className="card-title mb-3">
                                          <i className="bi bi-question-circle me-2"></i>
                                          안내사항
                                      </h5>
                                      <ul className="mb-0">
                                          <li className="mb-2">
                                              상담 신청 시 입력하신 이메일과 비밀번호를 정확히 입력해주세요
                                          </li>
                                          <li className="mb-2">
                                              여러 건의 상담을 신청하신 경우 모든 내역이 표시됩니다
                                          </li>
                                          <li className="mb-2">
                                              비밀번호를 잊으신 경우 고객센터(02-1234-5678)로 문의해주세요
                                          </li>
                                          <li>
                                              상담 진행 상황은 등록하신 이메일로도 안내됩니다
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
          </div>
      )
  }

  export default Lookup