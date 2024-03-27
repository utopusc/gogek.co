'use client';

import { Amplify } from 'aws-amplify';

import { config } from '@/config';

Amplify.configure({
  Auth: {
    Cognito: {
    },
  },
});
