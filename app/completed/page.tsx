"use client"

import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider"
 


export default function Page(){
    const {completedTask} = useGlobalState();

    return(
        <Tasks title="Completed" tasks={completedTask} />

        
    )
}