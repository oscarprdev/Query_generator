import { Project as PrismaProject } from '@prisma/client';
import { create } from 'zustand';

export type Project = PrismaProject;

export interface ProjectsStore {
	projects: Project[];
	createProject: (project: Project) => void;
	deleteProject: (id: string) => void;
}

export const useProjectsStore = create<ProjectsStore>(set => ({
	projects: [],
	createProject: (project: Project) =>
		set(state => ({
			...state,
			projects: [...state.projects, project],
		})),
	deleteProject: (id: string) =>
		set(state => ({
			...state,
			projects: state.projects.filter(project => project.id !== id),
		})),
}));
