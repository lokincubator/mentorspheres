import React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Card, CardBody } from '../ui/Card';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

const cards = [
	{
		title: 'Mentoring For Government Agencies',
		body: 'Ed Platform will constitute a comprehensive suite of mentor/mentee matching, & teaching and mentoring tools.',
		imageSrc: '/images/card-government.png',
	},
	{
		title: 'Mentoring For Corporate',
		body: 'Ed Platform will constitute a comprehensive suite of mentor/mentee matching, & teaching and mentoring tools.',
		imageSrc: '/images/card-corporate.png',
	},
	{
		title: 'Mentoring For Associations',
		body: 'Ed Platform will constitute a comprehensive suite of mentor/mentee matching, & teaching and mentoring tools.',
		imageSrc: '/images/card-associations.png',
	},
];

export const MentoringCardsSection: React.FC = () => {
	return (
		<Section paddingY='md'>
			<Container>
				<div className='grid gap-6 md:grid-cols-3'>
					{cards.map((card) => (
						<Card key={card.title}>
							<img
								src={card.imageSrc}
								alt={card.title}
								className='h-[170px] w-full object-cover'
							/>
							<CardBody className='flex-1'>
								<Heading
									level={3}
									className='mb-2 leading-snug'>
									{card.title}
								</Heading>
								<Text className='mb-6 text-[14px]'>
									{card.body}
								</Text>
								<div className='mt-auto'>
									<Button variant='outline' size='sm'>
										Learn More
									</Button>
								</div>
							</CardBody>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	);
};
