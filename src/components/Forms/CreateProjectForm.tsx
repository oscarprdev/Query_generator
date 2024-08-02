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

export type CreateProjectFormValues = {
	title: string;
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titulo del proyecto</FormLabel>
							<FormControl>
								<Input required placeholder="Proyecto" {...field} />
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
							<FormLabel>Tipo de base de datos</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecciona tu DB" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={Databases.postgreSQL}>PostgreSQL</SelectItem>
									<SelectItem value={Databases.mongoDb}>MongoDB</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">
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
