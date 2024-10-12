"use client"
 
import { useGlobalState } from "@/app/context/globalProvider"
import {useState} from "react"
import toast ,{Toaster} from "react-hot-toast"
import styled from  "styled-components"


  function   CreateContent() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [isCompleted, setisCompleted] = useState(false)
  const [isImportant, setIsimportent] = useState(false)
const {theme,closeModal} = useGlobalState();

  function handleChange(e:any){
 

   console.log(e.target.name)
    const {name , value}:any = e.target;
    
    if(name === "title"){
        setTitle(value)
    }
    if(name === "description"){
        setDescription(value)
    }
    if(name === "date"){
        setDate(value)
    }
    if(name === "isCompleted"){
        console.log(e.target.checked);
        setisCompleted(e.target.checked)
    }
    if(name === "isImportant"){
        setIsimportent(e.target.checked)
    }
    console.log(title, description, date, isCompleted, isImportant)
 
}
const handleSubmit = async (e:any)=>{
    e.preventDefault();
    console.log(title, description, date, isCompleted, isImportant)
   
    const task = {
        title,
        description,
        date,
        isCompleted,
        isImportant
    }
    try {
        const res = await fetch("/api/tasks",{
            method:"POST",
            body:JSON.stringify(task),
            headers:{
                "Content-Type":"application/json"
            }
        }) 
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message || "error in the response")
        }
        
        toast.success("Task created successfully")
        console.log(data)
        closeModal();

       

        
        
    } catch (error:any) {
        toast.error(" something went wrong")
        console.log(error.message)
    }
}

  return (
    <CreateContentStyled  theme={theme} onSubmit={handleSubmit}>
        <h1>Create a task</h1>
         
        <div className="input-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} name="title" onChange={handleChange} />
        </div>
        
        <div className="input-control">
        <label htmlFor="description">Description</label>
        <input type="text" id="description" value={description} name="description" onChange={handleChange} />
        </div>
        <div className="input-control">
        <label htmlFor="date">date</label>
        <input type="date" id="date" value={date} name="date" onChange={handleChange} />
        </div>
        <div className="input-control flex justify-center items-center text-center">
        <label htmlFor="isCompleted">Completed</label>
        <input type="checkbox" id="isCompleted" value={isCompleted.toString()} name="isCompleted" onChange={handleChange} />
        </div>
        <div className="input-control flex justify-center  items-center text-center">
        <label htmlFor="isImportant">isImporant</label>
        <input  type="checkbox" id="isImportant" value={isImportant.toString()} name="isImportant" onChange={handleChange} />
        </div>
        <div className="submit-button ">
            <button type="submit" className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-300">Submit</button>
        </div>
        
    </CreateContentStyled>
  )
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }
 padding:20px 20px;
 box-shadow:0 0 1rem rgba(0,0,0,0.3);
 border-radius: 20px;
  background-color: ${(props) => props.theme.colorGrey5};
  

  color: ${(props) => props.theme.colorGrey1};
  .input-control {
    position: relative;
    margin: 1.2rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);
      text-transform:capitalize;

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;


export default CreateContent