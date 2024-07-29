import CreateProjectModal from '@/components/Modals/CreateProjectModal';

export default function Home() {
	return (
		<div className="relative flex h-full w-full flex-col items-center justify-between">
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"></div>
			<CreateProjectModal />
		</div>
	);
}
