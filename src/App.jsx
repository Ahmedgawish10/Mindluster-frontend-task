import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Link, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import TodoDashboard from '@/todo/Dashboard'

function App() {
  return (
    <>
      <ToastContainer position="top-right" theme="light" />
      <Routes>
        <Route path="/" element={<TodoDashboard />} />
      </Routes>
    </>
  )
}

export default App
