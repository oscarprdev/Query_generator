'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { $Enums, Databases, QueryAction } from '@prisma/client';
import QueryFormTables from './QueryFormTables';
import QueryFormFilters from './QueryFormFilters';
import { Textarea } from '../ui/textarea';
import QueryFormPromptInfo from './QueryFormPromptInfo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ReactNode } from 'react';

export type QueryFormValues = {
	title: string;
	action: QueryAction;
	tables: string[];
	filters: string[];
	prompt?: string;
	error?: string;
};

type QueryFormProps = {
	handleSubmit: (values: QueryFormValues) => Promise<void>;
	handleReset: () => void;
	type: Databases;
	projectTitle: string;
	defaultValues: QueryFormValues;
	children: ReactNode;
};

const formSchema = z.object({
	title: z.string(),
	action: z.nativeEnum($Enums.QueryAction),
	filters: z.array(z.string()).optional(),
	tables: z.array(z.string()),
	prompt: z.string().optional(),
});

const QueryForm = ({ handleSubmit, handleReset, defaultValues, projectTitle, type, children }: QueryFormProps) => {
	const form = useForm<QueryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onReset = () => {
		handleReset();
		form.reset();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="mt-5 flex h-full w-full flex-col items-center gap-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input required placeholder="Titulo de la query" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex w-full items-end justify-between gap-3">
					<FormField
						control={form.control}
						name="action"
						render={({ field }) => (
							<FormItem className="relative w-full capitalize">
								<Select value={field.value} onValueChange={field.onChange} required>
									<FormControl>
										<SelectTrigger>
											<SelectValue className="capitalize" placeholder="Accion" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Object.values($Enums.QueryAction).map(action => (
											<SelectItem
												className="capitalize"
												key={action}
												value={action as $Enums.QueryAction}>
												{action}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<QueryFormTables projectTitle={projectTitle} form={form} />
					<QueryFormFilters type={type} form={form} />
				</div>
				<FormField
					control={form.control}
					name="prompt"
					render={({ field }) => (
						<FormItem className="relative w-full">
							<FormLabel className="flex items-center gap-2">
								<p>Prompt</p>
								<QueryFormPromptInfo />
							</FormLabel>
							<FormControl>
								<Textarea
									className="h-[70px] resize-none"
									maxLength={180}
									placeholder="Escribe aqui tu prompt si lo necesitas."
									{...field}
								/>
							</FormControl>
							<FormMessage />
							<p className="absolute bottom-1 right-2 text-xs text-zinc-600">
								{field.value?.length || '0'}/180
							</p>
						</FormItem>
					)}
				/>

				<div className="relative flex w-full items-center justify-between">
					{form.getValues('error') && (
						<div className="bottom absolute bottom-0 right-52 grid max-w-[280px] place-items-center rounded-lg bg-red-400/10 p-3">
							<p className="text-center text-xs text-red-500">{form.getValues('error')}</p>
						</div>
					)}
					<div className="ml-auto mt-auto flex items-center gap-5">
						<Button disabled={form.formState.isSubmitting} type="button" variant={'none'} onClick={onReset}>
							Reset
						</Button>
						{children}
					</div>
				</div>
			</form>
		</Form>
	);
};

export default QueryForm;
