import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import Button from '../ui/Button';

const heroSlides = [
	{
		title: 'Find Your Mentor',
		body: 'Ed Platform will constitute a comprehensive suite of mentor/mentee matching, & teaching and mentoring tools that will increase the frequency and success rate of knowledge transfer and mentorship.',
	},
];

export const Hero: React.FC = () => {
	const { heroSlideIndex, setHeroSlideIndex } = useAppContext();
	const slide = heroSlides[heroSlideIndex];

	return (
		<Section background="transparent" paddingY="none" className="relative p-0">
			<div className='relative h-[520px] md:h-[560px] lg:h-[676px]'>
				<img
					src='/images/hero-mentor-mentee.png'
					alt='People mentoring around a laptop'
					className='absolute inset-0 h-full w-full object-cover'
				/>

				<div className='relative h-full'>
					<Container className='flex h-full flex-col justify-center'>
						<div className='max-w-[520px] space-y-5'>
							<Heading level={1} className='text-white'>
								{slide.title}
							</Heading>
							<Text className='text-white/90'>{slide.body}</Text>

							<div className='mt-4 flex flex-wrap gap-3'>
								<Button>Be A Mentor</Button>
								<Button variant='outline'>Be A Mentee</Button>
							</div>
						</div>

						<div className='mt-8 flex items-center gap-2'>
							{heroSlides.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setHeroSlideIndex(idx)}
									className={[
										'h-[10px] w-[10px] rounded-full border border-white/80',
										idx === heroSlideIndex
											? 'bg-white'
											: 'bg-transparent',
									].join(' ')}
									aria-label={`Go to slide ${idx + 1}`}
								/>
							))}
						</div>
					</Container>
				</div>
			</div>
		</Section>
	);
};
