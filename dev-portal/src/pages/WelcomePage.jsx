import React, { lazy, Suspense } from 'react';
import DocsLayout from '../layouts/DocsLayout';
import WelcomeView from '../views/docs/WelcomeView';


const WelcomePage = () => {
  return (
    <DocsLayout >
        <WelcomeView />
    </DocsLayout>
  );
}

export default WelcomePage;