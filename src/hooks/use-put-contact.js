import { createNextState } from '@reduxjs/toolkit'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contactsActions } from '../store/contacts-slice'
import useFetch from './use-fetch'

const useEditContact = () => {
  const editContactURL = 'http://localhost:5000/api/contacts'
  const editContactDetailURL = 'http://localhost:5000/api/contactDetails'
  // const contacts = useSelector((state) => state.contacts.contactItems)

  const [error, setError] = useState(null)

  const editContact = async (id, contactObject) => {
    try {
      const response = await fetch(`${editContactURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactObject),
      })

      if (!response.ok) {
        throw new Error('POST failed!')
      }
      return response.json()
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
  }

  const editContactDetail = async (id, contactDetailObject) => {
    try {
      const response = await fetch(`${editContactDetailURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactDetailObject),
      })
      if (!response.ok) {
        throw new Error('PUT failed!')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
  }
  return {
    error,
    editContact,
    editContactDetail,
  }
}

export default useEditContact
