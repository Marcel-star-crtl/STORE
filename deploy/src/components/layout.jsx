import { useRouter } from 'next/router';
import Navbar from './Navbar';
import HomeNavbar from './HomeNavbar';
import Footer from './Footer';
import useAuthStore from '../stores/authStore';
import React, { useEffect, useRef } from 'react';

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};



export default function Layout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const debouncedFetchUser = useDebounce(fetchUser, 300);

  useEffect(() => {
    debouncedFetchUser();
  }, [debouncedFetchUser, router.pathname]);


  return (
    <>
      {isHomePage ? <HomeNavbar /> : <Navbar />}
      <main>{children}</main>
      {!isHomePage && <Footer />}
    </>
  );
}




