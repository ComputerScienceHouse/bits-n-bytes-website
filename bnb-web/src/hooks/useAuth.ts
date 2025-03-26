import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(router: ReturnType<typeof useRouter>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and set authentication state
      fetch('/api/admin/protected', {
        headers: {
          'Authorization': token
        }
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else {
          router.push('/login');
        }
      })
      .catch(() => {
        router.push('/login');
      });
    } else {
      router.push('/login');
    }
  }, [router]);

  return { isAuthenticated, isAdmin };
}