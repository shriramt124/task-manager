"use client"
import { createContext, useState, useContext, useEffect } from "react"
import themes from './theme';
import axios from "axios"
import {useUser} from "@clerk/nextjs"
import toast from "react-hot-toast";



export const GlobalContext = createContext()



export const GlobalUpdateContext = createContext()



export const GlobalProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0)
    const theme = themes[selectedTheme]
    const [isLoading, setIsLoading] = useState(false)
    const [tasks, setTasks] = useState([]);
     const {user} = useUser();
     const [isModalOpen, setIsModalOpen] = useState(false)
  const [collapsed,setCollapsed] = useState(false);

     const openModal = ( )=>{
        setIsModalOpen(true);
     }
      


    const allTasks = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get("/api/tasks");
            console.log(res.data.tasks);
            const sortedData = res.data.tasks.sort((a,b)=>{
                return (new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
            });
            //sorte this data on createdAt
            setTasks(sortedData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

  const deleteTask = async(id)=>{
    try {
        const res = await axios.delete(`/api/tasks/${id}`)
        console.log(res.data)
        toast.success("Task deleted successfully")
        await allTasks()//after deleting get all the tasks 
        
    } catch (error) {
        console.log(error);
        toast.error("something went wrong")
    }
  };

  const updateTask = async (task)=>{
    try {
        const res = await axios.put("/api/tasks",task);
        console.log(res.data)
        toast.success("Task updated successfully")
        await allTasks()
        
    } catch (error) {
        console.log(error);
        toast.error("something went wrong while updating")
        
    }
  }
   const completedTask = tasks.filter((task)=>task.isCompleted === true)
   console.log(completedTask)
  const importantTask = tasks.filter((task)=>task.isImportant === true)
  console.log(importantTask)
  const incompleteTask = tasks.filter((task)=>task.isCompleted === false)
  const closeModal = async()=>{
        
    setIsModalOpen(false);
    await allTasks();

    
 }
 const collapseMenu = ()=>{
    setCollapsed(prev=>!prev);
 }

    useEffect(() => {
        if(user){
        allTasks()
        }

    }, [user])
    return (
        < GlobalContext.Provider value={{ theme,collapseMenu,tasks,collapsed ,isModalOpen,isLoading,deleteTask ,openModal,closeModal,completedTask,updateTask,importantTask,incompleteTask}} >
            <GlobalUpdateContext.Provider value={setSelectedTheme}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider >

    )
}




export const useGlobalState = () => {
    return useContext(GlobalContext)
}



export const useGlobalUpdateState = () => {
    return useContext(GlobalUpdateContext)
}