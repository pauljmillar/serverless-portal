import React, { lazy, Suspense } from 'react';
import DocsLayout from '../layouts/DocsLayout';
import SupportView from '../views/docs/SupportView';


const SupportPage = () => {
  return (
    <DocsLayout >
        <SupportView />
    </DocsLayout>
  );
}

export default SupportPage;