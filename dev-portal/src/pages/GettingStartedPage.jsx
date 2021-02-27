import React, { lazy, Suspense } from 'react';
import DocsLayout from '../layouts/DocsLayout';
import GettingStartedView from '../views/docs/GettingStartedView';


const GettingStartedPage = () => {
  return (
    <DocsLayout >
        <GettingStartedView />
    </DocsLayout>
  );
}

export default GettingStartedPage;