# React + Vite
# note there are problem when deployed JSON server on vercel just use it in local until try again to solve it.
## ToDo Kanban App 

A Kanban-style ToDo list with **React**, **Redux**, **React Query**, and **Material UI**. Drag-and-drop is implemented with 

### Features

- **4 columns**: Backlog, In Progress, Review, Done
- **CRUD**: Create, update, and delete tasks (title, description, column)
- **Drag-and-drop**: Move tasks between columns using native browser drag events
- **Search**: Filter tasks by title or description (Redux state)
- **Caching**: React Query for API data and caching
- **Layout**: Material UI components

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the mock API** (in one terminal)

   ```bash
   npm run api
   ```

   This runs `json-server` on **http://localhost:4000** using `db.json`.

3. **Start the dev server** (in another terminal)

   ```bash
   npm run dev
   ```

4. **Open the app**

   - Home: http://localhost:5173/
   - ToDo Kanban: http://localhost:5173/todo

### Tech stack

- **React** + **Redux** (Toolkit) for global UI state (search)
- **React Query** for server state and caching
- **Material UI** for layout and components
- **drag-and-drop**: `draggable`, `onDragStart`, `onDragOver`, `onDrop`

### Project structure (ToDo app)

- `src/todo/` – ToDo Kanban feature
  - `api.js` – API client for `json-server`
  - `constants.js` – Task and column constants
  - `store/` – Redux store and `todoUi` slice (search)
  - `hooks/useTasks.js` – React Query hooks (fetch, create, update, delete, move)
  - `components/` – SearchBar, TaskCard, TaskFormDialog, KanbanColumn, KanbanBoard
  - `TodoDashboard.tsx` – Page that composes search + board

---

## React Compiler

This template enables the React Compiler. See [this documentation](https://react.dev/learn/react-compiler) for more information.

## Expanding the ESLint configuration

See the template’s ESLint docs for expanding the configuration.
