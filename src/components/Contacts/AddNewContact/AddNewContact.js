import {
  CssBaseline,
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'

import ContactDetail from '../ContactDetail'
import { useState } from 'react'

import classes from './AddNewContact.module.css'
import usePostContact from '../../../hooks/use-post-contact'

const AddNewContact = () => {
  const { postContact } = usePostContact()
  const [contactDetails, setContactDetail] = useState([])
  const [detailsFormIsShown, setDetailsFormIsShown] = useState(false)

  const [enteredFirstName, setEnteredFirstName] = useState('')
  const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false)

  const [enteredLastName, setEnteredLastName] = useState('')
  const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false)

  const [showDetailsForm, setShowDetailsForm] = useState(false)
  const [newContactId, setNewContactId] = useState()

  const enteredFirstNameIsValid = enteredFirstName.trim() !== ''
  const firstNameInputIsInvalid =
    !enteredFirstNameIsValid && enteredFirstNameTouched

  const enteredLastNameIsValid = enteredLastName.trim() !== ''
  const lastNameInputIsInvalid =
    !enteredLastNameIsValid && enteredLastNameTouched

  let formIsValid = false

  if (enteredFirstNameIsValid && enteredLastNameIsValid) {
    formIsValid = true
  }

  const addNewDetail = () => {
    const contactDetail = <ContactDetail id={newContactId} />
    setDetailsFormIsShown(!detailsFormIsShown)
    setContactDetail(contactDetail)
  }

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value)
  }

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value)
  }

  const firstNameBlurHandler = () => {
    setEnteredFirstNameTouched(true)
  }

  const lastNameBlurHandler = () => {
    setEnteredLastNameTouched(true)
  }

  const formSubmitHandler = () => {
    setEnteredFirstNameTouched(true)
    setEnteredLastNameTouched(true)

    if (!enteredFirstNameIsValid || !enteredLastNameIsValid) {
      console.log('invalidForm')
    }

    const contactObject = {
      FirstName: enteredFirstName,
      LastName: enteredLastName,
    }

    postContact(contactObject).then((res) => {
      setNewContactId(res.contactId)
    })
    setShowDetailsForm(true)
    setEnteredFirstName('')
    setEnteredFirstNameTouched(false)

    setEnteredLastName('')
    setEnteredLastNameTouched(false)
  }

  const removeDetailFrom = () => {
    setDetailsFormIsShown(false)
  }

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} justify="center">
        <Paper elevation={10} className={classes.paper}>
          <Grid align="center">
            <h2>New Contact</h2>
          </Grid>
          <div className={classes.flexContainer}>
            {!showDetailsForm && (
              <>
                <TextField
                  placeholder="Enter First Name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                  value={enteredFirstName}
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
                  onBlur={lastNameBlurHandler}
                  onChange={lastNameChangeHandler}
                  value={enteredLastName}
                />
                {lastNameInputIsInvalid && (
                  <p className="error-text">Last Name must not be empty.</p>
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
                    Add New Contact
                  </Button>
                </div>
              </>
            )}
            {showDetailsForm ? (
              <div className={classes.flexIcon}>
                <Typography variant="h6">Add Conact Details: </Typography>
                {!detailsFormIsShown && (
                  <AddCircleOutlineOutlinedIcon
                    onClick={addNewDetail}
                    className={classes.icon}
                  />
                )}
                {detailsFormIsShown && (
                  <RemoveCircleOutlineOutlinedIcon
                    onClick={removeDetailFrom}
                    className={classes.icon}
                  />
                )}
                {detailsFormIsShown && contactDetails}
              </div>
            ) : null}
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default AddNewContact
