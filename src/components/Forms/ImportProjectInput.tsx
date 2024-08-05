import React, { ChangeEvent, DragEvent, DragEventHandler, startTransition, useRef, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react';
import { UseFormReturn } from 'react-hook-form';
import { CreateProjectFormValues } from './CreateProjectForm';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import InfoTooltip from '../infoTooltip/InfoTooltip';

type ImportProjectInputProps = {
	form: UseFormReturn<CreateProjectFormValues, any, undefined>;
};

const ImportProjectInput = ({ form }: ImportProjectInputProps) => {
	const [dragActive, setDragActive] = useState(false);
	const [file, setFile] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleImportProject = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleFile = (file: File) => {
		startTransition(() => {
			setFile(null);
			setError(null);
		});

		const reader = new FileReader();
		reader.onload = event => {
			try {
				const json = JSON.parse(event.target?.result as string);
				const stringJSON = JSON.stringify(json, null, 2);

				form.setValue('project', stringJSON);
				setFile(file?.name);
			} catch (error) {
				setError('Error, el fichero no puede ser parseado como JSON.');
			}
		};

		reader.readAsText(file);
		setDragActive(false);
	};

	const handleDrag = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (event: DragEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const files = event.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			handleFile(file);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const file = target.files?.[0];

		if (file) {
			handleFile(file);
		}

		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	return (
		<FormField
			control={form.control}
			name="project"
			render={({ field }) => (
				<FormItem className="flex flex-col gap-2">
					<FormLabel className="flex items-center gap-2">
						Importar proyecto{' '}
						<InfoTooltip>
							<p className="w-full text-pretty text-xs">
								El fichero importado sera analizado para generar automaticamente las tablas de tu
								proyecto. <br />
								<br />
								Aqui tienes un JSON de ejemplo:{' '}
								<a
									download={true}
									target="blank"
									href={'/ejemplo.json'}
									className="text-primary hover:underline">
									Ejemplo.json
								</a>
							</p>
						</InfoTooltip>
					</FormLabel>
					<FormControl onDragEnter={handleDrag} onDrop={handleDrop}>
						<div className="flex items-center gap-3">
							<label
								className={cn(
									dragActive
										? 'border-zinc-200'
										: error
											? 'border-red-500'
											: file
												? 'border-primary'
												: 'border-border',
									'grid w-full place-items-center rounded-lg border border-dashed bg-transparent p-1 text-xs text-zinc-500 drop-shadow-2xl'
								)}
								id="label-file-upload"
								htmlFor="input-file-upload">
								<Button
									className="group text-xs"
									type="button"
									size={'sm'}
									variant={'none'}
									onClick={handleImportProject}>
									{Boolean(error) ? (
										<div className="flex items-center gap-2 text-red-500 group-hover:text-red-400">
											<IconExclamationCircle size={16} />
											<p>{error}</p>
										</div>
									) : Boolean(file) ? (
										<div className="flex items-center gap-2 text-primary group-hover:text-primaryLight">
											<IconCircleCheck size={16} />
											<p className="">{file}</p>
										</div>
									) : (
										<p className="text-zinc-600 group-hover:text-zinc-400">
											Seleccionar proyecto .json
										</p>
									)}
								</Button>
							</label>

							<input
								id="input-file-upload"
								ref={inputRef}
								hidden
								accept=".json"
								type="file"
								onChange={handleInputChange}></input>

							{dragActive && (
								<div
									id="drag-file-element"
									className="absolute left-0 top-0 h-full w-full"
									onDragEnter={handleDrag}
									onDragLeave={handleDrag}
									onDragOver={handleDrag}
									onDrop={handleDrop}></div>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default ImportProjectInput;
