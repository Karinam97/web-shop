import React, { useState,  } from 'react'

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRegistration = async () => {
    try {
      const response = await fetch('/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to the home page on successful registration
        window.location.href = '/'
      } else {
        // Handle registration failure
        setErrorMessage(data.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h2>Registration Form</h2>
      <div id="form" style={{ display: 'flex', flexDirection: 'column' }}>
        <form id="registerForm">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          /><br />

          <label htmlFor="fullName">Full name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          /><br />

          {/* TODO: check for valid email e.g. should include @ etc.. */}
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          /><br />

          {/* TODO: check validation of password, ask to confirm password */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          /><br />

          {/* Error message display */}
          <p style={{ color: 'red', display: errorMessage ? 'block' : 'none' }}>{errorMessage}</p>
          <button id="btn" type="button" onClick={handleRegistration}>Register</button>
        </form>
      </div>
    </div>
  )
}

