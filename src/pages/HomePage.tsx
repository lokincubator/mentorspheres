import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { MissionSection } from '../components/sections/MissionSection';
import { SplitHighlightSection } from '../components/sections/SplitHighlightSection';
import { MentoringCardsSection } from '../components/sections/MentoringCardsSection';
import { Footer } from '../components/layout/Footer';

export const HomePage: React.FC = () => {
	return (
		<div className='flex min-h-screen flex-col bg-white'>
			<Navbar />
			<main className='flex-1'>
				<Hero />
				<MissionSection />
				<SplitHighlightSection
					title='Be A Mentee'
					body='Ed Platform will constitute a comprehensive suite of mentor/mentee matching, & teaching and mentoring tools that will increase the frequency and success rate of knowledge transfer and mentorship.'
					ctaLabel='Be A Mentee'
					imageSrc='/images/mentee-girl.png'
					imageAlt='Young woman mentee'
				/>
				<SplitHighlightSection
					title='Be A Mentor'
					body='Ed Platform will constitute a comprehensive suite of mentor/mentee matching, & teaching and mentoring tools that will increase the frequency and success rate of knowledge transfer and mentorship.'
					ctaLabel='Be A Mentor'
					imageSrc='/images/mentor-man.png'
					imageAlt='Mentor smiling'
					reverse
				/>
				<MentoringCardsSection />
			</main>
			<Footer />
		</div>
	);
};
