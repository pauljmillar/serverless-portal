// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import * as queryString from 'query-string'

// content-fragments
import { loadFragments } from 'services/get-fragments'

// semantic-ui
//import 'semantic-ui-css/semantic.css'

import {
  jssPreset,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core';
import GlobalStyles from 'components/GlobalStyles';

import 'prismjs/prism';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'assets/css/prism.css';

// pages
import Home from 'pages/Home'
import GettingStarted from 'pages/GettingStarted'
import Dashboard from 'pages/Dashboard'
import Apis from 'pages/Apis'
import SplashScreen from 'pages/SplashScreen'
import { Admin } from 'pages/Admin'
import WelcomePage from 'pages/WelcomePage'
import GettingStartedPage from 'pages/GettingStartedPage'
import EnvironmentVariablesPage from 'pages/EnvironmentVariablesPage'
import DeploymentPage from 'pages/DeploymentPage'
import SupportPage from 'pages/SupportPage'
import ChangelogPage from 'pages/ChangelogPage'
import HomePage from 'pages/HomePage';
import AccountPage from 'pages/AccountPage';

import { createTheme } from './theme';
import { THEMES } from './constants';


// components
import AlertPopup from 'components/AlertPopup'
import GlobalModal from 'components/Modal'
import NavBar from 'components/NavBar'
import Feedback from './components/Feedback'
import ApiSearch from './components/ApiSearch'

import { isAdmin, isRegistered, init, login, logout } from 'services/self'
import './index.css'

loadFragments()

// TODO: Feedback should be enabled if
// the following is true && the current
// user is not an administrator
const feedbackEnabled = window.config.feedbackEnabled

  const theme = createTheme({
    direction: 'ltr',
    //responsiveFontSizes: settings.responsiveFontSizes,
    theme: THEMES.LIGHT
  });

export const RegisteredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isRegistered()
        ? <Component {...props} />
        : <Redirect to='/' />
    )}
  />
)

export const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
      isAdmin()
        ? <Component {...props} />
        : <Redirect to='/' />
    )}
  />
)

// To shut up a dev warning
const HomeWrap = props => <Home {...props} />
const GettingStartedWrap = props => <GettingStarted {...props} />
const DashboardWrap = props => <Dashboard {...props} />

class App extends React.Component {
  constructor () {
    super()
    init()

    // We are using an S3 redirect rule to prefix the url path with #!
    // This then converts it back to a URL path for React routing
    if (window.location.hash && window.location.hash[1] === '!') {
      const hashRoute = window.location.hash.substring(2)
      window.history.pushState({}, 'home page', hashRoute)
    }
  }

  render () {
    return (
     <ThemeProvider theme={theme}>
      <BrowserRouter>
        <>
          <GlobalModal />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route
              exact
              path='/index.html'
              component={() => {
                const { action } = queryString.parse(window.location.search)
                if (action === 'login') {
                  login()
                } else if (action === 'logout') {
                  logout()
                }
                return <Redirect to='/' />
              }}
            />
            <Route path='/login' render={() => { login(); return <Redirect to='/' /> }} />
            <Route path='/logout' render={() => { logout(); return <Redirect to='/' /> }} />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/welcome' component={WelcomePage} />
            <Route exact path='/getting-started' component={GettingStartedPage} />   
            <Route exact path='/environment-variables' component={EnvironmentVariablesPage} />   
            <Route exact path='/deployment' component={DeploymentPage} />   
            <Route exact path='/changelog' component={ChangelogPage} />   
            <Route exact path='/support' component={SupportPage} />   
            <Route exact path='/account' component={AccountPage} />   
            <Route path='/aws/getting-started' component={GettingStartedWrap} />
            <RegisteredRoute path='/aws/dashboard' component={DashboardWrap} />
            <AdminRoute path='/aws/admin' component={Admin} />
            <Route exact path='/aws/apis' component={Apis} />
            <Route exact path='/aws/apis/search' component={ApiSearch} />
            <Route exact path='/aws/apis/:apiId' component={Apis} />
            <Route path='/aws/apis/:apiId/:stage' component={Apis} />
            <Route component={() => <h2>Page not found</h2>} />
          </Switch>
          {feedbackEnabled && <Feedback />}
          <AlertPopup />
        </>
      </BrowserRouter>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
