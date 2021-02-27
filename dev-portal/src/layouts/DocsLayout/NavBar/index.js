/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles
} from '@material-ui/core';
import Logo from '../../../components/Logo';
import NavItem from './NavItem';

const items = [
  {
    title: 'Welcome',
    href: '/welcome'
  },
  {
    title: 'Getting Started',
    href: '/getting-started'
  },
  {
    title: 'Environment Variables',
    href: '/environment-variables'
  },
  {
    title: 'Deployment',
    href: '/deployment'
  },
  {
    title: 'Analytics',
    href: '/analytics'
  },
  {
    title: 'API Calls',
    href: '/api-calls'
  },
  {
    title: 'Authentication',
    href: '/authentication'
  },
  {
    title: 'Routing',
    href: '/routing'
  },
  {
    title: 'Settings',
    href: '/settings'
  },
  {
    title: 'State Management',
    href: '/state-management'
  },
  {
    title: 'Theming',
    href: '/theming'
  },
  {
    title: 'Support',
    href: '/support'
  },
  {
    title: 'Changelog',
    href: '/changelog'
  }
];

function renderNavItems({ items, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  item,
  depth = 0
}) {
  if (item.items) {
    acc.push(
      <NavItem
        depth={depth}
        key={item.href}
        title={item.title}
      >
        {renderNavItems({
          items: item.items,
          depth: depth + 1
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        key={item.href}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  }
}));

const NavBar = ({ onMobileClose, openMobile, isDrawerInitiallyOpen }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Hidden lgUp>
        <Box p={2}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
      </Hidden>
      <Box p={2}>
        {renderNavItems({ items })}
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open={isDrawerInitiallyOpen}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  isDrawerInitiallyOpen: PropTypes.bool
};

NavBar.defaultProps = {
  isDrawerInitiallyOpen: true
};

export default NavBar;
