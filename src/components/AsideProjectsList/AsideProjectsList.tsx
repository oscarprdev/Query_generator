import { auth } from '@/auth';
import { getProjectsQuery } from '@/services/queries/get-project.query';
import Link from 'next/link';

export const AsideProjectListSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-1">
			<p className="text-xs uppercase text-zinc-500">Proyectos</p>
			<div className="animate-pulse rounded-md bg-zinc-400 px-4 py-2 duration-300 first-of-type:mt-3"></div>
			<div className="animate-pulse rounded-md bg-zinc-400 px-4 py-2 duration-300 first-of-type:mt-3"></div>
			<div className="animate-pulse rounded-md bg-zinc-400 px-4 py-2 duration-300 first-of-type:mt-3"></div>
		</div>
	);
};

const AsideProjectsList = async () => {
	const session = await auth();
	const projects = await getProjectsQuery({ ownerId: session?.user?.name as string });

	return (
		<div className="flex w-full flex-col gap-1">
			{projects && projects.length > 0 ? (
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
