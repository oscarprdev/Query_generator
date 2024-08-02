'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconDots } from '@tabler/icons-react';

export type ProjectSettingsFormValues = {
	title: string;
};

type ProjectSettingsFormProps = {
	title: string;
	handleSubmit: (values: ProjectSettingsFormValues) => Promise<void>;
};

const formSchema = z.object({
	title: z
		.string()
		.min(5, {
			message: 'El titulo del proyecto tiene que tener al menos 5 letras.',
		})
		.max(15, {
			message: 'El titulo del proyecto no puede tener mas de 15 letras',
		}),
});

const ProjectSettingsForm = ({ handleSubmit, title }: ProjectSettingsFormProps) => {
	const form = useForm<ProjectSettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title,
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col gap-3">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Titulo del proyecto</FormLabel>
							<FormControl>
								<Input required placeholder="Proyecto" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="ml-auto">
					{form.formState.isSubmitting ? (
						<IconDots size={18} className="min-w-[100px] animate-pulse text-zinc-800" />
					) : (
						'Actualizar proyecto'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ProjectSettingsForm;
