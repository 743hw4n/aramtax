import { useState } from 'react'
import axios from 'axios'
import { CheckCircleIcon as CheckCircleSolid, ExclamationCircleIcon as ExclamationCircleSolid } from '@heroicons/react/24/solid'
import { CloudArrowUpIcon, DocumentTextIcon, LockClosedIcon, ClockIcon, IdentificationIcon } from '@heroicons/react/24/outline'

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
        <div className="min-h-screen bg-[#fafaf9]">
            {/* 헤더 섹션 */}
            <div className="bg-[#262422] py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#44403c,transparent)] opacity-40"></div>
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <span className="text-stone-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block text-center">Get in Touch</span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-100 text-center font-serif">상담 신청</h1>
                    <p className="text-stone-400 text-center mt-6 max-w-xl mx-auto font-light leading-relaxed">
                        복잡한 세무 고민, 아람의 전문가들이 <br className="hidden md:block" />
                        가장 명쾌한 해답을 찾아드립니다.
                    </p>
                </div>
            </div>

            {/* 폼 섹션 */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden">
                        <div className="p-8 md:p-12">
                            {/* 상태 메시지 */}
                            {submitStatus && (
                                <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${
                                    submitStatus.type === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-100'
                                    : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                    {submitStatus.type === 'success' ? (
                                        <CheckCircleSolid className="h-5 w-5" />
                                    ) : (
                                        <ExclamationCircleSolid className="h-5 w-5" />
                                    )}
                                    <span className="text-sm font-medium">{submitStatus.message}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* 상담 유형 */}
                                <div>
                                    <label htmlFor="consultation_type" className="block text-sm font-bold text-stone-700 mb-2">
                                        상담 유형 <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="consultation_type"
                                        name="consultation_type"
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9] text-stone-800"
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* 이름 */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-stone-700 mb-2">
                                            이름 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* 연락처 */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-bold text-stone-700 mb-2">
                                            연락처 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]"
                                            placeholder="010-1234-5678"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* 이메일 */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-2">
                                        이메일 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* 비밀번호 */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-stone-700 mb-2">
                                        상담 비밀번호 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]"
                                        placeholder="상담 조회 시 필요합니다"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className="mt-2 text-xs text-stone-400 italic">나중에 상담 결과를 조회하실 때 본인 확인용으로 사용됩니다.</p>
                                </div>

                                {/* 상담 내용 */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-stone-700 mb-2">
                                        상담 내용
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]"
                                        rows="5"
                                        placeholder="상담하고 싶은 내용을 자유롭게 작성해주세요"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* 첨부파일 */}
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">
                                        첨부파일
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="files"
                                            className="hidden"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        <label
                                            htmlFor="files"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-200 rounded-xl cursor-pointer hover:bg-stone-50 hover:border-stone-300 transition-all"
                                        >
                                            <CloudArrowUpIcon className="h-8 w-8 text-stone-400 mb-2" />
                                            <span className="text-sm text-stone-500">클릭하여 파일을 선택하거나 드래그하세요</span>
                                            <span className="text-xs text-stone-400 mt-1">(여러 파일 선택 가능)</span>
                                        </label>
                                    </div>
                                    {files.length > 0 && (
                                        <div className="mt-4 p-4 bg-stone-50 rounded-xl">
                                            <p className="text-xs font-bold text-stone-500 mb-2 uppercase tracking-wider">Selected Files ({files.length})</p>
                                            <ul className="space-y-1">
                                                {files.map((file, index) => (
                                                    <li key={index} className="text-sm text-stone-600 flex items-center gap-2">
                                                        <DocumentTextIcon className="h-4 w-4 text-stone-400" />
                                                        {file.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* 제출 버튼 */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-[#262422] text-stone-100 font-bold rounded-xl shadow-xl hover:bg-[#3f3a36] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? '제출 중입니다...' : '상담 신청하기'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* 추가 안내 정보 */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="flex justify-center mb-4">
                                <LockClosedIcon className="h-8 w-8 text-stone-400" />
                            </div>
                            <h4 className="font-bold text-[#262422] mb-2">비밀 유지</h4>
                            <p className="text-sm text-stone-500">모든 상담 내용은 철저하게 비밀이 보장됩니다.</p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center mb-4">
                                <ClockIcon className="h-8 w-8 text-stone-400" />
                            </div>
                            <h4 className="font-bold text-[#262422] mb-2">빠른 회신</h4>
                            <p className="text-sm text-stone-500">영업일 기준 24시간 이내에 답변을 드립니다.</p>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center mb-4">
                                <IdentificationIcon className="h-8 w-8 text-stone-400" />
                            </div>
                            <h4 className="font-bold text-[#262422] mb-2">1:1 전담</h4>
                            <p className="text-sm text-stone-500">분야별 전문 세무사가 1:1 전담 상담을 진행합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consultation
