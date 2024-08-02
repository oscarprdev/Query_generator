import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { getProjectTables } from '@/app/actions/get-project-tables';
import { TableFormValues } from './TableForm';
import { cn } from '@/lib/utils';
import { capitalizeStr } from '@/lib/strings';

type TableFormReferenceProps = {
	form: UseFormReturn<TableFormValues, any, undefined>;
	projectTitle: string;
	index: number;
};

const TableFormReference = ({ form, projectTitle, index }: TableFormReferenceProps) => {
	const [tables, setTables] = useState<string[]>([]);

	useEffect(() => {
		const handleTableValues = async () => {
			const response = await getProjectTables({ projectTitle });

			if (!response) return;

			setTables(response.map(table => table.title));
		};

		handleTableValues();
	}, [projectTitle, index]);

	return (
		<FormField
			control={form.control}
			name={`rows.${index}.reference`}
			render={({ field }) => (
				<FormItem className="flex-1">
					{index === 0 && (
						<FormLabel
							className={cn(
								'text-xs',
								form.getValues('error') &&
									(form.getValues('error')?.match('Foreign Key') ||
										form.getValues('error')?.match('ObjectId')) &&
									'text-red-500'
							)}>
							Referencia
						</FormLabel>
					)}
					<Select
						required
						value={field.value || ''}
						disabled={tables.length === 0}
						onValueChange={field.onChange}>
						<FormControl>
							<SelectTrigger disabled={form.formState.isSubmitting}>
								<SelectValue placeholder="Tabla:" />
							</SelectTrigger>
						</FormControl>
						<SelectContent side="bottom">
							{tables.map(table => (
								<SelectItem aria-selected={field.value === table} key={table} value={table}>
									{capitalizeStr(table)}
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

export default TableFormReference;
