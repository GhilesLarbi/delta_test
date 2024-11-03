import '../styles/global.css';
import React, { useState, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
import Head from "next/head";
import LoadingModal from "../components/Layout/LoadingModal";
import { useRouter } from 'next/router';
import Context from "../store";

// Helper functions for localStorage
const getStoredAuth = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return token && user ? { token, user } : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = async () => {
    try {
      clearStoredAuth();
      setUser(null);
      router.push('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const storedAuth = getStoredAuth();
        
        if (!storedAuth) {
          // If we're not on the auth page, redirect to it
          if (!router.pathname.startsWith('/auth')) {
            await logout();
          }
          return;
        }

        // Optionally verify token with backend
        // const isValid = await restApi.verifyToken(storedAuth.token);
        // if (!isValid) {
        //   await logout();
        //   return;
        // }

        setUser(storedAuth);
        
        // If we're on the auth page but have valid auth, redirect to home
        if (router.pathname.startsWith('/auth')) {
          router.push('/home');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        await logout();
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, [router.pathname]); // Added router.pathname to dependencies

  // Public routes that don't require authentication
  const publicRoutes = ['/auth', '/auth/login', '/auth/register'];
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(router.pathname);

  // Show loading state
  if (isLoading) {
    return <LoadingModal />;
  }

  // If not a public route and no user, show loading while redirecting
  if (!isPublicRoute && !user) {
    return <LoadingModal />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NextNProgress />
      
      <Context.Provider
        value={{
          user,
          logout, // Added logout to context so it's available everywhere
          isAuthenticated: !!user, // Added helper flag
        }}
      >
        <Component {...pageProps} />
      </Context.Provider>
    </>
  );
}

export default MyApp;