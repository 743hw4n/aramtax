import { Link } from 'react-router-dom'
import { BuildingOfficeIcon, UserIcon, ReceiptPercentIcon, ShieldCheckIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'

function Home() {
  return (
    <div className="font-sans text-stone-800 bg-[#fafaf9]">
      {/* Hero Section - 메인 배너 */}
      <header className="bg-[#262422] py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#44403c,transparent)] opacity-40"></div>
        <div className="absolute inset-0 opacity-5 bg-[url('/assets/dark-wood.png')]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-stone-400 uppercase border border-stone-700 rounded-full">
                Premium Tax Service
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-stone-100 leading-[1.1] mb-8 font-serif">
                법과 원칙을 지키는 <br className="hidden lg:block" />
                <span className="text-stone-400 italic">든든한 파트너</span>
              </h1>
              <p className="text-lg text-stone-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                복잡한 세무 문제, 흔들리지 않는 전문성으로 해결합니다.
                고객의 권리를 보호하고 최선의 결과를 약속드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a 
                  className="px-10 py-4 rounded-full bg-stone-100 text-[#262422] font-bold hover:bg-white transition-all duration-300 shadow-xl shadow-black/20 text-center" 
                  href="#services"
                >
                  서비스 보기
                </a>
                <Link
                  to="/consultation"
                  className="px-10 py-4 rounded-full border border-stone-600 text-stone-300 font-bold hover:bg-stone-800 hover:text-stone-100 transition-all duration-300 text-center"
                >
                  상담 신청
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none">
              <div className="relative">
                <div className="absolute -inset-4 bg-stone-500/10 rounded-full blur-3xl"></div>
                <img 
                  className="relative rounded-2xl shadow-2xl w-full object-cover grayscale border border-stone-700 brightness-105" 
                  src="https://dummyimage.com/800x600/44403c/a8a29e" 
                  alt="Professional Tax Firm" 
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section - 주요 서비스 */}
      <section className="py-32 bg-[#fafaf9]" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-stone-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Expertise</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#262422] font-serif mb-6">본질에 집중하는 세무 서비스</h2>
            <div className="w-12 h-0.5 bg-stone-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: BuildingOfficeIcon, title: "법인세", desc: "기업의 가치를 높이는 전략적 세무 조정" },
              { icon: UserIcon, title: "소득세", desc: "개인 자산을 보호하는 맞춤형 신고" },
              { icon: ReceiptPercentIcon, title: "부가세", desc: "리스크를 최소화하는 정확한 검토" },
              { icon: ShieldCheckIcon, title: "세무조사", desc: "법적 논리에 기반한 철저한 대응" }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="group p-10 bg-white rounded-2xl border border-stone-100 hover:border-[#262422] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-2">
                  <div className="w-14 h-14 bg-stone-50 rounded-xl flex items-center justify-center text-[#262422] mb-8 group-hover:bg-[#262422] group-hover:text-stone-100 transition-all duration-500">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-4 font-serif">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section - 고객 후기 */}
      <div className="py-32 bg-[#fafaf9] border-y border-stone-200/60">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <ChatBubbleBottomCenterTextIcon className="h-12 w-12 text-stone-200" />
            </div>
            <p className="text-2xl lg:text-3xl font-serif text-[#262422] leading-relaxed mb-10 italic">
              "법적인 문제라 예민했는데, 차분하고 논리적인 설명 덕분에 <br className="hidden md:block"/>
              안심하고 맡길 수 있었습니다."
            </p>
            <div className="text-stone-400 text-xs tracking-[0.4em] uppercase font-bold">
              - Trust & Integrity -
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - 상담 신청 유도 */}
      <section className="py-32 bg-[#fafaf9]">
        <div className="container mx-auto px-4">
          <div className="bg-[#262422] rounded-[3rem] p-12 md:p-24 text-center shadow-3xl relative overflow-hidden">
             {/* 데코레이션 */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-stone-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-100 mb-8 font-serif leading-tight">
                전문가의 도움이 <br />필요하십니까?
              </h2>
              <p className="text-stone-400 mb-12 text-lg font-light leading-relaxed">
                망설이지 말고 문의하십시오. 비밀 유지를 원칙으로 <br className="hidden md:block" />
                성심껏 상담해 드립니다.
              </p>
              <Link
                to="/consultation"
                className="inline-block px-12 py-5 rounded-full bg-stone-100 text-[#262422] font-bold text-lg hover:bg-white transition-all duration-300 shadow-2xl"
              >
                비공개 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home