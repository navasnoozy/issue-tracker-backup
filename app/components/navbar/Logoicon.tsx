'use client';
import { Box } from '@radix-ui/themes';
import { FaBug } from 'react-icons/fa';

const LogoIcon = () => (
  <Box 
    className="hover:scale-110 transition-all cursor-pointer"
    style={{ color: 'var(--md-sys-color-primary)' }}
  >
    <FaBug />
  </Box>
);

export default LogoIcon;