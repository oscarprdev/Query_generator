import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconX } from '@tabler/icons-react';
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { QueryFormValues } from './QueryForm';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { getProjectTables } from '@/app/actions/projects/get-project-tables';

type QueryFormTablesProps = {
	form: UseFormReturn<QueryFormValues, any, undefined>;
	projectTitle: string;
};

const QueryFormTables = ({ form, projectTitle }: QueryFormTablesProps) => {
	const [tables, setTables] = useState<string[]>([]);
	const [tableSelected, setTableSelected] = useState<string>();

	useEffect(() => {
		const handleTableValues = async () => {
			const response = await getProjectTables({ projectTitle });

			if (!response) return;

			setTables(response.map(table => table.title));
		};

		handleTableValues();
	}, [projectTitle]);

	const handleSelectTableChange = (tableSelected: string, currentTables?: string[]) => {
		if (!currentTables) return;

		if (currentTables.includes(tableSelected)) return;

		setTableSelected(tableSelected);

		form.setValue('tables', [...currentTables, tableSelected]);
	};

	const handleRemoveTable = (tableToRemove: string, currentTables?: string[]) => {
		if (!currentTables) return;

		const tableIndex = currentTables.findIndex(table => table === tableToRemove);
		currentTables.splice(tableIndex, 1);

		const badge = document.querySelector(`#badge-${tableToRemove}`);
		badge?.setAttribute('aria-pressed', 'true');

		setTimeout(() => {
			form.setValue('tables', [...currentTables]);
		}, 300);
	};

	return (
		<FormField
			control={form.control}
			disabled={tables.length === 0}
			name="tables"
			render={({ field }) => (
				<FormItem className="relative w-full">
					<div className="flex flex-col items-start gap-2">
						<div className="flex flex-wrap items-center gap-1">
							{field.value.map(table => (
								<Badge
									id={`badge-${table}`}
									variant={'withicon'}
									key={table}
									className="flex animate-fade-up-light items-center justify-between gap-1 aria-pressed:animate-fade-down-light">
									{table}
									<button
										type="button"
										disabled={form.formState.isSubmitting}
										onClick={() => handleRemoveTable(table, field.value)}
										className="rounded-full bg-transparent p-1 text-zinc-100 duration-300 hover:bg-zinc-200 hover:text-zinc-500">
										<IconX size={14} />
									</button>
								</Badge>
							))}
						</div>
					</div>
					<p className="absolute -bottom-5 right-1 text-xs text-zinc-600">{field.value.length}/2</p>
					<Select
						required
						value={field.value.length > 0 ? field.value.find(tab => tab === tableSelected) : ''}
						disabled={tables.length === 0 || field.value.length === 2}
						onValueChange={table => handleSelectTableChange(table, field.value)}>
						<FormControl>
							<SelectTrigger className="w-full capitalize" disabled={form.formState.isSubmitting}>
								<SelectValue placeholder="Tablas requeridas:" />
							</SelectTrigger>
						</FormControl>
						<SelectContent side="bottom">
							{tables.map(table => (
								<SelectItem
									className="capitalize"
									aria-selected={field.value?.includes(table)}
									key={table}
									value={table}>
									{table.toLowerCase()}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default QueryFormTables;
