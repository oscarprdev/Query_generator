import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconX } from '@tabler/icons-react';
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import { getTableValues } from '@/app/actions/get-table-values';
import { UseFormReturn } from 'react-hook-form';
import { QueryFormValues } from './QueryForm';
import { Databases } from '@prisma/client';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

type QueryFormFiltersProps = {
	form: UseFormReturn<QueryFormValues, any, undefined>;
	type: Databases;
};

const QueryFormFilters = ({ form, type }: QueryFormFiltersProps) => {
	const [filters, setFilters] = useState<string[]>([]);
	const [filterSelected, setFilterSelected] = useState<string>();
	const tables = form.watch('tables');

	useEffect(() => {
		const handleTableValues = async () => {
			const response = await getTableValues({ title: tables[0], type });
			if (!response) return;

			setFilters(response.rows.map(row => row.name));
		};

		if (tables.length > 0) {
			handleTableValues();
		}
	}, [type, tables]);

	const handleSelectFilterChange = (filterSelected: string, currentFilters: string[]) => {
		if (currentFilters.includes(filterSelected)) return;

		setFilterSelected(filterSelected);

		form.setValue('filters', [...currentFilters, filterSelected]);
	};

	const handleRemoveFilter = (filterToRemove: string, currentFilters: string[]) => {
		const filterIndex = currentFilters.findIndex(filter => filter === filterToRemove);
		currentFilters.splice(filterIndex, 1);

		const badge = document.querySelector(`#badge-${filterToRemove}`);
		badge?.setAttribute('aria-pressed', 'true');

		setTimeout(() => {
			form.setValue('filters', [...currentFilters]);
		}, 300);
	};

	return (
		<FormField
			control={form.control}
			name="filters"
			render={({ field }) => (
				<FormItem className="relative w-full">
					<div className="flex flex-col items-start gap-2">
						<div className="flex flex-wrap items-center gap-1">
							{field.value.map(filter => (
								<Badge
									id={`badge-${filter}`}
									variant={'withicon'}
									key={filter}
									className="flex animate-fade-up-light items-center justify-between gap-1 aria-pressed:animate-fade-down-light">
									{filter}
									<button
										type="button"
										disabled={form.formState.isSubmitting}
										onClick={() => handleRemoveFilter(filter, field.value)}
										className="rounded-full bg-transparent p-1 text-zinc-100 duration-300 hover:bg-zinc-200 hover:text-zinc-500">
										<IconX size={14} />
									</button>
								</Badge>
							))}
						</div>
					</div>
					<p className="absolute -bottom-5 right-1 text-xs text-zinc-600">{field.value.length}/2</p>
					<Select
						value={field.value.length > 0 ? field.value.find(fil => fil === filterSelected) : ''}
						disabled={tables.length === 0 || field.value.length === 2}
						onValueChange={filter => handleSelectFilterChange(filter, field.value)}>
						<FormControl>
							<SelectTrigger className="w-full capitalize" disabled={form.formState.isSubmitting}>
								<SelectValue placeholder="Filtrar por:" />
							</SelectTrigger>
						</FormControl>
						<SelectContent side="bottom">
							{filters.map(filter => (
								<SelectItem
									className="capitalize"
									aria-selected={field.value.includes(filter)}
									key={filter}
									value={filter}>
									{filter}
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

export default QueryFormFilters;
