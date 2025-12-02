import React, { ReactNode } from 'react';

type HeadingLevel = 1 | 2 | 3;

interface HeadingProps {
	level?: HeadingLevel;
	children: ReactNode;
	className?: string;
}

const baseStyles = {
	1: 'text-[44px] md:text-[52px] leading-[1.05] font-bold',
	2: 'text-[32px] md:text-[36px] font-bold',
	3: 'text-[18px] font-semibold',
} as const;

const tags = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
} as const;

export const Heading: React.FC<HeadingProps> = ({
	level = 1,
	children,
	className,
}) => {
	const Tag = tags[level] as keyof React.JSX.IntrinsicElements;

	return (
		<Tag
			className={[baseStyles[level], 'text-brandDark', className]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</Tag>
	);
};
