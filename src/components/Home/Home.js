import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { contactsActions } from '../../store/contacts-slice'
import { useSelector, useDispatch } from 'react-redux'
import ContactList from '../Contacts/ContactList'
import AddNewContact from '../Contacts/AddNewContact/AddNewContact'

import classes from './Home.module.css'
import { Paper } from '@mui/material'
import useFetch from '../../hooks/use-fetch'
import { useEffect } from 'react'

const Home = () => {
  const { getContacts } = useFetch()

  const contactsAreShown = useSelector(
    (state) => state.contacts.contactListIsShown,
  )
  const addNewContactIsShown = useSelector(
    (state) => state.contacts.addNewContactFormIsShown,
  )

  useEffect(() => {
    getContacts()
  }, [])

  // const contactItems = useSelector((state) => state.contacts.contactItems)

  const dispatch = useDispatch()

  const showContacts = () => {
    // fetch('http://localhost:5000/api/contacts')
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((data) => {
    //     const res = data
    //     console.log(res)
    //   })
    getContacts()

    // dispatch(contactsActions.setAllContacts(transformedContacts))

    // console.log(contactItems)

    dispatch(contactsActions.toggleContacts())
  }

  const showNewUserForm = () => {
    dispatch(contactsActions.toggleAddForm())
  }

  return (
    <>
      <Paper position="relative" className={classes.appbar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div className={classes.flexContainer}>
              <Typography
                textAlign="center"
                variant="h6"
                className={classes.viewAll}
                onClick={showNewUserForm}
              >
                Add New
              </Typography>
              <Typography
                className={classes.viewAll}
                onClick={showContacts}
                textAlign="center"
                variant="h6"
              >
                View All
              </Typography>
            </div>
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            ></Box>
          </Toolbar>
        </Container>
      </Paper>

      {contactsAreShown && <ContactList />}
      {addNewContactIsShown && <AddNewContact />}
    </>
  )
}

export default Home
