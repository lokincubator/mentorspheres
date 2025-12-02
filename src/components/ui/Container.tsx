import React, { ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
	className?: string;
}

export const Container: React.FC<ContainerProps> = ({
	children,
	className,
}) => {
	return (
		<div
			className={['mx-auto max-w-content px-4 md:px-6 lg:px-0', className]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</div>
	);
};
