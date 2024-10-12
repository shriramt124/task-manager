"use client"

import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

 

export default function Home() {
  const {title,tasks} = useGlobalState();

  return (
     <>
      <Tasks tasks={tasks} title="all Task"/>
    </>
  );
}
