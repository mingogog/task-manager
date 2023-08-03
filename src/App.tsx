import { useEffect, useState } from 'react'
import './App.css'
import Task from './Task'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './index.css'

const setLocalStorage = (key:string, value: string) =>{
  localStorage.setItem(key, value)
} 
const getLocalStorage = (key:string) =>{
  return localStorage.getItem(key)
} 

function App() {
  const [tasks, setTasks] = useState<Task[]>(()=>{
    return JSON.parse(getLocalStorage("tasks") || "[]")
  })
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
  useEffect(()=>{
    setLocalStorage('tasks', JSON.stringify(tasks))
  }, [tasks])
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
