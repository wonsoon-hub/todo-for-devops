// app/api/todos/route.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return Response.json(todos);
}

export async function POST(req) {
    const { title } = await req.json();
    const newTodo = await prisma.todo.create({
        data: { title },
    });
    return Response.json(newTodo, { status: 201 });
}