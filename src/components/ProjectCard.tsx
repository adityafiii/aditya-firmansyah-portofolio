import Image from 'next/image';
import Link from 'next/link';

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
  };
  className?: string;
  style?: React.CSSProperties;
};

export default function ProjectCard({ project, className, style }: ProjectCardProps) {
  return (
    <div className={`bg-black rounded-lg shadow-xl overflow-hidden ${className || ''}`} style={style}>
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-base mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="bg-white text-black text-xs font-medium px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="block bg-yellow-50 hover:bg-orange-500 text-black font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-center text-sm"
        >
          Lihat Selengkapnya
        </Link>
      </div>
    </div>
  );
}