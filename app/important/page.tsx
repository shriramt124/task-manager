"use client"

import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

function Page(){
    const {importantTask} = useGlobalState()

    return (
        <Tasks title="important" tasks={importantTask}/>
    )
}
export default Page;