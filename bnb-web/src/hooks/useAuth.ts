import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(router: ReturnType<typeof useRouter>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
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
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      router.push('/login');
    }
  }, [router]);

  return { isAuthenticated, isAdmin, isLoading };
}