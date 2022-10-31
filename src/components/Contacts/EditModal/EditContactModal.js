import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import useEditContact from '../../../hooks/use-put-contact'
import { TextField } from '@mui/material'
import classes from './EditModal.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function EditContactModal({ show, data, onCloseHandler }) {
  const { editContact, editContactDetail } = useEditContact()
  const [enteredFirstName, setEnteredFirstName] = useState('')
  const [enteredLastName, setEnteredLastName] = useState('')
  const [enteredDetails, setEnteredDetails] = useState({})

  useEffect(() => {
    const copy = enteredDetails
    data.details.forEach((detail, index) => {
      index = detail.contactDetailsId
      copy['detail' + index] = { name: detail.name, value: detail.value }
      setEnteredDetails(copy)
    })
  })

  const handleClose = () => {
    onCloseHandler()
  }

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value)
  }

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value)
  }

  const detailChange = (event, index) => {
    const copy = enteredDetails
    const changedDetail = copy['detail' + index]
    changedDetail[event.target.name] = event.target.value
    changedDetail[event.target.value] = event.target.value

    setEnteredDetails(copy)
  }
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Contact
          </Typography>
          <div className={classes.flexContaier}>
            <TextField
              label={'FirstName: ' + data?.firstName}
              onChange={firstNameChangeHandler}
              value={enteredFirstName}
            ></TextField>
            <TextField
              className={classes.items}
              label={'Last Name: ' + data?.lastName}
              onChange={lastNameChangeHandler}
              value={enteredLastName}
            ></TextField>

            <Button
              className={classes.buttonStyle}
              onClick={() => {
                editContact(data.contactId, {
                  FirstName: enteredFirstName,
                  LastName: enteredLastName,
                })
                setEnteredFirstName('')
                setEnteredLastName('')
              }}
            >
              edit contact
            </Button>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          {data?.details.map((item, index) => (
            <div key={item?.contactDetailsId} className={classes.flexContaier}>
              <TextField
                className={classes.items}
                label={'Name: ' + item?.name}
                name="name"
                defaultValue={
                  enteredDetails['detail' + item?.contactDetailsId]?.name
                }
                onChange={(e) => detailChange(e, item?.contactDetailsId)}
              />
              <TextField
                className={classes.items}
                label={'Value: ' + item?.value}
                name="value"
                defaultValue={
                  enteredDetails['detail' + item?.contactDetailsId]?.value
                }
                onChange={(e) => detailChange(e, item?.contactDetailsId)}
              ></TextField>

              <Button
                className={classes.buttonStyle}
                onClick={() => {
                  editContactDetail(item.contactDetailsId, {
                    name:
                      enteredDetails['detail' + item.contactDetailsId]?.name,
                    value:
                      enteredDetails['detail' + item.contactDetailsId]?.value,
                    contactId: data.contactId,
                  })
                }}
              >
                edit detail
              </Button>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  )
}

export default EditContactModal
