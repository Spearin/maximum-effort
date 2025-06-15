import { useEffect, useState } from 'react'

interface CrewMember {
  name: string
  role: string
}

interface Crew {
  id: number | string
  name: string
  members: CrewMember[]
}

function CrewList() {
  const [crews, setCrews] = useState<Crew[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCrews() {
      try {
        const res = await fetch('/api/crews')
        if (!res.ok) {
          throw new Error('Failed to load crews')
        }
        const data = await res.json()
        setCrews(data)
      } catch {
        setError('Unable to load crews. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadCrews()
  }, [])

  if (error) {
    return <p role="alert">{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <section aria-labelledby="crews-heading">
      <h1 id="crews-heading">Crews</h1>
      {crews.map((crew) => (
        <article key={crew.id}>
          <h2>{crew.name}</h2>
          <ul>
            {crew.members.map((member) => (
              <li key={member.name}>
                {member.name} - {member.role}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}

export default CrewList
