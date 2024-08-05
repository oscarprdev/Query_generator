'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Databases } from '@prisma/client';
import { IconDots } from '@tabler/icons-react';
import ImportProjectInput from './ImportProjectInput';

export type CreateProjectFormValues = {
	title: string;
	project?: string;
	database: Databases | null;
};

type CreateProjectFormProps = {
	handleSubmit: (values: CreateProjectFormValues) => Promise<void>;
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
	project: z.string().optional(),
	database: z.nativeEnum(Databases, { message: 'La base de datos seleccionada no es valida' }),
});

const CreateProjectForm = ({ handleSubmit }: CreateProjectFormProps) => {
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			database: null,
		},
	});

	const onSubmit = async (values: CreateProjectFormValues) => {
		await handleSubmit(values);
	};

	return (
		<Form {...form}>
			<form data-testid="create-project-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center gap-2">
								Titulo del proyecto <p className="text-xs text-zinc-600">Requerido</p>
							</FormLabel>
							<FormControl>
								<Input
									data-testid="create-project-form-title"
									required
									placeholder="Proyecto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="database"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center gap-2">
								Tipo de base de datos <p className="text-xs text-zinc-600">Requerido</p>
							</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger data-testid="create-project-form-database">
										<SelectValue placeholder="Selecciona tu DB" />
									</SelectTrigger>
								</FormControl>
								<SelectContent data-testid="create-project-form-database-select-content">
									<SelectItem data-testid="create-project-form-select-1" value={Databases.postgreSQL}>
										PostgreSQL
									</SelectItem>
									<SelectItem data-testid="create-project-form-select-2" value={Databases.mongoDb}>
										MongoDB
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<ImportProjectInput form={form} />
				<Button
					data-testid="create-project-form-submit-btn"
					type="submit"
					disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<IconDots size={18} className="min-w-[100px] animate-pulse text-zinc-800" />
					) : (
						'Crear proyecto'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default CreateProjectForm;
