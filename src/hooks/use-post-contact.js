import { useState } from 'react'

const usePostContact = () => {
  const contactURL = 'http://localhost:5000/api/contacts'
  const contactDetailURL = 'http://localhost:5000/api/contactDetails'

  const [error, setError] = useState(null)

  const postContact = async (contactObject) => {
    try {
      const response = await fetch(contactURL, {
        method: 'POST',
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

  const postContactDetail = async (contactDetailObject) => {
    try {
      const response = await fetch(contactDetailURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactDetailObject),
      })
      if (!response.ok) {
        throw new Error('POST failed!')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
  }
  return {
    error,
    postContact,
    postContactDetail,
  }
}

export default usePostContact
