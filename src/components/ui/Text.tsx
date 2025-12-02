import React, { ReactNode } from 'react';

interface TextProps {
	children: ReactNode;
	className?: string;
}

export const Text: React.FC<TextProps> = ({ children, className }) => {
	return (
		<p
			className={['text-[15px] leading-relaxed text-brandGray', className]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</p>
	);
};
