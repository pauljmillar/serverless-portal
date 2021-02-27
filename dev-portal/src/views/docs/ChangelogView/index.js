import React, { lazy, Suspense } from 'react';
import Page from '../../../components/Page';

const Content = lazy(() => import('!babel-loader!mdx-loader!./Content.mdx'));

const ChangelogView = () => {
  return (
    <Page title="Changelog">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </Page>
  );
};

export default ChangelogView;
