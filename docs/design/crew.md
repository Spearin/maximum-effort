# Design: Crew & Parcel Systems

## 1. User Experience Flow

1. **Registration & Profile**  
   - User registers/logs in  
   - Views Profile:  
     - Rank & Role (Recruiter → Bomber Commander → Squadron Commander)  
     - Current stamps & bonds balance  

2. **Acquire Stamps & Bonds (Placeholder)**  
   - “Buy Stamps” and “Buy Bonds” buttons in Profile  
   - For now, grant a default allotment on click (no payment)  
   - Later: integrate real payments  

3. **Crew Manager Menu**  
   - **Recruit Crew Member**  
   - **Care Parcels**  
   - **Train Crew**  
   - **Deploy Crew**  

---

## 2. Crew Member Systems

### 2.1 Recruit Crew Member
- **Trigger:** Menu button **Recruit Crew**  
- **Mechanic:**  
  - Agent task: create `POST /api/crew/recruit`  
  - Accept desired crew count  
  - Procedurally generate each member’s profile:
    - First & last name (from name lists)  
    - Hometown (from list)  
    - Occupation, religion, socioeconomic background, partner/family, hobbies  
    - Initial “untrained” stats per role placeholder  
  - Return full crew object  

### 2.2 Profile Display
- **Fields to show:**  
  - Crew count  
  - List of crews with summary (e.g. “Lancaster Alpha – 7 crew”)  
  - Quick links to **Care Parcels**, **Train**, **Deploy**  

---

## 3. Parcel System

### 3.1 Acquire Parcels
- Each crew member unlocks **3 parcel slots per day**  
- Menu entry: **Care Parcels**  
- Display up to 3 parcel placeholders  

### 3.2 Open Parcels with Stamps
- Each parcel requires **1 stamp** to open  
- Allow “bulk stamp” option: spend multiple stamps on one parcel → improved card rarity chances  
- Upon opening: generate a small card pack (1–3 cards)  

### 3.3 Stamp & Bond Flow
- **Bonds** are the premium currency (granted free initially)  
- **Stamps** cost bonds (e.g. 1 bond → 1 stamp)  
- Agent tasks:
  - Placeholder route `POST /api/user/stamps/grant?amount=X`  
  - Placeholder route `POST /api/user/bonds/grant?amount=Y`  

---

## 4. Card Templates

Define basic card schema (to guide agent in DB/model creation):

```json
{
  "id": "uuid",
  "type": "character" | "object" | "talisman" | "event",
  "rarity": "common" | "rare" | "exclusive",
  "name": "string",
  "description": "string",
  "effects": { /* game stat modifiers, narrative tags, etc */ }
}
```

- **Character cards:**  
  - New crew background details (e.g. “Alice Brown – Scout”)  
- **Object cards:**  
  - Gear, equipment bonuses  
- **Talisman cards:**  
  - Unique buffs (morale, resilience)  
- **Event cards:**  
  - One-time scripted story or mission modifiers  

---

## 5. Crew-Card Association & Trading

- When a parcel is opened for a crew member, cards are **assigned** to that member.  
- **Within-player trading:** agent tasks can expose endpoints to transfer cards between crews.  
- **Marketplace for inter-player trades:** later phase.  

---

## 6. Procedural Crew Generation Data

- **Data sources needed:**  
  - First names list (male/female)  
  - Last names list  
  - Hometowns list  
  - Occupations list  
  - Religions list  
  - Socioeconomic backgrounds list  
  - Family/partner/hobbies lists  
- **Agent task:** import these CSV/JSON lists into the backend as seed data.  

---

## 7. Next Agent Steps

1. **Seed Data Import**  
   - Task: create a seed script to load name & background lists into the database.

2. **Recruit Crew Endpoint**  
   - Task: implement `POST /api/crews/recruit` using seed data for procedural generation.

3. **Profile & Currency Routes**  
   - Task: add `GET /api/user/profile`, `POST /api/user/stamps/grant`, `POST /api/user/bonds/grant`.

4. **Parcel Mechanics**  
   - Task: implement `GET /api/crew/{id}/parcels`, `POST /api/crew/{id}/parcels/open` with stamp logic.

5. **Card Models & Endpoints**  
   - Task: define `Card` model in Prisma, endpoints to fetch card templates and assign cards.

6. **Frontend UI Skeleton**  
   - Task: build placeholder React pages/components for Profile, Recruit, Parcels, Train, Deploy.

7. **Docs Update**  
   - Task: flesh out `docs/mechanics.md` with these systems, include API spec and UI wireframe placeholders.
