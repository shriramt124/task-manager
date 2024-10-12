"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import styled from "styled-components";
// import CreateContent from "../Models/CreateContent"
import TaskItem from "../TaskItem/TaskItem";
import CreateContent from "../Models/CreateContent";
import Modal from "../Models/Modal";

interface Props {
  title: string;
  tasks: any[];
}
export default function Tasks({ title, tasks }: Props) {
  const { theme,isLoading,openModal,isModalOpen} = useGlobalState();
 
  return (
    <TaskStyled theme={theme}>
     {isModalOpen && <Modal content={<CreateContent />} />}
      {/* <CreateContent /> */}
      <h1>{title}</h1>

     {!isLoading ?  <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            id={task.id}
            isCompleted={task.isCompleted}
            isImportant={task.isImportant}
          />
        ))}
        <button className="create-task" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
       
            create task 
       
         
        </button>
      </div> :<div className="tasks-loader w-full flex items-center h-full justify-center">
        <span className="loader"></span>
        </div>}
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
 
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  .tasks{
    margin:1.5rem 0;
  }
  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
  }
  .create-task{
 display: flex;
 justify-content: center;
 align-items: center;
 gap:0.5rem;
 height:16rem;
 color:${(props) => props.theme.colorGrey2};
 font-weight:600;
 cursor:pointer;
 border-radius:1rem;
 border:3px dashed ${(props) => props.theme.colorGrey5};
 transition: all 0.3s ease-in-out;
 &:hover{
    background-color: ${(props) => props.theme.colorGrey5};
    color:${(props) => props.theme.colorGrey1};

 }

  }
`;
