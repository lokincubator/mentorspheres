import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
}

const base =
	'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brandRed focus-visible:ring-offset-white';

const variants: Record<ButtonVariant, string> = {
	primary: 'bg-brandRed text-white hover:bg-[#c71a25]',
	secondary:
		'bg-white text-brandDark hover:bg-brandLight border border-transparent',
	outline:
		'border border-brandRed text-brandRed hover:bg-brandRed hover:text-white',
	ghost: 'text-brandRed hover:bg-brandLight',
};

const sizes: Record<ButtonSize, string> = {
	sm: 'text-[13px] px-4 py-2',
	md: 'text-[14px] px-6 py-2.5',
};

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'md',
	fullWidth,
	className,
	...rest
}) => {
	return (
		<button
			className={[
				base,
				variants[variant],
				sizes[size],
				fullWidth ? 'w-full' : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...rest}>
			{children}
		</button>
	);
};
