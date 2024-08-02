import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type AccordionInfoProps = {
	title: string;
	description: string;
};

const AccordionInfo = ({ title, description }: AccordionInfoProps) => {
	return (
		<Accordion type="single" collapsible className="-my-4 -mb-8 w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger className="text-xs text-zinc-400">{title}</AccordionTrigger>
				<AccordionContent className="text-xs text-zinc-300">{description}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default AccordionInfo;
