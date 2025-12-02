import React, { ReactNode } from 'react';

interface SectionProps {
	children: ReactNode;
	className?: string;
	as?: 'section' | 'div';
	id?: string;
	background?: 'white' | 'light' | 'dark';
	paddingY?: 'sm' | 'md' | 'lg';
}

const paddingMap: Record<NonNullable<SectionProps['paddingY']>, string> = {
	sm: 'py-10 md:py-12',
	md: 'py-16 md:py-20',
	lg: 'py-20 md:py-24',
};

const bgMap: Record<NonNullable<SectionProps['background']>, string> = {
	white: 'bg-white',
	light: 'bg-brandLight',
	dark: 'bg-brandDark text-white',
};

export const Section: React.FC<SectionProps> = ({
	children,
	className,
	as: Tag = 'section',
	id,
	background = 'white',
	paddingY = 'md',
}) => {
	return (
		<Tag
			id={id}
			className={[bgMap[background], paddingMap[paddingY], className]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</Tag>
	);
};
