# Crew & Parcel Design

## Seed Data Import

Run the backend seed script to load lookup tables for procedural generation. Execute it once after installing dependencies.

```bash
cd backend
npm run seed
```

The script reads JSON and CSV files in `backend/data/` and populates the Prisma database with first names, last names, hometowns and other background lists.

## Recruit Crew

### Endpoint

`POST /api/crews/recruit`

Send JSON `{ "count": 3 }` to generate the requested number of members. Each crew member is assembled from the seed data and returned with full profile details.

```json
[
  {
    "firstName": "Alice",
    "lastName": "Brown",
    "hometown": "London",
    "occupation": "Mechanic"
  }
]
```

## Profile & Currency

* `GET /api/user/profile` – returns rank, stamp and bond totals.
* `POST /api/user/stamps/grant?amount=X` – adds stamps to the balance.
* `POST /api/user/bonds/grant?amount=Y` – adds bonds to the balance.

## Parcels

### Endpoints

* `GET /api/crews/{id}/parcels` – list parcel slots for the crew.
* `POST /api/crews/{id}/parcels/open` – spend stamps to open a slot and generate cards.

### UI Flow

1. Open **Care Parcels** from the Crew Manager.
2. Up to three slots appear per day.
3. Select a slot and confirm stamp usage to reveal new cards.

## Card Templates

Card templates define the possible rewards. Each card follows this schema:

```json
{
  "id": "uuid",
  "type": "character | object | talisman | event",
  "rarity": "common | rare | exclusive",
  "name": "string",
  "description": "string",
  "effects": {
    "stat": "+1"
  }
}
```
