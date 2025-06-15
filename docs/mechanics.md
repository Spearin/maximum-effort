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

### Recruit Crew Members

`POST /api/crews/recruit`

Send JSON `{ "count": 3 }` to generate up to 10 new crew members. Each member is
assembled from random lookup tables (first/last names, hometown, occupation,
religion, socioeconomic background and family hobby). The endpoint returns the
created crew array with full text values.

## Profile & Currency API

### Get Profile

`GET /api/user/profile`

Returns the user's rank, stamps and bonds. Example response:

```json
{
  "rank": "Recruit",
  "stamps": 0,
  "bonds": 0
}
```

### Grant Stamps

`POST /api/user/stamps/grant?amount=5`

Adds stamps to the current balance and returns the new total.

```json
{ "stamps": 5 }
```

### Grant Bonds

`POST /api/user/bonds/grant?amount=10`

Adds bonds to the current balance and returns the new total.

```json
{ "bonds": 10 }
```

