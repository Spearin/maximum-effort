import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        throw new Error('Failed to register')
      }
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        navigate('/profile')
      }
    } catch {
      setError('Unable to register. Please try again later.')
    }
  }

  return (
    <section aria-labelledby="register-heading">
      <h1 id="register-heading">Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  )
}

export default RegisterPage
