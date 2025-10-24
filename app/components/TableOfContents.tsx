import { ChevronRight, List } from "lucide-react";

export interface Section {
  id: string;
  title: string;
  number: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection?: string;
}

export function TableOfContents({ sections, activeSection }: TableOfContentsProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const tocContent = (
    <nav className="space-y-1">
      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                  flex items-start gap-3 group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                <span
                  className={`
                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5
                    ${
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                        : "bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }
                  `}
                >
                  {section.number}
                </span>
                <span className="flex-1 text-sm leading-snug">{section.title}</span>
                <ChevronRight
                  className={`
                    w-4 h-4 flex-shrink-0 mt-1 transition-transform
                    ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}
                    ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}
                  `}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  // Desktop Sidebar
  return (
    <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <List className="w-5 h-5 text-blue-600" />
          목차
        </h2>
      </div>
      {tocContent}
    </div>
  );
}
