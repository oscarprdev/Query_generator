import { Project as PrismaProject } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Project = PrismaProject;

export interface ProjectsStore {
	projects: Project[];
	createProject: (project: Project) => void;
	deleteProject: (id: string) => void;
}

export const useProjectsStore = create<ProjectsStore>()(
	persist(
		set => ({
			projects: [],
			createProject: (project: Project) =>
				set(state => ({
					projects: [...state.projects, project],
				})),
			deleteProject: (id: string) =>
				set(state => ({
					projects: state.projects.filter(project => project.id !== id),
				})),
		}),
		{ name: 'projects' }
	)
);
