import { Link } from 'react-router-dom'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#262422] text-stone-400 border-t border-stone-800 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* 회사 정보 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-100 tracking-tight">
                            세무법인 <span className="text-stone-500 font-serif">아람</span>
                        </h3>
                        <p className="leading-relaxed max-w-xs text-sm text-stone-500">
                            법과 원칙을 준수하며 <br />
                            고객의 정당한 권리를 지키는 <br />
                            든든한 법적 보호막이 되겠습니다.
                        </p>
                    </div>

                    {/* 연락처 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-stone-200 uppercase tracking-widest">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <EnvelopeIcon className="h-5 w-5 text-stone-600" />
                                <span>info@aram-tax.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <PhoneIcon className="h-5 w-5 text-stone-600" />
                                <span>02-1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPinIcon className="h-5 w-5 text-stone-600" />
                                <span>서울특별시 강남구 테헤란로</span>
                            </li>
                        </ul>
                    </div>

                    {/* 빠른 링크 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-stone-200 uppercase tracking-widest">Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/about" className="hover:text-stone-200 transition-colors duration-200 block py-1">
                                    아람 소개
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-stone-200 transition-colors duration-200 block py-1">
                                    서비스 소개
                                </Link>
                            </li>
                            <li>
                                <Link to="/consultation" className="hover:text-stone-200 transition-colors duration-200 block py-1">
                                    상담 신청
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 하단 카피라이트 */}
                <div className="border-t border-stone-800 pt-8 mt-12 text-center text-xs text-stone-600">
                    <p>
                        &copy; {currentYear} ARAM TAX CORPORATION. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer