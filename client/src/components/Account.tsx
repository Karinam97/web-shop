import React, { useEffect, useState } from 'react'

export const AccountPage = () => {
  const [name, setName] = useState<string>('')

  useEffect(() => {
    // Function to get the user's name from the server
    const getName = async () => {
      try {
        const response = await fetch('/account/user')
        const data = await response.json()

        if (data.fullName) {
          setName(data.fullName)
        } else {
          window.location.href = '/'
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    getName()
  }, [])

  const logout = async () => {
    try {
      await fetch('/account/logout', { method: 'POST' })
      window.location.href = '/'
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1 id="name">{name}</h1>
      <h2>Welcome to Your Account</h2>
      <p>Here is your account content.</p>
      {/* TODO: 
        - create update user details button, new HTML for it and new rest handler to update
        - create delete user account button and new rest handler
      */}
      <div>
        <button onClick={logout}>Log out</button>
        <button>
          <a href="/">Go to Homepage</a>
        </button>
      </div>
    </div>
  )
}