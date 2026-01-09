import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* 로고 */}
                    <div className="flex-shrink-0">
                        <Link className="text-xl font-bold text-white tracking-tight transition-colors duration-200" to="/">
                            <span className="text-stone-400 font-serif hover:text-stone-200">아람</span>
                        </Link>
                    </div>

                    {/* PC 메뉴 */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {[
                                { name: '홈', path: '/' },
                                { name: '아람 소개', path: '/about' },
                                { name: '서비스 소개', path: '/services' },
                                { name: '상담 신청', path: '/consultation' },
                                { name: '상담 조회', path: '/lookup' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="font-serif text-stone-400 hover:text-stone-100 hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-white/5 focus:outline-none"
                        >
                            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 모바일 드롭다운 메뉴 */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#262422] border-b border-stone-800 animate-in slide-in-from-top duration-200`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {[
                        { name: '홈', path: '/' },
                        { name: '아람 소개', path: '/about' },
                        { name: '서비스 소개', path: '/services' },
                        { name: '상담 신청', path: '/consultation' },
                        { name: '상담 조회', path: '/lookup' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="font-serif text-stone-400 hover:text-stone-100 hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar