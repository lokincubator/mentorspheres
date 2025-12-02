import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const navItems = [
	{ label: 'Home', to: '/' },
	{ label: 'Mentor', to: '/mentor' },
	{ label: 'Mentee', to: '/mentee' },
	{ label: 'About Us', to: '/about' },
	{ label: 'Contact Us', to: '/contact' },
];

export const Navbar: React.FC = () => {
	return (
		<header className='w-full border-b border-[#E5E5E5] bg-white'>
			<Container className='flex h-20 items-center justify-between'>
				<Link to='/' className='flex items-center gap-3'>
					<img
						src='/images/logo-mentor-mentee.svg'
						alt='Mentor Mentee logo'
						className='h-10 w-auto'
					/>
					<div className='flex flex-col leading-tight'>
						<span className='text-[18px] font-bold tracking-tight uppercase text-brandDark'>
							MENTOR
						</span>
						<span className='text-[18px] font-bold tracking-tight uppercase text-brandRed -mt-1'>
							MENTEE
						</span>
					</div>
				</Link>

				<nav className='hidden items-center gap-8 text-[15px] font-medium text-brandDark md:flex'>
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								[
									'transition-colors',
									isActive
										? 'text-brandRed'
										: 'hover:text-brandRed',
								].join(' ')
							}>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className='hidden md:flex'>
					<Button size='sm'>Sign In</Button>
				</div>

				{/* Mobile: compact sign in */}
				<div className='flex items-center gap-3 md:hidden'>
					<Button size='sm'>Sign In</Button>
				</div>
			</Container>
		</header>
	);
};
