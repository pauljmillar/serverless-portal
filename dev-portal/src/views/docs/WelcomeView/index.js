import React, { lazy, Suspense } from 'react';
import Page from '../../../components/Page';

const Content = lazy(() => import('!babel-loader!mdx-loader!./Content.mdx'));
//const Content = 'return <MDXLayout {...layoutProps} {...props} components={components} mdxType="MDXLayout">'

const WelcomeView = () => {
  return (
    <Page title="Welcome">
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </Page>
  );
}

export default WelcomeView;
