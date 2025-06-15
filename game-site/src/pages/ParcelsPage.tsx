import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface ParcelSlot {
  opened: boolean
}

function ParcelsPage() {
  const { id } = useParams()
  const [slots, setSlots] = useState<ParcelSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadParcels() {
      try {
        const res = await fetch(`/api/crews/${id}/parcels`)
        if (!res.ok) {
          throw new Error('Failed to load parcels')
        }
        const data = await res.json()
        setSlots(data)
      } catch {
        setError('Unable to load parcels. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadParcels()
    }
  }, [id])

  async function handleOpen(index: number) {
    if (!id) return
    try {
      const res = await fetch(`/api/crews/${id}/parcels/open`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotIndex: index, stamps: 1 }),
      })
      if (!res.ok) {
        throw new Error('Failed to open parcel')
      }
      const data = await res.json()
      setSlots(data.parcels)
    } catch {
      setError('Unable to open parcel. Please try again later.')
    }
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <section aria-labelledby="parcels-heading">
      <h1 id="parcels-heading">Crew {id} Parcels</h1>
      <ul>
        {slots.map((slot, index) => (
          <li key={index}>
            {slot.opened ? (
              'Opened'
            ) : (
              <button onClick={() => handleOpen(index)}>Open</button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ParcelsPage
