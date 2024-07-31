'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { $Enums, Databases } from '@prisma/client';
import { IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export type RowFormValues = {
	id?: string;
	name: string;
	value: string;
	type: $Enums.MongoType | $Enums.PostgresType;
	constraints: $Enums.MongoConstraint | $Enums.PostgreConstraint;
};

export type TableFormValues = {
	title: string;
	rows: RowFormValues[];
	error?: string;
};

type TableFormProps = {
	handleSubmit: (values: TableFormValues) => Promise<void>;
	type: Databases;
	defaultValues: TableFormValues;
	submitLabel: string;
	reset?: boolean;
};

const formSchema = z.object({
	title: z.string(),
	rows: z.array(
		z.object({
			id: z.string().optional(),
			name: z.string(),
			value: z.string(),
			type: z.union([z.nativeEnum($Enums.MongoType), z.nativeEnum($Enums.PostgresType)]),
			constraints: z.union([z.nativeEnum($Enums.MongoConstraint), z.nativeEnum($Enums.PostgreConstraint)]),
		})
	),
});

const TableForm = ({ handleSubmit, type, defaultValues, submitLabel, reset = true }: TableFormProps) => {
	const form = useForm<TableFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'rows',
	});

	const onSubmit = async (values: TableFormValues) => {
		const rowsPrimaryKey = values.rows.filter(row => row.constraints === 'primaryKey');
		if (rowsPrimaryKey.length > 1) {
			return form.setValue('error', 'Solo puede haber un row como Primary key por cada tabla.');
		}

		if (rowsPrimaryKey.length === 0) {
			return form.setValue('error', 'Tiene que haber un row como Primary key por cada tabla.');
		}

		const allRowNames = values.rows.map(row => row.name.toLowerCase());

		if (new Set(allRowNames).size > values.rows.length) {
			return form.setValue('error', 'Cara Row tiene que tener un nombre unico.');
		}

		form.setValue('error', undefined);

		await handleSubmit(values);

		if (reset) {
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="-mt-5 flex h-full w-full flex-col gap-5">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titulo de la tabla</FormLabel>
							<FormControl>
								<Input required placeholder="Tabla" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<section
					aria-label="scroll"
					className="flex h-[40vh] w-full flex-col items-start justify-start gap-2 overflow-x-auto overflow-y-scroll pb-5">
					{fields.map((field, i) => (
						<div
							key={field.id}
							className="flex h-fit w-full animate-fade-up items-center justify-between gap-2 px-1">
							<FormField
								control={form.control}
								name={`rows.${i}.name`}
								render={({ field }) => (
									<FormItem className="flex-1">
										{i === 0 && (
											<FormLabel
												className={cn(
													form.getValues('error') &&
														!form.getValues('error')?.match('Primary key') &&
														'text-red-500'
												)}>
												Nombre
											</FormLabel>
										)}
										<FormControl>
											<Input required placeholder="Nombre" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`rows.${i}.value`}
								render={({ field }) => (
									<FormItem className="flex-1">
										{i === 0 && <FormLabel>Valor por defecto</FormLabel>}
										<FormControl>
											<Input placeholder="Sin valor" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`rows.${i}.type`}
								render={({ field }) => (
									<FormItem className="flex-1">
										{i === 0 && <FormLabel>Tipo</FormLabel>}
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value === 'any' ? undefined : field.value}
											required>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Tipo" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{type === 'mongoDb' && (
													<>
														{Object.values($Enums.MongoType)
															.filter(type => type !== 'any')
															.map(type => (
																<SelectItem key={type} value={type as $Enums.MongoType}>
																	{type}
																</SelectItem>
															))}
													</>
												)}
												{type === 'postgreSQL' && (
													<>
														{Object.values($Enums.PostgresType)
															.filter(type => type !== 'any')
															.map(type => (
																<SelectItem
																	key={type}
																	value={type as $Enums.PostgresType}>
																	{type}
																</SelectItem>
															))}
													</>
												)}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`rows.${i}.constraints`}
								render={({ field }) => (
									<FormItem className="flex-1">
										{i === 0 && (
											<FormLabel
												className={cn(
													form.getValues('error') &&
														form.getValues('error')?.match('Primary key') &&
														'text-red-500'
												)}>
												Constraint
											</FormLabel>
										)}
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value === 'any' ? undefined : field.value}
											required>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Constraint" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{type === 'mongoDb' && (
													<>
														{Object.values($Enums.MongoConstraint).map(type => (
															<SelectItem key={type} value={type}>
																{type}
															</SelectItem>
														))}
													</>
												)}
												{type === 'postgreSQL' && (
													<>
														{Object.values($Enums.PostgreConstraint).map(type => (
															<SelectItem key={type} value={type}>
																{type}
															</SelectItem>
														))}
													</>
												)}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							{fields.length > 1 && (
								<Button
									type="button"
									variant={'none'}
									className="-ml-1 mt-auto grid place-items-center p-1"
									onClick={() => remove(i)}>
									<IconX className="text-zinc-200" size={20} />
								</Button>
							)}
						</div>
					))}
				</section>
				<div className="relative mt-auto flex w-full items-center justify-between">
					<Button
						type="button"
						variant={'outline'}
						className="mr-auto mt-2 h-fit"
						onClick={() => append({ name: '', value: '', type: 'any', constraints: 'any' })}>
						Insertar row
					</Button>

					{form.getValues('error') && (
						<div className="bottom absolute bottom-0 right-52 grid max-w-[280px] place-items-center rounded-lg bg-red-400/10 p-3">
							<p className="text-center text-xs text-red-500">{form.getValues('error')}</p>
						</div>
					)}
					<div className="ml-auto mt-auto flex items-center gap-5">
						<Button type="button" variant={'none'} onClick={() => form.reset()}>
							Reset
						</Button>
						<Button type="submit">{form.formState.isSubmitting ? 'Loading' : `${submitLabel}`}</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default TableForm;
