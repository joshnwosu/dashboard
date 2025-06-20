// Function to get cookie value by name
export const getCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  return document.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${name}=`))
    ?.split('=')[1];
};

// Function to set cookie (client-side fallback)
export const setCookie = (name: string, value: string, maxAge: number) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Strict; ${
      process.env.NODE_ENV === 'production' ? 'Secure' : ''
    }`;
  }
};
