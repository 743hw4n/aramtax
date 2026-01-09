import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-stone-200'
                : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* 로고 */}
                    <div className="flex-shrink-0">
                        <Link className="text-xl font-bold tracking-tight transition-colors duration-300" to="/">
                            <span className={`font-serif ${isScrolled ? 'text-stone-800 hover:text-stone-600' : 'text-white hover:text-stone-200'}`}>
                                아람
                            </span>
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
                                    className={`font-serif px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isScrolled
                                            ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                                            : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
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
                            className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-300 ${isScrolled
                                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                                    : 'text-white hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 모바일 드롭다운 메뉴 */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-lg`}>
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
                            className="font-serif text-stone-600 hover:text-stone-900 hover:bg-stone-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
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
