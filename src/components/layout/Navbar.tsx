import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '../ui/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const navItems = [
	{ label: 'Home', to: '/' },
	{ label: 'Mentors', to: '/all-mentors' },
	{ label: 'Mentees', to: '/all-mentees' },
	{ label: 'About Us', to: '/about' },
	{ label: 'Contact Us', to: '/contact' },
];

export const Navbar: React.FC = () => {
    return (
        <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #E5E5E5' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ height: 80, display: 'flex', justifyContent: 'space-between' }}>
                    <Box component={Link} to='/' sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
                        <Box component="img" src="/images/logo-mentor-mentee.svg" alt="Mentor Mentee logo" sx={{ height: 40, width: 'auto' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 0.2, color: 'text.primary' }}>
                                MENTOR
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 0.2, color: 'primary.main', mt: '-4px' }}>
                                MENTEE
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3, typography: 'body1' }}>
                        {navItems.map((item) => (
                            <Box
                                key={item.to}
                                component={NavLink}
                                to={item.to}
                                className={({ isActive }) => (isActive ? 'nav-active' : '')}
                                sx={{
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    position: 'relative',
                                    transition: 'color 150ms ease',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                    '&.nav-active': {
                                        color: '#b91c1c',
                                    },
                                    // Animated underline
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: -6,
                                        height: '2px',
                                        width: '100%',
                                        backgroundColor: 'currentColor',
                                        transform: 'scaleX(0)',
                                        transformOrigin: 'left',
                                        transition: 'transform 150ms ease',
                                        opacity: 0.9,
                                    },
                                    '&:hover::after': {
                                        transform: 'scaleX(1)',
                                    },
                                    '&.nav-active::after': {
                                        transform: 'scaleX(1)',
                                    },
                                }}
                            >
                                {item.label}
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button variant="contained" size="small" color="primary">Sign In</Button>
                    </Box>

                    {/* Mobile: compact sign in */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5 }}>
                        <Button variant="contained" size="small" color="primary">Sign In</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
