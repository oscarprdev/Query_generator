import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { getProjectTables } from '@/app/actions/get-project-tables';
import { SchemaFormValues } from './SchemaForm';

type SchemaFormTablesProps = {
	form: UseFormReturn<SchemaFormValues, any, undefined>;
	projectTitle: string;
};

const SchemaFormTables = ({ form, projectTitle }: SchemaFormTablesProps) => {
	const [tables, setTables] = useState<string[]>([]);

	useEffect(() => {
		const handleTableValues = async () => {
			const response = await getProjectTables({ projectTitle });

			if (!response) return;

			setTables(response.map(table => table.title));
		};

		handleTableValues();
	}, [projectTitle]);

	return (
		<FormField
			control={form.control}
			disabled={tables.length === 0}
			name="table"
			render={({ field }) => (
				<FormItem className="relative w-full">
					<Select required disabled={tables.length === 0} onValueChange={field.onChange}>
						<FormControl>
							<SelectTrigger className="w-full capitalize" disabled={form.formState.isSubmitting}>
								<SelectValue placeholder="Tabla requerida:" />
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

export default SchemaFormTables;
