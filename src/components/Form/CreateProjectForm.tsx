import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Databases } from '@prisma/client';

type CreateProjectFormValues = {
	title: string;
	database: Databases | null;
};

const formSchema = z.object({
	title: z
		.string()
		.min(5, {
			message: 'El titulo del proyecto tiene que tener al menos 5 letras.',
		})
		.max(10, {
			message: 'El titulo del proyecto no puede tener mas de 10 letras',
		}),
});

const CreateProjectForm = () => {
	const form = useForm<CreateProjectFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			database: null,
		},
	});

	const onSubmit = (values: CreateProjectFormValues) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titulo del proyecto</FormLabel>
							<FormControl>
								<Input placeholder="Proyecto" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Crear proyecto</Button>
			</form>
		</Form>
	);
};

export default CreateProjectForm;
