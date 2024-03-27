import { config } from '@/config';
import { AuthStrategy } from '@/lib/auth/strategy';

import { UserContext as FirebaseUserContext, UserProvider as FirebaseUserProvider } from './firebase/user-context';

// eslint-disable-next-line import/no-mutable-exports -- Export based on config
let UserProvider;

// eslint-disable-next-line import/no-mutable-exports -- Export based on config
let UserContext;

switch (config.auth.strategy) {
  case AuthStrategy.CUSTOM:
    UserContext = CustomUserContext;
    UserProvider = CustomUserProvider;
    break;
  case AuthStrategy.AUTH0:
    UserContext = Auth0UserContext;
    UserProvider = Auth0UserProvider;
    break;
  case AuthStrategy.COGNITO:
    UserContext = CognitoUserContext;
    UserProvider = CognitoUserProvider;
    break;
  case AuthStrategy.FIREBASE:
    UserContext = FirebaseUserContext;
    UserProvider = FirebaseUserProvider;
    break;
  case AuthStrategy.SUPABASE:
    UserContext = SupabaseUserContext;
    UserProvider = SupabaseUserProvider;
    break;
  default:
    throw new Error('Invalid auth strategy');
}

export { UserProvider, UserContext };
