import { useState } from 'react'

function RecruitPage() {
  const [count, setCount] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      const res = await fetch('/api/crews/recruit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count }),
      })
      if (!res.ok) {
        throw new Error('Failed to recruit crew')
      }
      setMessage('Recruitment successful!')
    } catch {
      setError('Unable to recruit crew. Please try again later.')
    }
  }

  return (
    <section aria-labelledby="recruit-heading">
      <h1 id="recruit-heading">Recruit Crew</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Crew Count:
          <input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <button type="submit">Recruit</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p role="alert">{error}</p>}
    </section>
  )
}

export default RecruitPage
