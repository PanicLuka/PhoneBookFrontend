import { TextField, Button } from '@mui/material'
import { useState } from 'react'
import classes from './ContactDetail.module.css'
import usePostContact from '../../hooks/use-post-contact'

const ContactDetail = (props) => {
  const { postContactDetail } = usePostContact()

  const [enteredValueName, setEnteredValueName] = useState('')
  const [enteredValueNameTouched, setEnteredValueNameTouched] = useState('')

  const [enteredValue, setEnteredValue] = useState('')
  const [enteredValueTouched, setEnteredValueTouched] = useState('')

  const enteredValueNameIsValid = enteredValueName !== ''
  const valueNameInputIsInvalid =
    !enteredValueNameIsValid && enteredValueNameTouched

  const enteredValueIsValid = enteredValue !== ''
  const valueInputIsInvalid = !enteredValueIsValid && enteredValueTouched

  let formIsValid = false

  if (enteredValueIsValid && enteredValueNameIsValid) {
    formIsValid = true
  }

  const valueNameChangeHandler = (event) => {
    setEnteredValueName(event.target.value)
  }

  const valueNameBlurHandler = () => {
    setEnteredValueNameTouched(true)
  }
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value)
  }

  const valueBlurHandler = () => {
    setEnteredValueTouched(true)
  }

  const submitFormHandler = () => {
    setEnteredValueNameTouched(true)
    setEnteredValueTouched(true)

    if (!enteredValueNameIsValid || !enteredValueIsValid) {
      console.log('invalidForm')
    }

    setEnteredValueName('')
    setEnteredValueNameTouched(false)

    setEnteredValue('')
    setEnteredValueNameTouched(false)

    postContactDetail({
      Name: enteredValueName,
      Value: enteredValue,
      ContactId: props.id,
    })
  }
  return (
    <div className={classes.flexContainer}>
      <TextField
        placeholder="Enter Value Name"
        label="name"
        variant="outlined"
        fullWidth
        required
        value={enteredValueName}
        onChange={valueNameChangeHandler}
        onBlur={valueNameBlurHandler}
        className={classes.flexItems}
      />
      {valueNameInputIsInvalid && (
        <p className="error-text">Value Name must not be empty.</p>
      )}
      <TextField
        placeholder="Enter Value"
        label="value"
        variant="outlined"
        fullWidth
        value={enteredValue}
        className={classes.flexItems}
        required
        onChange={valueChangeHandler}
        onBlur={valueBlurHandler}
      />
      {valueInputIsInvalid && (
        <p className="error-text">Value must not be empty.</p>
      )}
      <Button
        type="submit"
        color="primary"
        fullWidth
        variant="contained"
        className={classes.flexItems}
        onClick={submitFormHandler}
        disabled={!formIsValid}
      >
        Add New Detail
      </Button>
    </div>
  )
}

export default ContactDetail
