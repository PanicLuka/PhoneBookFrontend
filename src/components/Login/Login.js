import React from 'react'
import { useState } from 'react'
import {
  CssBaseline,
  Grid,
  TextField,
  Avatar,
  Paper,
  Button,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import classes from './Login.module.css'
import useLogin from '../../hooks/use-login'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { contactsActions } from '../../store/contacts-slice'

const Login = () => {
  const { error, loginUser } = useLogin()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

  const enteredEmailIsValid = enteredEmail !== '' && enteredEmail.includes('@')
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  const enteredPasswordIsValid = enteredPassword !== ''
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched

  let formIsValid = false

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
  }

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true)
  }

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
  }

  const passwordInputBlurHandler = (event) => {
    setEnteredPasswordTouched(true)
  }

  const formSubmitHandler = () => {
    setEnteredEmailTouched(true)
    setEnteredPassword(true)

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      console.log('invalidForm')
    }

    const loginObj = {
      Email: enteredEmail,
      Password: enteredPassword,
    }

    loginUser(loginObj)

    if (error !== null) {
      console.log(error)
    }

    // console.log(token)
    // localStorage.setItem('JWT', token)

    setEnteredEmail('')
    setEnteredEmailTouched(false)

    setEnteredPassword('')
    setEnteredPasswordTouched(false)

    if (localStorage.getItem('JWT') !== '') {
      navigate('/home')
      dispatch(contactsActions.login())
    }
  }

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} justify="center">
        <Paper elevation={10} className={classes.paper}>
          <Grid align="center">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <div className={classes.flexContainer}>
            <TextField
              placeholder="Enter email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputIsInvalid && (
              <p className="error-text">Email must not be empty.</p>
            )}
            <TextField
              placeholder="Enter password"
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={enteredPassword}
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
            />
            {passwordInputIsInvalid && (
              <p className="error-text">Password must not be empty.</p>
            )}
            <div>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                onClick={formSubmitHandler}
                disabled={!formIsValid}
              >
                Sign In
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default Login
