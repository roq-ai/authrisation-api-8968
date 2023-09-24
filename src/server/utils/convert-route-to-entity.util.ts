const mapping: Record<string, string> = {
  'auth-tokens': 'auth_token',
  'error-responses': 'error_response',
  organizations: 'organization',
  'password-managements': 'password_management',
  profiles: 'profile',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
