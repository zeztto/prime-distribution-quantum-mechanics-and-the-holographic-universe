import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import type { PaperSection as PaperSectionType } from "~/data/paper-content";

interface PaperSectionProps {
  section: PaperSectionType;
  index: number;
  onInView?: (sectionId: string) => void;
}

export function PaperSection({ section, index, onInView }: PaperSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setIsLoaded(true);
      onInView?.(section.id);
    }
  }, [inView, section.id, onInView]);

  return (
    <motion.section
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 50 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-16 scroll-mt-24"
    >
      {/* Section Title */}
      <div className="border-l-4 border-blue-600 pl-6 mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          {section.title}
        </h2>
      </div>

      {/* Section Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          {section.content}
        </p>
      </div>

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="space-y-8 ml-6">
          {section.subsections.map((subsection, subIndex) => (
            <motion.div
              key={subsection.id}
              id={subsection.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 + subIndex * 0.1 }}
              className="border-l-2 border-gray-300 pl-6 scroll-mt-24"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {subsection.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {subsection.content}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lazy Load Indicator */}
      {!isLoaded && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
            <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
            <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
