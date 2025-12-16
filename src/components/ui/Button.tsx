import React from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const Button = React.forwardRef<HTMLButtonElement, any>(function Button(
  {
    children,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    loading = false,
    startIcon,
    endIcon,
    fullWidth = false,
    className,
    disabled,
    ...rest
  },
  ref
) {
  return (
    <MuiButton
      ref={ref}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      className={className}
      {...rest}
    >
      {loading ? <CircularProgress size={16} color="inherit" /> : children}
    </MuiButton>
  );
});

export default Button;
