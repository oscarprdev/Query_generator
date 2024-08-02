'use server';

import { Project } from '@prisma/client';
import SeedItem from '../SeedItem/SeedItem';
import { getSeedsListQuery } from '@/services/queries/get-seed.query';
import GenerateSeedModal from '../Modals/GenerateSeedModal/GenerateSeedModal';

type FactorySeedProps = {
	project: Project | null;
};

const FactorySeed = async ({ project }: FactorySeedProps) => {
	const seeds = await getSeedsListQuery({ projectId: project?.id });

	return (
		<>
			{seeds.length > 0 && project ? (
				<ul
					aria-label="scroll"
					className="-mt-2 mb-5 grid h-[80%] w-full auto-rows-min grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 overflow-x-hidden overflow-y-scroll">
					{seeds.map(seed => (
						<SeedItem
							key={seed.id}
							type={project.database}
							seedId={seed.id}
							title={seed.title}
							table={seed.table}
							createdAt={seed.createdAt}
						/>
					))}
				</ul>
			) : project ? (
				<p className="text-center text-xs text-zinc-400">No hay ninguna semilla generada todavia.</p>
			) : (
				<p className="text-center text-xs text-zinc-400">Selecciona un proyecto para empezar.</p>
			)}

			{project && <GenerateSeedModal projectTitle={project.title} type={project.database} />}
		</>
	);
};

export default FactorySeed;
