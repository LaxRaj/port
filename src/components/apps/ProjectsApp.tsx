import { useState } from "react";
import {
  Bot,
  DollarSign,
  FileCode,
  Folder,
  Github,
  LayoutGrid,
  Search,
} from "lucide-react";

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

const categories = [
  { id: "all", label: "All Projects", icon: LayoutGrid },
  { id: "ai", label: "AI Tools", icon: Bot },
  { id: "fintech", label: "Fintech", icon: DollarSign },
  { id: "oss", label: "Open Source", icon: Github },
];

function FileIcon({ type }: { type: string }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50/70 dark:bg-blue-900/30 border border-white/30 shadow">
      <FileCode className="h-7 w-7 text-blue-600" />
      <span className="sr-only">{type}</span>
    </div>
  );
}

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    if (typeof window !== "undefined") {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex h-full text-sm text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-[200px] border-r border-black/5 bg-black/5 dark:bg-white/5 backdrop-blur-xl p-4">
        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Favorites
        </h3>
        <ul className="space-y-2">
          {categories.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 rounded-lg px-2 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Area */}
      <div className="flex flex-1 flex-col bg-white/40 dark:bg-black/20 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Portfolio</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-800 dark:text-gray-200">Projects</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs text-gray-500 shadow-sm">
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {projects.map((project) => {
                const isSelected = selectedProject?.name === project.name;
                return (
                  <div
                    key={project.name}
                    className={[
                      "group flex cursor-pointer flex-col items-center gap-3 rounded-2xl p-3 transition",
                      isSelected
                        ? "bg-blue-50/70 ring-2 ring-blue-400/60"
                        : "hover:bg-blue-50/40",
                    ].join(" ")}
                    onClick={() => setSelectedProject(project)}
                    onDoubleClick={() => handleOpenProject(project)}
                  >
                    <FileIcon type={project.type} />
                    <span className="w-full truncate text-center text-xs font-medium text-gray-700 dark:text-gray-200">
                      {project.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspector */}
          <div className="w-[260px] border-l border-black/5 bg-white/60 dark:bg-black/40 backdrop-blur-lg p-5">
            {selectedProject ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileIcon type={selectedProject.type} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      Selected
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {selectedProject.name}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {selectedProject.description}
                </p>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Tech Stack
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-gray-700 dark:text-gray-200">
                    {selectedProject.techStack.map((tech) => (
                      <li key={tech} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleOpenProject(selectedProject)}
                  className="w-full rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 transition"
                >
                  Visit Repository
                </button>
              </div>
            ) : (
              <div className="text-xs text-gray-500">
                Select a project to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}