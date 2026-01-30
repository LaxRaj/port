import { useState } from "react";
import { FileCode, Github } from "lucide-react";

interface Project {
  name: string;
  type: string;
  description: string;
  techStack: string[];
  link: string;
}

const projects: Project[] = [
  {
    name: "Fintech_Orchestrator.tsx",
    type: "TSX",
    description: "A modular payments workflow engine with smart routing.",
    techStack: ["Next.js", "TypeScript", "Postgres", "Stripe"],
    link: "https://github.com/LaxRaj/fintech-orchestrator",
  },
  {
    name: "AI_Automation_Agency.py",
    type: "Python",
    description: "Multi-agent automation toolkit for operations teams.",
    techStack: ["Python", "LangGraph", "PostgreSQL", "Redis"],
    link: "https://github.com/LaxRaj/ai-automation-agency",
  },
  {
    name: "Look_App_Internship.md",
    type: "MD",
    description: "Mobile onboarding experiments and activation metrics.",
    techStack: ["React Native", "Firebase", "Amplitude"],
    link: "https://github.com/LaxRaj/look-app-internship",
  },
  {
    name: "Open_Source_Scripts.js",
    type: "JS",
    description: "A bundle of CLI utilities for developers.",
    techStack: ["Node.js", "pnpm", "GitHub Actions"],
    link: "https://github.com/LaxRaj/open-source-scripts",
  },
  {
    name: "Portfolio_Desktop_OS.tsx",
    type: "TSX",
    description: "macOS-inspired portfolio with window management.",
    techStack: ["Next.js", "Framer Motion", "Tailwind"],
    link: "https://github.com/LaxRaj/portfolio-desktop-os",
  },
];

export function ProjectsApp() {
  const [expandedName, setExpandedName] = useState<string | null>(null);

  const handleOpenProject = (project: Project) => {
    if (typeof window !== "undefined") {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative h-full w-full bg-white/5 backdrop-blur-xl p-6 text-sm text-white">
      <div className="flex flex-col">
        <div className="grid grid-cols-[minmax(240px,1.2fr)_minmax(180px,1fr)_minmax(120px,0.5fr)] border-b border-white/10 pb-2 text-[11px] font-medium text-white/50">
          <span>Name</span>
          <span>Tech Stack</span>
          <span>Category</span>
        </div>

        <div className="mt-2 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
          {projects.map((project) => {
            const isExpanded = expandedName === project.name;
            return (
              <div key={project.name} className="border-b border-white/5">
                <button
                  className="grid w-full grid-cols-[minmax(240px,1.2fr)_minmax(180px,1fr)_minmax(120px,0.5fr)] items-center gap-4 rounded-xl px-2 py-3 text-left transition hover:bg-white/5"
                  onClick={() =>
                    setExpandedName(isExpanded ? null : project.name)
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <FileCode className="h-4 w-4 text-white/70" />
                    </div>
                    <span className="text-sm font-medium text-white/90 whitespace-normal break-words">
                      {project.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-white/60">{project.type}</span>
                </button>
                {isExpanded && (
                  <div className="grid grid-cols-1 gap-3 px-12 pb-4 text-white/70">
                    <p className="text-sm">
                      {project.description} This build emphasizes clean data
                      flow and predictable state for teams.
                    </p>
                    <button
                      onClick={() => handleOpenProject(project)}
                      className="w-fit rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black shadow hover:bg-white/90 transition"
                    >
                      View on GitHub
                    </button>
                    <div className="flex items-center gap-2 text-[10px] text-white/40">
                      <Github className="h-3.5 w-3.5" />
                      Repository link
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}