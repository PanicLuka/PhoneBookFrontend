import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { contactsActions } from '../store/contacts-slice'

const useDelete = () => {
  const contactsURL = 'http://localhost:5000/api/contacts'
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const deleteContact = async (id, index) => {
    try {
      const response = await fetch(contactsURL + `/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('DELETE failed!')
      }
      dispatch(contactsActions.removeFromContacts(index))
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
  }

  return {
    deleteContact,
    error,
  }
}

export default useDelete
