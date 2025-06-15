# Game Mechanics

## Crew API & Display Example

The backend provides a simple sample endpoint for retrieving bomber crew data.

### Endpoint

`GET /api/crews`

Returns a JSON array of crews with their members. Example response:

```json
[
  {
    "id": 1,
    "name": "Lancaster Alpha",
    "members": [
      {"name": "John Smith", "role": "Pilot"},
      {"name": "Mike Brown", "role": "Navigator"}
    ]
  },
  {
    "id": 2,
    "name": "Lancaster Bravo",
    "members": [
      {"name": "Alice Johnson", "role": "Pilot"},
      {"name": "Robert Lee", "role": "Bombardier"}
    ]
  }
]
```

### Frontend Integration

The `CrewList` React component (located in `/game-site/src/components/CrewList.tsx`) fetches this endpoint on mount. The Vite dev server proxies `/api` requests to the backend, so the data loads automatically during development. Once fetched, each crew name and member role is displayed in an accessible list.

![Crew list screenshot](img/crew-list-placeholder.png)

