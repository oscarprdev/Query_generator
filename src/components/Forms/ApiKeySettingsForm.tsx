'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconDots } from '@tabler/icons-react';
import ApiKeyFormInfo from './ApiKeyFormInfo';

export type ApiKeySettingsFormValues = {
	apiKey: string;
};

type ApiKeySettingsFormProps = {
	handleSubmit: (values: ApiKeySettingsFormValues) => Promise<void>;
};

const formSchema = z.object({
	apiKey: z.string(),
});

const ApiKeySettingsForm = ({ handleSubmit }: ApiKeySettingsFormProps) => {
	const form = useForm<ApiKeySettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			apiKey: '',
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col gap-3">
				<FormField
					control={form.control}
					name="apiKey"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="flex items-center gap-2">
								<p className="text-zinc-500">OpenAi Api Key</p>
								<ApiKeyFormInfo />
							</FormLabel>
							<FormControl>
								<Input required placeholder="OpenAi Api Key" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="ml-auto" variant={'none'}>
					{form.formState.isSubmitting ? (
						<IconDots size={18} className="min-w-[100px] animate-pulse text-zinc-800" />
					) : (
						'Actualizar Api Key'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ApiKeySettingsForm;
