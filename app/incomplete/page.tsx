"use client"

import { useGlobalState } from "../context/globalProvider";
import Tasks from "../components/Tasks/Tasks";

export default function Page(){
    const {incompleteTask} = useGlobalState();
    return (
       <Tasks  title="Icomplete Tasks" tasks={incompleteTask}  />
    )
}