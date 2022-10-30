import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import { Card, Alert, Snackbar } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'

import classes from './ContactList.module.css'
import useDelete from '../../hooks/use-delete'
import EditContactModal from './EditModal/EditContactModal'
import useFetch from '../../hooks/use-fetch'
import { contactsActions } from '../../store/contacts-slice'

const ContactList = () => {
  const { getContacts } = useFetch()
  const dispatch = useDispatch()

  const contacts = useSelector((state) => state.contacts.contactItems)
  const isDeleted = useSelector((state) => state.contacts.isDeleted)
  const { deleteContact } = useDelete()
  const deleteContactHandler = (param, index) => {
    deleteContact(param, index)
  }

  const [show, setShow] = useState(false)
  const [contactForEdit, setContactForEdit] = useState()

  const onClose = () => {
    setShow(false)
  }

  useEffect(() => {
    getContacts()
    // eslint-disable-next-line
  }, [show])

  const closeSnack = () => {
    dispatch(contactsActions.isDeleted())
  }

  const contactList = contacts.map((contact, index) => (
    <Card variant="outlined" key={index} className={classes.flexItems}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          className={classes.details}
          primary={contact.firstName}
          secondary={contact.lastName}
        />
        {contact.details.map((detail) => (
          <ListItemText
            className={classes.details}
            key={detail.contactDetailsId}
            primary={detail.name}
            secondary={detail.value}
          />
        ))}
        <div className={classes.iconDelete}>
          <DeleteOutlineIcon
            className={classes.iconDelete}
            onClick={() => deleteContactHandler(contact.contactId, index)}
          />

          <EditIcon
            className={classes.iconEdit}
            onClick={() => {
              setShow(!show)
              setContactForEdit(contact)
            }}
          />
        </div>
      </ListItem>
    </Card>
  ))

  return (
    <div className={classes.container}>
      <List
        sx={{
          width: '100%',
          maxWidth: 900,
          bgcolor: 'background.paper',
          borderRadius: 3,
        }}
      >
        {contactList}
      </List>
      {show && (
        <EditContactModal
          show={show}
          data={contactForEdit}
          onCloseHandler={onClose}
        />
      )}
      {isDeleted && (
        <Snackbar open={isDeleted} autoHideDuration={3000} onClose={closeSnack}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Contact deleted!
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default ContactList
