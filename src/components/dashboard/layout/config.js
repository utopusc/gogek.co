import { paths } from '@/paths';
import { title } from 'process';

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
      items: [
        { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'house' },
        { key: 'business', title: 'Business', href: paths.dashboard.analytics, icon: 'chart-pie' },
        { key: 'chat', title: 'Chat', href: paths.dashboard.chat.base, icon: 'live-chat'},
      ],
    },
    {
      key: 'general',
      title: 'General',
      items: [
        {
          key: 'settings',
          title: 'Settings',
          href: paths.dashboard.settings.account,
          icon: 'gear',
          matcher: { type: 'startsWith', href: '/dashboard/settings' },
        }
      ],
    }
  ],
};
