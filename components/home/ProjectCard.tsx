import React from 'react';
import { ArrowUpRight, FolderGit2, Star } from 'lucide-react';
import { Project } from '../../data/projects';

interface Props {
    project: Project;
    isFeatured?: boolean;
}

export default function ProjectCard({ project, isFeatured = false }: Props) {
    // 카테고리별 색상 (다크 모드 추가)
    const categoryColors: Record<string, string> = {
        Engineering: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800',
        Research: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800',
        Service: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800',
        GenAI: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800',
    };

    const categoryStyle = categoryColors[project.category] || 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700';

    return (
        <a href={`/projects/${project.id}`} className="group block h-full">
            <div className={`
        relative h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
        bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800
        ${isFeatured ? 'flex flex-col md:flex-row' : 'flex flex-col'}
      `}>

                {/* Thumbnail Section */}
                <div className={`
          relative overflow-hidden group-hover:opacity-90 transition-opacity
          bg-slate-100 dark:bg-slate-800
          ${isFeatured ? 'md:w-5/12 min-h-[300px]' : 'h-52 w-full'}
        `}>
                    {project.thumbnail ? (
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className={`p-4 rounded-full shadow-sm mb-3 bg-white dark:bg-slate-800 ${isFeatured ? 'scale-125' : ''}`}>
                                    <FolderGit2 className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                                </div>
                                <span className="text-slate-400 dark:text-slate-500 font-medium text-sm">{project.category} Project</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Content Section */}
                <div className={`p-6 flex flex-col justify-between ${isFeatured ? 'md:w-7/12 md:p-10' : 'flex-1'}`}>
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${categoryStyle}`}>
                                {project.category}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500 text-xs font-mono">{project.period}</span>
                        </div>

                        <h3 className={`font-bold mb-2 transition-colors flex items-center gap-2 
              text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 break-keep
              ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                            {project.title}
                            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                        </h3>

                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-4">{project.subtitle}</p>

                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                            {project.description}
                        </p>

                        {/* Highlights */}
                        {isFeatured && (
                            <div className="mb-6 rounded-xl p-4 border bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700">
                                <h4 className="text-sm font-semibold mb-3 flex items-center text-slate-900 dark:text-white">
                                    <Star className="w-4 h-4 text-yellow-500 mr-2 fill-yellow-500" /> Key Highlights
                                </h4>
                                <ul className="space-y-2">
                                    {project.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                                            <span className="mr-2 text-blue-500 dark:text-blue-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        {project.tags.slice(0, isFeatured ? 10 : 4).map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors
                bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300
                group-hover:border-blue-200 dark:group-hover:border-blue-700 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                #{tag}
                            </span>
                        ))}
                        {!isFeatured && project.tags.length > 4 && (
                            <span className="px-2 py-1 text-xs text-slate-400 dark:text-slate-500">+{project.tags.length - 4}</span>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
}