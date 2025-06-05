// app/api/todos/[id]/route.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PUT(req, context) {
    const params = await Promise.resolve(context.params);
    const id = params.id;
    const { isDone } = await req.json();

    const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { isDone },
    });

    return Response.json(updatedTodo);
}

export async function DELETE(_, context) {
    const params = await Promise.resolve(context.params);
    const id = params.id;

    await prisma.todo.delete({
        where: { id: Number(id) },
    });

    return new Response(null, { status: 204 });
}