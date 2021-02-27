import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Hidden,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import { APP_VERSION } from '../../constants';
import { Menu as MenuIcon } from 'react-feather';
import Logo from '../../components/Logo';

import {
  isAdmin,
  isAuthenticated,
  isRegistered,
  logout,
  getLoginRedirectUrl
} from 'services/self'

import { cognitoDomain, cognitoClientId } from '../../services/api'

// mobx
import { observer } from 'mobx-react'

// fragments
import { fragments } from 'services/get-fragments'

// components
import MenuLink from 'components/MenuLink'
import { store } from 'services/state'

function getCognitoUrl (type) {
  const redirectUri = getLoginRedirectUrl()
  return `${cognitoDomain}/${type}?response_type=token&client_id=${cognitoClientId}&redirect_uri=${redirectUri}`
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    height: 64
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        <Hidden mdDown>
          <Typography
            variant="caption"
            color="textSecondary"
          >
            Version
            {' '}
            {APP_VERSION}
          </Typography>
        </Hidden>
        <Box flexGrow={1} />
            {isAuthenticated() ? <>
            {isAdmin() && 
              <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/admin/apis"
          underline="none"
          variant="body2"
        >
          Admin 
        </Link>}
            {isRegistered() && 
                    <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/account"
          underline="none"
          variant="body2"
        >
          Account
        </Link>}
        </> : <></>}
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/welcome"
          underline="none"
          variant="body2"
        >
          Documentation
        </Link>            
        <Divider className={classes.divider} />
          {isAuthenticated() ? <>
            <Button
              color="secondary"
              component="a"
              onClick={logout}
              variant="contained"
              size="small"
            >
            Sign Out
            </Button>
          </> : <>
            <Button
              color="secondary"
              component="a"
              href={getCognitoUrl('login')}
              variant="contained"
              size="small"
            >
            Sign In
            </Button>
          </>}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
