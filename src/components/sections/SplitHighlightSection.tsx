import React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

interface SplitHighlightSectionProps {
	title: string;
	body: string;
	ctaLabel?: string;
	imageSrc: string;
	imageAlt: string;
	reverse?: boolean;
}

export const SplitHighlightSection: React.FC<SplitHighlightSectionProps> = ({
	title,
	body,
	ctaLabel,
	imageSrc,
	imageAlt,
	reverse,
}) => {
	const imageSideClasses = reverse ? 'md:order-2' : '';
	const textSideClasses = reverse ? 'md:order-1' : '';

	return (
		<Section>
			<Container className='grid gap-10 md:grid-cols-2 md:items-center'>
				<div className={imageSideClasses}>
					<div className='relative'>
						<div
							className={[
								'absolute hidden h-[85%] w-[3px] bg-brandRed md:block',
								reverse ? '-right-4 -top-4' : '-left-4 -top-4',
							].join(' ')}
						/>
						<img
							src={imageSrc}
							alt={imageAlt}
							className={
								reverse
									? 'mr-6 w-full object-cover'
									: 'ml-6 w-full object-cover'
							}
						/>
					</div>
				</div>

				<div className={textSideClasses}>
					<Heading level={2} className='mb-4'>
						{title}
					</Heading>
					<Text className='mb-6 max-w-[480px]'>{body}</Text>
					{ctaLabel && <Button variant='outline'>{ctaLabel}</Button>}
				</div>
			</Container>
		</Section>
	);
};
