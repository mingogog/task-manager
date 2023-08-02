import Task from '../Task'
import './TaskList.css'
import DropdownMenu from './DropDownMenu'
import { useEffect, useState } from 'react'

interface Props{
    tasks: Task[],
    deleteTask(taskId:number): void
}

const TaskList: React.FC<Props> = ({tasks, deleteTask}: Props) => {
    const [filteredType, setFilterType] = useState('All')
    const [filteredTasks, setFilteredTasks] =  useState<Task[]>([])
    useEffect(()=>{
        if(filteredType==='All'){
            setFilteredTasks(tasks)
        }else{
            setFilteredTasks(tasks.filter(t=>t.category===filteredType))
        }
    }, [filteredType, tasks])
    return (
        <div className="text-center">
            {tasks.length===0 && <div>No tasks yet.</div>}
            {tasks.length>0 && 
                <div className="px-7">
                    <table className="w-full list-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th className="relative">
                                    <div className="flex items-center">
                                        <div className="">
                                            Category
                                        </div>
                                        <DropdownMenu
                                            categoryType={filteredType}
                                            setFilterType={setFilterType}
                                        />
                                    </div>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map(t=>{
                                 return (
                                    <tr>
                                        <td className="w-1/4">{t.title}</td>
                                        <td className="w-1/4">{`${t.dueDate.getFullYear()}/${t.dueDate.getMonth()}/${t.dueDate.getDate()}`}</td>
                                        <td className="w-1/4">{t.category}</td>
                                        <td className="w-1/4">
                                            <button 
                                                className="rounded-md border-red-500 border px-3 text-red-400"
                                                onClick={()=>{deleteTask(t.id)}}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                 )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
 
export default TaskList;