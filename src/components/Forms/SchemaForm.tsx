'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconSparkles } from '@tabler/icons-react';
import SchemaFormTables from './SchemaFormTables';

export type SchemaFormValues = {
	title: string;
	table: string;
	error?: string;
};

type SchemaFormProps = {
	handleSubmit: (values: SchemaFormValues) => Promise<void>;
	projectTitle: string;
	defaultValues: SchemaFormValues;
	submitLabel: string;
	reset?: boolean;
};

const formSchema = z.object({
	title: z.string(),
	table: z.string(),
});

const SchemaForm = ({ handleSubmit, defaultValues, submitLabel, projectTitle, reset = true }: SchemaFormProps) => {
	const form = useForm<SchemaFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = async (values: SchemaFormValues) => {
		await handleSubmit(values);

		if (reset) {
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-5 flex h-full w-full flex-col items-center gap-4">
				<div className="flex w-full items-center gap-5">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input required placeholder="Titulo del schema" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<SchemaFormTables form={form} projectTitle={projectTitle} />
				</div>

				<div className="relative flex w-full items-center justify-between">
					{form.getValues('error') && (
						<div className="bottom absolute bottom-0 right-52 grid max-w-[280px] place-items-center rounded-lg bg-red-400/10 p-3">
							<p className="text-center text-xs text-red-500">{form.getValues('error')}</p>
						</div>
					)}
					<div className="ml-auto mt-auto flex items-center gap-5">
						<Button type="button" variant={'none'} onClick={() => form.reset()}>
							Reset
						</Button>
						<Button type="submit">
							{form.formState.isSubmitting ? (
								'Loading'
							) : (
								<>
									<IconSparkles size={20} className="mr-1 text-zinc-500" />
									{submitLabel}
								</>
							)}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default SchemaForm;
