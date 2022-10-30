import { useState } from 'react'

const usePost = () => {
  const userURL = 'http://localhost:5000/api/users'
  const [error, setError] = useState(null)

  const postUser = async (userObject) => {
    setError(null)
    try {
      const response = await fetch(userURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObject),
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
    postUser,
  }
}

export default usePost
