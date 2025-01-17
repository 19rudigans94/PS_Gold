import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import FeaturedGames from './components/FeaturedGames';
import { useHome } from './hooks/useHome';

const Home = () => {
  const { featuredGames, isLoading, error } = useHome();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-xl text-gray-900 font-semibold mb-2">Упс! Что-то пошло не так</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <div className="container mx-auto px-4">
        <FeaturedGames games={featuredGames} />
      </div>
    </div>
  );
};

export default Home;
