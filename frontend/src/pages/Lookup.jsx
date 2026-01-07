import { useState } from 'react'
import axios from 'axios'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon, ClockIcon, DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function Lookup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [consultations, setConsultations] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searched, setSearched] = useState(false)

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

    const getStatusBadge = (status) => {
        const statusMap = {
            'pending' : { text: '접수대기', className: 'bg-stone-100 text-stone-600' },
            'in_progress': { text: '진행중', className: 'bg-[#262422] text-stone-100' },
            'completed' : { text: '완료', className: 'bg-green-50 text-green-700 border border-green-100'}
        }
        const statusInfo = statusMap[status] || statusMap['pending']

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.className}`}>
                {statusInfo.text}
            </span>
        )
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSearched(true)

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/consultations/lookup/`,
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
        <div className="min-h-screen bg-[#fafaf9]">
            {/* Header Section */}
            <header className="py-24 lg:py-32 bg-[#262422] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#44403c,transparent)] opacity-40"></div>
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="text-stone-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Status Check</span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-100 mb-6 font-serif">
                        상담 내역 조회
                    </h1>
                    <p className="text-lg text-stone-400 max-w-xl mx-auto leading-relaxed font-light">
                        상담 신청 시 입력하신 이메일과 비밀번호로 <br className="hidden md:block"/>
                        현재 진행 상황을 실시간으로 확인하세요.
                    </p>
                </div>
            </header>

            {/* Lookup Form Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto">
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 mb-12">
                            <h3 className="text-2xl font-bold text-[#262422] font-serif mb-8 text-center">조회 정보 입력</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-2">이메일</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-stone-700 mb-2">비밀번호</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]"
                                        placeholder="설정한 비밀번호를 입력하세요"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#262422] text-stone-100 font-bold rounded-xl shadow-xl hover:bg-[#3f3a36] transition-all duration-300 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? '조회 중...' : '상담 내역 확인하기'}
                                </button>
                            </form>
                        </div>

                        {/* 메시지 영역 */}
                        {error && (
                            <div className="p-4 rounded-xl mb-8 bg-red-50 text-red-700 border border-red-100 flex items-center gap-3 animate-in fade-in duration-300">
                                <ExclamationCircleIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}

                        {searched && !loading && !error && consultations.length === 0 && (
                            <div className="p-12 text-center bg-stone-100/50 rounded-2xl border border-dashed border-stone-200 animate-in fade-in duration-300">
                                <div className="flex justify-center mb-4">
                                    <MagnifyingGlassIcon className="h-12 w-12 text-stone-300" />
                                </div>
                                <p className="text-stone-500 font-medium">조회된 상담 내역이 없습니다.</p>
                            </div>
                        )}
                    </div>

                    {/* 조회 결과 표시 */}
                    {consultations.length > 0 && (
                        <div className="max-w-4xl mx-auto mt-12">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-[#262422] font-serif">조회 결과 <span className="text-stone-400 text-lg ml-2">{consultations.length}</span></h3>
                            </div>

                            <div className="space-y-8">
                                {consultations.map((consultation) => (
                                    <div key={consultation.id} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
                                        {/* 카드 상단 정보 */}
                                        <div className="bg-[#fafaf9] px-8 py-4 border-b border-stone-100 flex flex-wrap justify-between items-center gap-4">
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-[#262422] text-stone-100 text-[10px] font-bold uppercase tracking-wider rounded">
                                                    {getConsultationTypeLabel(consultation.consultation_type)}
                                                </span>
                                                <span className="text-stone-400 text-xs font-medium">
                                                    신청일: {formatDate(consultation.created_at)}
                                                </span>
                                            </div>
                                            {getStatusBadge(consultation.status)}
                                        </div>

                                        <div className="p-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                <div>
                                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1">Client Name</span>
                                                    <div className="text-stone-800 font-bold">{consultation.name}</div>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1">Contact</span>
                                                    <div className="text-stone-800 font-bold">{consultation.phone}</div>
                                                </div>
                                            </div>

                                            {consultation.message && (
                                                <div className="mb-8">
                                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-3">Inquiry Content</span>
                                                    <div className="bg-[#fafaf9] p-6 rounded-2xl text-stone-600 leading-relaxed text-sm italic border border-stone-50">
                                                        "{consultation.message}"
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* 관리자 답변 */}
                                            {consultation.admin_response && (
                                                <div className="mb-8 border-t border-stone-100 pt-8">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#262422]"></div>
                                                        <span className="text-xs font-bold text-[#262422] uppercase tracking-widest">Professional Response</span>
                                                    </div>
                                                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 text-stone-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                                                        {consultation.admin_response}
                                                    </div>
                                                    {consultation.responded_at && (
                                                        <div className="text-stone-400 text-[10px] mt-3 flex items-center gap-1">
                                                            <ClockIcon className="h-3 w-3" />
                                                            답변일시: {formatDate(consultation.responded_at)}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            
                                            {/* 첨부 파일 */}
                                            {consultation.files && consultation.files.length > 0 && (
                                                <div className="border-t border-stone-100 pt-8">
                                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-4">Attachments</span>
                                                    <div className="flex flex-wrap gap-3">
                                                        {consultation.files.map((file, index) => (
                                                            <a
                                                                key={index}
                                                                href={`${API_BASE_URL}${file.file}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-600 hover:border-[#262422] hover:text-[#262422] transition-all"
                                                            >
                                                                <DocumentTextIcon className="h-4 w-4" />
                                                                문서 {index + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 안내 섹션 */}
            <section className="py-20 bg-white border-t border-stone-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-stone-50 p-8 rounded-3xl border border-stone-100">
                        <h5 className="flex items-center gap-3 text-lg font-bold text-[#262422] font-serif mb-6">
                            <InformationCircleIcon className="h-6 w-6 text-stone-400" />
                            이용 안내
                        </h5>
                        <ul className="space-y-4 text-sm text-stone-500 leading-relaxed">
                            <li className="flex gap-3">
                                <span className="text-[#262422] font-bold">•</span>
                                <span>상담 신청 시 입력하신 <strong>이메일과 비밀번호</strong>를 정확히 입력해주세요.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#262422] font-bold">•</span>
                                <span>비밀번호를 분실하신 경우 고객센터(02-1234-5678)로 문의주시면 본인 확인 후 안내해 드립니다.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#262422] font-bold">•</span>
                                <span>모든 상담 내역은 보안 서버에 안전하게 보관되며 답변이 완료되면 등록된 이메일로도 알림을 보내드립니다.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Lookup
