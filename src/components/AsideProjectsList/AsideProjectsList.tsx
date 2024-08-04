import { auth } from '@/auth';
import { getProjectListQuery } from '@/services/queries/get-project-list.query';
import AsideProjectListItem from '../AsideProjectListItem/AsideProjectListItem';

export const AsideProjectListSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-2">
			<p className="text-xs uppercase text-zinc-500">Proyectos</p>
			<div className="animate-pulse rounded-md bg-zinc-700/50 px-4 py-3 first-of-type:mt-3"></div>
			<div className="animate-pulse rounded-md bg-zinc-700/50 px-4 py-3 first-of-type:mt-3"></div>
			<div className="animate-pulse rounded-md bg-zinc-700/50 px-4 py-3 first-of-type:mt-3"></div>
		</div>
	);
};

const AsideProjectsList = async () => {
	const session = await auth();
	const projects = await getProjectListQuery({ ownerId: session?.user?.id });

	return (
		<div className="flex w-full flex-col gap-1">
			{projects && projects.length > 0 ? (
				<>
					<p className="text-xs uppercase text-zinc-500">Proyectos</p>
					{projects.map(project => (
						<AsideProjectListItem key={project.id} title={project.title} />
					))}
				</>
			) : (
				<p className="text-center text-xs text-zinc-500">No existen proyectos</p>
			)}
		</div>
	);
};

export default AsideProjectsList;
