import { MongoTable, PostgreTable } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Table = PostgreTable | MongoTable;

export interface TablesStore {
	tables: Table[];
	createTable: (table: Table) => void;
	deleteTable: (id: string) => void;
	updateTable: (table: Table) => void;
}

export const useTablesStore = create<TablesStore>()(
	persist(
		set => ({
			tables: [],
			createTable: (table: Table) =>
				set(state => ({
					...state,
					tables: [...state.tables, table],
				})),
			deleteTable: (id: string) =>
				set(state => ({
					...state,
					tables: state.tables.filter(table => table.id !== id),
				})),
			updateTable: (table: Table) =>
				set(state => {
					const tableIndex = state.tables.findIndex(tb => tb.id === table.id);

					const updatedTables = state.tables.map((tb, index) => (index === tableIndex ? table : tb));

					return {
						...state,
						tables: updatedTables,
					};
				}),
		}),
		{
			name: 'tables',
		}
	)
);
