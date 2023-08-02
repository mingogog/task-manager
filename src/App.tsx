import { useState } from 'react'
import './App.css'
import Task from './Task'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './index.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const handleDeleteTask = (taskId:number)=>{
    setTasks(prev =>{
      return prev.filter(t=>t.id !== taskId)
    }) 
  }
  const handleTaskSubmit = (data:Task)=>{
    setTasks(prev=>{
      return [...prev, {...data}]
    })
  }
  return (
    <>
      <TaskForm
        submitTask={handleTaskSubmit}
      />
      <TaskList
        tasks={tasks}
        deleteTask={handleDeleteTask}
      />
    </>
  )
}

export default App
