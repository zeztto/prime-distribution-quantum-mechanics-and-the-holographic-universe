import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

interface PaperMarkdownSectionProps {
  content: string;
  index: number;
}

export function PaperMarkdownSection({ content, index }: PaperMarkdownSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredFootnote, setHoveredFootnote] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const footnoteMapRef = useRef<Map<string, string>>(new Map());

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsLoaded(true);
    }
  }, [inView]);

  // Extract footnotes from content
  useEffect(() => {
    const footnoteRegex = /\[\^(\d+)\]:\s*\*\*(.+?)\*\*:\s*(.+?)(?=\n\[\^|\n\n---|\n\n#|$)/gs;
    const matches = content.matchAll(footnoteRegex);
    const map = new Map<string, string>();

    for (const match of matches) {
      const [, id, title, text] = match;
      map.set(id, `${title}: ${text.trim()}`);
    }

    footnoteMapRef.current = map;
  }, [content]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFootnoteHover = (e: React.MouseEvent<HTMLElement>, id: string) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const footnoteText = footnoteMapRef.current.get(id);
    if (footnoteText) {
      setHoveredFootnote(footnoteText);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleFootnoteLeave = () => {
    // Add a small delay before hiding tooltip
    timeoutRef.current = setTimeout(() => {
      setHoveredFootnote(null);
    }, 300);
  };

  return (
    <div ref={ref} className="min-h-[200px]">
      {isLoaded ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <article className="
            prose prose-lg max-w-none relative
            [&_*]:text-gray-100

            prose-headings:font-bold prose-headings:tracking-tight prose-headings:!text-white
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-7 prose-h3:!text-white prose-h3:leading-tight prose-h3:scroll-mt-28
            prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-5 prose-h4:!text-white prose-h4:font-semibold prose-h4:leading-snug prose-h4:scroll-mt-28
            prose-h5:text-lg prose-h5:mt-6 prose-h5:mb-4 prose-h5:!text-white prose-h5:font-semibold prose-h5:scroll-mt-28

            prose-p:!text-gray-100 prose-p:leading-[2.4] prose-p:mb-8 prose-p:text-[18px]
            prose-p:first-of-type:text-[19px] prose-p:first-of-type:leading-[2.4]

            prose-strong:!text-white prose-strong:font-bold prose-strong:bg-yellow-900/30 prose-strong:px-1.5 prose-strong:py-0.5 prose-strong:rounded
            prose-em:!text-gray-200 prose-em:italic

            prose-a:!text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:!text-blue-300 prose-a:transition-colors

            prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-8 prose-ul:space-y-4
            prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-8 prose-ol:space-y-4
            prose-li:!text-gray-100 prose-li:leading-[2.2] prose-li:text-[18px] prose-li:scroll-mt-28

            prose-code:!text-pink-300 prose-code:!bg-pink-900/30 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-[15px] prose-code:font-mono prose-code:border prose-code:border-pink-800
            prose-pre:!bg-gradient-to-br prose-pre:!from-gray-950 prose-pre:!to-gray-900 prose-pre:!text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-800 prose-pre:my-8 prose-pre:leading-relaxed

            prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:pl-6 prose-blockquote:pr-5 prose-blockquote:italic prose-blockquote:!text-gray-200 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-900/20 prose-blockquote:to-indigo-900/20 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:leading-[1.9]

            prose-hr:border-gray-700 prose-hr:my-10 prose-hr:border-t-2

            prose-table:border-collapse prose-table:w-full prose-table:shadow-md prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-8
            prose-thead:bg-gradient-to-r prose-thead:from-blue-700 prose-thead:to-indigo-700
            prose-th:!text-white prose-th:p-4 prose-th:text-left prose-th:font-bold prose-th:text-sm
            prose-td:p-4 prose-td:border-b prose-td:border-gray-700 prose-td:bg-gray-800 even:prose-tr:bg-gray-700/50 prose-td:leading-relaxed prose-td:!text-gray-100

            prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-700 prose-img:my-8
          ">
            <style jsx global>{`
              /* Diagram box styling */
              .diagram-box {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border: 2px solid #3b82f6;
                border-radius: 12px;
                padding: 2rem;
                margin: 2rem 0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }

              .diagram-box pre {
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
                box-shadow: none !important;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.6;
                color: #1e293b;
                text-align: center;
              }

              .diagram-box code {
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                color: #1e293b !important;
                font-size: 14px;
              }

              /* Correspondence table styling */
              .correspondence-table {
                width: 100%;
                border-collapse: collapse;
                margin: 0 auto 1.5rem;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              }

              .correspondence-table td {
                padding: 1rem 1.5rem;
                text-align: center;
                border: 2px solid #3b82f6;
                font-weight: 600;
                color: #1e293b;
                font-size: 15px;
              }

              .correspondence-table tr:first-child td {
                background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
                color: white;
                font-weight: 700;
              }

              .correspondence-table tr:nth-child(2) td {
                background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
                color: white;
              }

              .correspondence-table tr:nth-child(3) td {
                background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);
                color: #1e40af;
              }

              /* Correspondence arrows styling */
              .correspondence-arrows {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-top: 1.5rem;
              }

              .arrow-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
              }

              .arrow-item .arrow {
                font-size: 32px;
                font-weight: bold;
                color: #2563eb;
              }

              .arrow-item .label {
                font-size: 14px;
                font-weight: 600;
                color: #1e40af;
                text-align: center;
              }

              /* Hide "Footnotes" heading - more specific selectors */
              section[data-footnotes] h2,
              .footnotes h2,
              section.footnotes h2 {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              /* Style footnote section - no border */
              section[data-footnotes],
              .footnotes,
              section.footnotes {
                margin-top: 3rem;
                padding-top: 0;
                border-top: none !important;
              }

              /* Footnote list items */
              section[data-footnotes] ol,
              .footnotes ol,
              section.footnotes ol {
                space-y: 0.75rem;
              }

              section[data-footnotes] li,
              .footnotes li,
              section.footnotes li {
                scroll-margin-top: 7rem;
                font-size: 16px;
                line-height: 1.8;
                margin-bottom: 0.75rem;
              }

              /* Footnote references (superscript numbers) */
              sup[data-footnote-ref],
              sup {
                scroll-margin-top: 7rem;
              }

              sup[data-footnote-ref] a,
              sup a {
                font-weight: 600;
                text-decoration: none;
                padding: 0 0.15rem;
              }

              sup[data-footnote-ref] a:hover,
              sup a:hover {
                background-color: #dbeafe;
                border-radius: 2px;
              }

              /* Back reference arrow */
              a[data-footnote-backref],
              .data-footnote-backref {
                margin-left: 0.5rem;
                color: #3b82f6;
                text-decoration: none;
              }

              a[data-footnote-backref]:hover,
              .data-footnote-backref:hover {
                color: #1d4ed8;
              }
            `}</style>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              components={{
                // Custom section component to handle footnotes section
                section: ({ node, ...props }) => {
                  const isFootnotes = props['data-footnotes'] !== undefined;
                  if (isFootnotes) {
                    // Remove border-top styling and render without h2 heading
                    return <section {...props} className="mt-12 pt-0 border-t-0" />;
                  }
                  return <section {...props} />;
                },
                // Map markdown headings: h2 -> h3, h3 -> h4, h4 -> h5
                h2: ({ node, ...props }) => {
                  // Hide "Footnotes" heading completely
                  const text = String(props.children);
                  if (text === 'Footnotes' || text.includes('Footnotes')) {
                    return null;
                  }
                  return (
                    <h3 className="text-2xl font-bold text-blue-900 mt-12 mb-7 leading-tight scroll-mt-28 flex items-center gap-2" {...props}>
                      <span className="inline-block w-1.5 h-6 bg-blue-600 rounded"></span>
                      <span>{props.children}</span>
                    </h3>
                  );
                },
                h3: ({ node, ...props }) => (
                  <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-5 leading-snug scroll-mt-28 flex items-center gap-2" {...props}>
                    <span className="inline-block w-1 h-5 bg-gray-400 rounded"></span>
                    <span>{props.children}</span>
                  </h4>
                ),
                h4: ({ node, ...props }) => (
                  <h5 className="text-lg font-semibold text-gray-700 mt-6 mb-4 scroll-mt-28" {...props} />
                ),
                p: ({ node, ...props }) => {
                  // Check if this paragraph contains only emphasized math (single child that is <em>)
                  const children = Array.isArray(props.children) ? props.children : [props.children];
                  const isMathFormula = children.length === 1 &&
                    typeof children[0] === 'object' &&
                    children[0]?.type === 'em';

                  if (isMathFormula) {
                    return (
                      <p className="text-center my-8 text-[20px] font-bold text-gray-900" {...props} />
                    );
                  }
                  return <p className="text-gray-700 text-[18px] leading-[2.4] mb-8" {...props} />;
                },
                ul: ({ node, ...props }) => (
                  <ul className="list-disc ml-6 mb-8 space-y-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal ml-6 mb-8 space-y-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-gray-700 text-[18px] leading-[2.2]" {...props} />
                ),
                em: ({ node, ...props }) => {
                  // Check if this is a math formula (contains math symbols)
                  const text = String(props.children);
                  const hasMathSymbols = /[=+\-×÷∫∑πζρλ()]/.test(text) || text.includes('->') || text.includes('↔');

                  if (hasMathSymbols) {
                    return <span className="not-italic font-bold" {...props} />;
                  }
                  return <em className="italic text-gray-800" {...props} />;
                },
                code: ({ node, inline, ...props }) => {
                  if (inline) {
                    return <code className="text-pink-700 bg-pink-50 px-2 py-1 rounded-md text-[15px] font-mono border border-pink-200" {...props} />;
                  }
                  return <code {...props} />;
                },
                pre: ({ node, ...props }) => (
                  <pre className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 p-6 rounded-xl overflow-x-auto my-8 border-2 border-blue-200 text-center font-mono text-sm leading-relaxed" {...props} />
                ),
                a: ({ node, href, ...props }) => {
                  // Handle footnote back references (from footnote back to text)
                  if (href?.startsWith('#user-content-fnref-')) {
                    const footnoteId = href.replace('#user-content-fnref-', '');
                    return (
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          const targetElement = document.getElementById(`user-content-fnref-${footnoteId}`);
                          if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className="text-blue-600 no-underline hover:text-blue-700 cursor-pointer"
                        {...props}
                      />
                    );
                  }
                  // Handle footnote references (from text to footnote)
                  if (href?.startsWith('#user-content-fn-')) {
                    const footnoteId = href.replace('#user-content-fn-', '');
                    return (
                      <a
                        href={href}
                        onMouseEnter={(e) => handleFootnoteHover(e, footnoteId)}
                        onMouseLeave={handleFootnoteLeave}
                        onClick={(e) => {
                          e.preventDefault();
                          // Clear timeout and hide tooltip immediately when clicked
                          if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                            timeoutRef.current = null;
                          }
                          setHoveredFootnote(null);
                          // Scroll to footnote
                          const targetElement = document.getElementById(`user-content-fn-${footnoteId}`);
                          if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className="text-blue-600 font-semibold no-underline hover:underline cursor-pointer"
                        {...props}
                      />
                    );
                  }
                  return <a href={href} {...props} />;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* Tooltip for footnotes */}
          {hoveredFootnote && (
            <div
              className="fixed z-50 max-w-md p-4 bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-600 rounded-lg shadow-2xl pointer-events-none"
              style={{
                left: `${tooltipPosition.x + 20}px`,
                top: `${tooltipPosition.y - 100}px`,
              }}
            >
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                {hoveredFootnote}
              </p>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-pulse">
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-4">섹션 로딩 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}
