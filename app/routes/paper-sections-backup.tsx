import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/paper";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { PaperSection } from "~/components/PaperSection";
import { TableOfContents } from "~/components/TableOfContents";
import { paperMetadata, paperSections } from "~/data/paper-content";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${paperMetadata.title} - 논문 블로그` },
    { name: "description", content: paperMetadata.abstract.ko.substring(0, 160) },
  ];
}

export default function Paper() {
  const [activeSection, setActiveSection] = useState<string | undefined>();

  const handleSectionInView = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">홈으로</span>
            </Link>

            <div className="flex items-center gap-4">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="공유하기"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">공유</span>
              </button>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="PDF 다운로드"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr,300px] gap-8">
          {/* Paper Content */}
          <main className="max-w-4xl">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {paperMetadata.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {paperMetadata.subtitle}
              </p>

              {/* Authors */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Authors:</h3>
                <div className="space-y-2">
                  {paperMetadata.authors.map((author, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-gray-900">{author.name}</span>
                      <span className="text-gray-600 ml-2">
                        {author.affiliation} {author.role}
                      </span>
                      {author.model && (
                        <span className="text-gray-500 ml-2 text-xs">({author.model})</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{paperMetadata.date}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {paperMetadata.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">초록</h2>
                <p className="text-gray-700 leading-relaxed">
                  {paperMetadata.abstract.ko}
                </p>
              </div>
            </motion.div>

            {/* Paper Sections */}
            <div className="space-y-12">
              {paperSections.map((section, index) => (
                <PaperSection
                  key={section.id}
                  section={section}
                  index={index}
                  onInView={handleSectionInView}
                />
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 pt-8 border-t border-gray-300"
            >
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  이 논문에 관심을 가져주셔서 감사합니다.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  홈으로 돌아가기
                </Link>
              </div>
            </motion.div>
          </main>

          {/* Table of Contents (Desktop) */}
          <aside className="hidden lg:block">
            <TableOfContents
              sections={paperSections}
              activeSection={activeSection}
            />
          </aside>
        </div>
      </div>

      {/* Table of Contents (Mobile) */}
      <div className="lg:hidden">
        <TableOfContents
          sections={paperSections}
          activeSection={activeSection}
        />
      </div>
    </div>
  );
}
