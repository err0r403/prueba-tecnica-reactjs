import * as yup from 'yup';

import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { LoginUserDTO } from '../../../domain/dto/LoginUserDTO';
import { ObjectSchema } from 'yup';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { loginUser } from '../../slices/AuthSlice';
import { useFormik } from 'formik';

export const LoginUserDTOSchema: ObjectSchema<LoginUserDTO> = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required')
});

export const LoginForm: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginUserDTOSchema,
    onSubmit: (values) => {
      dispatch(
        loginUser({
          email: values.email,
          password: values.password
        })
      );
    }
  });
  return (
    <Box mx={2} display={'flex'} flex={1} flexDirection={'column'}>
      <Typography variant="h3" sx={{ pt: 2 }}>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {error && (
          <Alert sx={{ my: 2 }} severity="error">
            {error}
          </Alert>
        )}
        <Box mt={2}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            autoFocus
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Box mt={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </Box>
      </form>
      <Box my={4}>
        <Link to="/authentication/register">Register</Link>
      </Box>
    </Box>
  );
};
