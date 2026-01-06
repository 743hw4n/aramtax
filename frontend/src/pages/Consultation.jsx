import { useState } from 'react'    // 폼 데이터 상태 관리
  import axios from 'axios'         // Django API로 데이터 전송

  function Consultation() {
      const [formData, setFormData] = useState({
          consultation_type: 'corporate_tax',
          name: '',
          email: '',
          phone: '',
          password: '',
          message: ''
      })
      const [files, setFiles] = useState([])
      const [isSubmitting, setIsSubmitting] = useState(false)
      const [submitStatus, setSubmitStatus] = useState(null)

      const handleChange = (e) => {
          const { name, value } = e.target
          setFormData(prev => ({
              ...prev,
              [name]: value
          }))
      }

      const handleFileChange = (e) => {
          setFiles(Array.from(e.target.files))
      }

      const handleSubmit = async (e) => {
          e.preventDefault()
          setIsSubmitting(true)
          setSubmitStatus(null)

          try {
              const formDataToSend = new FormData()
              formDataToSend.append('consultation_type', formData.consultation_type)
              formDataToSend.append('name', formData.name)
              formDataToSend.append('email', formData.email)
              formDataToSend.append('phone', formData.phone)
              formDataToSend.append('password', formData.password)
              formDataToSend.append('message', formData.message)

              files.forEach(file => {
                  formDataToSend.append('uploaded_files', file)
              })

              await axios.post('http://localhost:8000/api/consultations/', formDataToSend)

              setSubmitStatus({
                  type: 'success',
                  message: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.'
              })

              // 폼 초기화
              setFormData({
                  consultation_type: 'corporate_tax',
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                  message: ''
              })
              setFiles([])
              e.target.reset()
          } catch (error) {
              setSubmitStatus({
                  type: 'error',
                  message: '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.'
              })
          } finally {
              setIsSubmitting(false)
          }
      }

      return (
          <div className="min-vh-100 bg-light">
              {/* 헤더 섹션 */}
              <div className="bg-dark text-white py-5">
                  <div className="container px-5">
                      <h1 className="display-4 fw-bold text-center">상담 신청</h1>
                      <p className="lead text-center mt-3">
                          전문 세무사가 친절하게 상담해 드립니다
                      </p>
                  </div>
              </div>

              {/* 폼 섹션 */}
              <div className="container px-5 py-5">
                  <div className="row justify-content-center">
                      <div className="col-lg-8">
                          <div className="card shadow-lg border-0">
                              <div className="card-body p-5">
                                  {/* 상태 메시지 */}
                                  {submitStatus && (
                                      <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                          {submitStatus.message}
                                      </div>
                                  )}

                                  <form onSubmit={handleSubmit}>
                                      {/* 상담 유형 */}
                                      <div className="mb-4">
                                          <label htmlFor="consultation_type" className="form-label fw-bold">
                                              상담 유형 <span className="text-danger">*</span>
                                          </label>
                                          <select
                                              id="consultation_type"
                                              name="consultation_type"
                                              className="form-select"
                                              value={formData.consultation_type}
                                              onChange={handleChange}
                                              required
                                          >
                                              <option value="corporate_tax">법인세</option>
                                              <option value="income_tax">소득세</option>
                                              <option value="vat">부가가치세</option>
                                              <option value="comprehensive_income">종합소득세</option>
                                              <option value="other">기타</option>
                                          </select>
                                      </div>

                                      {/* 이름 */}
                                      <div className="mb-4">
                                          <label htmlFor="name" className="form-label fw-bold">
                                              이름 <span className="text-danger">*</span>
                                          </label>
                                          <input
                                              type="text"
                                              id="name"
                                              name="name"
                                              className="form-control"
                                              value={formData.name}
                                              onChange={handleChange}
                                              required
                                          />
                                      </div>

                                      {/* 이메일 */}
                                      <div className="mb-4">
                                          <label htmlFor="email" className="form-label fw-bold">
                                              이메일 <span className="text-danger">*</span>
                                          </label>
                                          <input
                                              type="email"
                                              id="email"
                                              name="email"
                                              className="form-control"
                                              value={formData.email}
                                              onChange={handleChange}
                                              required
                                          />
                                      </div>

                                      {/* 연락처 */}
                                      <div className="mb-4">
                                          <label htmlFor="phone" className="form-label fw-bold">
                                              연락처 <span className="text-danger">*</span>
                                          </label>
                                          <input
                                              type="tel"
                                              id="phone"
                                              name="phone"
                                              className="form-control"
                                              placeholder="010-1234-5678"
                                              value={formData.phone}
                                              onChange={handleChange}
                                              required
                                          />
                                      </div>

                                      {/* 비밀번호 */}
                                      <div className="mb-4">
                                          <label htmlFor="password" className="form-label fw-bold">
                                              비밀번호 <span className="text-danger">*</span>
                                          </label>
                                          <input
                                              type="password"
                                              id="password"
                                              name="password"
                                              className="form-control"
                                              placeholder="상담 내용 조회 시 사용할 비밀번호"
                                              value={formData.password}
                                              onChange={handleChange}
                                              required
                                          />
                                          <div className="form-text">
                                              이 비밀번호로 나중에 상담 내용을 조회할 수 있습니다.
                                          </div>
                                      </div>

                                      {/* 상담 내용 */}
                                      <div className="mb-4">
                                          <label htmlFor="message" className="form-label fw-bold">
                                              상담 내용
                                          </label>
                                          <textarea
                                              id="message"
                                              name="message"
                                              className="form-control"
                                              rows="5"
                                              placeholder="상담하고 싶은 내용을 자유롭게 작성해주세요"
                                              value={formData.message}
                                              onChange={handleChange}
                                          ></textarea>
                                      </div>

                                      {/* 첨부파일 */}
                                      <div className="mb-4">
                                          <label htmlFor="files" className="form-label fw-bold">
                                              첨부파일
                                          </label>
                                          <input
                                              type="file"
                                              id="files"
                                              className="form-control"
                                              multiple
                                              onChange={handleFileChange}
                                          />
                                          <div className="form-text">
                                              관련 서류가 있다면 첨부해주세요 (여러 파일 선택 가능)
                                          </div>
                                          {files.length > 0 && (
                                              <div className="mt-2">
                                                  <p className="small text-muted mb-1">
                                                      선택된 파일: {files.length}개
                                                  </p>
                                                  <ul className="small text-muted">
                                                      {files.map((file, index) => (
                                                          <li key={index}>- {file.name}</li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          )}
                                      </div>

                                      {/* 제출 버튼 */}
                                      <div className="d-grid">
                                          <button
                                              type="submit"
                                              className="btn btn-dark btn-lg"
                                              disabled={isSubmitting}
                                          >
                                              {isSubmitting ? '제출 중...' : '상담 신청'}
                                          </button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  export default Consultation