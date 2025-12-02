import React, { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
	return (
		<article
			className={[
				'flex flex-col overflow-hidden rounded-card border border-[#E5E5E5] bg-white',
				className,
			]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</article>
	);
};

interface CardBodyProps {
	children: ReactNode;
	className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
	return (
		<div
			className={['flex flex-col px-6 py-6', className]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</div>
	);
};
