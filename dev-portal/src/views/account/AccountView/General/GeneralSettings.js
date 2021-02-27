import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import wait from '../../../../utils/wait';
import countries from './countries';

const useStyles = makeStyles(() => ({
  root: {}
}));

const GeneralSettings = ({ className, user, ...rest }) => {
  const classes = useStyles();
 /* const { enqueueSnackbar } = useSnackbar();  */

  user = '';

  return (
    <Formik
      enableReinitialize
      initialValues={{
        canHire: user.canHire || false,
        city: user.city || '',
        country: user.country || '',
        email: user.email || '',
        isPublic: user.isPublic || false,
        name: user.name || '',
        phone: user.phone || '',
        state: user.state || '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        canHire: Yup.bool(),
        city: Yup.string().max(255),
        country: Yup.string().max(255),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        isPublic: Yup.bool(),
        name: Yup.string().max(255).required('Name is required'),
        phone: Yup.string(),
        state: Yup.string()
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          await wait(200);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
        /*  enqueueSnackbar('Profile updated', {
            variant: 'success'
          }); */
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="App Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email ? errors.email : 'We will use this email to contact you'}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  lg={12}
                >
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Sandbox Token"
                    name="token_sandbox"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  lg={12}
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.state && errors.state)}
                    fullWidth
                    helperText={touched.state && errors.state}
                    label="Prod Token"
                    name="token_prod"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    variant="outlined"
                    disabled="true"
                  />
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Base API Version"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value='1.0.1'
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    Opt into something
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Toggling this will something something something
                  </Typography>
                  <Switch
                    checked={values.canHire}
                    edge="start"
                    name="canHire"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
