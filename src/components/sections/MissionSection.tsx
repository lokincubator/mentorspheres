import React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

export const MissionSection: React.FC = () => {
	return (
		<Section>
			<Container className='grid gap-10 md:grid-cols-2 md:items-center'>
				<div className='order-2 md:order-1'>
					<Heading level={2} className='mb-4'>
						Our Mission
					</Heading>
					<Text className='mb-6 max-w-[480px]'>
						Ed Platform will constitute a comprehensive suite of
						mentor/mentee matching, &amp; teaching and mentoring
						tools that will increase the frequency and success rate
						of knowledge transfer and mentorship.
					</Text>
					<Button variant='outline'>Learn More</Button>
				</div>

				<div className='order-1 md:order-2'>
					<div className='relative'>
						<div className='absolute -left-4 -top-4 hidden h-[85%] w-[3px] bg-brandRed md:block' />
						<img
							src='/images/mission-group.jpg'
							alt='Group of happy mentees'
							className='ml-0 h-full w-full rounded-[4px] object-cover md:ml-6'
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
};
