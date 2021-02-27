import React, { lazy, Suspense } from 'react';
import DocsLayout from '../layouts/DocsLayout';
import EnvironmentVariablesView from '../views/docs/EnvironmentVariablesView';


const EnvironmentVariablesPage = () => {
  return (
    <DocsLayout >
        <EnvironmentVariablesView />
    </DocsLayout>
  );
}

export default EnvironmentVariablesPage;