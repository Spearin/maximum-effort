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

## Crew Parcel API

### Get Crew Parcels

`GET /api/crews/{id}/parcels`

Returns an array of up to three parcel slots for the crew. Each slot shows
whether it has been opened.

```json
[
  { "opened": false },
  { "opened": true },
  { "opened": false }
]
```

### Open a Parcel

`POST /api/crews/{id}/parcels/open`

Send JSON `{ "slotIndex": 0, "stamps": 1 }` to open the specified slot. The
user's stamps are deducted and 1–3 random card IDs are generated.

Example response:

```json
{
  "parcels": [
    { "opened": true },
    { "opened": false },
    { "opened": false }
  ],
  "cards": ["talisman-1-ab12cd"]
}
```


## Card Templates API

### Get Card Templates

`GET /api/cards/templates`

Returns the list of available card templates.

```json
[
  {
    "id": "character-ace",
    "type": "character",
    "rarity": "rare",
    "name": "Ace Pilot",
    "description": "Improves mission success chance",
    "effects": { "skill": "+1" }
  }
]
```

### Assign Cards to a Crew

`POST /api/crews/{id}/cards/assign`

Send JSON `{ "cardIds": ["character-ace"] }` to manually assign cards to a crew.
The endpoint returns the crew's full card list.

```json
{ "cards": ["character-ace"] }
```

## Authentication API

### Register

`POST /api/auth/register`

Send JSON `{ "email": "user@example.com", "password": "pass" }` to create a new user. On success, returns a JWT token:

```json
{ "token": "<jwt>" }
```

### Login

`POST /api/auth/login`

Provide credentials in the same format as registration. If valid, a signed JWT is returned:

```json
{ "token": "<jwt>" }
```
