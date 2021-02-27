import React, { lazy, Suspense } from 'react';
import DocsLayout from '../layouts/DocsLayout';
import AccountView from '../views/account/AccountView';


const AccountPage = () => {
  return (
    <DocsLayout >
        <AccountView />
    </DocsLayout>
  );
}

export default AccountPage;