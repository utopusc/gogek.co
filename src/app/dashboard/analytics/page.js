import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { ChannelSessionsVsBounce } from '@/components/dashboard/analytics/channel-sessions-vs-bounce-rate';
import { CountrySessionsVsBounce } from '@/components/dashboard/analytics/country-sessions-vs-bounce-rate';
import { Devices } from '@/components/dashboard/analytics/devices';
import { InboundOutbound } from '@/components/dashboard/analytics/inbound-outbound';
import { Insight } from '@/components/dashboard/analytics/insight';
import { Summary } from '@/components/dashboard/analytics/summary';

export const metadata = { title: `Business | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Business</Typography>
          </Box>
          <div>
            <Button startIcon={<PlusIcon />} variant="contained">
              Add Business
            </Button>
          </div>
        </Stack>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <Summary />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
