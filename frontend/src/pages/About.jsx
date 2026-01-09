import { Link } from 'react-router-dom'
import { TrophyIcon, ShieldCheckIcon, CheckCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

function About() {
  return (
    <div className="font-sans text-stone-800 bg-[#fafaf9]">
      {/* Header Section - 페이지 제목 */}
      <header className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/about-hero.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-stone-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">About Us</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-100 mb-6 font-serif">
            세무법인 아람을 소개합니다
          </h1>
          <p className="text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed font-light">
            20년 경력의 전문 세무사가 여러분의 든든한 파트너가 되어드립니다. <br className="hidden md:block" />
            신뢰와 원칙을 바탕으로 고객의 가치를 최우선으로 생각합니다.
          </p>
        </div>
      </header>

      {/* About Section - 회사 소개 */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  className="rounded-lg shadow-xl w-full object-cover grayscale brightness-105"
                  src="https://dummyimage.com/600x400/44403c/a8a29e"
                  alt="세무법인 아람 사무실"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#262422] font-serif mb-6">
                신뢰와 전문성의 <br />
                <span className="text-stone-500 italic">세무 파트너</span>
              </h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                세무법인 아람은 2005년 설립 이래 기업과 개인 고객에게 최고의 세무 서비스를 제공해왔습니다.
                우리는 단순한 세무 신고를 넘어, 고객의 사업 성장과 재무 건전성을 위한 전략적 파트너로서 함께합니다.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                복잡한 세법을 쉽게 풀어드리고, 합법적인 절세 방안을 제시하여 고객의 가치를 극대화하는 것,
                그것이 바로 아람이 추구하는 길입니다.
              </p>
              <div className="flex gap-8 border-t border-stone-200 pt-8">
                <div>
                  <div className="text-3xl font-bold text-[#262422] font-serif">20+</div>
                  <div className="text-stone-500 text-sm mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#262422] font-serif">95%</div>
                  <div className="text-stone-500 text-sm mt-1">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#262422] font-serif">500+</div>
                  <div className="text-stone-500 text-sm mt-1">Corporate Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - 핵심 가치 */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#262422] font-serif mb-4">Core Values</h2>
            <p className="text-stone-500">아람을 선택해야 하는 변치 않는 이유입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrophyIcon, title: "전문성", desc: "20년 이상의 세무 경험을 바탕으로 한 정확하고 깊이 있는 서비스" },
              { icon: ShieldCheckIcon, title: "신뢰성", desc: "고객과의 약속을 생명처럼 여기며, 검증된 결과로 증명합니다" },
              { icon: CheckCircleIcon, title: "정확성", desc: "다중 검토 시스템을 통해 오류 없는 완벽한 신고를 지향합니다" },
              { icon: ChatBubbleLeftRightIcon, title: "소통", desc: "언제나 열려있는 소통 채널로 고객의 고민을 경청합니다" }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="text-center p-8 rounded-xl bg-[#fafaf9] hover:bg-stone-100 transition-colors duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#262422] text-stone-100 mb-6 shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#262422] mb-3 font-serif">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section - 팀 소개 */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#262422] font-serif mb-4">Professional Team</h2>
            <p className="text-stone-500">풍부한 경험과 전문성을 갖춘 세무사들이 함께합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "김세무", role: "대표 세무사", exp: "경력 25년 / 법인세 및 국제조세" },
              { name: "이회계", role: "수석 세무사", exp: "경력 15년 / 소득세 및 부가가치세" },
              { name: "박신고", role: "전문 세무사", exp: "경력 10년 / 재산세 및 상속세" }
            ].map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 text-center group">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-stone-100 group-hover:border-[#262422] transition-colors duration-300">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={`https://dummyimage.com/300x300/${index === 0 ? '292524' : index === 1 ? '44403c' : '57534e'}/a8a29e`}
                    alt={member.name}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#262422] mb-1 font-serif">{member.name}</h3>
                <div className="text-stone-400 text-sm font-medium mb-4 tracking-wider uppercase">{member.role}</div>
                <div className="w-8 h-0.5 bg-stone-200 mx-auto mb-4 group-hover:bg-[#262422] transition-colors duration-300"></div>
                <p className="text-stone-500 text-sm">
                  {member.exp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 상담 유도 */}
      <section className="py-24 bg-[#262422] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-100 mb-6 font-serif">세무 고민, 전문가와 함께하세요</h2>
          <p className="text-stone-400 mb-10 max-w-xl mx-auto font-light">
            아람은 언제나 고객님의 든든한 파트너로 기다리고 있습니다. <br />
            지금 바로 상담을 신청해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link className="px-8 py-4 rounded-full bg-stone-100 text-[#262422] font-bold hover:bg-white transition-all duration-300" to="/consultation">
              상담 신청하기
            </Link>
            <Link className="px-8 py-4 rounded-full border border-stone-600 text-stone-300 font-bold hover:bg-stone-800 hover:text-stone-100 transition-all duration-300" to="/services">
              서비스 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About