import { AuthStrategy } from '@/lib/auth/strategy';
import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

export const config = {
  site: {
    name: 'GoGek.co',
    description: 'Slogan',
    colorScheme: 'dark',
    themeColor: '#090a0b',
    primaryColor: 'chateauGreen',
    url: getSiteURL(),
    version: process.env.NEXT_PUBLIC_SITE_VERSION || '0.0.1',
  },
  logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || LogLevel.ALL,
  auth: { strategy: AuthStrategy.AUTH0,
  },
  auth0: {
    secret: process.env.AUTH0_SECRET,
    baseUrl: process.env.AUTH0_BASE_URL,
    issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  },
  mapbox: { apiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY },
  gtm: { id: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID },
};
