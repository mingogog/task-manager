import { useState } from 'react'
import './App.css'
import Task from './Task'
import TaskForm from './components/TaskForm'
import './index.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  return (
    <>
      <TaskForm />
    </>
  )
}

export default App
