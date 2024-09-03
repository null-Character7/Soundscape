import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/app/lib/db';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
// Zod schema for Upvote
const upvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { streamId } = upvoteSchema.parse(body);

    // Get the session from NextAuth
    const session = await getServerSession();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    // Check if the user exists
    const user = await prismaClient.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    // Create the upvote
    const upvote = await prismaClient.upvote.create({
      data: {
        userId: user.id,
        streamId,
      },
    });

    return NextResponse.json(upvote, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating upvote:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
