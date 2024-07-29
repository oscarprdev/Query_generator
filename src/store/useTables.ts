import { MongoTable, PostgresTable } from "@prisma/client";
import { create } from "zustand";

export type Table = PostgresTable | MongoTable;

export interface TablesStore {
  tables: Table[];
  addTable: (table: Table) => void;
  removeTable: (id: string) => void;
  updateTable: (table: Table) => void;
}

export const useTables = create<TablesStore>((set) => ({
  tables: [],
  addTable: (table: Table) =>
    set((state) => ({
      ...state,
      tables: [...state.tables, table],
    })),
  removeTable: (id: string) =>
    set((state) => ({
      ...state,
      tables: state.tables.filter((table) => table.id !== id),
    })),
  updateTable: (table: Table) =>
    set((state) => {
      const tableIndex = state.tables.findIndex((tb) => tb.id === table.id);

      const updatedTables = state.tables.map((tb, index) =>
        index === tableIndex ? table : tb,
      );

      return {
        ...state,
        tables: updatedTables,
      };
    }),
}));
