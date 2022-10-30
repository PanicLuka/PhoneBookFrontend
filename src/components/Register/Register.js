import React, { useState } from 'react'
import {
  CssBaseline,
  Grid,
  TextField,
  Avatar,
  Paper,
  Button,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import classes from './Register.module.css'
import usePost from '../../hooks/use-post'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const { error, postUser } = usePost()

  const [enteredFirstName, setEnteredFirstName] = useState('')
  const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false)

  const [enteredLastName, setEnteredLastName] = useState('')
  const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false)

  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false)

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

  const enteredFirstNameIsValid = enteredFirstName.trim() !== ''
  const firstNameInputIsInvalid =
    !enteredFirstNameIsValid && enteredFirstNameTouched

  const enteredLastNameIsValid = enteredLastName.trim() !== ''
  const lastNameInputIsInvalid =
    !enteredLastNameIsValid && enteredLastNameTouched

  const enteredUsernameIsValid = enteredUsername.trim() !== ''
  const usernameInputIsInvalid =
    !enteredUsernameIsValid && enteredUsernameTouched

  const enteredEmailIsValid = enteredEmail !== '' && enteredEmail.includes('@')
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  const enteredPasswordIsValid = enteredPassword !== ''
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched

  let formIsValid = false

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredUsernameIsValid &&
    enteredPasswordIsValid
  ) {
    formIsValid = true
  }

  const firstNameInputChangeHandler = (event) => {
    setEnteredFirstName(event.target.value)
  }

  const firstNameInputBlurHandler = (event) => {
    setEnteredFirstNameTouched(true)
  }

  const lastNameInputChangeHandler = (event) => {
    setEnteredLastName(event.target.value)
  }

  const lastNameInputBlurHandler = (event) => {
    setEnteredLastNameTouched(true)
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
  }

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true)
  }

  const usernameInputChangeHandler = (event) => {
    setEnteredUsername(event.target.value)
  }

  const usernameInputBlurHandler = (event) => {
    setEnteredUsernameTouched(true)
  }

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
  }

  const passwordInputBlurHandler = (event) => {
    setEnteredPasswordTouched(true)
  }

  const formSubmitHandler = () => {
    setEnteredFirstNameTouched(true)
    setEnteredLastNameTouched(true)
    setEnteredEmailTouched(true)
    setEnteredUsernameTouched(true)
    setEnteredPassword(true)

    if (
      !enteredFirstNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredUsernameIsValid ||
      !enteredEmailIsValid ||
      !enteredPasswordIsValid
    ) {
      console.log('invalidForm')
    }

    const userObj = {
      FirstName: enteredFirstName,
      LastName: enteredLastName,
      Username: enteredUsername,
      Email: enteredEmail,
      Password: enteredPassword,
    }

    postUser(userObj)

    if (error !== null) {
      console.log(error)
    }

    setEnteredFirstName('')
    setEnteredFirstNameTouched(false)

    setEnteredLastName('')
    setEnteredLastNameTouched(false)

    setEnteredEmail('')
    setEnteredEmailTouched(false)

    setEnteredUsername('')
    setEnteredUsernameTouched(false)

    setEnteredPassword('')
    setEnteredPasswordTouched(false)

    navigate('/login')
  }

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={2}
        justify="center"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 3,
          xxl: 3,
        }}
      >
        <Paper elevation={10} className={classes.paper}>
          <Grid align="center">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <div className={classes.flexContainer}>
            <TextField
              placeholder="Enter First Name"
              label="First Name"
              variant="outlined"
              fullWidth
              required
              value={enteredFirstName}
              onChange={firstNameInputChangeHandler}
              onBlur={firstNameInputBlurHandler}
            />
            {firstNameInputIsInvalid && (
              <p className="error-text">First Name must not be empty.</p>
            )}
            <TextField
              placeholder="Enter Last Name"
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              value={enteredLastName}
              onChange={lastNameInputChangeHandler}
              onBlur={lastNameInputBlurHandler}
            />
            {lastNameInputIsInvalid && (
              <p className="error-text">Last Name must not be empty.</p>
            )}
            <TextField
              placeholder="Enter Email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputIsInvalid && (
              <p className="error-text">First Name must not be empty.</p>
            )}
            <TextField
              placeholder="Enter username"
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={enteredUsername}
              onChange={usernameInputChangeHandler}
              onBlur={usernameInputBlurHandler}
            />
            {usernameInputIsInvalid && (
              <p className="error-text">Username must not be empty.</p>
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
                Sign Up
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default Register
