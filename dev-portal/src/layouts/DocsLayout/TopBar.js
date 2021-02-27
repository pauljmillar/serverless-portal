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
  makeStyles,
  IconButton
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

function getCognitoUrl (type) {
  const redirectUri = getLoginRedirectUrl()
  return `${cognitoDomain}/${type}?response_type=token&client_id=${cognitoClientId}&redirect_uri=${redirectUri}`
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 100
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

const TopBar = ({ onMobileNavOpen, className, ...rest  }) => {
  const classes = useStyles();

  return (
     <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>

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
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
