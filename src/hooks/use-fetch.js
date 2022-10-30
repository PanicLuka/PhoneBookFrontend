import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contactsActions } from '../store/contacts-slice'

const useFetch = () => {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts.contactItems)
  const contactsURL = 'http://localhost:5000/api/contacts'
  const currentContactURL = 'http://localhost:5000/api/contacts/current'

  const [error, setError] = useState(null)
  const [currentId, setCurrentId] = useState(null)

  const getContacts = async () => {
    setError(null)
    try {
      const response = await fetch(contactsURL)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          dispatch(contactsActions.setAllContacts(data))
        })
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
  }

  const getCurrentContact = async () => {
    try {
      const response = await fetch(currentContactURL)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setCurrentId(data)
        })
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
  }

  return {
    error,
    getContacts,
    getCurrentContact,
    currentId,
  }
}

export default useFetch
