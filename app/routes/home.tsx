import { Link } from "react-router";
import type { Route } from "./+types/home";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Sparkles, Atom, Binary } from "lucide-react";
import { paperMetadata } from "~/data/paper-content";

export function meta({}: Route.MetaArgs) {
  return [
    { title: paperMetadata.title },
    { name: "description", content: paperMetadata.abstract.ko.substring(0, 160) },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-900 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>새로운 이론적 프레임워크</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            소수의 분포,<br />
            양자역학, 그리고<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              홀로그래픽 우주
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl"
          >
            {paperMetadata.subtitle}
          </motion.p>

          {/* Abstract */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">초록</h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              {paperMetadata.abstract.ko}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              to="/paper"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              논문 읽기
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#key-concepts"
              className="inline-flex items-center gap-2 bg-slate-800 text-gray-200 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-700"
            >
              핵심 개념
            </a>
          </motion.div>

          {/* Keywords */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            {paperMetadata.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-300 text-sm font-medium border border-slate-700"
              >
                {keyword}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Key Concepts Section */}
      <div id="key-concepts" className="bg-slate-900 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              핵심 아이디어
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-950 to-indigo-950 p-8 rounded-2xl"
              >
                <Binary className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  소수의 분포
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  리만 가설과 제타 함수의 영점들이 우주의 정보 구조를 반영한다는 165년 된 수수께끼의 새로운 해석
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-950 to-pink-950 p-8 rounded-2xl"
              >
                <Atom className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  양자역학
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  1972년 몽고메리-다이슨의 발견: 소수의 간격이 양자 에너지 준위와 정확히 일치하는 놀라운 연결
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-950 to-orange-950 p-8 rounded-2xl"
              >
                <Sparkles className="w-12 h-12 text-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  홀로그래픽 우주
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  우리 우주가 회전하는 블랙홀 내부일 가능성과 향후 10년 내 검증 가능한 5가지 구체적 예측
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions Section */}
      <div className="bg-gradient-to-br from-indigo-950 to-blue-950 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">
              검증 가능한 과학
            </h2>
            <p className="text-xl text-blue-200 mb-12 text-center max-w-3xl mx-auto">
              이 이론은 단순한 사변이 아닙니다. 향후 10년 내에 JWST, Euclid, LSST, LiteBIRD 등의 현대 관측 시설로 확인하거나 반증할 수 있는 5가지 구체적 예측을 제시합니다.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "우주 회전축 근처의 은하 분포 비대칭성",
                "CMB 온도 및 편광의 방향 이상",
                "암흑 에너지 밀도의 방향 의존성",
                "대규모 구조 형성 패턴의 비등방성",
                "중력파 배경 복사의 방향성"
              ].map((prediction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg">{prediction}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-8 rounded-xl text-center"
              >
                <p className="text-xl font-semibold">
                  검증 타임라인: 2025-2035
                </p>
                <p className="text-blue-200 mt-2">
                  과학의 본질은 검증 가능한 예측을 만들고, 자연의 답을 겸허히 받아들이는 것입니다.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            전체 논문 읽기
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            7개 장으로 구성된 전체 논문에서 이론의 상세한 전개와 수학적 근거를 확인하세요.
          </p>
          <Link
            to="/paper"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="w-6 h-6" />
            논문 전체 보기
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
