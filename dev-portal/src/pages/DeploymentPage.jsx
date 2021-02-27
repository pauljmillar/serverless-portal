import React, { lazy, Suspense } from 'react';
import DocsLayout from '../layouts/DocsLayout';
import DeploymentView from '../views/docs/DeploymentView';


const DeploymentPage = () => {
  return (
    <DocsLayout >
        <DeploymentView />
    </DocsLayout>
  );
}

export default DeploymentPage;