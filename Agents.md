# Agents.md

## Maximum Effort: Codex Agent Workflow

This file describes how we use OpenAI Codex agents for automated development on the Maximum Effort project, including setup, conventions, and common tasks.

---

## 🚀 Agent Workflow Overview

Our goal is to **maximize productivity** and minimize manual setup by:
- Using Codex agents to automate backend, frontend, and documentation tasks.
- Maintaining a clean, modular workflow (each agent task = one atomic PR).
- Keeping docs, backend, and frontend codebases in sync.

---

## 🏗️ Agent Setup

### Container & Script

- **Container image:** `universal` (supports Node.js, Python, and more).
- **Setup script:** (run after the repo is cloned)

  ```bash
  # Python venv and docs
  python3 -m venv venv
  source venv/bin/activate
  pip install --upgrade pip
  pip install mkdocs mkdocs-material

  # Backend
  cd backend
  npm install

  # Frontend
  cd ../game-site
  npm install

  # Return to project root
  cd ..
  ```

- **Internet access:** ON (required for package installs).
- **Domain allowlist:** "Common dependencies" is sufficient.
- **Secrets/Env:** Add as needed (not required for local sample data).

---

## 📝 Agent Task Examples

Break up each feature into small, reviewable tasks.

---

### Task 1: Add a Sample Backend API Endpoint

**Prompt:**
```
Create an Express route /api/crews in backend/src.  
Return a hard-coded array of bomber crews (id, name, members: name and role).  
Document the endpoint with JSDoc.  
Commit as 'feat(api): add crews endpoint with sample data'.
```

---

### Task 2: Fetch and Display on Frontend

**Prompt:**
```
Create a React component CrewList in game-site/src.  
On mount, fetch /api/crews and display crew names and member roles.  
Add error handling and accessible markup.  
Commit as 'feat(ui): display crews list from API'.
```

---

### Task 3: Proxy API Requests in Vite Config

**Prompt:**
```
Edit game-site/vite.config.ts to proxy /api/* requests to http://localhost:3000 during development.  
Document the config in code comments.  
Commit as 'chore: add Vite proxy for API requests'.
```

---

### Task 4: Update Documentation

**Prompt:**
```
Add a "Crew API & Display Example" section to docs/mechanics.md.  
Describe the /api/crews endpoint, show sample JSON, and explain frontend integration.  
Commit as 'docs: document crew API and frontend integration'.
```

---

## 💡 Agent Usage Best Practices

- **One task, one PR:** Each agent task should be a small, reviewable unit of work.
- **Atomic commits:** Always review and merge one agent-generated PR before starting the next.
- **Always keep setup script updated:** So new dependencies are installed automatically.
- **Push local changes before running agents:** Prevent merge conflicts.
- **Document every new feature or endpoint in MkDocs.**

---

## 🔄 Repeatable Pattern

1. **Backend:** Add new endpoint or logic.
2. **Frontend:** Add new component or fetch logic.
3. **Proxy/DevOps:** Update config if needed.
4. **Docs:** Document every feature.
5. **Test:** Run and verify integration.

---

## 👨‍💻 Contributing with Agents

- Review all agent-generated code before merging.
- Use clear, descriptive prompts for each task.
- Suggest improvements or fix errors in follow-up agent tasks.
- Update this file with new agent conventions as the project evolves.

---

**For more information, see the documentation at `/docs` or the README.md.**