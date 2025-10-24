import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/paper";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2, ChevronUp, Search } from "lucide-react";
import { PaperMarkdownSection } from "~/components/PaperMarkdownSection";
import { paperMetadata } from "~/data/paper-content";
import "katex/dist/katex.min.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${paperMetadata.title} - 논문 블로그` },
    { name: "description", content: paperMetadata.abstract.ko.substring(0, 160) },
  ];
}

interface SectionWithContent {
  id: string;
  title: string;
  number: string;
  content: string;
}

export default function Paper() {
  const [sectionsWithContent, setSectionsWithContent] = useState<SectionWithContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{section: string; text: string; index: number}>>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Scroll event listener for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    fetch("/full-paper.md")
      .then((response) => response.text())
      .then((text) => {
        // Split paper into sections by main headings
        const sectionSplits = text.split(/(?=^# )/gm);

        // Extract section info and create Section objects
        const extractedSections: SectionWithContent[] = [];

        sectionSplits.forEach((sectionText, index) => {
          // Match section heading: # 1. Title or # 제1장: Title or # 초록 or # 목차
          const headingMatch = sectionText.match(/^# (.+)/m);
          if (headingMatch) {
            const fullTitle = headingMatch[1].trim();

            // Skip 초록 and 목차 sections (초록 is in the header, 목차 is in sidebar)
            if (fullTitle.match(/^초록/) || fullTitle.match(/^목차/) || fullTitle.includes("Table of Contents")) {
              return;
            }

            // Extract number and title for numbered sections
            let number = "";
            let title = fullTitle;
            let id = `section-${index}`;
            let contentWithoutHeading = "";

            if (fullTitle.match(/^(\d+)\\/)) {
              const match = fullTitle.match(/^(\d+)\\. (.+)/);
              if (match) {
                number = match[1];
                title = match[2];
                id = `section-${number}`;
              }
            } else if (fullTitle.match(/^제(\d+)장:/)) {
              const match = fullTitle.match(/^제(\d+)장: (.+)/);
              if (match) {
                number = match[1];
                title = match[2];
                id = `section-${number}`;
              }
            }

            contentWithoutHeading = sectionText.replace(/^# .+\n\n?/, "");

            extractedSections.push({
              id,
              title: title.replace(/\(/g, "(").replace(/\)/g, ")"),
              number,
              content: contentWithoutHeading,
            });
          }
        });

        setSectionsWithContent(extractedSections);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading paper:", error);
        setLoading(false);
      });
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: Array<{section: string; text: string; index: number}> = [];
    const lowerQuery = query.toLowerCase();

    sectionsWithContent.forEach((section, index) => {
      const content = section.content.toLowerCase();
      const title = section.title.toLowerCase();

      if (title.includes(lowerQuery) || content.includes(lowerQuery)) {
        // Find context around the match
        const matchIndex = content.indexOf(lowerQuery);
        const start = Math.max(0, matchIndex - 50);
        const end = Math.min(content.length, matchIndex + lowerQuery.length + 50);
        const context = section.content.substring(start, end);

        results.push({
          section: section.title,
          text: context,
          index: index
        });
      }
    });

    setSearchResults(results);
  };

  const handleSearchResultClick = (index: number) => {
    const section = sectionsWithContent[index];
    if (section) {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setShowSearch(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-200 hover:text-blue-400 transition-all duration-200 font-medium group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>홈으로</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(true)}
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-200 hover:bg-gray-700 rounded-lg transition-all duration-200 text-sm"
                title="검색"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">검색</span>
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg relative"
                title="링크 복사"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden md:inline">공유</span>
                {showCopyMessage && (
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-900 text-xs px-3 py-1 rounded whitespace-nowrap z-50">
                    링크가 복사되었습니다
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent mb-6"></div>
              <p className="text-gray-200 text-lg font-medium">논문을 불러오는 중...</p>
              <p className="text-gray-300 text-sm mt-2">잠시만 기다려주세요</p>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Main Paper Content */}
            <main>
                {/* Paper Header Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="mb-10 bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-700"
                >
                  <div className="text-center mb-10">
                    <div className="inline-block px-4 py-1.5 bg-blue-900/50 text-blue-300 rounded-full text-sm font-semibold mb-6">
                      Academic Paper
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                      {paperMetadata.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 italic font-light">
                      {paperMetadata.subtitle}
                    </p>
                  </div>

                  {/* Authors */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30 rounded-2xl border border-blue-800 shadow-inner">
                    <h3 className="text-sm font-bold text-gray-200 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1 h-4 bg-blue-400 rounded"></span>
                      Authors
                    </h3>
                    <div className="space-y-4">
                      {paperMetadata.authors.map((author, index) => (
                        <div key={index} className="flex items-start gap-4 bg-gray-700/40 p-4 rounded-xl">
                          <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-white text-lg">{author.name}</div>
                            <div className="text-sm text-gray-200 mt-1">
                              {author.affiliation} {author.role}
                            </div>
                            {author.model && (
                              <div className="text-xs text-gray-300 mt-2 font-mono bg-gray-700 inline-block px-2 py-1 rounded">
                                {author.model}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-300 mt-5 pt-4 border-t border-blue-700 text-center">
                      📅 {paperMetadata.date}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {paperMetadata.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 rounded-full text-sm font-semibold hover:from-blue-800/50 hover:to-indigo-800/50 transition-all duration-200 shadow-sm hover:shadow"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Abstract */}
                  <div className="border-t border-gray-700 pt-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-7 bg-blue-400 rounded"></span>
                      초록 (Abstract)
                    </h3>
                    <p className="text-gray-200 leading-[2.4] text-[18px]">
                      {paperMetadata.abstract.ko}
                    </p>
                  </div>
                </motion.div>

                {/* Paper Content - Lazy Loaded Sections */}
                <div className="space-y-12">
                  {sectionsWithContent.map((section, index) => (
                    <motion.div
                      key={section.id}
                      id={section.id}
                      ref={(el) => (sectionRefs.current[section.id] = el)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden"
                    >
                      {/* Section Header */}
                      <div className="px-6 md:px-10 py-4 border-b border-gray-700 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          <span className="text-blue-400 mr-3">{section.number}</span>
                          {section.title}
                        </h2>
                      </div>

                      {/* Section Content */}
                      <div className="px-8 md:px-12 py-8 md:py-12">
                        <PaperMarkdownSection content={section.content} index={index} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-16 p-10 bg-gradient-to-br from-gray-800 to-blue-900/30 rounded-3xl shadow-xl border border-gray-700 text-center"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    논문을 읽어주셔서 감사합니다
                  </h3>
                  <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
                    이 연구가 소수의 분포, 양자역학, 홀로그래픽 우주론의 통합적 이해에 기여하기를 바랍니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-blue-400 hover:text-blue-300 font-bold border-2 border-blue-400 rounded-xl hover:bg-blue-900/30 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      홈으로 돌아가기
                    </Link>
                    <button
                      onClick={scrollToTop}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <ChevronUp className="w-5 h-5" />
                      맨 위로
                    </button>
                  </div>
                </motion.div>
            </main>
          </div>
        )}
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 z-50 hover:scale-110"
          title="맨 위로"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-6 border-b border-gray-700">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="논문에서 검색..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-600 bg-gray-700 text-gray-100 rounded-lg focus:border-blue-400 focus:outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto p-4">
                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-12 text-gray-300">
                    검색 결과가 없습니다
                  </div>
                )}
                {searchResults.length > 0 && (
                  <div className="space-y-2">
                    {searchResults.map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchResultClick(result.index)}
                        className="w-full text-left p-4 hover:bg-blue-900/30 rounded-lg transition-colors border border-transparent hover:border-blue-700"
                      >
                        <div className="font-semibold text-blue-400 mb-1">
                          {result.section}
                        </div>
                        <div className="text-sm text-gray-200 line-clamp-2">
                          ...{result.text}...
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
