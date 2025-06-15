import { useEffect, useState } from 'react'

interface Profile {
  rank: string
  stamps: number
  bonds: number
}

function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/user/profile')
        if (!res.ok) {
          throw new Error('Failed to load profile')
        }
        const data = await res.json()
        setProfile(data)
      } catch {
        setError('Unable to load profile. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  if (error) {
    return <p role="alert">{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!profile) {
    return null
  }

  return (
    <section aria-labelledby="profile-heading">
      <h1 id="profile-heading">Profile</h1>
      <p>Rank: {profile.rank}</p>
      <p>Stamps: {profile.stamps}</p>
      <p>Bonds: {profile.bonds}</p>
    </section>
  )
}

export default ProfilePage
