import { NextResponse } from "next/server";
import { db } from "../../../../db";

export async function GET(request) {
    const todo = await db.todo.findMany();
    console.log(todo)

    return NextResponse.json(todo);
}