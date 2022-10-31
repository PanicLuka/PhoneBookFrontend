import { useState } from 'react'

const useEditContact = () => {
  const editContactURL = 'http://localhost:5000/api/contacts'
  const editContactDetailURL = 'http://localhost:5000/api/contactDetails'

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
