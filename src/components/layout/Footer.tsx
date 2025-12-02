import React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer className='border-t border-[#E5E5E5] bg-white pt-10 pb-6'>
			<div className='container-page'>
				{/* Top row: logo + columns */}
				<div className='grid gap-8 md:grid-cols-[auto,1fr]'>
					{/* Logo column */}
					<div className='flex flex-col gap-3'>
						<div className='flex items-center gap-3'>
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
						</div>
					</div>

					{/* Navigation links columns */}
					<div className='grid gap-6 md:grid-cols-3 text-[14px] text-brandGray'>
						<div className='space-y-2'>
							<div className='font-semibold text-brandDark'>
								MENTOR
							</div>
							<div>MENTEE</div>
							<div>MENTORSHIP</div>
							<div>TRANSFER CONNECTIONS</div>
							<div>ABOUT</div>
						</div>

						<div className='space-y-2'>
							<div className='font-semibold text-brandDark'>
								CONTACT
							</div>
							<div>TERMS &amp; CONDITIONS</div>
							<div>PRIVACY POLICY</div>
							<div>TRANSFER CONNECTIONS</div>
							<div>ABOUT</div>
						</div>

						<div className='space-y-2'>
							{/* If your Figma has a third column, add items here.
                  Otherwise you can leave it empty or put contact info. */}
						</div>
					</div>
				</div>

				{/* Bottom copyright */}
				<div className='mt-10 text-center text-[13px] text-brandGray'>
					© 2024 Mentor Mentee
				</div>
			</div>
		</footer>
	);
};
