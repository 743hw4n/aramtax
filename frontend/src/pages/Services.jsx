import { Link } from 'react-router-dom'
import { BuildingOfficeIcon, UserIcon, ReceiptPercentIcon, ChartBarIcon, DocumentTextIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

function Services() {
    return (
        <div className="font-sans text-stone-800 bg-[#fafaf9]">
            {/* Header Section - 페이지 제목 */}
            <header className="py-24 lg:py-32 bg-[#262422] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#44403c,transparent)] opacity-40"></div>
                <div className="absolute inset-0 opacity-5 bg-[url('/assets/dark-wood.png')]"></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-stone-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Expertise</span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-100 mb-6 font-serif">
                        전문 세무 서비스
                    </h1>
                    <p className="text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed font-light">
                        고객 맞춤형 세무 솔루션으로 <br className="hidden md:block"/>
                        안정적이고 성공적인 사업 운영을 지원합니다.
                    </p>
                </div>
            </header>

            {/* Services Grid - 주요 서비스 */}
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl font-bold text-[#262422] font-serif mb-4">주요 서비스 소개</h2>
                        <p className="text-stone-500">전문성과 오랜 경험을 바탕으로 최상의 세무 솔루션을 제공합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BuildingOfficeIcon,
                                title: "법인세 신고 대행",
                                desc: "법인의 결산 및 세무조정을 통한 정확한 법인세 신고를 대행합니다.",
                                features: ["법인 결산 및 재무제표 작성", "세무조정 계산서 작성", "법인세 신고 및 납부", "중간예납 신고"]
                            },
                            {
                                icon: UserIcon,
                                title: "소득세 신고 대행",
                                desc: "개인사업자 및 프리랜서를 위한 종합소득세 신고 서비스를 제공합니다.",
                                features: ["종합소득세 신고", "필요경비 검토 및 최적화", "근로소득 연말정산", "양도소득세 신고"]
                            },
                            {
                                icon: ReceiptPercentIcon,
                                title: "부가가치세 신고",
                                desc: "정기 및 수시 부가가치세 신고를 정확하게 처리합니다.",
                                features: ["정기 신고 (1월, 7월)", "예정 신고 (4월, 10월)", "간이과세자 신고", "매입매출 전표 검토"]
                            },
                            {
                                icon: ChartBarIcon,
                                title: "세무 컨설팅",
                                desc: "전략적 절세 방안 수립 및 세무 리스크 관리 지원합니다.",
                                features: ["절세 전략 수립", "세무 리스크 진단", "사업 구조 개편 자문", "M&A 세무 자문"]
                            },
                            {
                                icon: DocumentTextIcon,
                                title: "기장 대리",
                                desc: "월별 장부 작성 및 재무제표 작성을 대행합니다.",
                                features: ["월별 회계장부 작성", "재무제표 작성", "경영 분석 자료 제공", "증빙 서류 관리"]
                            },
                            {
                                icon: ShieldCheckIcon,
                                title: "세무조사 대응",
                                desc: "세무조사 대응 전략 수립 및 불복청구를 지원합니다.",
                                features: ["세무조사 사전 준비", "조사 현장 입회 및 대응", "불복청구 대리", "과세전적부심사 청구"]
                            }
                        ].map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div key={index} className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-stone-200 transition-all duration-300">
                                    <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-[#262422] mb-6 border border-stone-100">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#262422] mb-4 font-serif">{item.title}</h3>
                                    <p className="text-stone-500 text-sm leading-relaxed mb-6">
                                        {item.desc}
                                    </p>
                                    <ul className="space-y-3">
                                        {item.features.map((feat, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3 text-sm text-stone-600">
                                                <CheckCircleIcon className="h-4 w-4 text-stone-300 mt-0.5 flex-shrink-0" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section - 서비스 프로세스 */}
            <section className="py-24 bg-white border-y border-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#262422] font-serif mb-4">서비스 진행 프로세스</h2>
                        <p className="text-stone-500">체계적이고 투명한 절차로 진행됩니다.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {[
                            { step: "01", title: "상담 신청", desc: "온라인/전화 상담" },
                            { step: "02", title: "자료 검토", desc: "전문가 정밀 분석" },
                            { step: "03", title: "견적 제시", desc: "합리적인 제안" },
                            { step: "04", title: "계약 체결", desc: "공식 업무 착수" },
                            { step: "05", title: "업무 진행", desc: "전문 세무사 전담" },
                            { step: "06", title: "완료 보고", desc: "결과 보고 및 관리" }
                        ].map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-3xl font-serif text-stone-200 group-hover:text-stone-400 transition-colors duration-300 mb-2">{item.step}</div>
                                <h5 className="font-bold text-[#262422] mb-2">{item.title}</h5>
                                <p className="text-stone-500 text-xs leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - 상담 유도 */}
            <section className="py-24 bg-[#fafaf9]">
                <div className="container mx-auto px-4">
                    <div className="bg-[#262422] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-500/5 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-6 font-serif">서비스가 필요하신가요?</h2>
                            <p className="text-stone-400 mb-10 max-w-xl mx-auto font-light leading-relaxed text-lg">
                                복잡한 세무 고민, 더 이상 미루지 마세요. <br />
                                아람이 명확한 해답을 드리겠습니다.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link className="px-10 py-4 rounded-full bg-stone-100 text-[#262422] font-bold hover:bg-white transition-all duration-300 shadow-xl" to="/consultation">
                                    무료 상담 신청하기
                                </Link>
                                <Link className="px-10 py-4 rounded-full border border-stone-600 text-stone-300 font-bold hover:bg-stone-800 hover:text-stone-100 transition-all duration-300" to="/about">
                                    회사 소개 보기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services
