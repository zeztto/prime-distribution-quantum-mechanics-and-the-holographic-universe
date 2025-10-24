import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/paper";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Search, Sun, Moon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { paperMetadata } from "~/data/paper-content";
import { useTheme } from "~/contexts/ThemeContext";
import "katex/dist/katex.min.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${paperMetadata.title} - 논문 블로그` },
    { name: "description", content: paperMetadata.abstract.ko.substring(0, 160) },
  ];
}

export default function PaperFull() {
  const { theme, toggleTheme } = useTheme();
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showSearchTip, setShowSearchTip] = useState(false);

  useEffect(() => {
    fetch("/full-paper.md")
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
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

  const handleFootnoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleSearchClick = () => {
    setShowSearchTip(true);
    setTimeout(() => setShowSearchTip(false), 3000);

    // Trigger browser's find function
    if (navigator.userAgent.includes("Mac")) {
      alert("Cmd + F 를 눌러 페이지 내 검색을 사용하세요");
    } else {
      alert("Ctrl + F 를 눌러 페이지 내 검색을 사용하세요");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">홈으로</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSearchClick}
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="검색"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">검색</span>
              </button>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={theme === "dark" ? "라이트 모드" : "다크 모드"}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="hidden sm:inline">{theme === "dark" ? "라이트" : "다크"}</span>
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors relative"
                title="링크 복사"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">공유</span>
                {showCopyMessage && (
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1 rounded whitespace-nowrap">
                    링크가 복사되었습니다
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">논문 로딩 중...</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <article className="prose prose-lg max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
                prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
                prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                prose-hr:border-gray-300 dark:prose-hr:border-gray-700 prose-hr:my-8
              ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    a: ({ node, href, children, ...props }) => {
                      if (href?.startsWith("#")) {
                        return (
                          <a href={href} onClick={handleFootnoteClick} {...props}>
                            {children}
                          </a>
                        );
                      }
                      return <a href={href} {...props}>{children}</a>;
                    },
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </article>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  이 논문에 관심을 가져주셔서 감사합니다.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  홈으로 돌아가기
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
}
