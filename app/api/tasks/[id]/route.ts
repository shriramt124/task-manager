import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
 
export async function DELETE(req:Request,{params}:any){
try {
    const {userId} = auth()
    const {id} = params;
    if(!userId){
       return NextResponse.json({
           error:"You must be logged in to access this endpoint",
           status:401
       })
    }
    const task = await prisma.task.delete({
        where:{
            id,
        }

    });
    return NextResponse.json({
        status:200,
        message:"Task deleted successfully",
        task
    })
     
} catch (error) {
    console.log("Error in deletign the task",error)
    return NextResponse.json({
        status:500,
        message:"Error in deletign the task"
    })
    
}
}