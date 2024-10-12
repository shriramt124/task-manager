import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        error: "You must be logged in to access this endpoint",
        status: 401,
      });
    }
    const { title, description, date, isCompleted, isImportant } =
      await req.json();
    if (!title || !description || !date) {
      return NextResponse.json({
        error: "All fields are required",
        status: 400,
      });
    }
    //if the title is less than 3 then teell that title must be atleast 2 characters long
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be atleast 3 characters long",
        status: 400,
      });
    }
    //if the description is less than 10 then teell that description must be atleast 10 characters long
    if (description.length < 10) {
      return NextResponse.json({
        error: "Description must be atleast 10 characters long",
        status: 400,
      });
    }
    //creat the task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
        userId,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log("error in creating the task", error);
    return NextResponse.json({
      status: 500,
      message: "error in creating the task",
    });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        error: "You must be logged in to access this endpoint",
        status: 401,
      });
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.log("error in getting the task", error);
    return NextResponse.json({
      status: 500,
      message: "error in getting the task",
    });
  }
}
export async function PUT(req:Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        error: "You must be logged in to access this endpoint",
        status: 401,
      });
    }
    const {isCompleted,id} = await req.json();
    
    //update the task
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted:!isCompleted,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Task updated successfully",
      task,
    });



  } catch (error) {
    console.log("error in deleting the task", error);
    return NextResponse.json({
      status: 500,
      message: "error in deleting the task",
    });
  }
}

export async function DELETE() {
  try {
  } catch (error) {
    console.log("error in updating the task", error);
    return NextResponse.json({
      status: 500,
      message: "error in updating the task",
    });
  }
}
