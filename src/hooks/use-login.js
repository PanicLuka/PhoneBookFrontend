import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { contactsActions } from '../store/contacts-slice'

const useLogin = () => {
  const dispatch = useDispatch()
  const userURL = 'http://localhost:5000/api/login'
  const [error, setError] = useState(null)

  const loginUser = async (userCredentials) => {
    setError(null)
    try {
      const response = await fetch(userURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('LOGIN failed!')
          }
          response = response.text()
          return response
        })
        .then((token) => {
          localStorage.setItem('JWT', token)
          dispatch(contactsActions.login())
        })
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
  }

  return {
    error,
    loginUser,
  }
}

export default useLogin
