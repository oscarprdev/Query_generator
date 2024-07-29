'use client';

import { useProjectsStore } from '@/store/useProjectsStore';
import Link from 'next/link';

const AsideProjectsList = () => {
	const { projects } = useProjectsStore();

	return (
		<div className="flex w-full flex-col gap-1">
			{projects.length > 0 ? (
				<>
					<p className="text-xs uppercase text-zinc-500">Proyectos</p>
					{projects.map(project => (
						<Link
							key={project.id}
							href={`?project=${project.title}`}
							className="rounded-md px-4 py-2 text-sm font-light capitalize text-zinc-400 duration-300 first-of-type:mt-3 hover:bg-zinc-800">
							{project.title}
						</Link>
					))}
				</>
			) : (
				<p className="text-center text-xs text-zinc-500">No existen proyectos</p>
			)}
		</div>
	);
};

export default AsideProjectsList;
