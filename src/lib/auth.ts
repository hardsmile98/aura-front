export const AUTH_JWT_KEY = 'auth_jwt';

export function isAuthorized(): boolean {
  const token = localStorage.getItem(AUTH_JWT_KEY);
  return Boolean(token && token.length > 0);
}

export function setAuthJWT(token: string): void {
  localStorage.setItem(AUTH_JWT_KEY, token);
}

export function removeAuthJWT(): void {
  localStorage.removeItem(AUTH_JWT_KEY);
}