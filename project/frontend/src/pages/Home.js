import React, { useEffect } from 'react';
import HomeContainer from '../components/home/HomeContainer';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const auth = useAuth();
  useEffect(() => {
    auth.me();
  }, []);

  return <HomeContainer />;
}
