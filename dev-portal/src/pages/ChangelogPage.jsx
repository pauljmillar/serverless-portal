import React, { lazy, Suspense } from 'react';
import DocsLayout from '../layouts/DocsLayout';
import ChangelogView from '../views/docs/ChangelogView';


const ChangelogPage = () => {
  return (
    <DocsLayout >
        <ChangelogView />
    </DocsLayout>
  );
}

export default ChangelogPage;