import React, { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import HomeView from '../views/home/HomeView';


const HomePage = () => {
  return (
    <MainLayout >
        <HomeView />
    </MainLayout>
  );
}

export default HomePage;