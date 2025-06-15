# Maximum Effort

**_Maximum Effort_** is a browser-based WWII idle crew management and roguelike bomber squadron game, blending history, strategic card mechanics, and cooperative multiplayer in an ethical, accessible format.

---

## 🚧 Project Status

- [x] Project repository initialized
- [x] MkDocs documentation with Material theme set up
- [x] Python virtual environment created for documentation
- [x] Initial documentation structure and to-do checklist created
- [x] PostgreSQL container running via Docker
- [x] Prisma backend configured and initial migration applied

---

## 📝 Development Roadmap

### 1. **Documentation & Educational Content**
   - [x] Initialize MkDocs and Material theme
   - [x] Create docs structure (index, mechanics, history, tutorials)
   - [ ] Expand gameplay documentation and historical content
   - [ ] Deploy MkDocs via GitHub Pages or Vercel

### 2. **Backend/API**
   - [x] Setup Node.js/Express backend directory
   - [x] Initialize Prisma, connect to local Postgres via Docker
   - [x] Run initial Prisma migration
   - [ ] Define and implement user, crew, and squadron data models
   - [ ] Create RESTful API endpoints for game state (CRUD for crews, missions, etc.)
   - [ ] Write backend unit and integration tests
   - [ ] Connect backend to frontend React app

### 3. **Frontend Game Site**
   - [ ] Initialize React + TypeScript project in `/game-site`
   - [ ] Set up Phaser.js integration for 2D gameplay
   - [ ] Build UI components for airfield management
   - [ ] Implement mission gameplay loop (card/roguelike)
   - [ ] Add responsive/mobile support
   - [ ] Connect frontend to backend API

### 4. **Cloud Deployment**
   - [ ] Deploy backend API (Railway/Render/Supabase)
   - [ ] Deploy frontend React app (Vercel/Netlify)
   - [ ] Set up automatic deployments from GitHub
   - [ ] Deploy MkDocs site for player reference

### 5. **AI-Assisted Development**
   - [x] Integrate GitHub Copilot (Codex) for code generation in VS Code
   - [ ] Establish workflows for rapid prototyping with AI
   - [ ] Document best practices for AI-assisted code review

### 6. **Game Systems & Monetization**
   - [ ] Design season pass structure
   - [ ] Implement parcels & stamps purchase/logic
   - [ ] Integrate Stripe payments
   - [ ] Develop achievement and progression systems

### 7. **Testing & QA**
   - [ ] Unit and integration tests (backend and frontend)
   - [ ] Playtest idle and mission loops
   - [ ] Community and accessibility testing (targeting older audiences)

---

## ⏩ **What’s Next?**

**Immediate next steps:**
1. **Frontend:**  
   - Initialize `/game-site` with React + TypeScript (`npm create vite@latest . -- --template react-ts`).
   - Begin designing UI for crew management.

2. **Backend:**  
   - Expand Prisma schema: add models for users, crews, missions.
   - Scaffold initial REST API endpoints (CRUD).
   - Implement API tests.

3. **Documentation:**  
   - Flesh out core docs: detailed mechanics, historical background, and tutorials.
   - Prepare for GitHub Pages or Vercel deployment.

4. **Version Control:**  
   - Commit and push your latest changes to GitHub.
   - Track progress using issues or project boards.

5. **Optional:**  
   - Set up CI workflows for automatic deployment (docs, backend, frontend).
   - Invite collaborators and document setup in `CONTRIBUTING.md`.

---

## 👩‍💻 **Contributing**

Contributions, ideas, and feedback are welcome!  
Please see the [documentation site](./docs/index.md) for current tasks and design principles.

---

## 📜 **License**

[MIT License](LICENSE)

---

## 🌍 **Learn More / Play**

- **Game Documentation & History:** (to be deployed)  
- **Play Maximum Effort:** (coming soon!)

---

**_Maximum Effort_** aims for unique, authentic, and accessible historical strategy.  
Join us as we build the most cooperative WWII idle game yet.
