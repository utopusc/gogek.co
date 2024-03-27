'use client';

import React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { CreditCard as CreditCardIcon, LockKey as LockKeyIcon, User as UserIcon } from '@phosphor-icons/react';
import { useUser } from '@/hooks/use-user';

import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';

import { FirebaseSignOut } from './firebase-sign-out';

export function UserPopover({ anchorEl, onClose, open }) {
  const { user, isLoading, error } = useUser(); // useUser hook'unu burada çağır

  // Loading veya error durumunu bileşen içinde yönet
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>; // error nesnesinin message özelliğini kullanarak hata mesajını göster
  }

  // Kullanıcı bilgilerini kullanarak UI'ı oluştur
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={Boolean(open)}
      slotProps={{ paper: { sx: { width: '280px' } } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography>{user?.name}</Typography> {/* Kullanıcı bilgilerine güvenli erişim */}
        <Typography color="text.secondary" variant="body2">
          {user?.email}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 1 }}>
        <MenuItem component={RouterLink} href={paths.dashboard.settings.account} onClick={onClose}>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          Account
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.dashboard.settings.security} onClick={onClose}>
          <ListItemIcon>
            <LockKeyIcon />
          </ListItemIcon>
          Security
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.dashboard.settings.billing} onClick={onClose}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          Billing
        </MenuItem>
      </List>
      <Divider />
      <Box sx={{ p: 1 }}>
        {config.auth.strategy === AuthStrategy.FIREBASE && <FirebaseSignOut />}
      </Box>
    </Popover>
  );
}
